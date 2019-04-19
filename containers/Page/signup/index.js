import React from 'react';
import Link from 'next/link';
import Router from 'next/router';
import { connect } from 'react-redux';
import AuthAction from '../../../redux/auth/actions';
import SignUpStyleWrapper from './signup.style';
import { Typography, notification } from 'antd';
import SignUpForm from './form';

const { Text } = Typography;

class SignUp extends React.Component {

    render() {
        return (
            <SignUpStyleWrapper className='isoSignUpPage'>
                <div className='isoSignUpContentWrapper'>
                    <div className='isoSignUpContent'>
                        <div className='isoLogoWrapper'>
                            <Link href='/'>
                                <a>
                                    PSU Sport Complex
                                </a>
                            </Link>
                        </div>
                        <SignUpForm onSubmit={this.handleSubmit} />
                        <div className='isoInputWrapper isoCenterComponent isoHelperWrapper'>
                            <Link href='/signin'>
                                <a>
                                    Already have an account? Sign in.
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </SignUpStyleWrapper>
        )
    }

    handleSubmit = async value => {
        const userInfo = {
            ...value,
            dob: value.dob.format(),
            timezoneOffset: new Date().getTimezoneOffset(),
            language: navigator.language || navigator.userLanguage,
        }
        const result = await this.props.register(userInfo);
        if (result.error) {
            notification['error']({
                duration: 3,
                message: 'Error',
                description: result.error
            })
        } else {
            notification['success']({
                duration: 2,
                message: 'Registration success',
                description: 'Your registration is successful'
            })
            setTimeout(() => {
                Router.replace('/signin');
            }, 2000);
        }
    }

}

export default connect(
    state => state,
    AuthAction
)(SignUp)