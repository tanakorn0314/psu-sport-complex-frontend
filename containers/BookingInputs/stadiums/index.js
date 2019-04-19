import React from 'react';
import {
    Select
} from 'antd';
import BookingAction from '../../../redux/booking/actions';
import { connect } from 'react-redux';

const { Option } = Select;

class SelectStadium extends React.Component {
    render() {
        const {
            name,
            style,
            placeholder,
            Booking,
            Stadium
        } = this.props;
        const { stadiums } = Stadium;
        return (
            <Select
                name={name || 'stadium'}
                onChange={this.handleSelectStadium}
                style={{ width: 200, ...style }}
                placeholder={placeholder || 'Select stadium'}
                defaultValue={stadiums[Booking.stadiumId-1].name}
                value={stadiums[Booking.stadiumId-1].name}
            >
                {stadiums.map((stadium, index) => {
                    return (
                        <Option key={index} value={stadium.stadiumId}>{stadium.name}</Option>
                    )
                })}
            </Select>
        )
    }

    handleSelectStadium = (stadiumId) => {
        this.props.selectStadium(stadiumId);
    }
}

export default connect(
    state => state,
    BookingAction
)(SelectStadium)