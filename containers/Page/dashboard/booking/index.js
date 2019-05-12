import React from 'react';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import BookingAction from '../../../../redux/booking/actions';
import SearchBooking from '../../../AdminComponents/SearchBooking';
import BookingList from '../../../AdminComponents/BookingList';
import BookingSummary from '../../../AdminComponents/BookingSummary';
import BookingChart from '../../../AdminComponents/BookingChart';

class Booking extends React.Component {

    componentDidMount() {
        this.props.fetchAllBooking();
    }

    render() {
        return (
            <StyledWrapper>
                <SearchBooking style={{ marginBottom: 10 }} />
                <BookingChart style={{ marginBottom: 10 }} />
                <BookingList style={{ marginBottom: 10 }} />
                <BookingSummary/>
            </StyledWrapper>
        )
    }
}

export default connect(state => state, BookingAction)(Booking);