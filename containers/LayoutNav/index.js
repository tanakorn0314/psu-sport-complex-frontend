import React from 'react';
import StyleLayout from './layout.style';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import AuthAction from '../../redux/auth/actions';
import {
    Layout,
    Row,
    Col,
    Typography,
    Menu,
    Popover,
    Icon
} from 'antd';

const { Header, Content, Footer, Sider } = Layout;
const { Text } = Typography;

class LayoutNav extends React.Component {

    state = {
        showMenu: false,
    }

    render() {
        const { isLoading, isMobile } = this.props.Screen;

        return (
            <StyleLayout>
                <Header className='header'>
                    <Row type='flex' justify='space-between'>
                        <Col xxl={4} xl={6} lg={8} md={12} sm={12} xs={20} key={1}>
                            <Link href='/'><a>PSU Sport Complex</a></Link>
                        </Col>
                        <Col className='menu-container'>
                            {!isLoading && this.renderMenu()}
                        </Col>
                    </Row>
                </Header>
                <Content style={{ background: '#fff' }}>
                    {this.props.children}
                </Content>
                {!this.props.noFooter && <Footer style={{ textAlign: 'center' }}>
                    <Text type='secondary'>©2019 PSU Sport Complex</Text>
                </Footer>}
            </StyleLayout>
        )
    }

    renderMenu = () => {
        const { isMobile } = this.props.Screen;
        const { showMenu } = this.state;

        if (isMobile)
            return (
                <Popover
                    visible={showMenu}
                    content={this.renderMenuItems()}
                    placement='bottomRight'
                    arrowPointAtCenter
                >
                    <Icon type='menu' onClick={() => { this.setState({ showMenu: !showMenu }) }} />
                </Popover>
            )
        else
            return this.renderMenuItems();
    }

    renderMenuItems = () => {
        const { isMobile } = this.props.Screen;
        const { profile } = this.props.Auth;
        const menuMode = isMobile ? 'inline' : 'horizontal';
        return (
            <Menu
                key={1}
                mode={menuMode}
                style={{ lineHeight: '64px' }}
            >
                {profile && profile.position === 'admin' &&
                    <Menu.Item key={0}><Link href='/dashboard/booking'><a>Admin</a></Link></Menu.Item>}
                <Menu.Item key={1}><Link href='/booking'><a>Booking</a></Link></Menu.Item>
                {this.renderAccountMenu()}
            </Menu>
        )
    }

    renderAccountMenu = () => {
        const { showMenu } = this.state;
        const { isMobile } = this.props.Screen;
        const { profile } = this.props.Auth;

        const menuMode = isMobile ? 'inline' : 'horizontal';

        if (!profile)
            return (
                <Menu.Item key={2}>
                    <Link href='/signin'><a>Login</a></Link>
                </Menu.Item>
            );
        else if (isMobile)
            return this.renderAccountMenuItems();
        else
            return (
                <Menu.Item key={2}>
                    <Popover
                        visible={showMenu}
                        content={
                            <Menu
                                key={1}
                                style={{ lineHeight: '64px' }}
                            >
                                {this.renderAccountMenuItems()}
                            </Menu>
                        }
                        placement='bottomRight'
                        arrowPointAtCenter
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}
                            onClick={this.toggleMenu}
                        >
                            <Icon type='user' />
                            <div>{profile.fname}</div>
                        </div>
                    </Popover>
                </Menu.Item>
            )
    }

    renderAccountMenuItems = () => {
        return [
            <Menu.Item key={4}><Link href='/'><a>Booking List</a></Link></Menu.Item>,
            <Menu.Item key={5}><Link href='/booking'><a>Account</a></Link></Menu.Item>,
            <Menu.Item key={6}><a onClick={this.handleLogout}>Logout</a></Menu.Item>,
        ]
    }

    toggleMenu = () => {
        this.setState({ showMenu: !this.state.showMenu })
    }

    handleLogout = async () => {
        await this.props.logout();
        setTimeout(() => {
            Router.replace('/signin');
        }, 500)
    }
}

export default connect(
    state => state,
    AuthAction,
)(LayoutNav);