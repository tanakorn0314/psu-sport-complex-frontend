import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

class DatePick extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            date: props.value ? props.value : moment()
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            date: nextProps.value ? nextProps.value : moment()
        })
    }

    render() {
        const { date } = this.state;
        return <DatePicker
                    style={this.props.style}
                    value={date}
                    defaultValue={date}
                    defaultPickerValue={date}
                    onChange={this.handleChange}
                />
    }

    handleChange = date => {
        this.setState({date})
        this.props.onChange && this.props.onChange(date);
    }
}

export default DatePick;