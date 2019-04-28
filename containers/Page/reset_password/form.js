import React from 'react';
import {
    Form,
} from 'antd';
import StyledForm from './form.style.js';
import Button from '../../../components/uielements/button'
import Input from '../../../components/uielements/input';
import Link from 'next/link';

class FormSignIn extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <StyledForm onSubmit={this.handleSubmit}>
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
                                    validator: this.compareToFirstPassword
                                }
                            ]
                        })(
                            <Input placeholder='Confirm Password' type='password' />
                        )
                    }
                </Form.Item>
                <div className='input-left-right'>
                    <Link href='/signin'>
                        <a>Go to login page</a>
                    </Link>
                    <Button type='primary' htmlType='submit'>Reset</Button>
                </div>
            </StyledForm >
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

const WrapperLoginForm = Form.create({ name: 'signin' })(FormSignIn);
export default WrapperLoginForm;