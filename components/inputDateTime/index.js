import React from 'react';
import { DateSelctContainer, TimeSelectContainer } from './style';
import Select, { SelectOption } from '../select';
import _ from 'lodash';
import moment from 'moment';
import { months } from '../../common/text';
import { i18n, withNamespaces } from '../../i18n';

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

    componentWillReceiveProps(nextProps) {
        if (this.props.refreshCurrent) {
            this.changeMinute(moment().minute());
            this.changeHour(moment().hour());
            this.changeDate(moment().date());
            this.changeMonth(moment().month());
            this.changeYear(moment().year());
        } else {
            this.changeMinute(nextProps.minute);
            this.changeHour(nextProps.hour);
            this.changeDate(nextProps.date);
            this.changeMonth(nextProps.month);
            this.changeYear(nextProps.year);
        }
    }

    render() {
        const {
            minute,
            hour,
            date,
            month,
            year
        } = this.state;
        const locale = i18n.language || 'en';
        const MONTHS = months[locale];

        return (
            <div style={this.props.style}>
                <DateSelctContainer style={this.props.dateContainerStyle}>
                    <Select
                        value={date}
                        defaultValue={date}
                        onChange={this.changeDate}
                        className='select-day'
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
                        className='select-year'
                    >
                        {_.range(1900, parseInt(moment().year()) + 1).map((y) => (
                            <SelectOption key={y} value={y} >{y}</SelectOption>
                        ))}
                    </Select>
                </DateSelctContainer>
                <TimeSelectContainer style={this.props.timeContainerStyle}>
                    <Select
                        value={hour}
                        defaultValue={hour}
                        onChange={this.changeHour}
                        className='select-hour'
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
                        className='select-minute'
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
        const { minute } = this.state;
        if (minute === value)  return ;

        this.setState({ minute: value });
        this.props.onChange && this.props.onChange('minute', value);
    }

    changeHour = (value) => {
        const { hour } = this.state;
        if (hour === value)  return ;

        this.setState({ hour: value })
        this.props.onChange && this.props.onChange('hour', value);
    }

    changeDate = (value) => {
        const { date } = this.state;
        if (date === value)  return ;

        this.setState({ date: value })
        this.props.onChange && this.props.onChange('date', value);
    }

    changeMonth = (value) => {
        const { month } = this.state;
        if (month === value)  return ;
        
        this.setState({ month: value })
        this.props.onChange && this.props.onChange('month', value);
    }

    changeYear = (value) => {
        const { year } = this.state;
        if (year === value)  return ;

        this.setState({ year: value })
        this.props.onChange && this.props.onChange('year', value);
    }

}

export default withNamespaces('common')(InputDateTime);