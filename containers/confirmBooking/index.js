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
import text from '../../common/text';
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
        this.token1 = PubSub.subscribe('confirmBooking', () => {
            this.confirmBooking();
        });
        this.token2 = PubSub.subscribe('cancelBooking', () => {
            this.cancelBooking();
        })
    }

    componentWillUnmount() {
        PubSub.subscribe(this.token1);
        PubSub.subscribe(this.token2);
    }

    componentWillReceiveProps(nextProps) {
        const { dataSource } = nextProps;
        this.setState({
            billId: dataSource.billId,
            deposit: dataSource.fee,
        })
    }

    render() {
        const { minute, hour, date, month, year } = this.state;
        const { dataSource } = this.props;
        const { startCount, fee } = dataSource;

        return (
            <StyledWrapper>
                <H2 msg='pleasePayTo' style={{ marginTop: 10 }}/>
                <Text msg='scbAccount'/>
                <H2>{text['serviceFee']} : {fee} {text['baht']}</H2>
                <CountDown minute={startCount.minute} second={startCount.second} onTimeout={this.hideModal} />
                <div style={{ marginBottom: 5 }}><Label msg='accountNumber'/></div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='xxxxxxxxxx'
                    name='account'
                    onChange={this.handleChange}
                />
                <div style={{ marginBottom: 5 }}><Label msg='amount'/></div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='Amount'
                    name='deposit'
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

        if (result.error) {
            PubSub.publish('showTransactionErrorModal');
        } else {
            notification['success']({
                title: text['success'],
                message: text['bookingSuccess'],
                duration: 3
            });

            this.hideModal();
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

export default connect(state => state, BookingAction)(ConfirmBooking);