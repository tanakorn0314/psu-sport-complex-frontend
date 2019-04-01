import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from '../../config/themes';

class Layout extends React.Component {
    render() {
        return (
            <ThemeProvider theme={themes['themedefault']}>
                {this.props.children}
            </ThemeProvider>
        )
    }
}

export default Layout;