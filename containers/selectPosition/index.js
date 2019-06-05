import React from 'react';
import Select, { SelectOption } from '../../components/select'
import { connect } from 'react-redux';
import BookingActions from '../../redux/booking/actions';
import text, { positions } from '../../common/text';

class SelectPosition extends React.Component {
    render() {
        return (
            <Select
                style={{...this.props.style, width: '100%', maxWidth: 300}}
                onChange={this.handleChange}
                defaultValue={positions[0]}
            >
                {positions.map((position, index) => (
                    <SelectOption key={index} value={position}>{text[position]}</SelectOption>
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