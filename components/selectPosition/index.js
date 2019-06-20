import React from 'react';
import Select, { SelectOption } from '../../components/select'
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

    handleChange = position => {
        this.props.onChange && this.props.onChange(position)
    }
}

export default withNamespaces('common')(SelectPosition);