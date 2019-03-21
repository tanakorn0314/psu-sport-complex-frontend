import React from 'react';
import { 
    Layout,
    Menu
 } from 'antd';
import StyledLayout from './layout.style';

const { Header, Footer, Content } = Layout;

class Index extends React.Component {
    render() {
        return (
            <StyledLayout>
                <Header className='header'>
                    <div className='logo'>
                    </div>
                    <Menu 
                        className='menu'
                        theme='light'
                        mode='horizontal'
                    >
                        <Menu.Item key='1'>Booking</Menu.Item>
                        <Menu.Item key='2'>Stadium</Menu.Item>
                        <Menu.Item key='3'>Contact us</Menu.Item>
                        <Menu.Item key='4'>Logout</Menu.Item>
                    </Menu>
                </Header>
                <Content className='content'>Content</Content>
                <Footer className='footer'>Footer</Footer>
            </StyledLayout>
        )
    }
}

export default Index;