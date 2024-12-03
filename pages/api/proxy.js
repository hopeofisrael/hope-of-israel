const fetch = require('node-fetch'); // Ensure node-fetch is installed

module.exports = async (req, res) => {
  // Allow CORS for all origins
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Handle preflight OPTIONS request
    return res.status(200).send('CORS preflight handled');
  }

  try {
    // Define the Google Apps Script URL
    const scriptUrl = 'https://script.google.com/macros/s/AKfycbxpv2i8zh5GAYlKp5-xYpHehtYPYxaBwCHJLzQcTDFEFt9njlC7r0gzr4N5-9vqWaIVvQ/exec';
    
    // Forward the request to Google Apps Script
    const response = await fetch(scriptUrl, {
      method: req.method, // Forward the HTTP method (GET, POST, etc.)
      headers: req.headers, // Forward the headers from the client request
      body: req.body, // Forward the request body
    });

    // Get the response data from the Apps Script
    const data = await response.json();

    // Return the response to the client with correct status
    res.status(response.status).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error forwarding request to Apps Script.' });
  }
};
