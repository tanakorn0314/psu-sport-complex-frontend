import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import Input from '../../components/uielements/input';
import Checkbox from '../../components/uielements/checkbox';
import Button from '../../components/uielements/button';
// import authAction from '../../redux/auth/actions';
// import Auth0 from '../../helpers/auth0/index';
// import Firebase from '../../helpers/firebase';
// import FirebaseLogin from '../../components/firebase';
// import IntlMessages from '../../components/utility/intlMessages';
import SignUpStyleWrapper from './signup.style';
import withTheme from '../../hocs/withTheme';

// const { login } = authAction;

class SignUp extends React.Component {
    state = {
        redirectToReferrer: false
    };
    componentWillReceiveProps(nextProps) {
        // if (this.props.isLoggedIn !== nextProps.isLoggedIn && nextProps.isLoggedIn === true) {
        // 	this.setState({ redirectToReferrer: true });
        // }
    }
    handleLogin = () => {
        // const { login, history } = this.props;
        // login(history);
    };
    render() {
        return (
            <SignUpStyleWrapper className='isoSignUpPage'>
                <div className='isoSignUpContentWrapper'>
                    <div className='isoSignUpContent'>
                        <div className='isoLogoWrapper'>
                            <Link href='/dashboard'>
                                <a>
                                    PSU Sport Complex
                                </a>
                            </Link>
                        </div>

                        <div className='isoSignUpForm'>
                            <div className='isoInputWrapper isoLeftRightComponent'>
                                <Input size='large' placeholder='First name' />
                                <Input size='large' placeholder='Last name' />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input size='large' placeholder='Username' />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input size='large' placeholder='Email' />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input size='large' type='password' placeholder='Password' />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input
                                    size='large'
                                    type='password'
                                    placeholder='Confirm Password'
                                />
                            </div>

                            <div className='isoInputWrapper' style={{ marginBottom: '50px' }}>
                                <Checkbox>
                                    I agree with terms and condtions
                                </Checkbox>
                            </div>

                            <div className='isoInputWrapper'>
                                <Button type='primary' onClick={this.handleLogin}>
                                    Sign Up
                                </Button>
                            </div>

                            <div className='isoInputWrapper isoCenterComponent isoHelperWrapper'>
                                <Link href='/signin'>
                                    <a>
                                        Already have an account? Sign in.
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SignUpStyleWrapper>
        );
    }
}

// export default connect(
//     state => ({
//         isLoggedIn: state.Auth.idToken !== null ? true : false
//     }),
//     { login }
// )(SignUp);

export default withTheme(SignUp);
