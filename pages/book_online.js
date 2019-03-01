import React from 'react';
import Layout from '../present-layer/components/layout';
import Button from '../present-layer/components/button_primary';
import Schedule from '../present-layer/components/schedule';
import BookingService from '../core-layer/service/booking-service';
import { connect } from 'react-redux';
import Link from 'next/link';

const stadiums = [
    {
        sport: 'tennis',
        courts: [
            'tennis 1',
            'tennis 2',
            'tennis 3',
        ]
    },
    {
        sport: 'basketball',
        courts: [
            'basketball 1',
            'basketball 2',
            'basketball 3',
        ]
    },
    {
        sport: 'table tennis',
        courts: [
            'table tennis 1',
            'table tennis 2',
            'table tennis 3',
        ]
    },
    {
        sport: 'badminton',
        courts: [
            'badminton 1',
            'badminton 2',
            'badminton 3',
            'badminton 4',
            'badminton 5',
            'badminton 6',
        ]
    }
];

const times = [
    '15.00',
    '15.30',
    '16.00',
    '16.30',
    '17.00',
    '17.30',
    '18.00',
    '18.30',
    '19.00',
    '19.30',
    '20.00',
    '20.30',
    '21.00'
];
const durations = [
    ['30 minutes', 0, 30],
    ['1 hour', 1, 0],
    ['1 hour 30 minutes', 1, 30],
    ['2 hours', 2, 0],
    ['2 hours 30 minutes', 2, 30],
    ['3 hours', 3, 0],
    ['3 hours 30 minuts', 3, 30],
    ['4 hours', 4, 0]
];

const initEventGroup = [
    {
        day: 'Sunday',
        bookings: []
    },
    {
        day: 'Monday',
        bookings: []
    },
    {
        day: 'Tuesday',
        bookings: []
    },
    {
        day: 'Wednesday',
        bookings: []
    },
    {
        day: 'Thursday',
        bookings: []
    },
    {
        day: 'Friday',
        bookings: []
    },
    {
        day: 'Saturday',
        bookings: []
    }
];

class BookOnline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stadium: stadiums[0],
            date: new Date().toISOString().substring(0, 10),
            startDate: times[0],
            durationIndex: 0,
            eventGroups: initEventGroup,
            title: '',
            description: ''
        }
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return (
            <Layout>
                <main className='main'>
                    <h1 className='title'>BOOKING</h1>
                    <Schedule times={times} eventGroups={this.state.eventGroups} />
                    <Link href='booking_list'><a className='link-to-list'>View your bookings list</a></Link>
                    <form className='input-form'>
                        <select name='court' className='input' onChange={this.handleSelect}>
                            {stadiums.map((stadium, index) =>
                                <optgroup label={stadium.sport} key={index}>
                                    {stadium.courts.map((court, index) =>
                                        <option key={index} value={court}>{court}</option>
                                    )}
                                </optgroup>
                            )}
                        </select>
                        <input name='date' type='date' className='input-date' defaultValue={this.state.date} onChange={this.handleSelect} />
                        <select name='startDate' className='input' onChange={this.handleSelect}>
                            <optgroup label='start time'>
                                {times.map((time, index) => <option key={index} value={time}>{time}</option>)}
                            </optgroup>
                        </select>
                        <select name='durationIndex' className='input' onChange={this.handleSelect}>
                            <optgroup label='duration'>
                                {durations.map(([duration], index) => <option key={index} value={index}>{duration}</option>)}
                            </optgroup>
                        </select>
                        <input type='text' name='title' className='input-text' onChange={this.handleSelect} placeholder='title' />
                        <input type='text' name='description' className='input-text' onChange={this.handleSelect} placeholder='description' />
                        <Button onClick={this.handleClick}>book</Button>
                    </form>
                </main>
                <style jsx>{`
                    main {
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        margin-top: 50px;
                    }
                    .input-form {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .title {
                        font-weight: 400;
                    }
                    .input, .input-date, .input-text {
                        width: 100%;
                        border-radius: 20px;
                        border: 1px solid #dedede;
                        padding: 5px 20px;
                        margin: 10px 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        outline: none;
                    }
                    .input:focus, input-date:focus {
                        box-shadow: 0 0 1px 1px #46AFFF;
                    }
                    .input-date {
                        width: 80%;
                        padding: 3px 20px;
                    }
                    .input-text {
                        width: 80%;
                    }
                    .link-to-list {
                        margin-top: 20px;
                        position: relative;
                    }
                `}</style>
            </Layout>
        );
    }

    handleSelect = (e) => {
        let { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleClick = (e) => {
        this.bookOnline();
    }

    bookOnline = async () => {
        const {
            startDate,
            durationIndex,
            eventGroups,
            title,
            description
        } = this.state;
        const { user } = this.props;
        const [inputHour, inputMinute] = startDate.split('.');

        const startTime = new Date(this.state.date);
        startTime.setHours(0, 0, 0, 0, 0);
        startTime.setHours(parseInt(inputHour));
        startTime.setMinutes(parseInt(inputMinute));

        const finishTime = new Date(this.state.date);
        finishTime.setHours(0, 0, 0, 0, 0);
        finishTime.setHours(durations[durationIndex][1] + parseInt(inputHour));
        finishTime.setMinutes(durations[durationIndex][2] + parseInt(inputMinute));

        await BookingService.book(title, description, user.userId, 1, startTime.toISOString(), finishTime.toISOString());

        let sBooking = {
            userName: user.username,
            startDate: startTime,
            finishDate: finishTime
        }

        eventGroups[startTime.getDay()].bookings.push(sBooking);

        this.setState({ eventGroups });
    }

    fetchData = async () => {
        const eventGroups = initEventGroup;
        const sBookings = [];
        const res = await BookingService.get();
        const { currentWeekBookings } = res.data;
        if (currentWeekBookings) {
            const bookings = currentWeekBookings;
            bookings.forEach(booking => {
                let sBooking = {
                    userName: `${booking.owner.username}`,
                    startDate: new Date(booking.startDate),
                    finishDate: new Date(booking.endDate)
                }
                sBookings.push(sBooking);
            });

            sBookings.forEach(sBooking => {
                const bookingDay = sBooking.startDate.getDay();
                eventGroups[bookingDay].bookings.push(sBooking);
            });
        }

        this.setState({ eventGroups });
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(BookOnline);