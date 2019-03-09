import React from 'react';
import StyledWrapper from './style';
import FormSignUp from '../../../components/forms/formSignup';
import Link from 'next/link';
import { connect } from 'react-redux';
import AuthAction from '../../../redux/auth/actions';

class SignUp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            dob: '',
            gender: '',
            email: '',
            username: '',
            password: '',
            confirm: '',
            idNumber: '',
        }
    }

    render() {
        return (
            <StyledWrapper>
                <div className='container'>
                    <h1 className='header'>
                        Register
                    </h1>
                    <FormSignUp onInput={this.handleInput} onSubmit={this.handleSubmit} />
                    <div className='links'>
                        <Link href='/'><a className='link'>To home page</a></Link>
                        <Link href='/signin'><a className='link'>Login</a></Link>
                    </div>
                </div>
            </StyledWrapper>
        )
    }

    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async () => {
        const userInfo = {
            fname: this.state.fname,
            lname: this.state.lname,
            idNumber: this.state.idNumber,
            dob: new Date(this.state.dob).toISOString(),
            gender: this.state.gender,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirm: this.state.confirm,
            timezoneOffset: new Date().getTimezoneOffset(),
            language: navigator.language || navigator.userLanguage,
        }

        this.props.register(userInfo);

    }
}

export default connect(
    state => state,
    AuthAction
)(SignUp)