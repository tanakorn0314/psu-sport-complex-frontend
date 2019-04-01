import React from 'react';
import timeData from './timeData';
import { Select } from 'antd';


const { Option, OptGroup } = Select;

class SelectTime extends React.Component {
    render() {
        const { onChange, style } = this.props;
        return (
            <Select
                style={{width: 200, ...style}}
                onChange={onChange}
                defaultValue={timeData[0]}
            >
                <OptGroup label='start time'>
                    {timeData.map((time, index) => <Option key={index} value={time}>{time}</Option>)}
                </OptGroup>
            </Select>
        )
    }
}

export default SelectTime;