import React from 'react';
import FormWrapper from './formSignin.style';
import Button from '../uielements/button'
import Input from '../uielements/input'

class FormSignIn extends React.Component {
    render() {
        return (
            <FormWrapper>
                <Input className='input' type='text' name='username' placeholder='Username or email' onChange={this.props.onInput} />
                <Input className='input' type='password' name='password' placeholder='Password' onChange={this.props.onInput} />
                <Button onClick={this.props.onSubmit}>Login</Button>
            </FormWrapper>
        );
    }
}

export default FormSignIn;