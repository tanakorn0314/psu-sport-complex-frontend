import React from 'react';
import moment from 'moment';
import { SlotTitle, Slot, SlotInfo } from './style';
import { Label, P } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import { SLOT_STATES } from './slotState';


class BookingSlot extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { t, dataSource } = this.props;
        const slotState = this.getSlotState();
        const selected = slotState === SLOT_STATES.SELECTED;

        return (
            <Slot onClick={() => this.handleClick(slotState)}>
                <SlotTitle slotState={slotState} selected={selected}>
                    <Label>{`${t('court')} ${dataSource.court + 1}`}</Label>
                </SlotTitle>
                <SlotInfo selected={selected}>
                    {this.renderSlotInfo(slotState)}
                </SlotInfo>
            </Slot>
        )
    }

    renderSlotInfo = (slotState) => {
        if (slotState === SLOT_STATES.APPROVED || slotState === SLOT_STATES.BOOKED)
            return this.renderBookedSlot(slotState);

        return this.renderUnbookedSlot(slotState);
    }

    renderBookedSlot = (slotState) => {
        const { bookingData } = this.props.dataSource;
        const label = slotState === SLOT_STATES.APPROVED ? 'booked' : 'isBooking';
        return (
            <>
                <P msg={label} />
                <P msg='by' />
                {bookingData && <P msg={bookingData.ownerName} noTranslate />}
            </>
        )
    }

    renderUnbookedSlot = (slotState) => {
        let label = 'available';
        if (slotState === SLOT_STATES.PASSED)
            label = 'passed';
        else if (slotState === SLOT_STATES.SELECTED)
            label = 'selected'
        return <P msg={label} />
    }

    getSlotState = (props = this.props) => {
        const {
            bookingData,
            selected
        } = props.dataSource;

        const isApproved = bookingData && (bookingData.status === 'approved' || bookingData.status === 'paid');
        if (isApproved) return SLOT_STATES.APPROVED;

        const isBooked = !!bookingData;
        if (isBooked) return SLOT_STATES.BOOKED;

        const isPassed = this.checkPass();
        if (isPassed) return SLOT_STATES.PASSED;

        if (selected) return SLOT_STATES.SELECTED;

        return SLOT_STATES.AVAILABLE;
    }

    handleClick = (slotState) => {
        PubSub.publish('setBottomActionVisible', true);
        switch (slotState) {
            case SLOT_STATES.AVAILABLE: return this.select(true);
            case SLOT_STATES.SELECTED: return this.select(false);
            case SLOT_STATES.APPROVED: return this.edit();
            default: return;
        }
    }

    checkPass = () => {
        const {
            date,
            start
        } = this.props.dataSource;

        const h = start.split(':')[0];
        const m = start.split(':')[1];
        const d = moment(date).hour(+h).minute(+m).second(0);

        return moment().diff(d) >= 0;
    }

    select = (isSelect) => {
        const { court, start } = this.props.dataSource;
        const end = moment(start, 'HH:mm').add(30, 'minute').format('HH:mm');

        this.props.onSelect && this.props.onSelect({
            start,
            end,
            court,
            selected: isSelect
        })
    }

    edit = () => {
        const passed = this.checkPass()
        if (!passed && this.props.onEdit)
            this.props.onEdit(this.props.dataSource.bookingData);
    }

}

export default withNamespaces('common')(BookingSlot);