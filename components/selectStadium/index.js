import React from 'react';
import { Label } from '../typo';
import Select, { SelectOption } from '../select';
import { withNamespaces } from '../../i18n';

class SelectStadium extends React.Component {
    render() {
        const { t } = this.props;
        const defaultValue = this.props.defaultValue || 1;
        const stadiums = this.props.stadiums || [];

        return (
            <div style={this.props.style} className={this.props.className}>
                <div style={{ marginBottom: 3 }}>
                    <Label htmlFor='sport' msg='sport' />
                </div>
                <Select id='sport'
                    style={{width: '100%', marginRight: 20}}
                    defaultValue={defaultValue}
                    onChange={this.handleChange}
                >
                    {
                        stadiums.map((stadium, idx) => (
                            <SelectOption key={idx} value={idx}>{t(stadium.name)}</SelectOption>
                        ))
                    }
                </Select>
            </div>
        )
    }

    handleChange = (id) => {
        this.props.onChange && this.props.onChange(id);
    }
}

export default withNamespaces('common')(SelectStadium);