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
                await store.execSagaTasks(ctx.isServer, dispatch => {
                    console.log('before exec');
                    dispatch(AuthAction.loginJwt(token));
                })

                console.log('after exec', store.getState());
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
