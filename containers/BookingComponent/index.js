import React from 'react';
import _ from 'lodash';
import BookingCard from '../BookingCard';
import StyledWrapper from './style';
import dataHandler from './dataHandler';
import { operationTime } from '../../commonData';
import { connect } from 'react-redux';

class BookingComponent extends React.Component {

    render() {
        const { stadiumBooking, selectedDate } = this.props.Booking;
        const bookingData = dataHandler.seperateDataByStartTime(stadiumBooking, selectedDate);

        return (
            <StyledWrapper>
                {this.renderCards(bookingData)}
            </StyledWrapper>
        )
    }

    renderCards(bookingData) {
        const { stadiumId } = this.props.Booking;
        const { stadiums } = this.props.Stadium;
        const stadium = stadiums[stadiumId - 1]
        const len = operationTime.length;
        const cards = [];

        for(let i = 1; i < len; i ++ ) {
            const dataSource = {
                start: operationTime[i-1], 
                end: operationTime[i],
                numCourt: stadium.numCourt,
                bookingData: bookingData[operationTime[i-1]]
            }
            cards.push(<BookingCard key={i} dataSource={dataSource}/>)
        }

        return cards;
    }
}

export default connect(state => state)(BookingComponent);