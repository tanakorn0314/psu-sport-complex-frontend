import React from 'react';
import {
    Select
} from 'antd';
import stadiums from './stadiumData';
import BookingAction from '../../../redux/booking/actions';
import { connect } from 'react-redux';

const { OptGroup, Option } = Select;

class SelectCourts extends React.Component {
    render() {
        let counter = -1;
        const {
            name,
            courtId,
            style,
            placeholder,
        } = this.props;
        return (
            <Select
                name={name || 'court'}
                onChange={this.handleChange}
                style={{width: 200, ...style}}
                placeholder={placeholder || 'Select court'}
                defaultValue={stadiums[0].courts[0]}
                value={courtId}
            >
                {stadiums.map((stadium, index) => {
                    return (
                        <OptGroup label={stadium.sport} key={index}>
                            {stadium.courts.map((court, i) => {
                                counter++;
                                return (
                                    <Option key={i} value={counter}>{court}</Option>
                                )
                            })}
                        </OptGroup>
                    )
                })}
            </Select>
        )
    }

    handleChange = (value) => {
        this.props.selectCourt(value);
    }
}

export default connect(
    state => state.Booking,
    BookingAction
)(SelectCourts)