import React from 'react';
import LayoutNav from '../LayoutNav';
import StyledLayout from './layout.style';
import {
    Layout,
    Menu,
    Icon
} from 'antd';

const { Sider, Content } = Layout;

class LayoutDashboard extends React.Component {

    state = {
        collapsed: false
    }

    render() {
        return (
            <LayoutNav noFooter>
                <StyledLayout>
                    <Sider
                        width={200}
                        style={{ background: '#cecece' }}
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="1">
                                <Icon type='read' />
                                <span>Bookings</span>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Icon type='user' />
                                <span>Users</span>
                            </Menu.Item>
                            <Menu.Item key="3">
                                <Icon type='calendar' />
                                <span>Open / Close</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Content>
                        {this.props.children}
                    </Content>
                </StyledLayout>
            </LayoutNav>
        );
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }
}

export default LayoutDashboard;