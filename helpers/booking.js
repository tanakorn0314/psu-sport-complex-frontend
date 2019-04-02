import BookingService from '../coreLayer/service/bookingService';
import jwtDecode from 'jwt-decode';

async function collectBookingData(store, courtId) {
    const res = await BookingService.getByCourtId(courtId);
    if (res && !res.error) {
        if (!store[courtId])
            store[courtId] = [];
        store[courtId] = res;
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

export default {
    collectBookingData,
    reserve,
    remove,
    getMyBooking
}