import BookingService from '../../coreLayer/service/bookingService';
import jwtDecode from 'jwt-decode';
import _ from 'lodash';
import moment from 'moment';

async function collectBookingData(store, stadiumId) {
    const res = await BookingService.getByStadiumId(stadiumId);
    if (res && !res.error) {
        if (!store[stadiumId])
            store[stadiumId] = [];
        store[stadiumId] = res;
        return store;
    }
    return res;
}

function pushBookingList(store, bookingList) {
    bookingList.forEach((booking) => {
        store = pushBookingData(store, booking);
    });

    return store;
}

function pushBookingData(store, booking) {
    const { stadiumId } = booking;
    if (!store[stadiumId])
        store[stadiumId] = [];
    store[stadiumId].push(booking);
    return store;
}

async function reserve(token, bookManyDTO) {
    const res = await BookingService.book(token, bookManyDTO);
    return res;
}

async function reserveByAdmin(token, bookAdminDTO) {
    const res = await BookingService.bookByAdmin(token, bookAdminDTO);
    return res;
}

async function updateBooking(token, bookingId, dto) {
    const res = await BookingService.updateBooking(token, bookingId, dto);
    return res;
}

async function remove(token, bookingId) {
    const res = await BookingService.deleteBooking(token, bookingId);
    return res;
}

async function getMyBooking(token) {
    const user = jwtDecode(token);
    const res = await BookingService.getByUserId(token, user.userId);
    return res;
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

function calculateSlotFee(userPosition, slots, stadium) {
    if (!slots || slots.length <= 0)
        return 0;

    // length half hour
    let l = slots.length * 0.5;

    switch (userPosition) {
        case 'general public': return stadium.costPublic * l;
        case 'member': return stadium.costMember * l;
        case 'staff': return stadium.costStaff * l;
        case 'student': return stadium.costStudent * l;
        default: return 0;
    }
}

export default {
    collectBookingData,
    pushBookingData,
    pushBookingList,
    reserve,
    reserveByAdmin,
    updateBooking,
    remove,
    getMyBooking,
    handleSelect,
    manageBookingList,
    calculateBookingFee,
    calculateSlotFee,
    calculateBookingsFee
}