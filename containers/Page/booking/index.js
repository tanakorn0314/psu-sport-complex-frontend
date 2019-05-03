import React from 'react';
import BookingAction from '../../../redux/booking/actions';
import StyledWrapper, { ConfirmContainer } from './style';
import { connect } from 'react-redux';
import dataHandler from './dataHandler';
import { SelectStadium, InputDate } from '../../BookingInputs';
import {
    Modal,
    Button,
    notification,
    Row,
    Col
} from 'antd';
import BookingComponent from '../../BookingComponent';
import BottomAction from '../../../components/bottomAction';
import moment from 'moment';
import BookingService from '../../../coreLayer/service/bookingService';
import Input from '../../../components/uielements/input';
import DateTimeSelect from '../../../components/inputDateTime';

import to from 'await-to-js';

class BookOnline extends React.Component {

    interval = null;

    constructor(props) {
        super(props);
        this.state = {
            modal: {
                title: '',
                body: '',
                isOpen: '',
                action: '',
                cancel: '',
                cancelAction: null,
                minute: 0,
                second: 0,
                fee: 0,
                isOpen: false
            },
            confirm: {
                accountNumber: '',
                balance: 0,
            },
            billId: 0,
            minute: moment().minute(),
            hour: moment().hour(),
            date: moment().date(),
            month: moment().date(),
            year: moment().year()
        }
    }

    render() {
        const { fee, bookingList } = this.props.Booking;
        const { modal } = this.state;

        return (
            <StyledWrapper>
                <h1 style={{ textAlign: 'center' }}>BOOKING</h1>
                <Row>
                    <Col className='select-date' xs={{ order: 2, span: 24 }} sm={12} md={12} lg={12} xl={12}>
                        <InputDate />
                    </Col>
                    <Col className='select-container' xs={{ order: 1, span: 24 }} sm={12} md={12} lg={12} xl={12}>
                        <SelectStadium />
                    </Col>
                </Row>
                <div>
                    <BookingComponent />
                </div>
                <BottomAction
                    visible={bookingList.length > 0}
                    fee={fee}
                    onClick={this.handleClick}
                />
                <Modal
                    visible={modal.isOpen}
                    toggle={this.toggle}
                    title={modal.title}
                    footer={[
                        (modal.action.length > 0 && <Button type="primary" onClick={this.confirmBooking}>{modal.action}</Button>),
                        <Button type="secondary" onClick={modal.cancelAction}>{modal.cancel}</Button>
                    ]}
                >
                    {modal.body}
                </Modal>
            </StyledWrapper>
        );
    }

    renderConfirm = () => {
        const { 
            modal,
            minute,
            hour,
            date,
            month,
            year
        } = this.state;
        return (
            <ConfirmContainer>
                <h2>Service fee : {modal.fee} baht</h2>
                <h2>Please pay to</h2>
                <h2>
                    857-2196-068 <br />
                    SCB PSU Phuket
            </h2>
                <h1>{modal.minute} : {modal.second.toString().padStart(2, '0')}</h1>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='Account number'
                    name='accountNumber'
                    onChange={this.handleChange}
                />
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='Amount'
                    name='balance'
                    onChange={this.handleChange}
                />
                <DateTimeSelect
                    minute={minute}
                    hour={hour}
                    date={date}
                    month={month}
                    year={year}
                    onChange={this.changeTime}
                />
            </ConfirmContainer>
        )
    }

    handleClick = async () => {
        const { bookingList, stadiumId, fee, selectedDate } = this.props.Booking;
        const { idToken, profile } = this.props.Auth;
        const { modal } = this.state;

        const bookManyDTO = dataHandler.toBookManyDto(bookingList, profile.userId, stadiumId, selectedDate);

        const result = await this.props.reserveMany(idToken, bookManyDTO);

        if (result.error) {
            return this.showErrorModal(result)
        }

        modal.fee = fee;
        modal.minute = (20 - moment(result.createAt).diff(moment(), 'minute'));
        modal.second = 0;

        this.setState({
            billId: result.billId,
            modal
        }, () => {
            this.interval = setInterval(() => {
                const { modal } = this.state;
                modal.second = modal.second - 1
                if (modal.second < 0) {
                    modal.minute = modal.minute - 1;
                    modal.second = 59;
                }
                this.setState({ modal });
                if (modal.minute < 0)
                    this.hideModal();
                else
                    this.showConfirmModal();
            }, 1000);
        });

        this.showConfirmModal();
    }

    hideModal = () => {
        const { modal } = this.state;
        modal.isOpen = false
        this.setState({ modal });

        clearInterval(this.interval);
    }

    showErrorModal = ({ error }) => {
        const ErrorView = () => <div>{error}</div>

        const { modal } = this.state;
        modal.title = 'Error';
        modal.body = <ErrorView />;
        modal.cancel = 'Cancel';
        modal.action = '';
        modal.isOpen = true;
        modal.cancelAction = this.hideModal;
        this.setState({
            modal,
        });
    }

    showConfirmModal = () => {
        const { modal } = this.state;
        modal.title = 'Confirm your booking';
        modal.body = this.renderConfirm();
        modal.cancel = 'Cancel';
        modal.action = 'Confirm';
        modal.isOpen = true;
        modal.cancelAction = this.handleCancel;
        this.setState({
            modal,
        });
    }

    toggle = () => {
        const { modal } = this.state;
        modal.isOpen = !modal.isOpen;
        this.setState({
            modal
        });

        if (!modal.isOpen) {
            clearInterval(this.interval);
        }
    }

    showModal = (title, body, action, cancel) => {
        const { modal } = this.state;
        modal.title = title;
        modal.body = body;
        modal.cancel = cancel;
        modal.action = action;
        modal.isOpen = true;
        this.setState({
            modal,
        });
    }

    handleCancel = async () => {
        await BookingService.deleteByBillId(this.props.Auth.idToken, this.state.billId);
        this.props.refreshData();
        this.hideModal();
    }

    handleChange = e => {
        const { name, value } = e.target;
        const { confirm } = this.state;

        switch (name) {
            case 'accountNumber':
                confirm.accountNumber = value;
                break;
            case 'balance':
                confirm.balance = parseInt(value);
                break;
            default: break;
        }

        this.setState({ confirm });
    }

    changeTime = (type, value) => {
        this.setState({[type]: value});
    }

    confirmBooking = async () => {
        const { 
            minute,
            hour,
            date,
            month,
            year,
            billId
        } = this.state;
        const { idToken } = this.props.Auth;
        const timestamp = moment().minute(minute).hour(hour).date(date).month(month).year(year).format();

        const transactionInfo = {
            ...this.state.confirm,
            timestamp
        }

        const result = await this.props.confirmTransaction(idToken, billId, transactionInfo);

        console.log(result);

        if (result.error) {
            notification['error']({
                title: 'Error',
                message: result.error,
                duration: 3
            })
        } else {
            notification['success']({
                title: 'Success',
                message: 'Confirm booking successful',
                duration: 3
            });

            this.hideModal();
        }
    }
}

export default connect(state => state, BookingAction)(BookOnline);