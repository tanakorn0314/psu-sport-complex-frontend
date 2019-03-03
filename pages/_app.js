import React from 'react';
import App, { Container } from 'next/app';
import withRedux from 'next-redux-wrapper';
import initialStore from '../reducer/store';
import { Provider } from 'react-redux';
import cookies from 'next-cookies';

class CustomApp extends App {
    static async getInitialProps({ Component, ctx }) {
        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
        return { pageProps };
    }

    render() {
        const { Component, pageProps, store } = this.props;
        return (
            <Container>
                <Provider store={store}>
                    <Component pageContext={this.pageContext} {...pageProps} />
                </Provider>
            </Container>
        )
    }
}

export default withRedux(initialStore)(CustomApp);