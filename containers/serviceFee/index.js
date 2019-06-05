import React from 'react';
import { connect } from 'react-redux';

class ServiceFee extends React.Component {
    render() {
        const { fee } = this.props.Booking;
        return (
            <h2>Service fee : {fee} baht</h2>
        )
    }
}

export default connect(state => state)(ServiceFee);