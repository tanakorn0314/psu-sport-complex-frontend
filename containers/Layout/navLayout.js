import React from 'react';
import themes from '../../config/themes';
import { ThemeProvider } from 'styled-components';
import Nav from '../Nav';

const navLayout = props => (
    <ThemeProvider theme={themes['themedefault']}>
        <>
            <Nav />
            {props.children}
        </>
    </ThemeProvider>
);

export default navLayout;