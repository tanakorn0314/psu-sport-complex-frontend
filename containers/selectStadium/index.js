import React from 'react';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import { Label } from '../../components/typo';
import fonts from '../../styles/fonts';
import text from '../../common/text';

import { Select } from 'antd';

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
        const sName = stadium ? stadium.name : 'all'
        return (
            <Select
                name={name || 'stadium'}
                onChange={this.handleSelectStadium}
                style={{ width: 200, ...style, fontFamily: fonts.psuStidti }}
                placeholder={placeholder || 'Select stadium'}
                value={text[sName]}
            >
                {enableAll && <Option key={0} value={0}><Label msg='all'/></Option>}
                {stadiums.map((s, index) => {
                    return (
                        <Option key={index} value={s.stadiumId}><Label msg={s.name}/></Option>
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