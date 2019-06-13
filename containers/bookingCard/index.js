import React from 'react';
import _ from 'lodash';
import {
    Col
} from 'antd';
import { connect } from 'react-redux';
import StyledRow from './style';
import BookingAction from '../../redux/booking/actions';
import ModalAction from '../../redux/modal/actions';
import BookingSlot from '../bookingSlot';
import { Label } from '../../components/typo';

class BookingCard extends React.Component {

    shouldComponentUpdate(nextProps) {
        const { selectedDate: a1 } = this.props.Booking;
        const { dataSource: b1 } = this.props;
        const { selectedDate: a2 } = nextProps.Booking;
        const { dataSource: b2 } = nextProps;
        return (a1 !== a2) || (b1 !== b2);
    }
    
    render() {
        const {
            start,
            end,
            numCourt,
            bookingData
        } = this.props.dataSource;
        const { selectedBooking, selectedDate } = this.props.Booking;

        return (
            <StyledRow key={this.props.i} type='flex' align='middle'>
                <Col className='duration' xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    <div className='start-time'>
                        <Label msg={start} noTranslate/>
                    </div>
                    <div className='line-container'>
                        <div className='line' />
                    </div>
                    <div className='end-time'>
                        <Label msg={end} noTranslate/>
                    </div>
                </Col>
                <Col className='slot-container' xs={24} sm={24} md={24} lg={24} xl={12} xxl={12}>
                    {
                        _.range(0, numCourt).map((num) => {
                            let selected = false;
                            if (selectedBooking[start] && selectedBooking[start][num])
                                selected = true;

                            const data = {
                                start,
                                court: num,
                                bookingData: !bookingData ? null : bookingData[num],
                                selected,
                                date: selectedDate
                            }

                            return (
                                <BookingSlot 
                                    key={num} 
                                    index={num} 
                                    dataSource={data}
                                    onEdit={this.handleEdit}
                                    onSelect={this.handleSelect}
                                />
                            )
                        })
                    }
                </Col>
            </StyledRow>
        )
    }

    handleSelect = (data) => {
        const { profile } = this.props.Auth;
        profile && this.props.selectBooking(data);
    }

    handleEdit = (data) => {
        const { profile } = this.props.Auth;
        if ((profile.userId === data.userId) || (profile.position === 'admin')) {
            const { myBills } = this.props.Bill;
            const bill = myBills.find((bill) => bill.billId === data.billId);
            const booking = bill.bookings.find((b) => b.bookingId === data.bookingId);
            booking && this.props.showEditBookingModal(booking);
        } 
    }

}

export default connect(
    state => state,
    { ...BookingAction, ...ModalAction},
)(BookingCard);