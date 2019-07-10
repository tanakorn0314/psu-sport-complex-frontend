import React from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import moment from 'moment';
import { Row, Col, notification } from 'antd';

import { withNamespaces, i18n } from '../../i18n';
import UserAction from '../../redux/users/actions';
import DatePicker from '../../components/datePicker';
import Input from '../../components/input';
import { H4, H3, Text, Label } from '../../components/typo';
import Button from '../../components/button';
import colors from '../../styles/colors';

class ManageAdmin extends React.Component {

    state = {
        secret: ''
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ secret: '' })
    }

    render() {
        const locale = i18n.language || 'en';
        const { secret } = this.state;
        const { user, t } = this.props;

        const text = user.position !== 'admin' ? t('upgrade to admin') : t('cancel admin');

        return (
            <div>
                <Row gutter={12} style={{ marginBottom: 5 }}>
                    <Col span={12}>
                        <H3 style={{ marginBottom: 5 }}>{text} : </H3>
                        <form style={{ display: 'flex' }}>
                            <Input
                                style={{ minWidth: 300, marginRight: 5 }}
                                type='password'
                                name='secret'
                                value={secret}
                                defaultValue={secret}
                                placeholder={t('secret password')}
                                onChange={this.handleChange} />
                            <Button htmlType='submit' type='primary' msg='confirm' onClick={this.toggleAdmin} />
                        </form>
                    </Col>

                </Row>

            </div>
        )
    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value });
    }

    hideModal = () => {
        PubSub.publish('hideModal');
    }

    toggleAdmin = async () => {
        const { t, user } = this.props;

        const result = await this.props.toggleAdmin(user.userId, { secret: this.state.secret });

        if (result.error) {
            notification['error']({
                message: t('error'),
                description: t(result.error),
                duration: 3
            })
        } else {
            notification['success']({
                message: t('success'),
                description: t('updateUserSuccess'),
                duration: 3
            });
            this.hideModal();
        }
    }
}

export default connect(state => state, UserAction)(withNamespaces('common')(ManageAdmin));

