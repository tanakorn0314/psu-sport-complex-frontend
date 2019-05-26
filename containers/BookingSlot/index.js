import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import {
    SlotTitle,
    Slot,
    SlotInfo
} from './style';

class BookingSlot extends React.Component {

    constructor(props) {
        super(props);

        const {
            bookingData,
            date,
            start
        } = props.dataSource;

        const h = start.split(':')[0];
        const m = start.split(':')[1];
        const d = moment(date).hour(+h).minute(+m).second(0);

        const isPassed = moment().diff(d) >= 0;
        const isBooked = !!bookingData;
        const isApproved = bookingData && bookingData.status === 'approved';

        this.state = {
            ...props.dataSource,
            isPassed,
            isBooked,
            isApproved
        }
    }

    componentWillReceiveProps(nextProps) {
        const {
            bookingData,
            date,
            start
        } = nextProps.dataSource;
        const { selected } = this.state;

        const h = start.split(':')[0];
        const m = start.split(':')[1];
        const d = moment(date).hour(+h).minute(+m).second(0);

        const isPassed = moment().diff(d) >= 0;
        const isBooked = !!bookingData;
        const isApproved = bookingData && bookingData.status === 'approved';

        if (isPassed || isBooked || isApproved) {
            if (selected) this.unSelect();
        }

        this.setState({
            ...nextProps.dataSource,
            isPassed,
            isBooked,
            isApproved
        });
    }

    render() {
        const {
            court,
            selected,
            isPassed,
            isBooked,
            isApproved
        } = this.state;

        return (
            <Slot seleted={selected} onClick={this.toggleSelect}>
                <SlotTitle booked={isBooked} approved={isApproved} selected={selected} isPassed={isPassed}>
                    {`Court ${court + 1}`}
                </SlotTitle>
                <SlotInfo selected={selected}>
                    {this.renderSlotInfo()}
                </SlotInfo>
            </Slot>
        )
    }

    renderSlotInfo = () => {
        const {
            selected,
            isPassed,
            isBooked,
            isApproved,
            bookingData
        } = this.state;
        if (isApproved || isBooked)
            return (
                <>
                    Booked<br />
                    by<br />
                    {bookingData && bookingData.ownerName}
                </>
            )
        if (isPassed)
            return 'Passed';
        if (selected)
            return 'Selected';
        return 'Available';
    }

    toggleSelect = () => {
        let { court, start, selected, isPassed, isBooked } = this.state;
        const { idToken } = this.props.Auth;

        this.props.setBottomActionVisible(true);

        if (isBooked || isPassed || !idToken)
            return;

        const end = moment(start, 'HH:mm').add(30, 'minute').format('HH:mm');

        this.props.selectBooking({
            start,
            end,
            court,
            selected: !selected
        });
    }

    unSelect = () => {
        let { court, start, selected, isPassed, isBooked } = this.state;
        const { idToken } = this.props.Auth;
        const end = moment(start, 'HH:mm').add(30, 'minute').format('HH:mm');

        this.props.selectBooking({
            start,
            end,
            court,
            selected: false
        });

    }
}

export default connect(state => state, BookingAction)(BookingSlot);