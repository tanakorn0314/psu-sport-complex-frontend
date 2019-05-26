import React from 'react';
import {
    Select
} from 'antd';
import BookingAction from '../../../redux/booking/actions';
import { connect } from 'react-redux';

const { Option } = Select;

class SelectStadium extends React.Component {

    componentDidMount() {
        const { enableAll } = this.props;
        if (enableAll) {
            this.props.selectStadium(0);
        }
    }

    render() {
        const {
            name,
            style,
            placeholder,
            Booking,
            Stadium,
            enableAll
        } = this.props;
        const { stadiums } = Stadium;
        const stadium = stadiums[Booking.stadiumId - 1]
        const sName = stadium ? stadium.name : 'All'
        return (
            <Select
                name={name || 'stadium'}
                onChange={this.handleSelectStadium}
                style={{ width: 200, ...style }}
                placeholder={placeholder || 'Select stadium'}
                value={sName}
            >
                {enableAll && <Option key={0} value={0}>All</Option>}
                {stadiums.map((s, index) => {
                    return (
                        <Option key={index} value={s.stadiumId}>{s.name}</Option>
                    )
                })}
            </Select>
        )
    }

    handleSelectStadium = async (stadiumId) => {
        await this.props.selectStadium(stadiumId);

        this.props.onChange && await this.props.onChange(stadiumId)
    }
}

export default connect(
    state => state,
    BookingAction
)(SelectStadium)