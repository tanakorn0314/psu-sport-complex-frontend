import React from 'react';
import { Label } from '../typo';
import Select, { SelectOption } from '../select';
import { withNamespaces } from '../../i18n';
import { connect } from 'react-redux';

class SelectStadium extends React.Component {
    render() {
        let { t, onlyBookEnable, hideLabel, stadiums } = this.props;
        const defaultValue = this.props.defaultValue || 1;

        if (onlyBookEnable)
            stadiums = stadiums.filter(s => s.canBook)

        return (
            <div style={this.props.style} className={this.props.className}>
                {
                    !hideLabel && (
                        <div style={{ marginBottom: 3 }}>
                            <Label htmlFor='sport' msg='sport' />
                        </div>
                    )
                }
                <Select id='sport'
                    style={{ width: '100%', marginRight: 20 }}
                    defaultValue={defaultValue}
                    onChange={this.handleChange}
                >
                    {
                        stadiums.map((stadium, idx) => (
                            <SelectOption key={idx} value={stadium.stadiumId}>{t(stadium.name)}</SelectOption>
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

export default connect(state => state.Stadium)(withNamespaces('common')(SelectStadium));