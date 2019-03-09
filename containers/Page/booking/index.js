import React from 'react';
import Button from '../../../components/buttons/buttonPrimary';
import Schedule from '../../../components/schedule';
import BookingService from '../../../coreLayer/service/bookingService';
import courtService from '../../../coreLayer/service/authService';
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
import BookingAction from '../../../redux/booking/actions';

const { stadiums, times, durations, initEventGroup } = iniData;

class BookOnline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stadium: stadiums[0],
            date: new Date().toISOString().substring(0, 10),
            startDate: times[0],
            durationIndex: 0,
            eventGroups: initEventGroup,
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
            lastBooking: {}
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING</h1>
                <Schedule times={times} eventGroups={this.state.eventGroups} />
                {/* <Link href={`/booking_list?userId=${user.userId}`}><a className='link-to-list'>View your bookings list</a></Link> */}
                {/* <form className='input-form'>
                    <select name='court' className='input' onChange={this.handleSelect}>
                        {stadiums.map((stadium, index) =>
                            <optgroup label={stadium.sport} key={index}>
                                {stadium.courts.map((court, index) =>
                                    <option key={index} value={court}>{court}</option>
                                )}
                            </optgroup>
                        )}
                    </select>
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
                    <input type='text' name='title' className='input-text' onChange={this.handleSelect} placeholder='title' />
                    <input type='text' name='description' className='input-text' onChange={this.handleSelect} placeholder='description' />
                    <Button onClick={this.handleClick}>book</Button>
                </form>
                <Modal isOpen={this.state.modal.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>{this.state.modal.title}</ModalHeader>
                    <ModalBody>
                        {this.state.modal.body}
                    </ModalBody>
                    <ModalFooter>
                        {this.state.modal.action.length > 0 && <BootstrapBTN color="primary" onClick={this.navigateToConfirm}>{this.state.modal.action}</BootstrapBTN>}{' '}
                        <BootstrapBTN color="secondary" onClick={this.toggle}>{this.state.modal.cancel}</BootstrapBTN>
                    </ModalFooter>
                </Modal> */}
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
        Router.push(`/booking_confirm?id=${this.state.lastBooking.bookingId}`);
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

    handleSelect = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleClick = (e) => {
        this.bookOnline();
    }

    static initialStadiums = async () => {
        let { courts } = await courtService.get();
        let stadiums = [];
        if (!courts.error) {
            courts.forEach(court => {
                const { name } = court;
                const index = name.slice(0, name.length - 1);
                if (stadiums[index]) {
                    stadiums[index].push(court);
                } else {
                    stadiums[index] = [court];
                }
            });
        }
        return stadiums;
    }

    bookOnline = async () => {
        const {
            startDate,
            durationIndex,
            eventGroups,
            title,
            description
        } = this.state;
        const { user, accessToken } = this.props;
        const [inputHour, inputMinute] = startDate.split('.');

        const startTime = new Date(this.state.date);
        startTime.setHours(0, 0, 0, 0, 0);
        startTime.setHours(parseInt(inputHour));
        startTime.setMinutes(parseInt(inputMinute));

        const finishTime = new Date(this.state.date);
        finishTime.setHours(0, 0, 0, 0, 0);
        finishTime.setHours(durations[durationIndex][1] + parseInt(inputHour));
        finishTime.setMinutes(durations[durationIndex][2] + parseInt(inputMinute));

        const result = await BookingService.book(accessToken, title, description, user.userId, 1, startTime.toISOString(), finishTime.toISOString());

        if (result === 'overlap booking') {
            this.showModal('Overlab', 'overlap booking');
        } else {
            this.setState({ lastBooking: result });
            this.showModal('Booking success', 'Please confirm your booking within 1 hour.', 'Later', 'Confirm');
        }

        let sBooking = {
            userName: user.username,
            startDate: startTime,
            finishDate: finishTime
        }

        eventGroups[startTime.getDay()].bookings.push(sBooking);

        this.setState({ eventGroups });
    }

    bindSchedule = async (currentWeekBookings = []) => {
        const eventGroups = initEventGroup;
        const sBookings = [];

        if (currentWeekBookings) {
            const bookings = currentWeekBookings.length > 0 ? currentWeekBookings : [];
            bookings.forEach(booking => {
                let sBooking = {
                    userName: `${booking.owner.username}`,
                    startDate: new Date(booking.startDate),
                    finishDate: new Date(booking.endDate)
                }
                sBookings.push(sBooking);
            });

            sBookings.forEach(sBooking => {
                const bookingDay = sBooking.startDate.getDay();
                eventGroups[bookingDay].bookings.push(sBooking);
            });
        }

        this.setState({ eventGroups });
    }
}

export default connect(state => state, BookingAction)(BookOnline);