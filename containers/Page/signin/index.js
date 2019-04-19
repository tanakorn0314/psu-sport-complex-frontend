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

    constructor(props) {
        super(props);
        this.state = {
            phoneNumber: '',
            password: '',
        }
    }

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

                            <div className="isoInputWrapper isoOtherLogin">
                                <FacebookLogin
                                    appId="431603290925527"
                                    autoLoad
                                    callback={this.handleLoginFacebook}
                                    fields="name,email,picture,first_name,last_name,gender"
                                    scope="public_profile,user_friends,user_gender"
                                    render={renderProps => (
                                        <Button
                                            onClick={renderProps.onClick}
                                            type="primary"
                                            className="btnFacebook"
                                        >
                                            Facebook Login
                                        </Button>
                                    )}
                                />
                            </div>

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

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async value => {
        const userInfo = {
            phoneNumber: value.phoneNumber,
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