import React from 'react';
import {
    Form,
    Checkbox,
    Input
} from 'antd';
import StyledForm from './style';
import Button from '../button';
import text from '../../common/text';
import { Label } from '../typo';

class FormSignIn extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <StyledForm onSubmit={this.handleSubmit}>
                <Form.Item
                    label={text['phoneNumberOrPSUPassport']}
                    className='form-item'
                >
                    {
                        getFieldDecorator('signInfo')(<Input placeholder={text['phoneNumberOrPSUPassport']} />)
                    }
                </Form.Item>
                <Form.Item
                    label={text['password']}
                    className='form-item'
                >
                    {
                        getFieldDecorator('password')(<Input type='password' placeholder={text['password']} />)
                    }
                </Form.Item>
                <div className='input-left-right'>
                    <Checkbox>
                        <Label msg='rememberMe'/>
                    </Checkbox>
                    <Button type='primary' htmlType='submit' onClick={this.handleSubmit} msg='login' loading/>
                </div>
            </StyledForm >
        )
    }

    handleSubmit = async e => {
        e.preventDefault();
        const { form } = this.props;
        if (form && this.props.onSubmit) {
            await this.props.onSubmit({
                signInfo: form.getFieldValue('signInfo'),
                password: form.getFieldValue('password')
            })
        }

    }
}

const WrapperLoginForm = Form.create({ name: 'signin' })(FormSignIn);
export default WrapperLoginForm;