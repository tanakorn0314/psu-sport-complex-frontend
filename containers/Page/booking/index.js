import React from 'react';
import BookingAction from '../../../redux/booking/actions';
import StyledWrapper, { ConfirmContainer } from './style';
import { connect } from 'react-redux';
import dataHandler from './dataHandler';
import { SelectStadium, SelectDate, InputDate } from '../../BookingInputs';
import {
    Modal,
    Button,
    notification,
    Row,
    Col,
    Spin
} from 'antd';
import BookingComponent from '../../BookingComponent';
import BottomAction from '../../../components/bottomAction';
import moment from 'moment';
import BookingService from '../../../coreLayer/service/bookingService';
import Input from '../../../components/uielements/input';
import InputDateTime from '../../../components/inputDateTime';
import CountDown from '../../../components/countDown';

class BookOnline extends React.Component {

    constructor(props) {
        super(props);

        let shouldRestoreConfirm = false;
        let lastBill = null;

        const bills = props.Bill.myBills;
        if (bills && bills.length > 0) {
            lastBill = bills[0];
            if (!lastBill.transaction)
                shouldRestoreConfirm = true;
        }

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
                account: '',
                deposit: 0,
            },
            billId: 0,
            minute: moment().minute(),
            hour: moment().hour(),
            date: moment().date(),
            month: moment().month(),
            year: moment().year(),
            shouldRestoreConfirm,
            lastBill
        }

    }

    render() {
        const { fee, bookingList } = this.props.Booking;
        const { isLoading, isMobile } = this.props.Screen;
        const { modal, shouldRestoreConfirm, lastBill } = this.state;

        if (shouldRestoreConfirm) {
            const { billId, fee, createdAt } = lastBill;

            this.restoreConfirmModal(billId, fee, createdAt);
        }

        return (
            <StyledWrapper>
                <h1 style={{ textAlign: 'center', fontSize: '3em', fontWeight: '600', margin: 0 }}>BOOKING</h1>
                {isLoading ?
                    <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Spin tip='Loading...' size='large' />
                    </div> :
                    [<Row>
                        <Col className='select-date' xs={{ order: 2, span: 24 }} sm={12} md={12} lg={12} xl={12}>
                            {isMobile ? <SelectDate style={{ display: 'flex', justifyContent: 'center' }} /> : <InputDate />}
                        </Col>
                        <Col className='select-container' xs={{ order: 1, span: 24 }} sm={12} md={12} lg={12} xl={12}>
                            <SelectStadium style={{ width: isMobile ? '100%' : 200 }} />
                        </Col>
                    </Row>,
                    <div>
                        <BookingComponent />
                    </div>
                    ]
                }
                <BottomAction
                    visible={bookingList.length > 0}
                    fee={fee}
                    onClick={this.handleClick}
                />
                <Modal
                    onCancel={modal.cancelAction}
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
                <CountDown minute={modal.minute} second={modal.second} onTimeout={this.hideModal} />
                <div style={{ marginBottom: 5 }}>Account Number </div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='xxxxxxxxxx'
                    name='account'
                    onChange={this.handleChange}
                />
                <div style={{ marginBottom: 5 }}>Amount</div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='Amount'
                    name='deposit'
                    onChange={this.handleChange}
                    defaultValue={modal.fee}
                />
                <div style={{ marginBottom: 5 }}>Transfer Time </div>
                <InputDateTime
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
        const { modal, confirm } = this.state;

        const bookManyDTO = dataHandler.toBookManyDto(bookingList, profile.userId, stadiumId, selectedDate);

        const result = await this.props.reserveMany(idToken, bookManyDTO);

        if (result.error) {
            return this.showErrorModal(result)
        }

        modal.fee = fee;
        modal.minute = (20 - moment(result.createAt).diff(moment(), 'minute'));
        modal.second = 0;

        confirm.deposit = fee;

        this.setState({
            billId: result.billId,
            modal,
            confirm,
        })

        this.showConfirmModal();
    }

    restoreConfirmModal = (billId, fee, createdAt) => {
        const { modal, confirm } = this.state;

        modal.fee = fee;
        modal.minute = (19 - moment().diff(moment(createdAt), 'minute') % 20);
        modal.second = (60 - moment().diff(moment(createdAt), 'second') % 60);

        confirm.deposit = fee;

        this.setState({
            billId,
            modal,
            confirm,
            shouldRestoreConfirm: false
        })

        this.showConfirmModal();
    }

    hideModal = () => {
        const { modal } = this.state;
        modal.isOpen = false
        this.setState({ modal });
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
        this.setState({ modal });
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
            case 'account':
                confirm.account = value;
                break;
            case 'deposit':
                confirm.deposit = parseInt(value);
                break;
            default: break;
        }

        this.setState({ confirm });
    }

    changeTime = (type, value) => {
        this.setState({ [type]: value });
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
            date: timestamp
        }

        const result = await this.props.confirmTransaction(idToken, billId, transactionInfo);

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