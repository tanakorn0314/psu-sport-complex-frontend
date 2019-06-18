import React from 'react';
import { DatePicker } from 'antd';
import styled from 'styled-components';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import fonts from '../../styles/fonts';
import { i18n, withNamespaces } from '../../i18n';

const StyledDatePicker = styled(DatePicker)`
    font-family: ${fonts.psuStidti};
    .dropdown {
        color: red
    }
`

class InputDate extends React.Component {

    componentDidMount() {
        const { selectedDate } = this.props;
        this.props.selectDate(moment(selectedDate));
    }

    render() {
        const locale = i18n.language || 'en';
        return (
            <StyledDatePicker
                dropdownClassName='dropdown'
                style={{ width: 200, ...this.props.style }}
                value={moment(this.props.selectedDate).locale(locale)}
                onChange={this.handleChange}
                format='DD MMMM YYYY'
            />
        )
    }

    handleChange = (date) => {
        if (date) {
            this.props.selectDate(date);
            this.props.onChange && this.props.onChange(date);
        }
    }
}

export default connect(state => state.Booking, BookingAction)(withNamespaces('common')(InputDate));