import React from 'react';
import DatePicker from '../datePicker';
import SelectTime from '../selectTime';
import moment from 'moment';
import { i18n, withNamespaces } from '../../i18n';

class InputDateTime extends React.Component {
    render() {
        const locale = i18n.language || 'en';
        const value = this.props.value || moment();

        this.date = value.date();
        this.month = value.month();
        this.year = value.year();
        this.hour = value.hour();
        this.minute = value.minute();

        return (
            <div>
                <DatePicker 
                    style={{marginRight: 10}}
                    value={value.locale(locale)}
                    onChange={this.handleChangeDate}
                    format='DD MMMM YYYY'
                />
                <SelectTime 
                    value={value}
                    onChange={this.handleChangeTime}
                />
            </div>
        )
    }

    handleChangeDate = (date) => {
        this.date = date.date();
        this.month = date.month();
        this.year = date.year();

        this.handleChange();
    }

    handleChangeTime = (time) => {
        this.hour = time.hour;
        this.minute = time.minute;

        this.handleChange();
    }

    handleChange = () => {
        const { date, month, year, hour, minute } = this;

        const m = moment().date(date).month(month).year(year).hour(hour).minute(minute).second(0).millisecond(0);

        this.props.onChange && this.props.onChange(m);
    }
}

export default withNamespaces('common')(InputDateTime);