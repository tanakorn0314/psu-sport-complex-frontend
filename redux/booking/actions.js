import Booking from '../../helpers/booking';

const actions = {
  FETCH_BOOKING: 'FETCH_BOOKING',
  FETCH_BOOKING_ERROR: 'FETCH_BOOKING_ERROR',
  FETCH_BOOKING_SUCESS: 'FETCH_BOOKING_SUCESS',
  FETCH_MY_BOOKING_SUCCESS: 'FETCH_MY_BOOKING_SUCCESS',
  BOOKING_REQUEST: 'BOOKING_REQUEST',
  BOOKING_SUCCESS: 'BOOKING_SUCCESS',
  BOOKING_ERROR: 'BOOKING_ERROR',
  fetchBooking: (token, courtId) => async (dispatch, getState) => {
    const store = getState().Booking.bookings;
    const result = await Booking.collectBookingData(store, token, courtId);
    if (result && !result.error) {
      dispatch({ type: actions.FETCH_BOOKING_SUCESS, bookings: result });
    }
    return result;
  },
  fetchMyBooking: (token) => async (dispatch) => {
    const result = await Booking.getMyBooking(token);
    if (result && !result.error) {
      dispatch({ type: actions.FETCH_MY_BOOKING_SUCCESS, bookings: result });
    }
    return result;
  },
  reserve: (token, bookingInfo) => async (dispatch, getState) => {
    const store = getState().Booking.bookings;
    const result = await Booking.reserve(token, bookingInfo);
    if (result && !result.error) {
      const { courtId } = result;
      if (!store[courtId]) store[courtId] = [];
      store[courtId].push(result);
      dispatch({ type: actions.BOOKING_SUCCESS, bookings: store });
    }
    return result;
  }
};
export default actions;