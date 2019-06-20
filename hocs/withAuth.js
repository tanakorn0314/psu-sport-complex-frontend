import React from 'react';
import 'isomorphic-unfetch';
import {
    getToken,
    removeToken,
    removeExpires,
    isTokenValid
} from '../helpers/token';
import AuthAction from '../redux/auth/actions';
import { connect } from 'react-redux';

export default ComposedComponent => {
    class withAuth extends React.Component {
        static async getInitialProps(ctx) {
            const { req, store } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(req);
            const isValid = isTokenValid(req);

            if (!isValid) {
                removeToken();
                removeExpires();
            }
            else if (token) {
                const result = await store.dispatch(AuthAction.loginJwt(token));
                if (result && !result.error)
                    pageProps.token = result.accessToken;
                else {
                    removeToken();
                    removeExpires();
                }
            }

            store.dispatch(AuthAction.setAuthGuard(false));

            return pageProps;
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    return connect(state => state, AuthAction)(withAuth);
}
