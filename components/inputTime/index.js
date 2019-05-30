import React from 'react';
import StyledWarpper from './inputTime.style';
import { Select } from 'antd';
import _ from 'lodash';
import moment from 'moment';

const SelectOption = Select.Option;

class InputTime extends React.Component {

    constructor(props) {
        super(props);
        const { value } = props;

        const minute = value ? moment(value).minute() : 0;
        const hour = value ? moment(value).hour() : 0;

        this.state = {
            hour,
            minute,
        }

    }

    componentWillReceiveProps(nextProps) {
        const { value } = nextProps;

        const minute = value ? moment(value).minute() : 0;
        const hour = value ? moment(value).hour() : 0;

        this.setState({ hour, minute })
    }

    render() {
        const { value } = this.props;

        const minute = value ? moment(value).minute() : 0;
        const hour = value ? moment(value).hour() : 0;

        return (
            <StyledWarpper style={this.props.style}>
                <Select
                    defaultValue={hour}
                    value={hour}
                    onChange={this.changeHour}
                    disabled={this.props.disabled}
                >
                    {_.range(0, 24).map((hour) => (
                        <SelectOption key={hour} value={hour}>{hour.toString().padStart(2, '0')}</SelectOption>
                    ))}
                </Select>
                <div style={{ fontWeight: 'bold', marginLeft: 3, marginRight: 3 }}>:</div>
                <Select
                    defaultValue={minute}
                    value={minute}
                    onChange={this.changeMinute}
                    disabled={this.props.disabled}
                >
                    {[0, 30].map((minute) => (
                        <SelectOption key={minute} value={minute}>{minute.toString().padStart(2, '0')}</SelectOption>
                    ))}
                </Select>
            </StyledWarpper>
        )
    }

    changeMinute = (value) => {
        const { hour, minute } = this.state;
        if (minute === value) return;

        this.setState({ minute: value });
        this.props.onChange && this.props.onChange(moment().hour(hour).minute(value));
    }

    changeHour = (value) => {
        const { hour, minute } = this.state;
        if (hour === value) return;

        this.setState({ hour: value })
        this.props.onChange && this.props.onChange(moment().hour(value).minute(minute));
    }

}

export default InputTime;