import React from 'react';
import Button from '../../../components/buttons/buttonPrimary';
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
        }
    }

    render() {
        let counter = -1;
        const { profile } = this.props.Auth;
        const user = profile;

        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING</h1>
                <Schedule times={times} eventGroups={this.state.bookings} />
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
                        <select name='court' className='input' onChange={this.handleSelect}>
                            {stadiums.map((stadium, index) => {
                                return (
                                    <optgroup label={stadium.sport} key={index}>
                                        {stadium.courts.map((court, i) => {
                                            counter++;
                                            return (
                                                <option key={i} value={counter}>{court}</option>
                                            )
                                        })
                                        }
                                    </optgroup>
                                )
                            })}
                        </select>
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
        Router.push(`/booking_confirm?id=${myBookings.length-1}`);
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

        if (name === 'court') {
            const result = await this.props.fetchBooking(this.props.Auth.idToken, +value + 1);
            if (!result.error) {
                this.setState({
                    bookings: this.props.Booking.bookings[+value + 1]
                });
            }
        }
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