import React from 'react';
import NavLayout from '../containers/LayoutNav';

export default ComposedComponent => props => {
    return (
    <NavLayout>
        <ComposedComponent {...props}/>
    </NavLayout>
)};