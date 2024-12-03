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
    const apiUrl = "https://script.google.com/macros/s/AKfycbxs7HgQa2G4w2LYqykoceaTzDZvT9B8G1iqDWerG_l2f4bB2-pDtcJd63PsptVkdd_tAA/exec";  // Replace with your Apps Script deployment ID

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
