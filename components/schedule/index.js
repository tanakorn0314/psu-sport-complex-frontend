import React from 'react';
import { todayIndex } from '../../utils/date-utils';
import {
    ScheduleWrapper,
    Event
} from './style';
import demoData from './demoData';
import { groupEventByDate, generateWeekdays, getnerateDateTitle, filterEvents } from './dataHandler';
import Button, { ButtonGroup } from '../uielements/button';
import _ from 'lodash';

class Schedule extends React.Component {

    constructor(props) {
        super(props);
        const events = groupEventByDate(demoData);
        this.state = {
            date: new Date(),
            scheduleTitle: getnerateDateTitle(new Date()),
            weekDays: generateWeekdays(new Date()),
            allEvent: events,
            eventGroups: filterEvents(new Date(), events)
        }
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
                                        const random = Math.floor(Math.random() * 10);
                                        return (<Event key={i} length={2} start={0}></Event>)
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