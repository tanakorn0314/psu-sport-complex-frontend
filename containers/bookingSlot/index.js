import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import ModalAction from '../../redux/modal/actions';
import { SlotTitle, Slot, SlotInfo } from './style';
import { Label, P } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import { SLOT_STATES } from './slotState';


class BookingSlot extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            slotState: this.getSlotState()
        }
    }

    componentWillReceiveProps(nextProps) {
        let nextSlotState = this.getSlotState(nextProps);
        const { slotState } = this.state;

        if (slotState === SLOT_STATES.SELECTED && (
            nextSlotState === SLOT_STATES.PASSED ||
            nextSlotState === SLOT_STATES.BOOKED ||
            nextSlotState === SLOT_STATES.APPROVED
        )) {
            this.unSelect();
        }

        this.setState({ slotState: nextSlotState });
    }

    render() {
        const { t, dataSource } = this.props;
        const { slotState } = this.state;

        const selected = slotState === SLOT_STATES.SELECTED;

        console.log('selected');

        return (
            <Slot onClick={this.handleClick}>
                <SlotTitle slotState={slotState}>
                    <Label>{`${t('court')} ${dataSource.court + 1}`}</Label>
                </SlotTitle>
                <SlotInfo selected={selected}>
                    {this.renderSlotInfo()}
                </SlotInfo>
            </Slot>
        )
    }

    renderSlotInfo = () => {
        const { slotState } = this.state;

        if (slotState === SLOT_STATES.APPROVED || slotState === SLOT_STATES.BOOKED)
            return this.renderBookedSlot();

        return this.renderUnbookedSlot();
    }

    renderBookedSlot = () => {
        const { slotState } = this.state;
        const { bookingData } = this.props.dataSource;
        const label = slotState === SLOT_STATES.APPROVED ? 'booked' : 'isBooking';
        return (
            <>
                <P msg={label} />
                <P msg='by' />
                {bookingData && <P msg={bookingData.ownerName} />}
            </>
        )
    }

    renderUnbookedSlot = () => {
        const { slotState } = this.state;
        let label = 'available';
        if (slotState === SLOT_STATES.PASSED)
            label = 'passed';
        else if (slotState === SLOT_STATES.SELECTED)
            label = 'selected'
        return <P msg={label} />
    }

    handleClick = () => {
        const { profile } = this.props.Auth;
        const { slotState } = this.state;
        let { bookingData } = this.props.dataSource;
        if (bookingData && slotState === SLOT_STATES.APPROVED) {
            const canEdit = (profile.userId === bookingData.userId) || (profile.position === 'admin');
            canEdit && this.props.showEditBookingModal(bookingData);
        } else {
            this.toggleSelect();
        }
    }

    toggleSelect = () => {
        const { slotState } = this.state;
        const { idToken } = this.props.Auth;
        const selected = slotState === SLOT_STATES.SELECTED;
        let { court, start } = this.props.dataSource;

        this.props.setBottomActionVisible(true);

        if (slotState === SLOT_STATES.BOOKED || slotState === SLOT_STATES.PASSED || slotState === SLOT_STATES.APPROVED || !idToken)
            return;

        const end = moment(start, 'HH:mm').add(30, 'minute').format('HH:mm');

        this.toggleState(() => {
            this.props.selectBooking({
                start,
                end,
                court,
                selected: !selected
            });
        })

    }

    unSelect = () => {
        let { court, start } = this.dataSource;
        const end = moment(start, 'HH:mm').add(30, 'minute').format('HH:mm');

        this.props.selectBooking({
            start,
            end,
            court,
            selected: false
        });

    }

    getSlotState = (props = this.props) => {
        const {
            bookingData,
            date,
            start,
            selected
        } = props.dataSource;

        const h = start.split(':')[0];
        const m = start.split(':')[1];
        const d = moment(date).hour(+h).minute(+m).second(0);

        const isApproved = bookingData && bookingData.status === 'approved';
        if (isApproved) return SLOT_STATES.APPROVED;

        const isBooked = !!bookingData;
        if (isBooked) return SLOT_STATES.BOOKED;

        const isPassed = moment().diff(d) >= 0;
        if (isPassed) return SLOT_STATES.PASSED;

        if (selected) return SLOT_STATES.SELECTED;

        return SLOT_STATES.AVAILABLE;
    }

    toggleState = (cb) => {
        const { slotState } = this.state;

        if (slotState === SLOT_STATES.AVAILABLE)
            this.setState({ slotState: SLOT_STATES.SELECTED }, cb)
        else
            this.setState({ slotState: SLOT_STATES.AVAILABLE }, cb)
    }


}

export default connect(
    state => state,
    { ...BookingAction, ...ModalAction }
)(withNamespaces('common')(BookingSlot));