import React from 'react';
import cookies from 'next-cookies';
import authService from '../core-layer/service/auth-service';
import { storeCookie } from '../core-layer/storage/cookie-storage';
import { storeUser } from '../action/auth-action';
import { connect } from 'react-redux';

export const withAuth = (Page) => {
    class PageWithAuth extends React.Component {
        static async getInitialProps(ctx) {
            const pageProps = Page.getInitialProps ? await Page.getInitialProps(ctx) : {};
            const { accessToken, expires } = cookies(ctx);
            const now = new Date();
            if (accessToken && expires && accessToken !== '' && now < new Date(expires)) {
                let response = await authService.signWithToken(accessToken);
                if (response) {
                    const { accessToken, expiresIn } = response;
                    pageProps.accessToken = accessToken;
                    pageProps.expiresTokenIn = expiresIn;
                }
            }
            return pageProps;
        }


        componentDidMount() {
            const { accessToken, expiresTokenIn, initUser } = this.props;
            if (accessToken && expiresTokenIn) {
                storeCookie('accessToken', accessToken, expiresTokenIn);
                initUser(accessToken);
            }
        }

        render() {
            return (
                <Page {...this.props} />
            )
        }

    }

    const mapStateToProps = state => ({
        user: state.user
    })

    const mapDispatchToProps = dispatch => ({
        initUser: (token) => {
            dispatch(storeUser(token));
        }
    })
    return connect(mapStateToProps, mapDispatchToProps)(PageWithAuth);
}
