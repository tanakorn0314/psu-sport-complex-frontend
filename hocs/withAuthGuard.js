import React from 'react';
import 'isomorphic-unfetch';
import { connect } from 'react-redux';
import redirect from '../helpers/redirect';
import AuthAction from '../redux/auth/actions';

export default ComposedComponent => {
    class withAuthGuard extends React.Component {
        static async getInitialProps(ctx) {
            const { req, store } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};

            const { token } = pageProps;
            if (!token) {
                redirect(ctx, '/booking');
            }

            store.dispatch(AuthAction.setAuthGuard(true));

            return pageProps;
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }

    }
    return connect(state => state.Auth, AuthAction)(withAuthGuard);
}
