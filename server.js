import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

// constants
const SELLDO_ENDPOINT = "https://app.sell.do/api/leads/create.json";
const SELLDO_API_KEY = "763df41feda17d2d393a0cc4dd367ba9";

app.use(cors());
app.use(express.json());

// Serve static site from repo root
app.use(express.static("."));

app.post("/api/selldo-proxy", async (req, res) => {
  try {
    const body = req.body || {};
    const sellDoPayload = {
      ...body,
      api_key: SELLDO_API_KEY,
    };

    const response = await fetch(SELLDO_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sellDoPayload),
    });

    const text = await response.text();
    res.status(response.status).send(text);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
