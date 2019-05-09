import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import AuthAction from '../../../redux/auth/actions';
import SignInStyleWrapper, { ModalBody } from './signin.style';
import FormSignIn from './form';
import {
    notification,
    Modal
} from 'antd';
import ForgetPassword from './forgetPassword';
import Button from '../../../components/uielements/button';
import Input from '../../../components/uielements/input';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class SignIn extends React.Component {

    state = {
        modal: {
            visible: false,
            loading: false
        },
        loading: false
    }

    render() {
        const { modal } = this.state;
        return (
            <SignInStyleWrapper className="isoSignInPage">
                <div className="isoLoginContentWrapper">
                    <div className="isoLoginContent">
                        <div className="isoLogoWrapper">
                            <Link href="/">
                                <a>
                                    PSU Sport Complex
                                </a>
                            </Link>
                        </div>

                        <div className="isoSignInForm">

                            <FormSignIn onSubmit={this.handleLogin} loading={this.state.loading}/>

                            <div className="isoCenterComponent isoHelperWrapper">
                                <div className="isoForgotPass" onClick={this.showModal}>
                                    Forgot password
                                </div>
                                <Link href="/signup">
                                    <a>
                                        Create an account
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Modal
                    title='Reset password'
                    visible={modal.visible}
                    onCancel={this.hideModal}
                    centered
                    footer={null}
                >
                    <ForgetPassword onSubmit={this.sendResetRequest} loading={modal.loading}/>
                </Modal>
            </SignInStyleWrapper>
        )
    }

    sendResetRequest = async value => {
        const { modal } = this.state;
        const { phoneNumber } = value;
        modal.loading = true;
        this.setState({ modal })

        const result = await this.props.sendResetRequest(phoneNumber);
        if (result.error) {
            notification['error']({
                duration: 3,
                message: result.error,
                description: 'Please try again'
            })
        } else {
            notification['success']({
                duration: 3,
                message: result,
                description: 'Reset password sent'
            });
            this.hideModal();
        }

        modal.loading = true;
        this.setState({ modal })
    }

    toggle = () => {
        const { modal } = this.state;
        modal.visible = !modal.visible;
        this.setState({ modal })
    }

    showModal = () => {
        const { modal } = this.state;
        modal.visible = true;
        this.setState({ modal });
    }

    hideModal = () => {
        const { modal } = this.state;
        modal.visible = false;
        this.setState({ modal });
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleLogin = async value => {
        this.setState({loading: true});

        const userInfo = {
            signInfo: value.signInfo,
            password: value.password
        }
        const result = await this.props.login(userInfo);

        console.log(result);

        this.setState({loading: false});
        
        if (result.error) {
            notification['error']({
                duration: 3,
                message: result.error,
                description: 'Please try again'
            })
        } else {
            Router.replace('/');
        }
    }
}

export default connect(
    state => state,
    AuthAction
)(SignIn);