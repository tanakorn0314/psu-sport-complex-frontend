import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheet, createGlobalStyle  } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'db_chuanpim_psu_bd';
    src: url('/static/fonts/db_chuanpim_psu_bd.ttf');
    src: url('/static/fonts/db_chuanpim_psu_it.ttf');
    src: url('/static/fonts/db_chuanpim_psu_regular.ttf');
  }
  @font-face {
    font-family: 'psu-stidti';
    src: url('/static/fonts/psu-stidti-bold.ttf');
    src: url('/static/fonts/psu-stidti-bolditalic.ttf');
    src: url('/static/fonts/psu-stidti-italic.ttf');
    src: url('/static/fonts/psu-stidti-light.ttf');
    src: url('/static/fonts/psu-stidti-bolditalic.ttf');
    src: url('/static/fonts/psu-stidti-lightitalic.ttf');
    src: url('/static/fonts/psu-stidti-regular.ttf');
  }
`;

export default class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
    
        try {
          ctx.renderPage = () =>
            originalRenderPage({
              enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
            });
    
          const initialProps = await Document.getInitialProps(ctx);
          return {
            ...initialProps,
            styles: (
              <>
                {initialProps.styles}
                {sheet.getStyleElement()}
              </>
            )
          };
        } finally {
          sheet.seal();
        }
      }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/antd/3.19.0/antd.min.css" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
                    {this.props.styleTags}
                </Head>
                <body>
                    <GlobalStyle />
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
