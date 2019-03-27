import React from 'react';
import { ThemeProvider } from 'styled-components';
import themes from '../config/themes'

export default ComposedComponent => (
    class withTheme extends React.Component {
        render() {
            return (
                <ThemeProvider theme={themes['themedefault']}>
                    <ComposedComponent {...this.props}>
                        {this.props.children}
                    </ComposedComponent>
                </ThemeProvider>
            )
        }
    }
)