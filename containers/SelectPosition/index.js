import React from 'react';
import { Select } from 'antd';
import { connect } from 'react-redux';
import BookingActions from '../../redux/booking/actions';

const positions = ['general public', 'member', 'staff', 'student', 'admin'];

class SelectPosition extends React.Component {
    render() {
        return (
            <Select
                style={{width: '100%', maxWidth: 300}}
                onChange={this.handleChange}
                defaultValue={positions[0]}
            >
                {positions.map((position, index) => (
                    <Select.Option key={index} value={position}>{position}</Select.Option>
                ))}
            </Select>
        )
    }

    componentDidMount() {
        this.props.setOwnerPosition(positions[0]);
    }

    handleChange = position => {
        this.props.setOwnerPosition(position);
    }
}

export default connect(state => state, BookingActions)(SelectPosition);