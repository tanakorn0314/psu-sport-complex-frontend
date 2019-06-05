import React from 'react';
import NavLayout from '../Layout/NavLayout';

export default ComposedComponent => props => {
    return (
    <NavLayout>
        <ComposedComponent {...props}/>
    </NavLayout>
)};