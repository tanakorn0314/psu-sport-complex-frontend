import React from 'react';
import StyleLayout from './layout.style';
import Link from 'next/link';
import Router from 'next/router';
import enquire from 'enquire-js';
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
        menuMode: 'horizontal',
        showMenu: false,
        isLoading: true
    }

    componentDidMount() {
        enquire.register('screen and (max-width:425px)', {
            match: () => {
                this.setState({ menuMode: 'inline' });
            },
            unmatch: () => {
                this.setState({ menuMode: 'horizontal' });
            }
        })

        this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        enquire.unregister('screen and (max-width:425px)');
    }

    render() {
        const { menuMode, showMenu, isLoading } = this.state;
        const { idToken } = this.props;
        const menu = [
            <Menu
                key={1}
                mode={menuMode}
                style={{ lineHeight: '64px' }}
            >
                <Menu.Item key={0}><Link href='/dashboard/booking'><a>Admin</a></Link></Menu.Item>
                <Menu.Item key={1}><Link href='/booking'><a>Booking</a></Link></Menu.Item>
                <Menu.Item key={2}>
                    {
                        !idToken ?
                            <Link href='/signin'><a>Login</a></Link> :
                            <a onClick={this.handleLogout}>Logout</a>
                    }
                </Menu.Item>
            </Menu>
        ]
        return (
            <StyleLayout>
                <Header className='header'>
                    <Row type='flex' justify='space-between'>
                        <Col xxl={4} xl={6} l={8} md={12} s={12} xs={20} key={1}>
                            <Link href='/'><a>PSU Sport Complex</a></Link>
                        </Col>
                        <Col>
                            {
                                !isLoading && (menuMode === 'horizontal' ? menu :
                                    <Popover
                                        visible={showMenu}
                                        content={menu}
                                        placement='bottomRight'
                                        arrowPointAtCenter
                                    >
                                        <Icon type='menu' onClick={() => { this.setState({ showMenu: !showMenu }) }} />
                                    </Popover>)
                            }
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

    handleLogout = async () => {
        await this.props.logout();
        setTimeout(() => {
            Router.replace('/signin');
        }, 500)
    }
}

export default connect(
    state => state.Auth,
    AuthAction,
)(LayoutNav);