import React from 'react';
import StyledWrapper from './style';
import Select, { SelectOption } from '../select';
import _ from 'lodash';
import moment from 'moment';

class SelectTime extends React.Component {
    render() {
        const value = this.props.value || moment();

        this.hour = value.hour();
        this.minute = 0;

        return (
            <StyledWrapper>
                <Select
                    value={this.hour}
                    onChange={(hour) => { this.handleChange(hour, this.minute) }}
                >
                    {_.range(0, 25).map((num) => (
                        <SelectOption key={num} value={num}>{num.toString().padStart(2, '0')}</SelectOption>
                    ))}
                </Select>
                <h2 style={{ marginLeft: 3, marginRight: 3 }}>:</h2>
                <Select
                    value={this.minute}
                    onChange={(minute) => { this.handleChange(this.hour, minute) }}
                >
                    {[0, 30].map((num) => (
                        <SelectOption key={num} value={num}>{num.toString().padStart(2, '0')}</SelectOption>
                    ))}
                </Select>
            </StyledWrapper>
        )
    }

    handleChange = (hour, minute) => {
        this.hour = hour;
        this.minute = minute;

        this.props.onChange && this.props.onChange({ hour, minute })
    }
}

export default SelectTime;