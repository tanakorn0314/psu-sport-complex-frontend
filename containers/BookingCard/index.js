import React from 'react';
import _ from 'lodash';
import {
    Col
} from 'antd';
import { connect } from 'react-redux';
import StyledRow from './style';
import BookingAction from '../../redux/booking/actions';
import BookingSlot from '../../components/bookingSlot';

class BookingCard extends React.Component {
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
                        {start}
                    </div>
                    <div className='line-container'>
                        <div className='line' />
                    </div>
                    <div className='end-time'>
                        {end}
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
                                <BookingSlot key={num} index={num} dataSource={data} onSelect={this.handleSelect} />
                            )
                        })
                    }
                </Col>
            </StyledRow>
        )
    }

    handleSelect = async data => {
        await this.props.selectBooking(data);
    }
}

export default connect(
    state => state,
    BookingAction,
)(BookingCard);