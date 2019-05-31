import React from 'react';
import { DatePicker, notification } from 'antd';
import InputTimeRange from '../../components/inputTimeRange';
import BookingAction from '../../redux/booking/actions';
import ModalAction from '../../redux/modal/actions';
import BillAction from '../../redux/bill/actions';
import { connect } from 'react-redux';
import moment from 'moment';

import PubSub from 'pubsub-js';

class EditBookingTime extends React.Component {

    constructor(props) {
        super(props);
        const { booking } = props;
        const { stadiumId, courtId, startDate, endDate } = booking;
        const startTime = moment(startDate);
        const endTime = moment(endDate);

        this.state = {
            date: startTime,
            startTime,
            endTime
        }
    }

    componentDidMount() {
        this.token = PubSub.subscribe('confirm-edit', () => {
            this.handleConfirm();
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    render() {
        const { stadiums } = this.props.Stadium;
        const { stadiumId, courtId } = this.props.booking;
        const { startTime, endTime, date } = this.state;

        const stadiumName = `${stadiums[stadiumId].name} Court ${courtId}`;
        const currentDateStr = `${startTime.format('MMM DD, YYYY HH:mm')} - ${endTime.format('HH:mm')}`;

        return (
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
        )
    }

    handleChangeDate = (date) => {
        this.setState({ date });
    }

    handleChangeTime = (start) => {
        let { startTime, endTime } = this.state;

        const hDiff = endTime.diff(startTime, 'hour');
        const hMin = endTime.diff(startTime, 'minute') % 60;

        startTime = start;
        endTime = start.clone().add(hDiff, 'hour').add(hMin, 'minute');

        this.setState({ startTime, endTime });
    }

    handleConfirm = async () => {
        const { booking } = this.props;
        const { date, startTime, endTime } = this.state;
        const { bookingId, title, description, userId, stadiumId, courtId, ownerName, ownerInfo, ownerPosition } = booking

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
            ownerName,
            ownerInfo,
            ownerPosition,
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

            PubSub.publish('update-bill');
            this.props.Modal.cancel();
        }

    }
}

export default connect(
    state => state,
    BookingAction,
)(EditBookingTime);