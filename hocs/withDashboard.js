import React from 'react';
import DashboardLayout from '../Layout/DashboardLayout';
import 'isomorphic-unfetch';
import redirect from '../helpers/redirect';
import jwtDecode from 'jwt-decode';
import BookingAction from '../redux/booking/actions';
import AuthAction from '../redux/auth/actions';
import { connect } from 'react-redux';

export default ComposedComponent => {
    class withDashBoard extends React.Component {
        static async getInitialProps(ctx) {
            const { store } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const { token } = pageProps;

            await store.dispatch(BookingAction.fetchAllBooking());
            await store.dispatch(AuthAction.setAuthGuard(true));

            if (!token || jwtDecode(token).position !== 'admin') {
                redirect(ctx, '/');
            }

            return pageProps;
        }

        render() {
            return (
                <DashboardLayout>
                    <ComposedComponent {...this.props} />
                </DashboardLayout>
            )
        }
    }
    return connect(state => state, { ...BookingAction, ...AuthAction })(withDashBoard);
}