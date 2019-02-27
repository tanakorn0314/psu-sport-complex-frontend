import React from 'react';
import ButtonPrimary from './button_primary';
import { colors } from '../styles/constants/colors';

class FormSignIn extends React.Component {
    render() {
        return (
            <form className='form-container'>
                <input className='input' type='text' name='username' placeholder='Username or email' onChange={this.props.onInput} />
                <input className='input' type='password' name='password' placeholder='Password' onChange={this.props.onInput} />
                <ButtonPrimary className='btn' onClick={this.props.onSubmit}>Login</ButtonPrimary>
                <style jsx global>{`
                    * {
                        font-size: 16px;
                    }
                    .form-container {
                        display: flex;
                        flex-direction: column;
                        width: 100%;
                        max-width: 800px;
                        border: solid 1px ${colors.border};
                        border-radius: 30px;
                        padding: 20px 50px 20px 50px;
                        align-items: center;
                    }
                    .input {
                        width: 100%;
                        padding: 5px 8px 5px 8px;
                        border: solid 1px ${colors.lightBorder};
                        border-radius: 10px;
                        margin-bottom: 10px;
                        outline: none;
                    }
                    .input: focus {
                        box-shadow: 0 0 1px 1px ${colors.lightBlue};
                    }
                    .btn {
                        margin: 0 auto 0 auto;
                    }
                    .alert {
                        color: red;
                        width: 100%;
                        margin-bottom: 10px;
                    }
                `}</style>
            </form>
        );
    }
}

export default FormSignIn;