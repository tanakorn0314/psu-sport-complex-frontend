import React from 'react';
import Head from '../present-layer/components/head';
import FormSignIn from '../present-layer/components/form_signin';
import authService from '../core-layer/service/auth-service';
import { storeToken } from '../action/auth-action';
import { connect } from 'react-redux';
import Router from 'next/router';

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
            <div className='container'>
                <Head />
                <FormSignIn onInput={this.handleInput} onSubmit={this.handleSubmit} />
                <style jsx>{`
                    .container {
                        display: flex;
                        flex-direction: row;
                        flex: 1;
                        height: 100vh;
                        justify-content: center;
                        align-items: center;
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
        const { data, status, statusText } = await authService.signIn(this.state.username, this.state.password);
        if (data.accessToken) {
            this.props.saveToken(data.accessToken);
        }
        Router.push('/');
    }
}

const mapDispatchToProps = dispatch => {
    return {
        saveToken: (token) => {
            dispatch(storeToken(token));
        }
    }
}

export default connect(()=>({}), mapDispatchToProps)(SignIn);