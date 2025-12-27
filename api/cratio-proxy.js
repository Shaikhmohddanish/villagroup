export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  try {
    // Forward the payload to Cratio webhook
    const cratioResponse = await fetch(
      "https://apps.cratiocrm.com/Customize/Webhooks/webhook.php?id=484610",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // Cratio expects application/json string, pass JSON.stringify
        body: JSON.stringify(req.body)
      }
    );

    const text = await cratioResponse.text(); // If Cratio returns JSON, use .json()
    res.status(200).json({ success: true, cratioResponse: text });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
