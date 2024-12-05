require("dotenv").config();

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)', // Applies to all routes
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              default-src 'self';
              script-src 'self' 'unsafe-inline' 
                https://www.gstatic.com https://www.googleapis.com 
                https://securetoken.googleapis.com https://identitytoolkit.googleapis.com 
                https://script.google.com https://vercel.live;
              style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
              font-src 'self' https://fonts.gstatic.com;
              connect-src 'self' https://vercel.live https://www.googleapis.com 
                https://firestore.googleapis.com https://firebase.googleapis.com 
                https://identitytoolkit.googleapis.com https://securetoken.googleapis.com
                https://sheets.googleapis.com; 
              img-src 'self' data:;
              frame-src 'self' https://vercel.live;
            `.replace(/\n/g, ' ').replace(/\s{2,}/g, ' ').trim(), // Minify policy string
          },
        ],
      },
    ];
  },
  env: {
    API_URL: process.env.API_URL, // We are keeping only the API_URL here now
  },
};
