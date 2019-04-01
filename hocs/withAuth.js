import React from 'react';
import 'isomorphic-unfetch';
import {
    getToken
} from '../helpers/token';
import AuthAction from '../redux/auth/actions';
import { connect } from 'react-redux';

export default ComposedComponent => {
    class withAuth extends React.Component {
        static async getInitialProps(ctx) {
            const {req, store} = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(req);
            if(token) {
                const result = await store.dispatch(AuthAction.loginJwt(token));
            }

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
