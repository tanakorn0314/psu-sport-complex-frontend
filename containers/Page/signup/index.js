import React from 'react';
import Link from 'next/link';
import { connect } from 'react-redux';
import AuthAction from '../../../redux/auth/actions';
import SignUpStyleWrapper from './signup.style';
import Input from '../../../components/uielements/input';
import Button from '../../../components/uielements/button';
import DatePicker from '../../../components/uielements/datePicker';
import RadioBox, { RadioGroup } from '../../../components/uielements/radio';
import { Typography } from 'antd';

const { Text } = Typography;

class SignUp extends React.Component {

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
        }
    }

    render() {
        return (
            <SignUpStyleWrapper className='isoSignUpPage'>
                <div className='isoSignUpContentWrapper'>
                    <div className='isoSignUpContent'>
                        <div className='isoLogoWrapper'>
                            <Link href='/'>
                                <a>
                                    PSU Sport Complex
                                </a>
                            </Link>
                        </div>

                        <div className='isoSignUpForm'>
                            <div className='isoInputWrapper isoLeftRightComponent'>
                                <Input placeholder='First name' name='fname' onChange={this.handleChange} />
                                <Input placeholder='Last name' name='lname' onChange={this.handleChange} />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input placeholder='Identification number' name='idNumber' onChange={this.handleChange} />
                            </div>

                            <div className='isoInputWrapper'>
                                <DatePicker placeholder='Date of birth' name='dob' onChange={this.handleDateChange} />
                            </div>

                            <div className='isoInputWrapper'>
                                <Text>Gender</Text><br />
                                <RadioGroup placeholder='Gender' name='gender' value={this.state.gender} onChange={this.handleChange}>
                                    <RadioBox value='M'>Male</RadioBox>
                                    <RadioBox value='F'>Female</RadioBox>
                                </RadioGroup>
                            </div>

                            <div className='isoInputWrapper'>
                                <Input placeholder='Username' name='username' onChange={this.handleChange} />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input placeholder='Email' name='email' onChange={this.handleChange} />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input type='password' placeholder='Password' name='password' onChange={this.handleChange} />
                            </div>

                            <div className='isoInputWrapper'>
                                <Input
                                    type='password'
                                    placeholder='Confirm Password'
                                    name='confirm'
                                    onChange={this.handleChange}
                                />
                            </div>

                            {/* <div className='isoInputWrapper' style={{ marginBottom: '50px' }}>
                            <Checkbox>
                                I agree with terms and condtions
                            </Checkbox>
                        </div> */}

                            <div className='isoInputWrapper'>
                                <Button type='primary' onClick={this.handleSignup}>
                                    Sign Up
                                </Button>
                            </div>

                            <div className='isoInputWrapper isoCenterComponent isoHelperWrapper'>
                                <Link href='/signin'>
                                    <a>
                                        Already have an account? Sign in.
                                    </a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </SignUpStyleWrapper>
        )
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleDateChange = (value) => {
        this.setState({
            dob: value.format()
        });
    }

    handleSignup = async () => {
        const userInfo = {
            fname: this.state.fname,
            lname: this.state.lname,
            idNumber: this.state.idNumber,
            dob: this.state.dob,
            gender: this.state.gender,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            confirm: this.state.confirm,
            timezoneOffset: new Date().getTimezoneOffset(),
            language: navigator.language || navigator.userLanguage,
        }

        const result = await this.props.register(userInfo);
        console.log(result);
    }
}

export default connect(
    state => state,
    AuthAction
)(SignUp)