import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          {/* Add or modify the Content-Security-Policy (CSP) header here */}
          <meta
            httpEquiv="Content-Security-Policy"
            content="default-src 'self'; connect-src 'self' https://hopeofisrael-h7q3z9w89-carolyns-projects-e67f89eb.vercel.app;"
          />
          {/* You can add other meta tags or assets if needed */}
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
