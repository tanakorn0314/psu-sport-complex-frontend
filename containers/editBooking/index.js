import React from 'react';
import { notification } from 'antd';
import DatePicker from '../../components/datePicker';
import InputTimeRange from '../../components/inputTimeRange';
import { H2, Label, Text } from '../../components/typo';
import { withNamespaces, i18n } from '../../i18n';

import BookingAction from '../../redux/booking/actions';
import { connect } from 'react-redux';
import moment from 'moment';

import PubSub from 'pubsub-js';

class EditBookingTime extends React.Component {

    constructor(props) {
        super(props);
        const { booking } = props;
        const { startDate, endDate } = booking;
        const startTime = moment(startDate);
        const endTime = moment(endDate);

        this.state = {
            date: startTime,
            startTime,
            endTime
        }
    }

    componentWillReceiveProps(nextProps) {
        const { booking } = nextProps;
        const { startDate, endDate } = booking;
        const startTime = moment(startDate);
        const endTime = moment(endDate);

        this.setState({
            date: startTime,
            startTime,
            endTime
        })
    }

    componentDidMount() {
        this.token1 = PubSub.subscribe('editBooking', async () => {
            await this.handleConfirm();
            PubSub.publish('done');
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
    }

    render() {
        const locale = i18n.language || 'en';
        const { t } = this.props;
        const { stadiums } = this.props.Stadium;
        const { stadiumId, courtId } = this.props.booking;
        const { startTime, endTime, date } = this.state;

        const stadiumName = `${stadiums[stadiumId].name} Court ${courtId}`;
        const currentDateStr = `${startTime.locale(locale).format('DD MMMM YYYY HH:mm')} - ${endTime.format('HH:mm')}`;

        return (
            <div>
                <H2 style={{marginTop: 5}}>{t(stadiums[stadiumId].name)} {t('court')} {courtId}</H2>
                <div style={{marginBottom: 5}}><Text>{currentDateStr}</Text></div>
                <div style={{marginBottom: 10}}><Label msg='changeScheduleTo'/></div>
                <DatePicker
                    style={{ marginBottom: 10 }}
                    value={date}
                    onChange={this.handleChangeDate}
                    format='DD MMMM YYYY'
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
        const { booking, t } = this.props;
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
                message: t('error'),
                description: t(result.error),
                duration: 3
            });
        } else {
            notification['success']({
                message: t('success'),
                description: t('updateScheduleSuccess'),
                duration: 3
            });

            PubSub.publish('updateBill');
            this.hideModal();
        }
    }

    hideModal = () => {
        PubSub.publish('hideModal');
    }
}

export default connect(
    state => state,
    BookingAction,
)(withNamespaces('common')(EditBookingTime));