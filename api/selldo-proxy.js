const SELLDO_ENDPOINT = "https://app.sell.do/api/leads/create";
const SELLDO_API_KEY = "763df41feda17d2d393a0cc4dd367ba9"; // Hardcoded per user request

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
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
    } = req.body || {};

    if (!name || !phone || !email) {
      res.status(400).json({ error: "Missing required fields: name, phone, email" });
      return;
    }

    const payload = {
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
      api_key: SELLDO_API_KEY,
    };

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
