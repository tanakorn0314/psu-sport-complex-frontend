import React from 'react';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import BillCard from '../../../components/billCard';
import BillActions from '../../../redux/bill/actions';
import BookingActions from '../../../redux/booking/actions';

import { Spin, Modal, DatePicker, notification } from 'antd';
import InputTimeRange from '../../../components/inputTimeRange';

class BookingHistory extends React.Component {

    state = {
        modal: {
            body: '',
            visible: false
        },
        staiudmName: '',
        currentDateStr: '',
        date: moment(),
        startTime: moment(),
        endTime: moment(),
        booking: null
    }

    componentDidMount() {
        const { idToken } = this.props.Auth;
        this.props.fetchMyBills(idToken);
    }

    render() {
        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING HISTORY</h1>
                {this.renderComponent()}
            </StyledWrapper >
        )
    }

    renderComponent = () => {
        const { isLoading } = this.props.Screen;
        const { myBills } = this.props.Bill;
        const { stadiums } = this.props.Stadium;
        const { modal } = this.state;

        if (isLoading)
            return (
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spin tip='Loading...' size='large' />
                </div>
            );

        if (myBills.length === 0)
            return (
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h2>No data</h2>
                </div>
            )

        return (
            <div className='content-container'>
                {
                    myBills.map((bill, index) => {
                        const dataSource = {
                            billId: bill.billId,
                            bookingTime: moment(bill.createdAt),
                            bookings: bill.bookings,
                            balance: bill.fee,
                            sport: stadiums[bill.bookings[0].stadiumId - 1].name
                        }

                        return (
                            <BillCard key={index} style={{ marginBottom: 5 }} dataSource={dataSource} onEdit={this.handleEdit} />
                        )
                    })
                }
                <Modal
                    title='Change Schedule'
                    onOk={this.handleConfirm}
                    onCancel={this.toggle}
                    toggle={this.toggle}
                    visible={modal.visible}
                >
                    {modal.body}
                </Modal>
            </div>
        )

    }

    handleEdit = (booking) => {
        const { stadiums } = this.props.Stadium;
        const { stadiumId, courtId, startDate, endDate } = booking;
        const mStart = moment(startDate);
        const mEnd = moment(endDate);

        this.setState({
            stadiumName: `${stadiums[stadiumId].name} Court ${courtId}`,
            currentDateStr: `${mStart.format('MMM DD, YYYY HH:mm')} - ${mEnd.format('HH:mm')}`,
            date: mStart,
            startTime: mStart,
            endTime: mEnd,
            booking
        }, () => { this.showEditModal() });

    }

    showEditModal = () => {
        const {
            stadiumName,
            currentDateStr,
            date,
            startTime,
            endTime,
            modal
        } = this.state;
        const body = [
            <div>
                <h3>{stadiumName}</h3>
                <p>{currentDateStr}</p>
                <p>Change Schedule to</p>
                <DatePicker
                    style={{ marginBottom: 10 }}
                    value={date}
                    onChange={this.handleChangeDate}
                    format='MMM DD, YYYY'
                />
                <InputTimeRange
                    start={startTime}
                    end={endTime}
                    onChange={this.handleChangeTime}
                    endDisabled
                />
            </div>
        ]

        modal.body = body;
        modal.visible = true;

        this.setState({ modal });
    }

    toggle = () => {
        const { modal } = this.state;
        modal.visible = !modal.visible;
        this.setState({ modal })
    }

    handleChangeDate = (date) => {
        this.setState({ date }, () => { this.showEditModal(); });
    }

    handleChangeTime = (start) => {
        let { startTime, endTime } = this.state;

        const hDiff = endTime.diff(startTime, 'hour');
        const hMin = endTime.diff(startTime, 'minute') % 60;

        startTime = start;
        endTime = start.clone().add(hDiff, 'hour').add(hMin, 'minute');

        this.setState({ startTime, endTime }, () => { this.showEditModal(); });
    }

    handleConfirm = async () => {
        const { idToken } = this.props.Auth;
        const { booking, date, startTime, endTime } = this.state;
        const { bookingId, title, description, userId, stadiumId, courtId } = booking

        const startHr = startTime.hour();
        const startMin = startTime.minute();
        const endHr = endTime.hour();
        const endMin = endTime.minute();

        const startDate = moment(date).hour(startHr).minute(startMin).second(0).millisecond(0).format();
        const endDate = moment(date).hour(endHr).minute(endMin).second(0).millisecond(0).format();

        const dto = {
            title,
            description,
            userId,
            stadiumId,
            courtId,
            startDate,
            endDate
        }

        const result = await this.props.updateBooking(bookingId, dto);

        if (result.error) {
            notification['error']({
                message: 'Error',
                description: result.error,
                duration: 3
            });
        } else {
            notification['success']({
                message: 'Success',
                description: 'Update schedule success',
                duration: 3
            });

            await this.props.fetchMyBills(idToken);
            this.toggle();
        }

    }

}

export default connect(state => state, { ...BillActions, ...BookingActions })(BookingHistory);