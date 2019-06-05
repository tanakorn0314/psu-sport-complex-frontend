import React from 'react';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import BookingAction from '../../../redux/booking/actions';
import SearchBooking from '../../../containers/searchBooking';
import BookingList from '../../../containers/bookingList';
import BookingSummary from '../../../containers/bookingSummary';
import BookingChart from '../../../containers/bookingChart';

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