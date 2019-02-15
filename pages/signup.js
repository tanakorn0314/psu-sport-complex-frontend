import React from 'react';
import Router from 'next/router';
import Head from '../present-layer/components/head';
import FormSignUp from '../present-layer/components/form_signup';
import { connect } from 'react-redux';
import userService from '../core-layer/service/user-service';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            confirmPassword: '',
            firstname: '',
            lastname: ''
        }
    }

    render() {
        return (
            <div className='container'>
                <Head />
                <FormSignUp onInput={this.handleInput} onSubmit={this.handleSubmit}/>
                <style jsx>{`
                    .container {
                        display: flex;
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
        const user = {
            firstName: this.state.firstname,
            lastName: this.state.lastname,
            username: this.state.username,
            password: this.state.password
        }

        console.log(user);

        const response = await userService.createUser(user);
        console.log(response);
    }
}

export default SignUp;