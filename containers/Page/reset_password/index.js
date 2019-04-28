import React from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import AuthAction from '../../../redux/auth/actions';
import FormResetPassword from './form';
import {
    notification,
    Modal
} from 'antd';
import StyledWrapper from './style';
import Button from '../../../components/uielements/button';
import Input from '../../../components/uielements/input';
import { withRouter } from 'next/router';

class ResetPassword extends React.Component {

    state = {
        modal: {
            visible: false
        },
        phoneNumber: '',
        loading: false
    }

    render() {
        const { modal } = this.state;
        return (
            <StyledWrapper className="isoSignInPage">
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
                            <FormResetPassword onSubmit={this.resetPassword} />
                        </div>
                    </div>
                </div>
            </StyledWrapper>
        )
    }

    inputPhoneNumber = (e) => {
        const { value } = e.target;
        this.setState({ phoneNumber: value })
    }

    resetPassword = async value => {
        this.setState({ loading: true });

        const { password } = value;
        const { token } = this.props.router.query;

        const result = await this.props.resetPassword(token, password);

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
                description: 'Reset password successful'
            });
            setTimeout(() => {
                Router.replace('/signin');
            }, 2000)
        }

        this.setState({ loading: false })
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
)(withRouter(ResetPassword));