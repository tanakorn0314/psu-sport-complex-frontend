import React from 'react';
import FormSignIn from '../present-layer/components/form_signin';
import authService from '../core-layer/service/auth-service';
import { storeUser } from '../action/auth-action';
import { connect } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';
import { STORAGE } from '../core-layer/storage/local-storage';

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
            <div className='root'>
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
                <style jsx global>{`
                    * {
                        font-family: 'Roboto', sans-serif;
                    }
                    .root {
                        display: flex;
                        flex: 1;
                        height: 100vh;
                        justify-content: center;
                        align-items: center;
                    }
                    .header {
                        font-size: 48px;
                        font-weight: 400;
                    }
                    .container {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        max-width: 800px;
                        min-width: 300px;
                    }
                    .links {
                        display: flex;
                        width: 100%;
                        justify-content: space-between;
                        margin-top: 20px;
                    }
                    .link {
                        text-decoration: none;
                    }
                `}</style>
            </div>
        )
    }

    handleInput = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleSubmit = async () => {
        try {
            const { data } = await authService.signIn(this.state.username, this.state.password);
            if (data.token.accessToken) {
                const { accessToken } = data.token;
                STORAGE.storeAccessToken(accessToken);
                this.props.saveUser(accessToken);
                Router.push('/');
            }
        } catch (e) {
            console.log(e.message);
            alert('Username or password incorrect');
        }
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveUser: (token) => {
            dispatch(storeUser(token));
        }
    }
}

export default connect(() => ({}), mapDispatchToProps)(SignIn);