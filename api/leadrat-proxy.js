const LEADRAT_ENDPOINT = "https://connect.leadrat.com/api/v1/integration/Website";

// Prefer the Vercel env var. The literal is only a fallback so a deploy without
// LEADRAT_API_KEY configured still captures leads instead of dropping them.
// This repo is public, so set LEADRAT_API_KEY in the Vercel dashboard and treat
// the fallback below as already-disclosed.
const LEADRAT_API_KEY =
  process.env.LEADRAT_API_KEY || "ZjMxYzkyYjYtMTg1My00NTc3LWI3ZDEtNzFjYTIxNzVjMmQ0";

// Villa Group builds only in Dronagiri, so these are constant for every lead.
const DEFAULT_STATE = "Maharashtra";
const DEFAULT_CITY = "Navi Mumbai";
const DEFAULT_LOCATION = "Dronagiri";
const DEFAULT_PROPERTY_TYPE = "Flat";

const UPSTREAM_TIMEOUT_MS = 8000; // under the 10s maxDuration in vercel.json

// LeadRat wants "dd-MM-yy" + "HH:mm:ss" in local time, but the function runs in
// UTC, so pin the formatter to IST.
function istStamp() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Kolkata",
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
    .formatToParts(new Date())
    .reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});

  // Some ICU builds render midnight as "24" under hour12:false.
  const hour = parts.hour === "24" ? "00" : parts.hour;

  return {
    submittedDate: `${parts.day}-${parts.month}-${parts.year}`,
    submittedTime: `${hour}:${parts.minute}:${parts.second}`,
  };
}

// Accepts "9988776655", "+91 99887-76655", "919988776655" -> "9988776655".
// Returns "" when it is not a valid Indian mobile number.
function normalizeMobile(raw) {
  let digits = String(raw == null ? "" : raw).replace(/\D/g, "");
  if (digits.length > 10 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length > 10) digits = digits.slice(-10);
  return /^[6-9]\d{9}$/.test(digits) ? digits : "";
}

function str(value) {
  return value == null ? "" : String(value).trim();
}

// Vercel parses JSON bodies automatically, but fall back to reading the stream
// when the content-type is missing or the body arrives as a raw string.
async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;

  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  try {
    const chunks = [];
    for await (const chunk of req) chunks.push(chunk);
    if (!chunks.length) return {};
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    return {};
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = await readBody(req);

    const name = str(body.name || body.fname);
    const mobile = normalizeMobile(body.mobile || body.phone);
    const email = str(body.email);
    const project = str(body.project);
    const source = str(body.source);
    const message = str(body.message || body.note);
    const consent = body.whatsappin === "on" || body.whatsappin === true;

    if (!name) {
      res.status(400).json({ error: "Please enter your name." });
      return;
    }
    if (!mobile) {
      res.status(400).json({ error: "Please enter a valid 10-digit mobile number." });
      return;
    }

    const utmSource = str(body.utm_source);
    const gclid = str(body.gclid);

    // What the sales team should see at a glance: which CTA, which project.
    const notes = [
      source ? `Enquiry: ${source}` : "Website enquiry",
      project ? `Project: ${project}` : "",
      message,
      consent ? "NDNC consent given." : "",
    ]
      .filter(Boolean)
      .join(" | ");

    const additionalProperties = {};
    const tracking = {
      utm_source: utmSource,
      utm_medium: str(body.utm_medium),
      utm_campaign: str(body.utm_campaign),
      utm_term: str(body.utm_term),
      utm_content: str(body.utm_content),
      gclid,
      srd: str(body.srd),
      page_url: str(body.page_url),
      referrer: str(body.referrer),
      form_source: source,
    };
    for (const [key, value] of Object.entries(tracking)) {
      if (value) additionalProperties[key] = value; // LeadRat expects string values
    }

    const { submittedDate, submittedTime } = istStamp();

    const payload = {
      name,
      state: DEFAULT_STATE,
      city: DEFAULT_CITY,
      location: DEFAULT_LOCATION,
      budget: "",
      notes,
      email,
      countryCode: "91",
      mobile,
      project,
      property: DEFAULT_PROPERTY_TYPE,
      leadExpectedBudget: "",
      propertyType: DEFAULT_PROPERTY_TYPE,
      submittedDate,
      submittedTime,
      LeadId: "",
      subsource: utmSource || (gclid ? "Paid" : "Website"),
      // leadStatus is deliberately left empty: a website form fill is not a
      // booked site visit, and stamping one would corrupt the sales pipeline.
      leadStatus: "",
      callRecordingUrl: "",
      scheduledDate: "",
      additionalProperties,
    };

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);

    let upstream;
    try {
      upstream = await fetch(LEADRAT_ENDPOINT, {
        method: "POST",
        headers: {
          "API-Key": LEADRAT_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
    } catch (err) {
      clearTimeout(timer);
      const timedOut = err.name === "AbortError";
      console.error(
        `[leadrat] ${timedOut ? "upstream timeout" : "upstream request failed"}: ${err.message}`
      );
      res.status(504).json({
        success: false,
        error: timedOut ? "CRM request timed out" : "CRM request failed",
      });
      return;
    }
    clearTimeout(timer);

    // LeadRat may answer with JSON or plain text.
    const raw = await upstream.text();
    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = raw;
    }

    // Log the outcome without dumping the lead's contact details.
    console.log(
      `[leadrat] status=${upstream.status} project="${project || "-"}" source="${
        source || "-"
      }" mobile=******${mobile.slice(-4)}`
    );

    if (!upstream.ok) {
      res.status(upstream.status).json({ error: "LeadRat error", response: parsed });
      return;
    }

    res.status(200).json({ success: true, response: parsed });
  } catch (error) {
    console.error(`[leadrat] handler error: ${error.message}`);
    res.status(500).json({ success: false, error: error.message });
  }
}
