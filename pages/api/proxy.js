export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // Use public-facing variable

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return res.status(500).json({ error: "API_URL is not defined. Check .env.local." });
  }

  try {
    const response = await fetch(apiUrl, {
      method: req.method,
      headers: { "Content-Type": "application/json" },
      body: req.method === "POST" ? JSON.stringify(req.body) : null,
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ error: "An error occurred while forwarding the request" });
  }
}
