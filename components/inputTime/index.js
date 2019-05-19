import React from 'react';
import StyledWarpper from './inputTime.style';
import { Select } from 'antd';
import _ from 'lodash';
import moment from 'moment';

const SelectOption = Select.Option;

class InputTime extends React.Component {

    constructor(props) {
        super(props);
        const defaultDate = props.defaultValue;

        const minute = defaultDate ? defaultDate.minute() : 0;
        const hour = defaultDate ? defaultDate.hour() : 0;

        this.state = {
            hour,
            minute,
        }
    
        this.updateTime();
    }

    render() {
        const { hour, minute } = this.state;
        return (
            <StyledWarpper style={this.props.style}>
                <Select
                    defaultValue={hour}
                    onChange={this.changeHour}
                    disabled={this.props.disabled}
                >
                    {_.range(0, 24).map((hour) => (
                        <SelectOption key={hour} value={hour}>{hour.toString().padStart(2,'0')}</SelectOption>
                    ))}
                </Select>
                <h2>:</h2>
                <Select
                    defaultValue={minute}
                    onChange={this.changeMinute}
                    disabled={this.props.disabled}
                >
                    {_.range(0, 60).map((minute) => (
                        <SelectOption key={minute} value={minute}>{minute.toString().padStart(2,'0')}</SelectOption>
                    ))}
                </Select>
            </StyledWarpper>
        )
    }

    updateTime = () => {
        const { hour, minute } = this.state;
        const time = moment();
        time.set('hour', hour);
        time.set('minute', minute);
        this.props.onChange && this.props.onChange(time)
    }

    changeHour = hour => {
        this.setState({ hour }, () => {
            this.updateTime();
        })
    }

    changeMinute = minute => {
        this.setState({ minute }, () => {
            this.updateTime();
        })
    }

}

export default InputTime;