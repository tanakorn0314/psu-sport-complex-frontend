import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import ModalAction from '../../redux/modal/actions';
import { SlotTitle, Slot, SlotInfo } from './style';
import { Label, P } from '../../components/typo';
import { withNamespaces } from '../../i18n';

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
        const { t } = this.props;
        const {
            court,
            selected,
            isPassed,
            isBooked,
            isApproved
        } = this.state;

        return (
            <Slot seleted={selected} onClick={this.handleClick}>
                <SlotTitle booked={isBooked} approved={isApproved} selected={selected} isPassed={isPassed}>
                    <Label>{`${t('court')} ${court + 1}`}</Label>
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
        if (isApproved)
            return (
                <>
                    <P msg='booked' />
                    <P msg='by' />
                    {bookingData && <P msg={bookingData.ownerName} />}
                </>
            )
        if (isBooked)
            return (
                <>
                    <P msg='isBooking' />
                    <P msg='by' />
                    {bookingData && <P msg={bookingData.ownerName} />}
                </>
            )
        if (isPassed)
            return <P msg='passed' />
        if (selected)
            return <P msg='selected' />
        return <P msg='available' />
    }

    handleClick = () => {
        const { profile } = this.props.Auth;
        let { isPassed, isApproved, bookingData } = this.state;
        if (bookingData && isApproved && !isPassed) {
            const canEdit = (profile.userId === bookingData.userId) || (profile.position === 'admin');
            canEdit && this.props.showEditBookingModal(bookingData);
        } else {
            this.toggleSelect();
        }
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

export default connect(
    state => state,
    { ...BookingAction, ...ModalAction }
)(withNamespaces('common')(BookingSlot));