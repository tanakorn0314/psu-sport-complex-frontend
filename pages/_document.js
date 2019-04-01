import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );
    const styleTags = sheet.getStyleElement();
    return { ...page, styleTags };
  }
  render() {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.11.4/antd.min.css" />
          <link rel="stylesheet" href="/static/css/ionicons.min.css" />
          <link rel="stylesheet" href="/static/css/global.css" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
          {/* <link rel='stylesheet' href='/static/css/bootstrap.min.css' /> */}
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/react-instantsearch-theme-algolia@4.0.0/style.min.css"
          /> */}
          {/* <link
            rel="stylesheet"
            href="https://unpkg.com/leaflet@1.3.4/dist/leaflet.css"
            integrity="sha512-puBpdR0798OZvTTbP4A8Ix/l+A4dHDD0DGqYW6RQ+9jxkRFclaxxQb/SJAWZfWAkuyeQUytO7+7N4QKrDh+drA=="
            crossOrigin=""
            async
          /> */}
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
