import React from 'react';
import { Card, notification } from 'antd';
import { connect } from 'react-redux';
import AdminAction from '../../redux/admin/actions';
import StadiumAction from '../../redux/stadium/actions';
import { H2 } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import _ from 'lodash';
import Button from '../../components/button';
import EditStadiumForm from '../editStadiumForm';

class CreateStadium extends React.Component {

    state = {
        name: '',
        numCourt: 1,
        openAfter: '00:00',
        closeBefore: '00:00',
        costPublic: 50,
        costMember: 30,
        costStaff: 20,
        costStudent: 10,
        canBook: false
    }

    render() {
        const { t } = this.props;

        return (
            <Card style={this.props.style}>
                <H2 msg='createStadium' />
                <EditStadiumForm {...this.state} onChange={this.handleChange} responsive/>
                <Button type='primary' onClick={this.handleSubmit}>{t('add')}</Button>
            </Card>
        )
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value });
    }

    handleSubmit = async () => {
        const { t } = this.props;
        const dto = this.state;
        const result = await this.props.createStadium(dto);

        if (result.error) {
            notification['success']({
                message: t('error'),
                description: t(result.error),
                duration: 2
            })
        } else {
            notification['success']({
                message: t('success'),
                description: t('createStadiumSuccess'),
                duration: 2
            })
        }
    }

}

export default connect(
    state => state,
    StadiumAction
)(withNamespaces('common')(CreateStadium))