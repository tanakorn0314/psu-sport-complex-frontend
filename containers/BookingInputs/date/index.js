import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingAction from '../../../redux/booking/actions';

class InputDate extends React.Component {

    render() {
        return (
            <DatePicker 
                style={{width: 200, ...this.props.style}}
                value={moment(this.props.selectedDate)}
                onChange={this.handleChange}
            />
        )
    }

    handleChange = (date) => {
        this.props.selectDate(date);
        this.props.onChange && this.props.onChange(date);
    }
}

export default connect(state => state.Booking, BookingAction)(InputDate);