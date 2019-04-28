import React from 'react';
import {
    Form,
} from 'antd';
import StyledForm from './form.style.js';
import Button from '../../../components/uielements/button'
import Checkbox from '../../../components/uielements/checkbox';
import Input from '../../../components/uielements/input';

class FormSignIn extends React.Component {

    state = {
        isLoading: false
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <StyledForm onSubmit={this.handleSubmit}>
                <Form.Item
                    label='Phone number or PSU Passport'
                    className='form-item'
                >
                    {
                        getFieldDecorator('signInfo')(<Input placeholder='Phone number or PSU Passport' />)
                    }
                </Form.Item>
                <Form.Item
                    label='Password'
                    className='form-item'
                >
                    {
                        getFieldDecorator('password')(<Input type='password' placeholder='Password' />)
                    }
                </Form.Item>
                <div className='input-left-right'>
                    <Checkbox>
                        Remember me
                    </Checkbox>
                    <Button type='primary' htmlType='submit' loading={this.props.loading} >Sign In</Button>
                </div>
            </StyledForm >
        )
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;
        if (form && this.props.onSubmit) {
            this.props.onSubmit({
                signInfo: form.getFieldValue('signInfo'),
                password: form.getFieldValue('password')
            })
        }
    }
}

const WrapperLoginForm = Form.create({ name: 'signin' })(FormSignIn);
export default WrapperLoginForm;