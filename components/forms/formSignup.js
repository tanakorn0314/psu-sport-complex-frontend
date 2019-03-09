import React from 'react';
import ButtonPrimary from '../buttons/buttonPrimary';
import FormWrapper from './formSignup.style';
import { RadioButton, RadioGroup } from '../uielements/radio';

class FormSignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname: '',
            lname: '',
            dob: '',
            gender: 'M',
            email: '',
            username: '',
            password: '',
            confirm: '',
            idNumber: '',
            neverInputPassword: true,
            neverConfirm: true,
        }
    }
    render() {
        return (
            <FormWrapper>
                <div className='input-container'>
                    <label htmlFor='username'>Username</label>
                    <input id='username' className='input' type='text' name='username' placeholder='Username' onChange={this.handleChange} />
                </div>
                <div className='input-container'>
                    <label htmlFor='password'>Password</label>
                    <input id='password' className='input' type='password' name='password' placeholder='Password' onBlur={this.handleChange} />
                    {!this.state.neverInputPassword && this.state.password.length < 6 && <div className='alert'>At least 6 characters password</div>}
                </div>
                <div className='input-container'>
                    <label htmlFor='confirm'>Confirm Password</label>
                    <input id='confirm' className='input' type='password' name='confirm' placeholder='Confirm password' onBlur={this.handleChange} />
                    {!this.state.neverConfirm && this.state.password !== this.state.confirm && <div className='alert'>incorrect confirm password</div>}
                </div>
                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input id='email' className='input' type='email' name='email' placeholder='Email' onChange={this.handleChange} />
                </div>
                <input className='input' type='text' name='fname' placeholder='Firstname' onChange={this.handleChange} />
                <input className='input' type='text' name='lname' placeholder='Lastname' onChange={this.handleChange} />
                <input className='input' type='date' name='dob' placeholder='Date of birth' onChange={this.handleChange} />
                <input className='input' type='text' name='idNumber' placeholder='identification number or passport id' onChange={this.handleChange} />
                <div className='radio-container'>
                    <RadioGroup className='radio-group' onChange={this.handleChange} value={this.state.gender}>
                        <RadioButton value='M' >Male</RadioButton>
                        <RadioButton value='F' >Female</RadioButton>
                    </RadioGroup>
                </div>
                <ButtonPrimary className='btn' onClick={this.handleSubmit}>Signup</ButtonPrimary>
            </FormWrapper>
        );
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (name === 'password')
            this.setState({ neverInputPassword: false })
        if (name === 'confirm')
            this.setState({ neverConfirm: false })
        if (this.props.onInput)
            this.props.onInput(e);
    }

    handleSubmit = (e) => {
        if (this.checkValid() && this.props.onSubmit) {
            this.props.onSubmit(e);
        }
    }

    checkValid = () => {
        const {
            fname,
            lname,
            dob,
            gender,
            email,
            username,
            password,
            confirm
        } = this.state;
        return fname.length > 0 && lname.length > 0 && dob.length > 0 && gender.length > 0 &&
            email.length > 0 && username.length > 0 && password.length >= 6 && password === confirm;
    }
}

export default FormSignUp;