import React from 'react';
import { todayIndex } from '../../utils/date-utils';
import { colors } from '../styles/constants/colors';

const unitHeight = 50;
const colorMap = {};

const Events = props => {
    const { topInfo, bookings } = props;
    return (
        <li className='events-group'>
            <div className='top-info'><span>{topInfo}</span></div>
            <ul>{bookings.map((booking, index) => {
                if (!colorMap[booking.userName]) {
                    const len = colors.pool.length;
                    const idx = Math.floor(Math.random() * len);
                    colorMap[booking.userName] = colors.pool[idx];
                }
                return (
                    <Event
                        key={index}
                        index={index}
                        title={booking.userName}
                        startDate={booking.startDate}
                        finishDate={booking.finishDate}
                        bg={colorMap[booking.userName]}
                    />)
            })}
            </ul>
            <style jsx>{`
                .events-group {
                    float: left;
                    border: 1px solid #eaeaea;
                    margin-bottom: 0px; 
                    min-width: 150px;
                }
                .events-group > .top-info {
                    display: table;
                    height: ${unitHeight}px;
                    border-bottom: 1px solid #eaeaea;
                    padding: 0px;
                    width: 100%;
                }
                .events-group > .top-info > span {
                    display: table-cell;
                    vertical-align: middle;
                    padding: 0 .5em;
                    text-align: center;
                    font-weight: 400;
                    margin-bottom: 0;
                }
                .events-group > ul {
                    position: relative;
                    height: ${props.times.length * unitHeight}px;
                    display: block;
                    overflow: visible;
                    padding: 0;
                }
            `}</style>
        </li>
    )
}


const Event = props => {
    const { title, startDate, finishDate, bg } = props;
    const startDateSlot = startDate.getHours() * 2 + (startDate.getMinutes() === 30 ? 1 : 0);
    const finishDateSlot = finishDate.getHours() * 2 + (finishDate.getMinutes() === 30 ? 1 : 0);
    const length = finishDateSlot - startDateSlot;
    console.log(startDateSlot, finishDate.getMinutes(), length);
    return (
        <li className='single-event'>
            <a href='#'>
                {title}
            </a>
            <style jsx>{`
                    .single-event {
                        position: absolute;
                        top: ${(startDateSlot - 30) * unitHeight}px;
                        height: ${length * unitHeight - 6}px;
                        width: calc(100% - 6px);
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        background-color: ${bg};
                        border-radius: 5px;
                        margin: 3px;
                    }
                    .single-event > a {
                        color: #fff;
                        font-family: sans-serif;
                    }
                `}</style>
        </li>
    )
}

class Schedule extends React.Component {

    render() {
        const { times, eventGroups } = this.props;
        const events = [];
        for (let i = todayIndex, j = 0; j < 7; i++ , j++) {
            const index = i % 7;
            events.push(
                <Events key={index} times={times} topInfo={eventGroups[index].day} bookings={eventGroups[index].bookings} />
            )
        }
        return (
            <div className='schedule'>
                <div className='timeline'>
                    <ul>
                        {times.map((item, index) => <li key={index}><span>{item}</span></li>)}
                    </ul>
                </div>
                <div className='events'>
                    <ul>
                        {events}
                    </ul>
                </div>
                <style jsx>{`
                    :global(li) {
                        list-style: none;
                    }
                    :global(ul) {
                        padding: 0;
                        margin: 0;
                    }
                    :global(a) {
                        text-decoration: none;
                    }
                    .schedule {
                        max-width: 1400px;
                        position: relative;
                        margin-bottom: 20px;
                    }
                    .timeline {
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        height: 100%;
                        width: 100%;
                        padding-top: ${unitHeight}px;
                    }
                    .timeline > ul > li {
                        position: relative;
                        height: ${unitHeight}px;
                    }
                    .timeline > ul > li > span {
                        position: relative;
                        top: -10px;
                    }
                    .timeline > ul > li ::after {
                        content: '';
                        position: absolute;
                        bottom: 0px;
                        left: 60px;
                        height: 1px;
                        width: calc(100% - 60px);
                        background-color: #eaeaea;
                        box-sizing: border-box;
                    }
                    .events {
                        position: relative;
                        margin-left: 60px;
                        z-index: 1;
                        float: left;
                        width: calc(100% - 60px);
                    }
                `}</style>
            </div>
        )
    }

}

export default Schedule;