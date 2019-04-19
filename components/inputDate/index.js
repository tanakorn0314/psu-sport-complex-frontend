import React from 'react';
import StyledWarpper from './inputDate.style';
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

class InputDate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            day: 1,
            month: 'January',
            year: 1999
        }
        this.updateDate();
    }

    render() {
        const { day, month, year } = this.state;
        const thisYear = parseInt(moment().format('YYYY'));
        return (
            <StyledWarpper>
                <Select
                    defaultValue={day}
                    onChange={this.changeDay}
                    showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0}
                >
                    {_.range(1, 31).map((day) => (
                        <SelectOption key={day} value={day}>{day}</SelectOption>
                    ))}
                </Select>
                <Select
                    defaultValue={month}
                    onChange={this.changeMonth}
                    showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0}
                >
                    {MONTHS.map((month, index) => (
                        <SelectOption key={month} value={index + 1} >{month}</SelectOption>
                    ))}
                </Select>
                <Select
                    defaultValue={year}
                    onChange={this.changeYear}
                    showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) => option.props.children.toString().toLowerCase().indexOf(input.toString().toLowerCase()) >= 0}
                >
                    {_.range(1900, parseInt(thisYear) + 1).map((year) => (
                        <SelectOption key={year} value={year} >{year}</SelectOption>
                    ))}
                </Select>
            </StyledWarpper>
        )
    }

    updateDate = () => {
        const d = this.state.day.toString().padStart(2, '0');
        const m = this.state.month.toString().padStart(2, '0');
        const y = this.state.year;
        this.props.onChange && this.props.onChange(moment(`${y}${m}${d}`))
    }

    changeDay = day => {
        this.setState({ day }, () => {
            this.updateDate();
        })
    }

    changeMonth = month => {
        this.setState({ month }, () => {
            this.updateDate();
        })
    }

    changeYear = year => {
        this.setState({ year }, () => {
            this.updateDate();
        })
    }
}

export default InputDate;