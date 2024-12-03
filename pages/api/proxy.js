const fetch = require('node-fetch'); // Ensure node-fetch is installed

module.exports = async (req, res) => {
    // Handle CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'https://hopeofisrael-fnvk9cpyw-carolyns-projects-e67f89eb.vercel.app'); // Allow frontend domain
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // Allow specific methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allow content type headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies, authorization headers)

    // Handle preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        // Respond with a 204 No Content status to indicate successful preflight handling
        return res.status(204).end();
    }

    // Ensure only POST requests are allowed for the API logic
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
