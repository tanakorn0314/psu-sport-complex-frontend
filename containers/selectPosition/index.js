import React from 'react';
import Select, { SelectOption } from '../../components/select'
import { connect } from 'react-redux';
import BookingActions from '../../redux/booking/actions';
import { positions } from '../../common/text';
import { withNamespaces } from '../../i18n';

class SelectPosition extends React.Component {
    render() {
        const { t } = this.props;
        return (
            <Select
                style={{...this.props.style, width: '100%', maxWidth: 300}}
                onChange={this.handleChange}
                defaultValue={positions[0]}
            >
                {positions.map((position, index) => (
                    <SelectOption key={index} value={position}>{t(position)}</SelectOption>
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

export default connect(state => state, BookingActions)(withNamespaces('common')(SelectPosition));