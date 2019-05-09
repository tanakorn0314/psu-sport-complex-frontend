import React from 'react';
import StyleLayout from './layout.style';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import AuthAction from '../../redux/auth/actions';
import { withRouter } from 'next/router';
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

    constructor(props) {
        super(props);
        this.state = {
            showMenu: false,
            current: props.router.pathname.split('/')[1]
        }
    }

    render() {
        const { isLoading } = this.props.Screen;

        return (
            <StyleLayout>
                <Header className='header'>
                    <Row type='flex' justify='space-between'>
                        <Col style={{flex: 1}} key={1}>
                            <Link href='/'><a className='logo'>PSU Sport Complex</a></Link>
                        </Col>
                        <Col className='menu-container'>
                            {!isLoading && this.renderMenu()}
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {this.props.children}
                </Content>
                {!this.props.noFooter && <Footer style={{ textAlign: 'center', backgroundColor: '#001529' }}>
                    <Text type='secondary' style={{color: 'hsla(0,0%,100%,.65)'}}>©2019 PSU Sport Complex</Text>
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
                    <Icon type='menu' style={{color: '#fff'}} onClick={() => { this.setState({ showMenu: !showMenu }) }} />
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
                onClick={this.handleClick}
                mode={menuMode}
                theme={isMobile ? 'light' : 'dark'}
                style={{ lineHeight: '64px' }}
                defaultSelectedKeys={[this.state.current]}
                selectedKeys={[this.state.current]}
            >
                {profile && profile.position === 'admin' &&
                    <Menu.Item key='dashboard'><Link href='/dashboard/booking'><a>Admin</a></Link></Menu.Item>}
                <Menu.Item key='booking'><Link href='/booking'><a>Booking</a></Link></Menu.Item>
                {this.renderAccountMenu()}
            </Menu>
        )
    }

    renderAccountMenu = () => {
        const { showMenu } = this.state;
        const { isMobile } = this.props.Screen;
        const { profile } = this.props.Auth;

        if (!profile)
            return (
                <Menu.Item key='login'>
                    <Link href='/signin'><a>Login</a></Link>
                </Menu.Item>
            );
        else if (isMobile)
            return this.renderAccountMenuItems();
        else
            return (
                <Menu.Item key='user'>
                    <Popover
                        visible={showMenu}
                        content={
                            <Menu
                                key={1}
                                style={{ lineHeight: '64px' }}
                                selectedKeys={[this.state.current]}
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
            <Menu.Item key='booking_history'><Link href='/booking_history'><a>Booking History</a></Link></Menu.Item>,
            // <Menu.Item key={5}><Link href='/account'><a>Account</a></Link></Menu.Item>,
            <Menu.Item key={6}><a onClick={this.handleLogout}>Logout</a></Menu.Item>,
        ]
    }

    handleClick = (e) => {
        if (e.key !== 'user')
            this.setState({current: e.key})
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
)(withRouter(LayoutNav));