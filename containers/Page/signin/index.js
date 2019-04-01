import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import AuthAction from '../../../redux/auth/actions';
import SignInStyleWrapper from './signin.style';
import FormSignIn from './form';
import { notification } from 'antd';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
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

                            <FormSignIn onSubmit={this.handleSubmit}/>

                            <div className="isoCenterComponent isoHelperWrapper">
                                <Link>
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

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async value => {
        const userInfo = {
            username: value.username,
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