import React from 'react';
import ScheduleMobile from '../../../components/schedule/mobile';
import Schedule from '../../../components/schedule';
import BookingAction from '../../../redux/booking/actions';
import Link from 'next/link';
import Router from 'next/router';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import iniData from './initData';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import dataHandler from './dataHandler';
import enquire from 'enquire-js';
import {
    SelectCourt,
    SelectStartTime,
    SelectDuration,
    InputDate
} from '../../BookingInputs';
import {
    Row,
    Col,
    Input,
    DatePicker,
    Button
} from 'antd';

const { stadiums, times, durations } = iniData;

class BookOnline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            court: 0,
            bookings: props.Booking.bookings[1],
            date: new Date().toISOString().substring(0, 10),
            startTime: times[0],
            durationIndex: 0,
            title: '',
            description: '',
            modal: {
                title: '',
                body: '',
                isOpen: '',
                action: '',
                cancel: '',
                isOpen: false
            },
            isMobile: false,
            isLoading: true
        }
    }

    componentDidMount() {
        enquire.register('screen and (max-width:425px)', {
            match: () => {
                this.setState({ isMobile: true })
            },
            unmatch: () => {
                this.setState({ isMobile: false })
            }
        })

        this.setState({ isLoading: false });
    }

    componentWillUnmount() {
        enquire.unregister('screen and (max-width:425px)');
    }

    render() {
        let counter = -1;
        const { profile } = this.props.Auth;
        const { courtBooking } = this.props.BookingInput;
        const { isLoading, isMobile } = this.state;

        return (
            <StyledWrapper>
                <h1 style={{textAlign: 'center'}}>BOOKING</h1>
                <Row className='row'>
                    <Col sm={24} md={24} lg={16} xl={18} className='col'>
                        {!isLoading && (isMobile ?
                            <ScheduleMobile times={times} eventGroups={courtBooking} /> :
                            <Schedule times={times} eventGroups={courtBooking} onChangeCourt={this.handleChangeCourt} />
                        )}
                    </Col>
                    <Col sm={24} md={24} lg={8} xl={6} className='action'>
                        <Link href='/booking_list'><a className='link-to-list'>View your bookings list</a></Link>
                        <div className='action-col'>
                            <SelectCourt />
                        </div>
                        <div className='action-col'>
                            <InputDate onChange={this.handleSelectDate} />
                        </div>
                        <div className='action-col'>
                            <SelectStartTime onChange={this.handleSelectTime} />
                        </div>
                        <div className='action-col'>
                            <SelectDuration onChange={this.handleSelectDuration} />
                        </div>
                        <div className='action-col'>
                            <Input placeholder='Title' style={{ width: 200 }} name='title' onChange={this.handleChange} />
                        </div>
                        <div className='action-col'>
                            <Input placeholder='Description' style={{ width: 200 }} name='description' onChange={this.handleChange} />
                        </div>
                        <Button onClick={this.handleClick} style={{ width: 80, margin: 10 }}>book</Button>
                    </Col>
                </Row>
                <Modal isOpen={this.state.modal.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.modal.title}</ModalHeader>
                    <ModalBody>
                        {this.state.modal.body}
                    </ModalBody>
                    <ModalFooter>
                        {this.state.modal.action.length > 0 && <Button color="primary" onClick={this.navigateToConfirm}>{this.state.modal.action}</Button>}{' '}
                        <Button color="secondary" onClick={this.toggle}>{this.state.modal.cancel}</Button>
                    </ModalFooter>
                </Modal>
            </StyledWrapper>
        );
    }

    toggle = () => {
        const { modal } = this.state;
        modal.isOpen = !modal.isOpen;
        this.setState({
            modal
        });
    }

    navigateToConfirm = () => {
        const { myBookings } = this.props.Booking;
        Router.push(`/booking_confirm?id=${myBookings.length - 1}`);
    }

    showModal = (title, body, cancel = 'cancel', action = '') => {
        const { modal } = this.state;
        modal.title = title;
        modal.body = body;
        modal.cancel = cancel;
        modal.action = action;
        modal.isOpen = true;
        this.setState({ modal });
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSelectDate = (date) => {
        if (date) {
            this.setState({ date: date.format('L') });
        }
    }

    handleSelectTime = (startTime) => {
        this.setState({ startTime })
    }

    handleSelectDuration = (durationIndex) => {
        this.setState({ durationIndex })
    }

    handleClick = (e) => {
        this.bookOnline();
    }

    bookOnline = async () => {
        const {
            startTime: startDate,
            durationIndex,
            title,
            description,
            court
        } = this.state;
        const { profile, idToken } = this.props.Auth;
        const dateInfo = dataHandler.handleDateInfo(this.state.date, startDate, durationIndex);

        const bookingInfo = {
            title,
            description,
            userId: profile.userId,
            courtId: +court + 1,
            startDate: dateInfo.startDate,
            endDate: dateInfo.endDate
        }

        const result = await this.props.reserve(idToken, bookingInfo);

        if (result.error) {
            this.showModal('Error', result.error);
        } else {
            this.showModal('Booking success', 'Please confirm your booking within 1 hour.', 'Later', 'Confirm');
        }

    }

}

export default connect(state => state, BookingAction)(BookOnline);