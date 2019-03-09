import React from 'react';
import NavLayout from '../containers/Layout/navLayout';

export default ComposedComponent => props => {
    return (
    <NavLayout>
        <ComposedComponent {...props}/>
    </NavLayout>
)};