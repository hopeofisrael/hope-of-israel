module.exports = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "script-src 'self' 'unsafe-eval' https://www.gstatic.com https://www.googleapis.com",
          },
        ],
      },
    ];
  },
};
