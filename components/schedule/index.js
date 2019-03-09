import React from 'react';
import { todayIndex } from '../../utils/date-utils';
import {
    ScheduleWrapper,
    Event
} from './style';
import {
    groupEventByDate,
    generateWeekdays,
    getnerateDateTitle,
    filterEvents,
    calculateSlot
} from './dataHandler';
import Button, { ButtonGroup } from '../uielements/button';
import _ from 'lodash';
import { colors } from '../../styles/constants/colors';

const userColors = {};

class Schedule extends React.Component {

    constructor(props) {
        super(props);
        const events = groupEventByDate(props.eventGroups);
        this.state = {
            date: new Date(),
            scheduleTitle: getnerateDateTitle(new Date()),
            weekDays: generateWeekdays(new Date()),
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
        const { times } = this.props;
        const { scheduleTitle, weekDays, eventGroups } = this.state;

        return (
            <ScheduleWrapper>
                <div className='top-container'>
                    <div className='top-left'>
                        <ButtonGroup>
                            <Button onClick={this.showPrevWeek}>BACK</Button>
                            <Button onClick={this.showNextWeek}>NEXT</Button>
                        </ButtonGroup>
                    </div>
                    <div className='top-center'>
                        <h4>{scheduleTitle}</h4>
                    </div>
                    <div className='top-right'>
                        <ButtonGroup>
                            <Button>Week</Button>
                            <Button>Day</Button>
                        </ButtonGroup>
                    </div>
                </div>
                <div className='schedule'>
                    <div className='schedule-top'>
                        <div className='schedule-top-item schedule-left'></div>
                        {weekDays.map((item, index) => (
                            <div key={index} className='schedule-top-item'>{item}</div>
                        ))}
                    </div>
                    <div className='schedule-content'>
                        <div className='schedule-content-column schedule-left'>
                            {times.map((item, index) => (
                                <div key={index} className='schedule-content-row-item'>{item}</div>
                            ))}
                        </div>
                        {eventGroups.map((events, k) => (
                            <div key={k} className='schedule-content-column'>
                                {times.map((item, index) => (
                                    <div key={index} className='schedule-content-row-item'>{''}</div>
                                ))}
                                <div className='schedule-content-event'>
                                    {events.map((event, i) => {
                                        const slot = calculateSlot(event);
                                        if (!userColors[event.userId]) {
                                            const len = colors.pool.length;
                                            const ran = Math.floor(Math.random() * len);
                                            userColors[event.userId] = colors.pool[ran];
                                        }
                                        const color = userColors[event.userId];
                                        return slot.start >= 0 ?
                                            (<Event key={i} background={color} start={slot.start} length={slot.length}>
                                                {event.owner.fname}
                                            </Event>) : (<div key={i} />)
                                    })}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </ScheduleWrapper>
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
        weekDays = generateWeekdays(date);
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