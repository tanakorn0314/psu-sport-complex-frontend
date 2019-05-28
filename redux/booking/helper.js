import BookingService from '../../coreLayer/service/bookingService';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import moment from 'moment';

function setBookings(store, stadiumId, bookings) {
    if (!store[stadiumId])
        store[stadiumId] = [];
    store[stadiumId] = bookings;
    return store;
}

function pushBookingList(store, bookingList) {
    bookingList.forEach((booking) => {
        store = pushBooking(store, booking);
    });

    return store;
}

function updateBookingList(store, bookingList) {
    bookingList.forEach((booking) => {
        store = updateBooking(store, booking);
    });

    return store;
}

function deleteBookingList(store, bookingList) {
    bookingList.forEach((booking) => {
        store = deleteBooking(store, booking);
    });

    return store;
}

function pushBooking(store, booking) {
    const { stadiumId } = booking;
    if (!store[stadiumId])
        store[stadiumId] = [];
    store[stadiumId].push(booking);
    return store;
}

function updateBooking(store, booking) {
    const { stadiumId } = booking;
    const storedBookings = store[stadiumId];
    if (storedBookings && storedBookings.length > 0) {
        const index = storedBookings.findIndex((b) => b.bookingId === booking.bookingId);
        if (index >= 0) {
            storedBookings[index] = booking;
        }
    }
    return store;
}

function deleteBooking(store, booking) {
    const { stadiumId } = booking;
    const storedBookings = store[stadiumId];
    if (storedBookings && storedBookings.length > 0) {
        const filtered = storedBookings.filter((b) => b.bookingId !== booking.bookingId);
        store[stadiumId] = filtered;
    }
    return store;
}

function handleSelect(prevBooking, selectData) {
    const { start, end, court, selected } = selectData;
    let result = { ...prevBooking };
    if (selected) {
        if (!result[start])
            result[start] = [];
        result[start][court] = { start, end, court };
    } else {
        result[start][court] = null;
    }

    return result;
}

function manageBookingList(selectedBookings) {
    let bookingList = [];
    let bookingCourt = [];

    Object.entries(selectedBookings).sort().forEach(([time, bookings]) => {
        if (bookings) {
            bookings.forEach((booking, i) => {
                if (booking) {
                    if (!bookingCourt[i])
                        bookingCourt[i] = [];
                    const lastIdx = bookingCourt[i].length - 1;
                    const lastBookingCourt = bookingCourt[i][lastIdx];
                    if (!lastBookingCourt) {
                        bookingCourt[i].push(booking);
                    } else {
                        const { end: end1 } = lastBookingCourt;
                        const { start, end: end2 } = booking;
                        const mStart = moment(start, 'HH:mm');
                        const mEnd = moment(end1, 'HH:mm');
                        if (mStart.isSame(mEnd, 'minute') && mStart.isSame(mEnd, 'hour')) {
                            bookingCourt[i][lastIdx] = { ...lastBookingCourt, end: end2 };
                        } else {
                            bookingCourt[i].push(booking);
                        }
                    }
                }
            })
        }
    })

    bookingCourt.forEach((booking) => { booking.forEach(b => { bookingList.push(b) }) })

    return bookingList;
}

function calculateBookingFee(userPosition, booking, stadium) {
    if (!booking)
        return 0;

    const format = 'HH:mm';

    const { start, end } = booking;

    const mStart = moment(start, format);
    const mEnd = moment(end, format);

    let hrDiff = mEnd.diff(mStart, 'hour');
    let minDiff = mEnd.diff(mStart, 'minute') % 60 >= 30 ? 0.5 : 0;

    let duration = hrDiff + minDiff;

    switch (userPosition) {
        case 'general public': return stadium.costPublic * duration;
        case 'member': return stadium.costMember * duration;
        case 'staff': return stadium.costStaff * duration;
        case 'student': return stadium.costStudent * duration;
        default: return 0;
    }
}

function calculateBookingsFee(userPosition, bookings, stadium) {
    if (!bookings || bookings.length <= 0)
        return 0;

    let sumFee = bookings.reduce((sum, booking) => sum + this.calculateBookingFee(userPosition, booking, stadium), 0);

    return sumFee;
}


export default {
    setBookings,
    pushBookingList,
    updateBookingList,
    deleteBookingList,
    handleSelect,
    manageBookingList,
    calculateBookingFee,
    calculateBookingsFee
}