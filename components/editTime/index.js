import React from 'react';
import { DatePicker } from 'antd';
import InputTimeRange from '../inputTimeRange';

class EditTime extends React.Component {
    render() {
        const { 
            stadiumName, 
            currentDateStr, 
            onChangeDate, 
            onChangeTime,
            date,
            startTime,
            endTime
        } = this.props;
        return [
            <div>
                <h3>{stadiumName}</h3>
                <p>{currentDateStr}</p>
                <p>Change Schedule to</p>
                <DatePicker
                    style={{ marginBottom: 10 }}
                    value={date}
                    onChange={onChangeDate}
                    format='MMM DD, YYYY'
                />
                <InputTimeRange
                    start={startTime}
                    end={endTime}
                    onChange={onChangeTime}
                    endDisabled
                />
            </div>
        ]
    }
}

export default EditTime;