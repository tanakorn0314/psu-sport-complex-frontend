import React from 'react';
import StyledWrapper from './style';
import CountDown from '../../components/countDown';
import SelectDateTime from '../../components/selectDateTime';
import Input from '../../components/input';
import { connect } from 'react-redux';
import BillAction from '../../redux/bill/actions';
import BookingAction from '../../redux/booking/actions';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { H2, Text, Label } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import { notification, Typography, Divider } from 'antd';
import UploadImage from '../../components/uploadImage';
import { newsApi } from '../../core/api';

const uploadApi = `${newsApi}/upload`;

class ConfirmBooking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            billId: props.dataSource.billId,
            slipUrl: ''
        }
    }

    componentDidMount() {
        this.token1 = PubSub.subscribe('confirmBooking', async () => {
            await this.confirmBooking();
            PubSub.publish('done');
        }, true);
        this.token2 = PubSub.subscribe('cancelBooking', async () => {
            await this.cancelBooking();
            PubSub.publish('done');
        }, true)
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
        PubSub.unsubscribe(this.token2);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.dataSource.billId === this.props.dataSource.billId)
            return;

        const { dataSource } = nextProps;
        this.setState({
            billId: dataSource.billId,
            deposit: dataSource.fee,
            account: ''
        })
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (nextState !== this.state)
            return true;
        if (nextProps === this.props)
            return false;
        return true;
    }

    render() {
        const { dataSource, t } = this.props;
        const { expiresAt, fee } = dataSource;

        const accountNoDash = t('scbAccount') ? t('scbAccount').split('-').join('') : ''

        return (
            <StyledWrapper>
                <H2 msg='pleasePayTo' style={{ marginTop: 10 }} />
                <Typography.Text copyable={{ text: accountNoDash }} >{t('scbAccount')}</Typography.Text>
                <Text msg='scbAccountName' />
                <CountDown expiresAt={expiresAt} onTimeout={this.cancelBooking} />
                <H2>{t('serviceFee')} : {fee} {t('baht')}</H2>
                <Divider style={{ marginTop: 12, marginBottom: 12 }} />
                <H2 msg='uploadYourPaymentSlip' style={{ marginBottom: 10 }} />
                <UploadImage action={uploadApi} onChange={this.handleChangeImage} />
            </StyledWrapper>
        )
    }

    handleChangeImage = (slipUrl) => {
        this.setState({ slipUrl })
    }

    hideModal = () => {
        PubSub.publish('hideModal');
    }

    confirmBooking = async () => {
        const { t } = this.props;
        const { billId, slipUrl } = this.state;

        const result = await this.props.confirm(billId, { slipUrl });

        if (result) {
            if (result.error) {
                notification['error']({
                    duration: 2,
                    message: t('error'),
                    description: t(result.error)
                })
            } else {
                PubSub.publish('hideModal')
            }
        }
    }

    cancelBooking = async () => {
        const { billId } = this.state;
        const { idToken, profile } = this.props.Auth;

        if (profile.position !== 'admin') {
            await this.props.removeByBillId(idToken, billId);
        }
        this.hideModal();
    }
}

export default connect(state => state, { ...BookingAction, ...BillAction })(withNamespaces('common')(ConfirmBooking));