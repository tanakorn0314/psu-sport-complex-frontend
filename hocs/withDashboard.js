import React from 'react';
import DashboardLayout from '../containers/LayoutDashboard';

export default ComposedComponent => props => {
    return (
    <DashboardLayout>
        <ComposedComponent {...props}/>
    </DashboardLayout>
)};