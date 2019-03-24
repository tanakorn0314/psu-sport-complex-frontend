import React from 'react';
import Button from '../../../components/buttons/buttonPrimary';
import ScheduleMobile from '../../../components/schedule/mobile';
import Schedule from '../../../components/schedule';
import BookingAction from '../../../redux/booking/actions';
import Link from 'next/link';
import Router from 'next/router';
import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button as BootstrapBTN
} from 'reactstrap';
import iniData from './initData';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import dataHandler from './dataHandler';
import enquire from 'enquire-js';
import SelectCourt from '../../BookingInputs/courts';
import {
    Card
} from 'antd';

const { stadiums, times, durations } = iniData;

class BookOnline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            court: 0,
            bookings: props.Booking.bookings[1],
            date: new Date().toISOString().substring(0, 10),
            startDate: times[0],
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
                <h1 className='title'>BOOKING</h1>
                {!isLoading && (isMobile ?
                    <ScheduleMobile times={times} eventGroups={courtBooking} /> :
                    <Schedule times={times} eventGroups={courtBooking} onChangeCourt={this.handleChangeCourt} />
                )}
                <Link href='/booking_list'><a className='link-to-list'>View your bookings list</a></Link>
                <div className='action'>
                    <div className='action-left'>
                        <input name='date' type='date' className='input-date' defaultValue={this.state.date} onChange={this.handleSelect} />
                        <select name='startDate' className='input' onChange={this.handleSelect}>
                            <optgroup label='start time'>
                                {times.map((time, index) => <option key={index} value={time}>{time}</option>)}
                            </optgroup>
                        </select>
                        <select name='durationIndex' className='input' onChange={this.handleSelect}>
                            <optgroup label='duration'>
                                {durations.map(([duration], index) => <option key={index} value={index}>{duration}</option>)}
                            </optgroup>
                        </select>

                    </div>
                    <div className='action-right'>
                        {/* <SelectCourt name='court' onChange={this.handleChangeCourt} /> */}
                        <SelectCourt style={{ width: 200 }} />
                        <input type='text' name='title' className='input-text' onChange={this.handleSelect} placeholder='title' />
                        <input type='text' name='description' className='input-text' onChange={this.handleSelect} placeholder='description' />
                    </div>
                </div>
                <Button onClick={this.handleClick}>book</Button>
                <Modal isOpen={this.state.modal.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.modal.title}</ModalHeader>
                    <ModalBody>
                        {this.state.modal.body}
                    </ModalBody>
                    <ModalFooter>
                        {this.state.modal.action.length > 0 && <BootstrapBTN color="primary" onClick={this.navigateToConfirm}>{this.state.modal.action}</BootstrapBTN>}{' '}
                        <BootstrapBTN color="secondary" onClick={this.toggle}>{this.state.modal.cancel}</BootstrapBTN>
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

    handleSelect = async (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleClick = (e) => {
        this.bookOnline();
    }

    bookOnline = async () => {
        const {
            startDate,
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