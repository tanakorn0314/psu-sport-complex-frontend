import BookingService from '../coreLayer/service/bookingService';
import jwtDecode from 'jwt-decode';

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

async function reserve(token, bookingInfo) {
    const res = await BookingService.book(token, bookingInfo);
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
    const { start, court, selected } = selectData;
    let result = { ...prevBooking };
    if (selected) {
        if (!result[start])
            result[start] = [];
        result[start][court] = { start, court };
    } else {
        result[start][court] = null;
    }

    return result;
}

function manageBookingList(selectedBookings) {
    const bookingList = [];
    Object.values(selectedBookings).forEach(bookings => {
        bookings && bookings.forEach((booking) => {
            booking && bookingList.push(booking);
        })
    })
    return bookingList;
}

function getBookingFee(stadium, userPosition) {
    switch(userPosition) {
        case 'member' :
            return stadium.costMember;
        case 'student' :
            return stadium.costStudent;
        case 'staff' :
            return stadium.costStaff;
        case 'admin' :
            return 0;
        default:
            return stadium.costPublic;
    }
}

export default {
    collectBookingData,
    reserve,
    remove,
    getMyBooking,
    handleSelect,
    manageBookingList,
    getBookingFee
}