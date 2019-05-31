import React from 'react';
import LayoutNav from '../LayoutNav';
import StyledLayout from './layout.style';
import {
    Layout,
    Menu,
    Icon
} from 'antd';
import Router, { withRouter } from 'next/router';

const { Sider, Content } = Layout;

class LayoutDashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: false,
            current: props.router.pathname.split('/')[2]
        }
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
                            selectedKeys={[this.state.current]}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="booking" onClick={this.navigate}>
                                <Icon type='read' />
                                <span>Bookings</span>
                            </Menu.Item>
                            <Menu.Item key="user" onClick={this.navigate}>
                                <Icon type='user' />
                                <span>Users</span>
                            </Menu.Item>
                            <Menu.Item key="operationTime" onClick={this.navigate}>
                                <Icon type='calendar' />
                                <span>Operation Time</span>
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

    navigate = ({ key }) => {
        Router.push(`/dashboard/${key}`);
    }
}

export default withRouter(LayoutDashboard);