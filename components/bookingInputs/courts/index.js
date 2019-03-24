import React from 'react';
import {
    Select
} from 'antd';
import stadiums from './stadiums';
import BookingInputAction from '../../../redux/bookingInput/actions';
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
                style={style}
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
        this.props.onChange && this.props.onChange(value);
    }
}

export default connect(
    state => state.BookingInput,
    BookingInputAction
)(SelectCourts)