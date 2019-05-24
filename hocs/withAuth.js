import React from 'react';
import 'isomorphic-unfetch';
import {
    getToken
} from '../helpers/token';
import AuthAction from '../redux/auth/actions';
import BookingAction from '../redux/booking/actions';
import { connect } from 'react-redux';
import jwtDecode from 'jwt-decode';

export default ComposedComponent => {
    class withAuth extends React.Component {
        static async getInitialProps(ctx) {
            const { req, store } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(req);
            if (token) {
                const result = await store.dispatch(AuthAction.loginJwt(token));
                if (!result.error) {
                    const user = jwtDecode(token);
                    const info = user.psuPassport.length > 0 ? user.psuPassport : user.phoneNumber;
                    const owner = {
                        name: `${user.fname} ${user.lname}`,
                        info,
                        position: user.position
                    }
                    store.dispatch(BookingAction.setOwner(owner))
                }
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
