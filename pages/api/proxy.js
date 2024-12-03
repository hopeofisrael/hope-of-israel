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
        // Define the sendtosheets.js URL
        const scriptUrl = 'https://hopeofisrael-pnpts0t0a-carolyns-projects-e67f89eb.vercel.app/api/sendtosheets';
        
        // Forward the request to the sendtosheets API
        const response = await fetch(scriptUrl, {
            method: req.method, // Forward the HTTP method (POST)
            headers: req.headers, // Forward the headers from the client request
            body: req.body, // Forward the request body
        });

        // Get the response data from sendtosheets
        const data = await response.json();

        // Return the response to the client with correct status
        res.status(response.status).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Error forwarding request to sendtosheets.' });
    }
};
