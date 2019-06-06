import React from 'react';

export default ComposedComponent => {
    return class withTranslate extends React.Component {
        static async getInitialProps(ctx) {
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};

            pageProps.namespacesRequired= ['common', 'footer'];

            return pageProps;
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
};