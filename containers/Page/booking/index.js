import React from 'react';
import ScheduleMobile from '../../../components/schedule/mobile';
import Schedule from '../../../components/schedule';
import BookingAction from '../../../redux/booking/actions';
import Link from 'next/link';
import Router from 'next/router';
import iniData from './initData';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import dataHandler from './dataHandler';
import {
    SelectCourt,
    SelectStartTime,
    SelectDuration,
    InputDate,
    SelectDate,
    SelectStadium
} from '../../BookingInputs';
import {
    Row,
    Col,
    Input,
    Modal,
    Button,
    Card,
    Typography
} from 'antd';
import BookingComponent from '../../BookingComponent';
import BottomAction from '../../../components/bottomAction';

const { Text } = Typography;
const { times } = iniData;

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
            bookingList: {},
            bottomAction: {
                isOpen: false,
            },
            modal: {
                title: '',
                body: '',
                isOpen: '',
                action: '',
                cancel: '',
                isOpen: false
            }
        }
    }

    render() {
        const { stadiumBooking, stadiumId, fee, bookingList } = this.props.Booking;
        const { stadiums } = this.props.Stadium;
        const { profile } = this.props.Auth;
        const { isLoading, isMobile } = this.props.Screen;
        const {
            modal,
            bottomAction
        } = this.state;

        return (
            <StyledWrapper>
                <h1 style={{ textAlign: 'center' }}>BOOKING</h1>
                <div className='select-container'>
                    <SelectStadium />
                </div>
                <div>
                    <SelectDate />
                </div>
                <div>
                    <BookingComponent />
                </div>
                <BottomAction
                    visible={bookingList.length > 0}
                    fee={fee}
                />
                <Modal
                    visible={modal.isOpen}
                    toggle={this.toggle}
                    title={modal.title}
                    footer={[
                        (modal.action.length > 0 && <Button type="primary" onClick={this.navigateToConfirm}>{modal.action}</Button>),
                        <Button type="secondary" onClick={this.toggle}>{modal.cancel}</Button>
                    ]}
                >
                    {modal.body}
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
        const lastIndex = myBookings.length - 1;
        Router.push(`/booking_confirm?id=${myBookings[lastIndex].bookingId}`);
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
        } = this.state;
        const { profile, idToken } = this.props.Auth;
        const { courtId } = this.props.Booking;
        const dateInfo = dataHandler.handleDateInfo(this.state.date, startDate, durationIndex);

        const bookingInfo = {
            title,
            description,
            userId: profile.userId,
            courtId: courtId + 1,
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

    renderAction = () => (
        <Col sm={24} md={24} lg={8} xl={8} className='action'>
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
            <div className='action-col'>
                <Text>Service fee : {0} baht</Text>
            </div>
            <Button onClick={this.handleClick} style={{ width: 80, margin: 10 }}>book</Button>
        </Col>
    )

}

export default connect(state => state, BookingAction)(BookOnline);