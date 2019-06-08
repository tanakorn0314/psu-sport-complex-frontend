import React from 'react';
import { withNamespaces } from '../i18n';

export default ComposedComponent => {
    class withTranslate extends React.Component {
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
    return withNamespaces('common')(withTranslate);
};