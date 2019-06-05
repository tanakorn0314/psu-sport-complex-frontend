import React from 'react';
import {
    Input,
    DatePicker,
    Radio
 } from 'antd';
import Button from '../button';
import { Typography, Form } from 'antd';
import InputDate from '../inputDate';
import StyledForm from './style';
import { Label } from '../typo';

import text from '../../common/text';

const RadioBox = Radio;
const RadioGroup = Radio.Group;

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
                        label={<Label msg='firstname'/>}
                        className='form-item'
                        name='fname'
                        required
                        message={<Label>{text['pleaseInputYour']}{text['firstname']}</Label>}
                        getFieldDecorator={getFieldDecorator}
                        component={<Input placeholder={text['firstname']} />}
                    />
                    <FormItem
                        label={<Label msg='lastname'/>}
                        className='form-item'
                        name='lname'
                        required
                        message={<Label>{text['pleaseInputYour']}{text['lastname']}</Label>}
                        getFieldDecorator={getFieldDecorator}
                        component={<Input placeholder={text['lastname']} />}
                    />
                </div>
                <Form.Item
                    label={<Label msg='gender'/>}
                    className='form-item form-radio'
                >
                    {
                        getFieldDecorator('gender', {
                            initialValue: 'M'
                        })(
                            <RadioGroup placeholder={text['gender']} name='gender'>
                                <RadioBox value='M'>{text['male']}</RadioBox>
                                <RadioBox value='F'>{text['female']}</RadioBox>
                            </RadioGroup>
                        )
                    }
                </Form.Item>
                <FormItem
                    label={<Label msg='dateOfBirth'/>}
                    className='form-item'
                    name='dob'
                    required
                    message={<Label>{text['pleaseInputYour']} {text['dateOfBirth']}</Label>}
                    getFieldDecorator={getFieldDecorator}
                    component={<InputDate />}
                />
                <Form.Item
                    label={<Label msg='email'/>}
                    className='form-item'
                >
                    {
                        getFieldDecorator('email', {
                            rules: [
                                {
                                    required: true,
                                    message: <Label>{text['pleaseInputYour']}{text['email']}</Label>
                                }
                            ]
                        })(
                            <Input placeholder={text['email']} type='email' />
                        )
                    }
                </Form.Item>
                <Form.Item
                    label={<Label msg='phoneNumber'/>}
                    className='form-item'
                >
                    {
                        getFieldDecorator('phoneNumber', {
                            rules: [
                                {
                                    len: 10,
                                    message: <Label msg='tenCharactersPhoneNumber'/>
                                },
                                {
                                    required: true,
                                    message: <Label>{text['pleaseInputYour']}{text['phoneNumber']}</Label>
                                }
                            ]
                        })(
                            <Input placeholder={text['phoneNumber']} type='text' />
                        )
                    }
                </Form.Item>
                <Form.Item
                    label={<Label msg='password'/>}
                    className='form-item'
                >
                    {
                        getFieldDecorator('password', {
                            rules: [
                                {
                                    min: 6,
                                    message: <Label msg='atLeastSixCharacters'/>
                                },
                                {
                                    required: true,
                                    message: <Label>{text['pleaseInput']}{text['password']}</Label>
                                }
                            ]
                        })(
                            <Input placeholder={text['password']} type='password' />
                        )
                    }
                </Form.Item>
                <Form.Item
                    label={<Label msg='confirmPassword'/>}
                    className='form-item'
                >
                    {
                        getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: <Label>{text['pleaseInput']}{text['confirmPassword']}</Label>
                                },
                                {
                                    validator: this.compareToFirstPassword
                                }
                            ]
                        })(
                            <Input placeholder={text['confirmPassword']} type='password' />
                        )
                    }
                </Form.Item>
                <FormItem
                    className='form-item'
                    component={<Button type='primary' htmlType='submit' onClick={this.handleSubmit}>{text['register']}</Button>}
                />
            </StyledForm>
        )
    }

    handleSubmit = async e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async (err, value) => {
            if (!err && this.props.onSubmit) {
                await this.props.onSubmit(value);
            }
        })
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback(text['incorrectConfirmPassword'])
        } else {
            callback();
        }
    }
}

const WrapperRegistrationForm = Form.create({ name: 'signup' })(SignUpForm);
export default WrapperRegistrationForm;