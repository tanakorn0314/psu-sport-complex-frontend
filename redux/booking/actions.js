import Booking from '../../helpers/booking';

const actions = {
  FETCH_BOOKING: 'FETCH_BOOKING',
  FETCH_BOOKING_ERROR: 'FETCH_BOOKING_ERROR',
  FETCH_BOOKING_SUCESS: 'FETCH_BOOKING_SUCESS',
  FETCH_MY_BOOKING_SUCCESS: 'FETCH_MY_BOOKING_SUCCESS',
  BOOKING_REQUEST: 'BOOKING_REQUEST',
  BOOKING_SUCCESS: 'BOOKING_SUCCESS',
  BOOKING_ERROR: 'BOOKING_ERROR',
  SELECT_STADIUM: 'SELECT_STADIUM',
  SELECT_BOOKING: 'SELECT_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING',
  fetchBooking: (stadiumId) => async (dispatch, getState) => {
    const store = getState().Booking.bookings;
    const result = await Booking.collectBookingData(store, stadiumId);
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
    const bookings = getState().Booking.bookings;
    const result = await Booking.reserve(token, bookingInfo);
    if (result && !result.error) {
      const { stadiumId } = result;
      if (!bookings[stadiumId]) bookings[stadiumId] = [];
      bookings[stadiumId].push(result);
      dispatch({ type: actions.BOOKING_SUCCESS, bookings });
    }
    return result;
  },
  remove: (token, bookingId) => async (dispatch, getState) => {
    const result = await Booking.remove(token, bookingId);
    if(result) {
      if (!result.error) {
        const stadiumId = getState().Booking.stadiumId;
        await dispatch(actions.fetchBooking(stadiumId));
        await dispatch(actions.fetchMyBooking(token));
        await dispatch(actions.selectStadium(stadiumId));
      }
    }
    return result;
  },
  selectStadium: (stadiumId) => async (dispatch) => {
    const result = await dispatch(actions.fetchBooking(stadiumId));
    dispatch({type: actions.SELECT_STADIUM, stadiumId});
    return result;
  },
  selectBooking: (data) => async (dispatch, getState) => {
    const user = getState().Auth.profile;
    const stadiumId = getState().Booking.stadiumId;
    const stadium = getState().Stadium.stadiums[stadiumId - 1];
    const prevBookings = getState().Booking.selectedBooking;
    const currentBookings = Booking.handleSelect(prevBookings, data);
    const bookingList = Booking.manageBookingList(currentBookings);
    const fee = Booking.getBookingFee(stadium, user.position) * bookingList.length;
    dispatch({
      type: actions.SELECT_BOOKING,
      selectedBooking: currentBookings,
      bookingList,
      fee
    });
    return currentBookings;
  }
};
export default actions;
