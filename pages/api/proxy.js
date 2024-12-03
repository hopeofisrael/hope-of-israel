// api/proxy.js

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

  if (req.method === 'POST') {
    try {
      const { email, provider } = req.body;

      // Ensure email and provider are provided
      if (!email || !provider) {
        return res.status(400).json({ error: 'Missing email or provider' });
      }

      // Define the Google Apps Script URL
      const scriptUrl = 'https://script.google.com/macros/s/AKfycbxpv2i8zh5GAYlKp5-xYpHehtYPYxaBwCHJLzQcTDFEFt9njlC7r0gzr4N5-9vqWaIVvQ/exec';
      
      // Forward the request to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST', // Forward the HTTP method as POST
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, provider }), // Send email and provider to Google Apps Script
      });

      const data = await response.json();

      if (data.success) {
        res.status(200).json({ message: 'Data appended successfully' });
      } else {
        res.status(500).json({ error: 'Failed to append data to Sheets' });
      }
    } catch (error) {
      console.error('Error forwarding request to Apps Script:', error.message);
      res.status(500).json({ error: 'Error forwarding request to Apps Script' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
