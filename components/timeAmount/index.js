import React from 'react';
import Select, { SelectOption } from '../select';
import { withNamespaces } from '../../i18n';
import { Label } from '../typo';

const MAX_HOUR = 12;

class TimeAmount extends React.Component {
    render() {
        const { label, t } = this.props;
        const { hour, minute } = this.extractValue();

        return (
            <tr>
                <td style={{paddingRight: 5}}>
                    <Label msg={label} />
                </td>
                <td style={{paddingRight: 5}}>
                    <Select
                        onChange={this.handleChangeHour}
                        value={hour}
                    >
                        {_.range(0, MAX_HOUR).map((num) => (
                            <SelectOption key={num} value={num}>{num}</SelectOption>
                        ))}
                    </Select>
                </td>
                <td style={{paddingRight: 5}}>
                    <Label msg='hour' />
                </td>
                <td style={{paddingRight: 5}}>
                    <Select
                        onChange={this.handleChangeMinute}
                        value={minute}
                    >
                        {[0, 30].map((num) => (
                            <SelectOption key={num} value={num}>{num}</SelectOption>
                        ))}
                    </Select>
                </td>
                <td>
                    <Label msg='minute' />
                </td>
            </tr>
        )
    }

    extractValue = () => {
        const [hour, minute] = this.props.value.split(':');
        this.hour = +hour;
        this.minute = +minute;
        return {
            hour: +hour,
            minute: +minute
        }
    }

    handleChangeHour = (hour) => {
        const minute = this.minute;

        const timeAmount = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

        this.props.onChange && this.props.onChange(timeAmount);
    }

    handleChangeMinute = (minute) => {
        const hour = this.hour;

        const timeAmount = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`

        this.props.onChange && this.props.onChange(timeAmount);
    }
}

export default withNamespaces('common')(TimeAmount);