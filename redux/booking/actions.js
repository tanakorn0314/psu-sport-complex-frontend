import Booking from './helper';
import BillService from '../../coreLayer/service/billService';

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
  SELECT_DATE: 'SELECT_DATE',
  fetchAllBooking: () => async (dispatch, getState) => {
    const { stadiums } = getState().Stadium;
    for (let i = 1; i <= stadiums.length; i++) {
      await dispatch(actions.fetchBooking(i));
    }
  },
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
    const result = await Booking.reserve(token, bookingInfo);
    await refreshBooking(dispatch, getState);
    return result;
  },
  reserveMany: (token, bookManyDTO) => async (dispatch, getState) => {
    const result = await Booking.reserveMany(token, bookManyDTO);
    await refreshBooking(dispatch, getState);
    return result;
  },
  remove: (token, bookingId) => async (dispatch, getState) => {
    const result = await Booking.remove(token, bookingId);
    await refreshBooking(dispatch, getState);
    return result;
  },
  selectStadium: (stadiumId) => async (dispatch, getState) => {
    const result = await dispatch(actions.fetchBooking(stadiumId));
    await dispatch({ type: actions.SELECT_STADIUM, stadiumId });

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
  },
  confirmTransaction: (accessToken, billId, transactionInfo) => async (dispatch, getState) => {
    const result = await BillService.confirm(accessToken, billId, transactionInfo);
    if (result.error) 
      return result;
    
    refreshBooking(dispatch, getState);

    return 'Success';
  },
  selectDate: (date) => async (dispatch, getState) => {
    dispatch({ type: actions.SELECT_DATE, selectedDate: date });
  },
  refreshData: () => async (dispatch, getState) => {
    refreshBooking(dispatch, getState);
  }
};

async function refreshBooking(dispatch, getState) {
  const stadiumId = getState().Booking.stadiumId;
  const token = getState().Auth.idToken;
  await dispatch(actions.fetchBooking(stadiumId));
  await dispatch(actions.fetchMyBooking(token));
  await dispatch(actions.selectStadium(stadiumId));
}

export default actions;
