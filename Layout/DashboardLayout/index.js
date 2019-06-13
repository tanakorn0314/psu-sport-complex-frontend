import React from 'react';
import { connect } from 'react-redux';
import ScreenAction from '../../redux/screen/actions';
import NavLayout from '../NavLayout';
import StyledLayout from './style';
import {
    Layout,
    Menu,
    Icon
} from 'antd';
import { withRouter } from 'next/router';
import { Router } from '../../i18n';
import { TextMenuItem } from '../../components/typo';

const { Sider, Content } = Layout;

class DashboardLayout extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            collapsed: false,
            current: props.router.pathname.split('/')[2]
        }

        this.props.startLoad();
    }

    componentDidMount() {
        this.setState({ isLoading: false })
    }

    render() {
        const { isLoading } = this.state;
        return (
            <NavLayout noFooter>
                {
                    !isLoading && (
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
                                    style={{ height: '100%' }}
                                >
                                    <Menu.Item key="booking" onClick={this.navigate}>
                                        <Icon type='read' />
                                        <TextMenuItem msg='bookingSummary' />
                                    </Menu.Item>
                                    <Menu.Item key="user" onClick={this.navigate}>
                                        <Icon type='user' />
                                        <TextMenuItem msg='user' />
                                    </Menu.Item>
                                    <Menu.Item key="operationTime" onClick={this.navigate}>
                                        <Icon type='calendar' />
                                        <TextMenuItem msg='operationTime' />
                                    </Menu.Item>
                                    <Menu.Item key="stadium" onClick={this.navigate}>
                                        <Icon type='border' />
                                        <TextMenuItem msg='stadium' />
                                    </Menu.Item>
                                </Menu>
                            </Sider>
                            <Content>
                                {this.props.children}
                            </Content>
                        </StyledLayout>
                    )
                }
            </NavLayout>
        );
    }

    onCollapse = collapsed => {
        this.setState({ collapsed })
    }

    navigate = ({ key }) => {
        this.props.startLoad();
        Router.push(`/dashboard/${key}`);
    }
}

export default connect(state => state, ScreenAction)(withRouter(DashboardLayout));