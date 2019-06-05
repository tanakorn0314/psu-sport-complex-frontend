import React from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import fonts from '../../styles/fonts';
import { locale } from '../../common/text';

const StyledDatePicker = styled(DatePicker)`
    font-family: ${fonts.psuStidti}
`

class InputDate extends React.Component {

    render() {
        return (
            <StyledDatePicker 
                style={{width: 200, ...this.props.style}}
                value={moment(this.props.selectedDate).locale('th')}
                onChange={this.handleChange}
                format='DD MMMM YYYY'
            />
        )
    }

    handleChange = (date) => {
        this.props.selectDate(date);
        this.props.onChange && this.props.onChange(date);
    }
}

export default connect(state => state.Booking, BookingAction)(InputDate);