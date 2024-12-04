// pages/api/proxy.js

export default async function handler(req, res) {
  // Allow any origin (ensure you configure CORS properly for production)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS requests (CORS preflight)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  try {
    const apiUrl = process.env.API_URL;  // Use the URL from your environment variable

    // Forward the request to Google Apps Script
    const response = await fetch(apiUrl, {
      method: req.method,  // Forward the same method (POST, GET, etc.)
      headers: { 
        "Content-Type": "application/json", // Ensure proper content type
      },
      body: req.method === "POST" ? JSON.stringify(req.body) : null,  // Send the body only for POST requests
    });

    const data = await response.json(); // Parse the response as JSON
    console.log("Response from Apps Script:", data);

    // Forward the response from Apps Script to the frontend
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Proxy Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
