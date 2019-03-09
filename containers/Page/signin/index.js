import React from 'react';
import FormSignIn from '../../../components/forms/formSignin'
import { connect } from 'react-redux';
import Link from 'next/link';
import AuthAction from '../../../redux/auth/actions';
import SignInWarpper from './style';

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
            <SignInWarpper>
                <div className='container'>
                    <h1 className='header'>
                        Login
                    </h1>
                    <FormSignIn onInput={this.handleInput} onSubmit={this.handleSubmit} />
                    <div className='links'>
                        <Link href='/'><a className='link'>To home page</a></Link>
                        <Link href='/signup'><a className='link'>Register</a></Link>
                    </div>
                </div>
            </SignInWarpper>
        )
    }

    handleInput = (e) => {
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