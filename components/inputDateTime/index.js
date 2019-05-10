import React from 'react';
import { DateSelctContainer, TimeSelectContainer } from './inputDateTime.style';
import Select, { SelectOption } from '../uielements/select';
import _ from 'lodash';
import moment from 'moment';

const MONTHS = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'Sebtember',
    'October',
    'November',
    'December'
]

class InputDateTime extends React.Component {

    constructor(props) {
        super(props);
        const {
            minute,
            hour,
            date,
            month,
            year
        } = props;

        this.state = {
            minute,
            hour,
            date,
            month,
            year
        };
    }

    componentWillReceiveProps() {
        this.changeMinute(moment().minute());
        this.changeHour(moment().hour());
        this.changeDate(moment().date());
        this.changeMonth(moment().month());
        this.changeYear(moment().year());
    }

    render() {
        const {
            minute,
            hour,
            date,
            month,
            year
        } = this.state;

        return (
            <div style={this.props.style}>
                <DateSelctContainer>
                    <Select
                        value={date}
                        defaultValue={date}
                        onChange={this.changeDate}
                    >
                        {_.range(1, 31).map((day) => (
                            <SelectOption key={day} value={day}>{day}</SelectOption>
                        ))}
                    </Select>
                    <Select
                        value={month}
                        defaultValue={month}
                        onChange={this.changeMonth}
                        className='select-month'
                    >
                        {MONTHS.map((m, index) => (
                            <SelectOption key={m} value={index} >{m}</SelectOption>
                        ))}
                    </Select>
                    <Select
                        value={year}
                        defaultValue={year}
                        onChange={this.changeYear}
                    >
                        {_.range(1900, parseInt(moment().year()) + 1).map((y) => (
                            <SelectOption key={y} value={y} >{y}</SelectOption>
                        ))}
                    </Select>
                </DateSelctContainer>
                <TimeSelectContainer>
                    <Select
                        value={hour}
                        defaultValue={hour}
                        onChange={this.changeHour}
                    >
                        {_.range(0, 24).map((h) => (
                            <SelectOption key={h} value={h}>{h.toString().padStart(2, '0')}</SelectOption>
                        ))}
                    </Select>
                    <h2>:</h2>
                    <Select
                        value={minute}
                        defaultValue={minute}
                        onChange={this.changeMinute}
                    >
                        {_.range(0, 60).map((m) => (
                            <SelectOption key={m} value={m}>{m.toString().padStart(2, '0')}</SelectOption>
                        ))}
                    </Select>
                </TimeSelectContainer>
            </div>
        )
    }

    changeMinute = (value) => {
        this.setState({minute: value});
        this.props.onChange && this.props.onChange('minute', value);
    }

    changeHour = (value) => {
        this.setState({hour: value})
        this.props.onChange && this.props.onChange('hour', value);
    }

    changeDate = (value) => {
        this.setState({date: value})
        this.props.onChange && this.props.onChange('date', value);
    }

    changeMonth = (value) => {
        this.setState({month: value})
        this.props.onChange && this.props.onChange('month', value);
    }

    changeYear = (value) => {
        this.setState({year: value})
        this.props.onChange && this.props.onChange('year', value);
    }

}

export default InputDateTime;