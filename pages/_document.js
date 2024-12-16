import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Update the Content Security Policy for development and production */}
          <meta
            httpEquiv="Content-Security-Policy"
            content={
              process.env.NODE_ENV === 'development'
                ? "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-eval' https://www.gstatic.com https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://script.google.com; connect-src 'self' https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://script.google.com; img-src 'self' data: https://www.gstatic.com; font-src 'self'; object-src 'none'; frame-src 'none'; manifest-src 'self';"
                : "default-src 'self'; style-src 'self' 'unsafe-inline'; script-src 'self' https://www.gstatic.com https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://script.google.com; connect-src 'self' https://www.googleapis.com https://securetoken.googleapis.com https://identitytoolkit.googleapis.com https://script.google.com; img-src 'self' data: https://www.gstatic.com; font-src 'self'; object-src 'none'; frame-src 'none'; manifest-src 'self';"
            }
          />
          {/* Add Favicon */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
