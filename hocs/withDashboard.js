import React from 'react';
import DashboardLayout from '../containers/LayoutDashboard';
import 'isomorphic-unfetch';
import {
    getToken
} from '../helpers/token';
import AdminActions from '../redux/admin/actions';
import { connect } from 'react-redux';
import redirect from '../helpers/redirect';
import jwtDecode from 'jwt-decode';

export default ComposedComponent => {
    class withDashBoard extends React.Component {
        static async getInitialProps(ctx) {
            const { req } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const token = getToken(req);

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
    return withDashBoard;
}