import React from 'react';
import { Tag } from 'antd';

export default (props) => {
    const { status } = props;
    let tagColor;
    switch (status) {
        case 'paid': tagColor = 'green'; break;
        case 'unpaid': tagColor = 'red'; break;
        default: tagColor = 'black';
    }
    return <Tag color={tagColor}>{status}</Tag>
}