const fetch = require('node-fetch'); // Ensure node-fetch is installed

module.exports = async (req, res) => {
    // Allow all origins for now (you can restrict this further later)
    res.setHeader('Access-Control-Allow-Origin', 'https://hopeofisrael-fnvk9cpyw-carolyns-projects-e67f89eb.vercel.app'); // Allow specific frontend subdomain
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        return res.status(200).send('CORS preflight handled');
    }

    // Ensure only POST requests are allowed
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    try {
        // Forward the request to the sendtosheets API
        const scriptUrl = 'https://hopeofisrael-pnpts0t0a-carolyns-projects-e67f89eb.vercel.app/api/sendtosheets';
        const response = await fetch(scriptUrl, {
            method: req.method, // Forward the HTTP method (POST)
            headers: {
                'Content-Type': 'application/json',
            },
            body: req.body, // Forward the request body
        });

        // Ensure the response is JSON
        const data = await response.json();
        
        // Return the response to the client with the correct status
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Error forwarding request:', error);
        res.status(500).json({ error: 'Error forwarding request to sendtosheets' });
    }
};
