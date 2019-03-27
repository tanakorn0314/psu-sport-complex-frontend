import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import AuthAction from '../../../redux/auth/actions';
import SignInStyleWrapper from './signin.style';
import Checkbox from '../../../components/uielements/checkbox';
import Input from '../../../components/uielements/input';
import Button from '../../../components/uielements/button';
import Alert from '../../../components/feedback/alert'

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
                            <div className="isoInputWrapper">
                                <Input
                                    id="inputUserName"
                                    size="large"
                                    placeholder="Username"
                                    name='username'
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="isoInputWrapper">
                                <Input
                                    id="inpuPassword"
                                    size="large"
                                    type="password"
                                    placeholder="Password"
                                    name='password'
                                    onChange={this.handleChange}
                                />
                            </div>

                            <div className="isoInputWrapper isoLeftRightComponent">
                                <Checkbox>
                                    Remember me
                                </Checkbox>
                                <Button
                                    type="primary"
                                    onClick={this.handleSubmit}
                                >
                                    Sign In
                                </Button>
                            </div>

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

    handleSubmit = () => {
        const userInfo = {
            username: this.state.username,
            password: this.state.password
        }
        this.props.login(userInfo);
    }
}

export default connect(
    state => state,
    AuthAction
)(SignIn);