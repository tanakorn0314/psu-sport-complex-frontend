import React from 'react';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import BookingAction from '../../../redux/booking/actions';
import SearchBooking from '../../../containers/searchBooking';
import ExportSummary from '../../../containers/exportSummary';
import BookingChart from '../../../containers/bookingChart';

class Summary extends React.Component {

    componentDidMount() {
        this.props.fetchAllBooking();
    }

    render() {
        return (
            <StyledWrapper>
                <SearchBooking style={{ marginBottom: 10 }} />
                <BookingChart style={{ marginBottom: 10 }} />
                <ExportSummary/>
            </StyledWrapper>
        )
    }
}

export default connect(state => state, BookingAction)(Summary);