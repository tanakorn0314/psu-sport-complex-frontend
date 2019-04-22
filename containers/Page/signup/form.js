import React from 'react';
import Input from '../../../components/uielements/input';
import Button from '../../../components/uielements/button';
import DatePicker from '../../../components/uielements/datePicker';
import RadioBox, { RadioGroup } from '../../../components/uielements/radio';
import { Typography, Form } from 'antd';
import InputDate from '../../../components/inputDate';
import StyledForm from './form.style';

const { Text } = Typography;

const FormItem = props => (
    <Form.Item
        label={props.label || ''}
        className={props.className || ''}
    >
        {
            props.getFieldDecorator ? props.getFieldDecorator(props.name, {
                rules: [{
                    required: props.required,
                    message: props.message
                }]
            })(props.component) :
                props.component
        }
    </Form.Item>
)

class SignUpForm extends React.Component {

    state = {
        gender: 'M'
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <StyledForm onSubmit={this.handleSubmit}>
                <div className='input-left-right'>
                    <FormItem
                        label='Firstname'
                        className='form-item'
                        name='fname'
                        required
                        message='Please input your firstname'
                        getFieldDecorator={getFieldDecorator}
                        component={<Input placeholder='First Name' />}
                    />
                    <FormItem
                        label='Lastname'
                        className='form-item'
                        name='lname'
                        required
                        message='Please input your lastname'
                        getFieldDecorator={getFieldDecorator}
                        component={<Input placeholder='Last Name' />}
                    />
                </div>
                <Form.Item
                    label='Gender'
                    className='form-item form-radio'
                >
                    {
                        getFieldDecorator('gender', {
                            initialValue: 'M'
                        })(
                            <RadioGroup placeholder='Gender' name='gender'>
                                <RadioBox value='M'>Male</RadioBox>
                                <RadioBox value='F'>Female</RadioBox>
                            </RadioGroup>
                        )
                    }
                </Form.Item>
                <FormItem
                    label='Date of birth'
                    className='form-item'
                    name='dob'
                    required
                    message='Please input your birthday'
                    getFieldDecorator={getFieldDecorator}
                    component={<InputDate />}
                />
                <Form.Item
                    label='Phone Number'
                    className='form-item'
                >
                    {
                        getFieldDecorator('phoneNumber', {
                            rules: [
                                {
                                    len: 10,
                                    message: '10 characters phone number'
                                },
                                {
                                    required: true,
                                    message: 'Please input your phone number'
                                }
                            ]
                        })(
                            <Input placeholder='Phone Number' type='text' />
                        )
                    }
                </Form.Item>
                <Form.Item
                    label='Password'
                    className='form-item'
                >
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {
                                    min: 6,
                                    message: 'At least 6 characters'
                                },
                                {
                                    required: true,
                                    message: 'Please input password'
                                }
                            ]
                        })(
                            <Input placeholder='Password' type='password' />
                        )
                    }
                </Form.Item>
                <Form.Item
                    label='Confirm password'
                    className='form-item'
                >
                    {
                        getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: 'Please input confirm password'
                                },
                                {
                                    validator: this.compareToFirstPassword
                                }
                            ]
                        })(
                            <Input placeholder='Confirm Password' type='password' />
                        )
                    }
                </Form.Item>
                <FormItem
                    className='form-item'
                    component={<Button type='primary' htmlType='submit'>Submit</Button>}
                />
            </StyledForm>
        )
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err && this.props.onSubmit) {
                this.props.onSubmit(value);
            }
        })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Incorrect confirm password!')
        } else {
            callback();
        }
    }
}

const WrapperRegistrationForm = Form.create({ name: 'signup' })(SignUpForm);
export default WrapperRegistrationForm;