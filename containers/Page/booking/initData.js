export default {
    stadiums: [
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
    ],
    times: [
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
    ],
    durations: [
        ['30 minutes', 0, 30],
        ['1 hour', 1, 0],
        ['1 hour 30 minutes', 1, 30],
        ['2 hours', 2, 0],
        ['2 hours 30 minutes', 2, 30],
        ['3 hours', 3, 0],
        ['3 hours 30 minuts', 3, 30],
        ['4 hours', 4, 0]
    ],
    initEventGroup: [
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
    ]
}