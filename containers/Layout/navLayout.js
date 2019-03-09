import React from 'react';
import Nav from '../Nav';

const navLayout = props => (
    <>
        <Nav/>
        {props.children}
    </>
);

export default navLayout;