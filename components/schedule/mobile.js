import React from 'react';
import StyleWrapper, { Event } from './mobile.style';
import {
    generateFullWeekdays,
    groupEventByDate,
    filterEvents,
    getnerateDateTitle,
    toRangeStr
} from './dataHandler';
import initData from './initData';
import {
    Button,
    Row,
    Col
} from 'antd';
import SelectCourt from '../../containers/BookingInputs/courts';
import { colors } from '../../styles/constants/colors';

const userColors = {};
const { initEventGroup } = initData;

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        const events = groupEventByDate(props.eventGroups);
        this.state = {
            date: new Date(),
            scheduleTitle: getnerateDateTitle(new Date()),
            weekDays: generateFullWeekdays(new Date()),
            allEvent: events,
            eventGroups: filterEvents(new Date(), events),
        }
    }

    componentWillReceiveProps(nextProps) {
        const events = groupEventByDate(nextProps.eventGroups);
        this.setState({
            allEvent: events,
            eventGroups: filterEvents(this.state.date, events)
        });
    }

    render() {
        const { weekDays, eventGroups } = this.state;
        return (
            <StyleWrapper>
                <Row style={{paddingLeft: 20, paddingRight: 20, marginBottom: 10}} gutter={3}>
                    <Col span={16} style={{ display: 'flex'}}>
                        <SelectCourt style={{ width: 140 }} />
                    </Col>
                    <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button onClick={this.showPrevWeek}>Back</Button>
                        <Button onClick={this.showNextWeek}>Next</Button>
                    </Col>
                </Row>
                <div className='schedule-wrapper'>
                    {initEventGroup.map((event, index) => (
                        <div className='events' key={index}>
                            <div className='date'>{weekDays[index]}</div>
                            <div className='events-row'>
                                {eventGroups[index].length > 0 ?
                                    eventGroups[index].map((event, i) => {
                                        if (!userColors[event.userId]) {
                                            const len = colors.pool.length;
                                            const ran = Math.floor(Math.random() * len);
                                            userColors[event.userId] = colors.pool[ran];
                                        }
                                        const color = userColors[event.userId];
                                        return (
                                            <Event key={i} color={color}>
                                                <div className='time'>{toRangeStr(event)}</div>
                                                <div className='title'>{event.owner.fname}</div>
                                            </Event>
                                        )
                                    }) :
                                    <Event>
                                        <div >Didn't have any reservation</div>
                                    </Event>}
                            </div>
                        </div>
                    ))}
                </div>
            </StyleWrapper>
        )
    }

    showNextWeek = () => {
        this.changeWeek(7);
    }

    showPrevWeek = () => {
        this.changeWeek(-7);
    }

    changeWeek = (d) => {
        let {
            date,
            scheduleTitle,
            weekDays,
            eventGroups,
            allEvent
        } = this.state;

        date = new Date(date.toISOString());
        date.setDate(date.getDate() + d);
        scheduleTitle = getnerateDateTitle(date);
        weekDays = generateFullWeekdays(date);
        eventGroups = filterEvents(date, allEvent);

        this.setState({
            date,
            scheduleTitle,
            weekDays,
            eventGroups
        });
    }
}

export default Schedule;