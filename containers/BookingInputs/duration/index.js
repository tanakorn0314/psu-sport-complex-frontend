import React from 'react';
import { Select } from 'antd';
import durationData from './durationData';

const { Option, OptGroup } = Select;

const SelectDuration = props => (
    <Select
        style={{width: 200, ...props.style}}
        onChange={props.onChange}
        defaultValue={0}
        placeholder='Duration'
    >
        <OptGroup label='duration'>
            {durationData.map(([duration], index) => <Option key={index} value={index}>{duration}</Option>)}
        </OptGroup>
    </Select>
);

export default SelectDuration;