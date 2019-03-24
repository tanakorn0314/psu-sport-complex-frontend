import React from 'react';
import { DatePicker } from 'antd';
import moment from 'moment';

const InputDate = props => (
    <DatePicker 
        style={{width: 200, ...props.style}}
        defaultValue={moment(new Date(), 'YYYY/MM/DD')}
        onChange={props.onChange}
    />
);

export default InputDate;