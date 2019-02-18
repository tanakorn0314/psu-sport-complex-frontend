import React from 'react';

const unitHeight = 50;

const timeline = ['9.00', '9.30', '10.00', '10.30', '11.00', '11.30', '12.00'];
const eventGroups = [
    {
        topInfo: 'Monday',
        events: [
            {
                eventName: 'golf',
                startTime: 9,
                finishTime: '',
            },
            {
                eventName: 'football',
                startTime: 11,
                finishTime: '',
            },
            {
                eventName: 'basketball',
                startTime: 14,
                finishTime: '',
            },
        ]
    },
    {
        topInfo: 'Tuesday',
        events: [
            {
                eventName: 'golf2',
                startTime: 9,
                finishTime: '',
            },
            {
                eventName: 'football2',
                startTime: 12,
                finishTime: '',
            },
            {
                eventName: 'basketball2',
                startTime: 13,
                finishTime: '',
            },
        ]
    }
]

const Events = props => {
    const { topInfo, events } = props;
    return (
        <li className='events-group'>
            <div><span>{topInfo}</span></div>
            <ul>
                {events.map((event, index) => <Event key={index} title={event.eventName} startTime={event.startTime}/>)}
            </ul>
            <style jsx>{`
                li {
                    list-style: none;
                }
                .events-group {
                    width: 20%;
                    float: left;
                }
                .events-group > div {
                    display: flex;
                    height: ${unitHeight}px;
                    justify-content: center;
                    align-items: center;
                }
                .events-group > ul {
                    position: relative;
                    padding: 0;
                    height: 950px;
                    overflow: visible;
                }
            `}</style>
        </li>
    )
}


const Event = props => {
    const { title, startTime } = props;
    return (
        <li className='single-event'>
            <a href='#'>
                <em>{title}</em>
            </a>
            <style jsx>{`
                    li {
                        list-style: none;
                    }
                    .single-event {
                        top: ${(startTime - 9) * unitHeight}px;
                        background-color: red;
                        position: absolute;
                        height: ${unitHeight * 2}px;
                        width: 100%;
                    }
                `}</style>
        </li>
    )
}

class Schedule extends React.Component {
    render() {
        return (
            <div className='schedule'>
                <div className='timeline'>
                    <ul>
                        {timeline.map((item, index) => <li key={index}><span>{item}</span></li>)}
                    </ul>
                </div>
                <div className='events'>
                    <ul>
                        {eventGroups.map((eventGroup, index) => (<Events key={index} topInfo={eventGroup.topInfo} events={eventGroup.events} />))}
                    </ul>
                </div>
                <style jsx>{`
                    li {
                        list-style: none;
                    }
                    .schedule {
                        width: 90%;
                        position: relative;
                    }
                    .timeline {
                        display: block;
                        position: absolute;
                        top: 0;
                        left: 0;
                        padding-top: ${unitHeight}px;
                    }
                    .timeline > ul > li {
                        height: ${unitHeight}px;
                    }
                    .events {
                        margin-left: 60px;
                        width: calc(100% - 60px);
                        position: relative;
                        z-index: 1;
                        float: left;
                    }
                `}</style>
            </div>
        )
    }

}

export default Schedule;