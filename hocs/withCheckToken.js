import React from 'react';
import redirect from '../helpers/redirect';
import UserService from '../coreLayer/service/userService';

export default ComposedComponent => {
    class withCheckToken extends React.Component {
        static async getInitialProps(ctx) {
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            const { token } = ctx.query;

            const isTokenValid = await withCheckToken.validateToken(token);

            if (!isTokenValid) {
                redirect(ctx, '/signin');
            }
            return pageProps;
        }

        static validateToken = async (token) => {
            const result = await UserService.getUserByResetToken(token);
            return !result.error;
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }

    }

    return withCheckToken;
}