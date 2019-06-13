import React from 'react';
import { connect } from 'react-redux';
import AdminAction from '../../redux/admin/actions';
import StadiumAction from '../../redux/stadium/actions';
import EditStadiumForm from '../editStadiumForm';
import { H3 } from '../../components/typo';
import PubSub from 'pubsub-js';
import { notification } from 'antd';
import { withNamespaces } from '../../i18n';

class EditStadium extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            ...props.dataSource
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ ...nextProps.dataSource });
    }

    componentDidMount() {
        this.token = PubSub.subscribe('confirmEditStadium', () => {
            this.confirmEditStadium();
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }

    render() {
        return (
            <div>
                <H3 msg='stadiumDetail' />
                <EditStadiumForm {...this.state} onChange={this.handleChange} />
            </div>
        )
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value });
    }

    confirmEditStadium = async () => {
        const { t } = this.props;
        const dto = this.state;
        const result = await this.props.updateStadium(dto.stadiumId, dto);

        if (result.error) {
            notification['success']({
                message: t('error'),
                description: t(result.error),
                duration: 2
            })
        } else {
            notification['success']({
                message: t('success'),
                description: t('editStadiumSuccess'),
                duration: 2
            })

            PubSub.publish('hideModal');
        }

    }

}

export default connect(
    state => state,
    StadiumAction
)(withNamespaces('common')(EditStadium))