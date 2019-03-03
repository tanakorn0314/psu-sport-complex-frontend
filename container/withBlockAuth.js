import React from 'react';
import cookies from 'next-cookies';
import redirect from '../src/lib/redirect';

export const withBlockAuth = (Page) => {
    class PageWithBlockAuth extends React.Component {
        static async getInitialProps(ctx) {
            const pageProps = Page.getInitialProps ? await Page.getInitialProps(ctx) : {};
            const { accessToken, expires } = cookies(ctx);
            const now = new Date();
            if (accessToken && expires && accessToken !== '' && now < new Date(expires)) {
                redirect(ctx, '/');
            }
            return pageProps;
        }

        render() {
            return (
                <Page {...this.props} />
            )
        }

    }

    return PageWithBlockAuth;
}