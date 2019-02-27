import React from 'react';
import FormSignUp from '../present-layer/components/form_signup';
import Link from 'next/link';
import authService from '../core-layer/service/auth-service';

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
            confirm: ''
        }
    }

    render() {
        return (
            <div className='root'>
                <div className='container'>
                    <h1 className='header'>
                        Register
                    </h1>
                    <FormSignUp onInput={this.handleInput} onSubmit={this.handleSubmit}/>
                    <div className='links'>
                        <Link href='/'><a className='link'>To home page</a></Link>
                        <Link href='/signin'><a className='link'>Login</a></Link>
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
                        font-size: 24px;
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
        }, () => { console.log(this.state) });
    }

    handleSubmit = async () => {
        const user = {
            fname: this.state.fname,
            lname: this.state.lname,
            dob: new Date(this.state.dob).toISOString(),
            gender: this.state.gender,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirm: this.state.confirm,
            timezoneOffset: new Date().getTimezoneOffset(),
            language: navigator.language || navigator.userLanguage,
        }

        try {
            await authService.signup(user);
            alert('Success registration');
        } catch(e) {
            console.log(e.message)
            alert('User is alredy exist');
        }

    }
}

export default SignUp;