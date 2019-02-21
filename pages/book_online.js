import React from 'react';
import Layout from '../present-layer/components/layout';
import Button from '../present-layer/components/button_primary';
import Schedule from '../present-layer/container/schedule';
import BookingService from '../core-layer/service/booking-service';

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
    ['3 hours 30 minuts', 3 ,30],
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
            startTime: times[0],
            durationIndex: 0,
            eventGroups: initEventGroup
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
                        <select name='startTime' className='input' onChange={this.handleSelect}>
                            {times.map((time, index) => <option key={index} value={time}>{time}</option>)}
                        </select>
                        <select name='durationIndex' className='input' onChange={this.handleSelect}>
                            {durations.map(([duration], index) => <option key={index} value={index}>{duration}</option>)}
                        </select>
                        <Button onClick={this.handleClick}>book</Button>
                    </form>
                    <Schedule times={times} eventGroups={this.state.eventGroups}/>
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
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .title {
                        font-weight: 400;
                    }
                    .input {
                        width: 100%;
                        border-radius: 20px;
                        border: 1px solid #dedede;
                        padding: 5px 20px;
                        margin: 10px 0;
                        text-align:center;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        outline: none;
                    }
                    .input:focus {
                        box-shadow: 0 0 1px 1px #46AFFF;
                    }
                `}</style>
            </Layout>
        );
    }

    handleSelect = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    handleClick = (e) => {
        this.bookOnline();
    }

    bookOnline = async () => {
        const { startTime, durationIndex } = this.state;
        const [inputHour, inputMinute] = startTime.split('.');

        const startDate = new Date();
        startDate.setHours(0,0,0,0,0);
        startDate.setHours(parseInt(inputHour));
        startDate.setMinutes(parseInt(inputMinute));

        const finishDate = new Date();
        finishDate.setHours(0,0,0,0,0);
        finishDate.setHours(durations[durationIndex][1] + parseInt(inputHour));
        finishDate.setMinutes(durations[durationIndex][2] + parseInt(inputMinute));

        await BookingService.book(1, startDate, finishDate);
    }

    fetchData = async () => {
        const eventGroups = initEventGroup;
        const sBookings = [];
        const res = await BookingService.get();
        const bookings = res.data;
        if (bookings) {
            bookings.forEach( booking => {
                let sBooking = {
                    userName: `${booking.user.firstName} ${booking.user.lastName}`,
                    startTime: new Date(booking.startTime),
                    finishTime: new Date(booking.finishTime)
                }
                sBookings.push(sBooking);
            });

            sBookings.forEach(sBooking => {
                const bookingDay = sBooking.startTime.getDay();
                eventGroups[bookingDay].bookings.push(sBooking);
            });
        }


        this.setState({
            eventGroups
        });

        
    }
}

export default BookOnline;