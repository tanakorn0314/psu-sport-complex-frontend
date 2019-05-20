import BookingService from '../../coreLayer/service/bookingService';
import jwtDecode from 'jwt-decode';
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

async function reserve(token, bookingInfo) {
    const res = await BookingService.book(token, bookingInfo);
    return res;
}

async function reserveMany(token, bookManyDTO) {
    const res = await BookingService.bookMany(token, bookManyDTO);
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

function calculateBookingFee(userPosition, booking, stadium) {
    if (!booking)
      return 0;

      const { startDate, endDate } = booking;
      let hrDiff = moment(endDate).diff(moment(startDate), 'hour');
      let minDiff = moment(endDate).diff(moment(startDate), 'minute') % 60 >= 30 ? 0.5 : 0;
    
      let duration = hrDiff + minDiff;

      switch (userPosition) {
        case 'general public': return stadium.costPublic * duration;
        case 'member': return stadium.costMember * duration;
        case 'staff': return stadium.costStaff * duration;
        case 'student': return stadium.costStudent *duration;
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
        case 'student': return stadium.costStudent *l;
        default: return 0;
      }
  }

export default {
    collectBookingData,
    reserve,
    reserveMany,
    remove,
    getMyBooking,
    handleSelect,
    manageBookingList,
    calculateBookingFee,
    calculateSlotFee,
    calculateBookingsFee
}