import React from 'react';
import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import { Label } from '../../components/typo';
import fonts from '../../styles/fonts';
import { withNamespaces } from '../../i18n';

import { Select } from 'antd';

const { Option } = Select;

class SelectStadium extends React.Component {

    render() {
        const {
            name,
            style,
            placeholder,
            Booking,
            Stadium,
            t
        } = this.props;
        const { stadiums } = Stadium;
        const stadium = stadiums[Booking.stadiumId - 1]
        const sName = stadium.name;
        return (
            <Select
                name={name || 'stadium'}
                onChange={this.handleSelectStadium}
                style={{ width: 200, ...style, fontFamily: fonts.psuStidti }}
                placeholder={placeholder || 'Select stadium'}
                value={t(sName)}
            >
                {stadiums.map((s, index) => {
                    if (s.canBook)
                        return (
                            <Option key={index} value={s.stadiumId}><Label msg={s.name} /></Option>
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
)(withNamespaces('common')(SelectStadium))