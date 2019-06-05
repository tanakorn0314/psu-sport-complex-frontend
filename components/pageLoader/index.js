import React from 'react';
import {  Spin } from 'antd'; 

class PageLoader extends React.Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Spin tip='Loading...' size='large' />
            </div>
        )
    }
}

export default PageLoader;