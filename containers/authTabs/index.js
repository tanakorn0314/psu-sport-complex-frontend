import React from 'react';
import { Tabs, notification } from 'antd';
import FormSignin from '../../components/formSignin';
import FormSignup from '../../components/formSignup';
import { connect } from 'react-redux';
import AuthAction from '../../redux/auth/actions';
import text, { errors } from '../../common/text';
import { Label } from '../../components/typo';
import PubSub from 'pubsub-js';

const { TabPane } = Tabs;

class AuthTabs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 'Login'
        }
    }

    render() {
        return (
            <Tabs defaultActiveKey='Login' activeKey={this.state.current} onChange={this.handleChange}>
                <TabPane tab={<Label msg='login'/>} key='Login'>
                    <FormSignin onSubmit={this.handleLogin}/>
                </TabPane>
                <TabPane tab={<Label msg='register'/>} key='Register'>
                    <FormSignup onSubmit={this.handleRegister}/>
                </TabPane>
            </Tabs>
        )
    }

    handleChange = (current) => {
        this.setState({current});
    }

    handleLogin = async (value) => {
        const userInfo = {
            signInfo: value.signInfo,
            password: value.password
        }

        const result = await this.props.login(userInfo);

        if (result.error) {
            notification['error']({
                duration: 2,
                message: text['error'],
                description: errors(result.error)
            })
        } else {
            PubSub.publish('hideModal');
        }
    }

    handleRegister = async value => {
        const userInfo = {
            ...value,
            dob: value.dob.format(),
        }
        const result = await this.props.register(userInfo);
        if (result.error) {
            notification['error']({
                duration: 3,
                message: text['error'],
                description: errors(result.error)
            })
        } else {
            notification['success']({
                duration: 2,
                message: text['success'],
                description: text['registerSuccess']
            })
            this.setState({current: 'Login'})
        }
    }
}

export default connect(
    state => state.Auth,
    AuthAction
)(AuthTabs);