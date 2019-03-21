import React from 'react';
import StyleLayout from './layout.style';
import Link from 'next/link';
import { enquireScreen } from 'enquire-js';
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

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

class LayoutNav extends React.Component {

    state = {
        menuMode: 'horizontal',
        showMenu: false,
        isLoading: true
    }

    componentDidMount() {
        enquireScreen((b) => {
            this.setState({menuMode: !b ? 'horizontal' : 'inline'});
        })

        this.setState({isLoading: false});
    }

    render() {
        const { menuMode, showMenu, isLoading } = this.state;
        const { idToken } = this.props;
        const menu = [
            <Menu
                mode={menuMode}
                style={{lineHeight: '64px'}}
            >
                <Menu.Item key={1}><Link href='/booking'><a>Booking</a></Link></Menu.Item>
                <Menu.Item key={2}><Link><a>Booking List</a></Link></Menu.Item>
                <Menu.Item key={3}>
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
                        <Col xxl={4} xl={6} l={8} md={12} s={12} xs={20}>
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
                                    <Icon type='menu' onClick={()=>{this.setState({showMenu: !showMenu})}}/>
                                </Popover>)
                            }
                        </Col>
                    </Row>
                </Header>
                <Content>
                    {this.props.children}
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <Text type='secondary'>TK Design 2019</Text>
                </Footer>
            </StyleLayout>
        )
    }

    handleLogout = async () => {
        this.props.logout();
    }
}

export default connect(
    state => state.Auth,
    AuthAction,
)(LayoutNav);