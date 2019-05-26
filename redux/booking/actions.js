import Booking from './helper';
import BillService from '../../coreLayer/service/billService';
import BookingService from '../../coreLayer/service/bookingService';

const actions = {
  FETCH_BOOKING: 'FETCH_BOOKING',
  FETCH_BOOKING_ERROR: 'FETCH_BOOKING_ERROR',
  FETCH_BOOKING_SUCESS: 'FETCH_BOOKING_SUCESS',
  BOOKING_REQUEST: 'BOOKING_REQUEST',
  BOOKING_SUCCESS: 'BOOKING_SUCCESS',
  BOOKING_ERROR: 'BOOKING_ERROR',
  SELECT_STADIUM: 'SELECT_STADIUM',
  SELECT_BOOKING: 'SELECT_BOOKING',
  DELETE_BOOKING: 'DELETE_BOOKING',
  SELECT_DATE: 'SELECT_DATE',
  SET_OWNER: 'SET_OWNER',
  SET_FEE: 'SET_FEE',
  SET_BOTTOM_ACTION_VISIBLE: 'SET_BOTTOM_ACTION_VISIBLE',
  fetchAllBooking: () => async (dispatch, getState) => {
    let { bookings } = getState().Booking;
    const result = await BookingService.getAll();
    if (result && !result.error) {
      bookings = Booking.pushBookingList(bookings, result);
      await dispatch({ type: actions.FETCH_BOOKING_SUCESS, bookings });
    }
    return bookings;
  },
  fetchBooking: (stadiumId) => async (dispatch, getState) => {
    const store = getState().Booking.bookings;
    const result = await Booking.collectBookingData(store, stadiumId);
    if (result && !result.error) {
      dispatch({ type: actions.FETCH_BOOKING_SUCESS, bookings: result });
    }
    return result;
  },
  pushBookingData: (booking) => async (dispatch, getState) => {
    const store = getState().Booking.bookings;
    const result = Booking.pushBookingData(store, booking);

    dispatch({ type: actions.FETCH_BOOKING_SUCESS, bookings: result });

  },
  reserve: (token, bookManyDTO) => async (dispatch, getState) => {
    const result = await Booking.reserve(token, bookManyDTO);
    // await refreshBooking(dispatch, getState);
    return result;
  },
  reserveByAdmin: (token, bookByAdminDTO) => async (dispatch, getState) => {
    const result = await Booking.reserveByAdmin(token, bookByAdminDTO);
    // await refreshBooking(dispatch, getState);
    return result;
  },
  updateBooking: (bookingId, dto) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    const result = await Booking.updateBooking(idToken, bookingId, dto);
    // await refreshBooking(dispatch, getState);
    return result;
  },
  remove: (token, bookingId) => async (dispatch, getState) => {
    const result = await Booking.remove(token, bookingId);
    // await refreshBooking(dispatch, getState);
    return result;
  },
  selectStadium: (stadiumId) => async (dispatch) => {
    let result = {};

    if (stadiumId === 0) {
      result = await dispatch(actions.fetchAllBooking());
    } else {
      result = await dispatch(actions.fetchBooking(stadiumId));
    }

    await dispatch({ type: actions.SELECT_STADIUM, stadiumId });

    return result;
  },
  selectBooking: (data) => async (dispatch, getState) => {
    const { stadiumId, selectedBooking: prevBookings, owner } = getState().Booking;
    const { stadiums } = getState().Stadium;

    const stadium = stadiums[stadiumId - 1];
    const currentBookings = Booking.handleSelect(prevBookings, data);
    const bookingList = Booking.manageBookingList(currentBookings);
    const fee = Booking.calculateBookingsFee(owner.position, bookingList, stadium);

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

    return result;
  },
  selectDate: (date) => async (dispatch, getState) => {
    dispatch({ type: actions.SELECT_DATE, selectedDate: date });
  },
  setBottomActionVisible: (visible) => (dispatch) => {
    dispatch({ type: actions.SET_BOTTOM_ACTION_VISIBLE, visible });
  },
  refreshData: () => async (dispatch, getState) => {
    refreshBooking(dispatch, getState);
  },
  setOwner: (owner) => async (dispatch) => {
    dispatch({ type: actions.SET_OWNER, owner });
  },
  setOwnerPosition: (position) => async (dispatch, getState) => {
    const { stadiumId, bookingList, owner: o } = getState().Booking;
    const { stadiums } = getState().Stadium;

    const stadium = stadiums[stadiumId - 1];

    const fee = Booking.calculateBookingsFee(position, bookingList, stadium);
    const owner = { ...o, position };

    dispatch({ type: actions.SET_FEE, fee });
    dispatch({ type: actions.SET_OWNER, owner });
  }
};

async function refreshBooking(dispatch, getState) {
  const stadiumId = getState().Booking.stadiumId;
  const selectedBooking = getState().Booking.selectedBooking;
  console.log('before', selectedBooking);
  await dispatch(actions.selectStadium(stadiumId));
  console.log('after', selectedBooking);
}

export default actions;
