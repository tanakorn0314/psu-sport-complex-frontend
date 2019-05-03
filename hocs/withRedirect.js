import React from 'react';
import redirect from '../helpers/redirect';
import { getToken } from '../helpers/token';

export default ComposedComponent => {
    class withRedirect extends React.Component {
        static async getInitialProps(ctx) {
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(ctx.req);

            console.log(token);

            if (token && token !== 'undefined') {
                redirect(ctx, '/');
            }
            return pageProps;
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }

    }

    return withRedirect;
}