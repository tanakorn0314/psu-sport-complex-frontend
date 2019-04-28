import React from 'react';
import {
    Form
} from 'antd';
import Button from '../../../components/uielements/button';
import Input from '../../../components/uielements/input';
import StyledWrapper from './forgetPassword.style';

class ForgetPassword extends React.Component {

    state = {
        isLoading: false
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <StyledWrapper onSubmit={this.handleSubmit}>
                <Form.Item className='form-item'>
                    {
                        getFieldDecorator('phoneNumber')(<Input type='text' placeholder='Phone number'/>)
                    }
                </Form.Item>
                <Button 
                    className='btnSubmit' 
                    type='primary' 
                    htmlType='submit' 
                    loading={this.props.loading} 
                >
                    Send to email
                </Button>
            </StyledWrapper>
        )
    }

    handleSubmit = e => {
        e.preventDefault();
        const { form } = this.props;
        if (form && this.props.onSubmit) {
            this.props.onSubmit({
                phoneNumber: form.getFieldValue('phoneNumber')
            })
        }
    }
}

const WrapperLoginForm = Form.create({ name: 'forget_password' })(ForgetPassword);
export default WrapperLoginForm;