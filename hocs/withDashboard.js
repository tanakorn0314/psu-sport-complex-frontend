import React from 'react';
import DashboardLayout from '../Layout/DashboardLayout';
import 'isomorphic-unfetch';
import redirect from '../helpers/redirect';
import jwtDecode from 'jwt-decode';

export default ComposedComponent => {
    class withDashBoard extends React.Component {
        static async getInitialProps(ctx) {
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const { token } = pageProps;

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