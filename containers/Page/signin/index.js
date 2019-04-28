import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import AuthAction from '../../../redux/auth/actions';
import SignInStyleWrapper from './signin.style';
import FormSignIn from './form';
import { notification } from 'antd';
import Button from '../../../components/uielements/button';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

class SignIn extends React.Component {

    render() {
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

                            <FormSignIn onSubmit={this.handleSubmit} />

                            <div className="isoCenterComponent isoHelperWrapper">
                                <Link href='#'>
                                    <div className="isoForgotPass">
                                        Forgot password
                                    </div>
                                </Link>
                                <Link href="/signup">
                                    <a>
                                        Create an account
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SignInStyleWrapper>
        )
    }

    handleLoginFacebook = response => {
        if(response.accessToken) {
            // Router.push('/')
        }
    }

    handleLoginPSU = (e) => {

    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async value => {
        const userInfo = {
            signInfo: value.signInfo,
            password: value.password
        }
        const result = await this.props.login(userInfo);
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