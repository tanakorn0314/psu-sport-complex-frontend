import React from 'react';
import StyledWrapper from './style';
import CountDown from '../../components/countDown';
import InputDateTime from '../../components/inputDateTime';
import Input from '../../components/input';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import moment from 'moment';
import PubSub from 'pubsub-js';
import { H2, Text, Label } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import dataHandler from './dataHandler';
import { notification } from 'antd';

class ConfirmBooking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            account: '',
            billId: props.dataSource.billId,
            deposit: props.dataSource.fee,
            minute: moment().minute(),
            hour: moment().hour(),
            date: moment().date(),
            month: moment().month(),
            year: moment().year(),
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
        const { minute, hour, date, month, year, account, deposit } = this.state;
        const { dataSource, t } = this.props;
        const { expiresAt, fee } = dataSource;

        return (
            <StyledWrapper>
                <H2 msg='pleasePayTo' style={{ marginTop: 10 }}/>
                <Text msg='scbAccount'/>
                <H2>{t('serviceFee')} : {fee} {t('baht')}</H2>
                <CountDown expiresAt={expiresAt} onTimeout={this.cancelBooking} />
                <div style={{ marginBottom: 5 }}><Label msg='accountNumber'/></div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='xxxxxxxxxx'
                    name='account'
                    value={account}
                    onChange={this.handleChange}
                />
                <div style={{ marginBottom: 5 }}><Label msg='amount'/></div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='Amount'
                    name='deposit'
                    value={deposit}
                    onChange={this.handleChange}
                    defaultValue={fee}
                />
                <div style={{ marginBottom: 5 }}><Label msg='transferTime'/></div>
                <InputDateTime
                    minute={minute}
                    hour={hour}
                    date={date}
                    month={month}
                    year={year}
                    onChange={this.handleChangeTime}
                />
                <Text msg='confirmWarning' className='warning'/>
            </StyledWrapper>
        )
    }

    handleChange = e => {
        const { name, value } = e.target;
        console.log(name, value);
        switch (name) {
            case 'account':
                this.setState({account: value})
                break;
            case 'deposit':
                this.setState({deposit: parseInt(value)})
                break;
            default: break;
        }
    }

    handleChangeTime = (type, value) => {
        this.setState({ [type]: value });
    }

    hideModal = () => {
        PubSub.publish('hideModal');
    }

    confirmBooking = async () => {
        const { idToken } = this.props.Auth;
        const { billId } = this.state;
        const dto = dataHandler.createConfirmBookingDTO(this.state);

        const result = await this.props.confirmTransaction(idToken, billId, dto);

        PubSub.publish('showTransactionCompleteModal');

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

export default connect(state => state, BookingAction)(withNamespaces('common')(ConfirmBooking));