import React from 'react';
import StyledWarpper from './inputDate.style';
import { Select } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux';
import BookingActions from '../../../redux/booking/actions';

const SelectOption = Select.Option;

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

class SelectDate extends React.Component {

    constructor(props) {
        super(props);
        const defaultDate = moment(props.Booking.selectedDate);

        console.log(defaultDate);

        const day = defaultDate ? defaultDate.get('date') : 1;
        const month = defaultDate ? defaultDate.get('month') : 0;
        const year = defaultDate ? defaultDate.get('year') : 1999;
        
        this.state = {
            day,
            month,
            year
        }

        this.updateDate();
    }

    render() {
        const { day, month, year } = this.state;
        const thisYear = parseInt(moment().format('YYYY'));
        return (
            <StyledWarpper style={this.props.style}>
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
                    className='select-month'
                    style={{width: '100%'}}
                >
                    {MONTHS.map((month, index) => (
                        <SelectOption key={month} value={index} >{month}</SelectOption>
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
        const { day, month, year } = this.state;

        const date = moment();
        date.set('day', day);
        date.set('month', month);
        date.set('year', year);
        this.props.onChange && this.props.selectDate(date)
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

export default connect(state => state, BookingActions)(SelectDate);