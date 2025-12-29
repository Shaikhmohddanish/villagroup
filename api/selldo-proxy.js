const SELLDO_ENDPOINT = "https://app.sell.do/api/leads/create.json";
const SELLDO_API_KEY = "763df41feda17d2d393a0cc4dd367ba9";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    const body = req.body || {};
    
    // Use API key from request body if provided, otherwise use default
    const apiKey = body.api_key || SELLDO_API_KEY;

    // If caller already sent the full sell_do structure, just append API key.
    // Otherwise, build the expected structure from flat fields.
    let payload;
    if (body.sell_do) {
      payload = {
        ...body,
        api_key: apiKey,
      };
      const lead = body.sell_do?.form?.lead || {};
      if (!lead.name || !lead.phone || !lead.email) {
        res.status(400).json({ error: "Missing required fields: name, phone, email" });
        return;
      }
    } else {
      const {
        name = "",
        phone = "",
        email = "",
        message = "",
        srd = "",
        utm_content = "",
        utm_term = "",
        utm_source = "",
        utm_medium = "",
        utm_campaign = "",
        property_type = "flat",
      } = body;

      if (!name || !phone || !email) {
        res.status(400).json({ error: "Missing required fields: name, phone, email" });
        return;
      }

      payload = {
        api_key: apiKey,
        sell_do: {
          analytics: {
            utm_content,
            utm_term,
            utm_source,
            utm_medium,
            utm_campaign,
          },
          campaign: { srd },
          form: {
            requirement: { property_type },
            lead: { name, phone, email },
            note: { content: message },
          },
        },
      };
    }

    const sellDoResponse = await fetch(SELLDO_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const text = await sellDoResponse.text();
    if (!sellDoResponse.ok) {
      res.status(sellDoResponse.status).json({ error: "Sell.do error", response: text });
      return;
    }

    res.status(200).json({ success: true, response: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
