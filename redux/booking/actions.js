import helper from './helper';
import BillService from '../../core/service/billService';
import BookingService from '../../core/service/bookingService';

const actions = {
  SET_BOOKINGS: 'SET_BOOKINGS',
  SELECT_STADIUM: 'SELECT_STADIUM',
  SELECT_BOOKING: 'SELECT_BOOKING',
  SELECT_DATE: 'SELECT_DATE',
  SET_OWNER: 'SET_OWNER',
  SET_FEE: 'SET_FEE',
  SET_BOTTOM_ACTION_VISIBLE: 'SET_BOTTOM_ACTION_VISIBLE',
  fetchAllBooking: () => async (dispatch) => {
    const result = await BookingService.getAll();
    if (result && !result.error) {
      let bookings = helper.setAllBooking(result);
      await dispatch({ type: actions.SET_BOOKINGS, bookings });
    }
    return result;
  },
  fetchBookingByStadium: (stadiumId) => async (dispatch, getState) => {
    let store = getState().Booking.bookings;
    const result = await BookingService.getByStadiumId(stadiumId);
    if (result && !result.error) {
      store = helper.setBookingStadium(store, stadiumId, result);
      await dispatch({ type: actions.SET_BOOKINGS, bookings: store });
    }
    return store;
  },
  reserve: (token, bookManyDTO) => async (dispatch, getState) => {
    const result = await BookingService.book(token, bookManyDTO);
    return result;
  },
  reserveByAdmin: (token, bookByAdminDTO) => async (dispatch, getState) => {
    const result = await BookingService.bookByAdmin(token, bookByAdminDTO);
    return result;
  },
  updateBooking: (bookingId, dto) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    const result = await BookingService.updateBooking(idToken, bookingId, dto);
    return result;
  },
  remove: (token, bookingId) => async () => {
    const result = await BookingService.deleteBooking(token, bookingId);
    return result;
  },
  removeByBillId: (token, billId) => async () => {
    const result = await BookingService.deleteByBillId(token, billId);
    return result;
  },
  selectStadium: (stadiumId) => async (dispatch) => {
    let result = {};

    if (stadiumId === 0) {
      result = await dispatch(actions.fetchAllBooking());
    } else {
      result = await dispatch(actions.fetchBookingByStadium(stadiumId));
    }

    await dispatch({ type: actions.SELECT_STADIUM, stadiumId });

    return result;
  },
  selectBooking: (data) => async (dispatch, getState) => {
    const { stadiumId, selectedBooking: prevBookings, owner } = getState().Booking;
    const { stadiums } = getState().Stadium;

    const stadium = stadiums[stadiumId - 1];
    const currentBookings = helper.handleSelect(prevBookings, data);
    const bookingList = helper.manageBookingList(currentBookings);
    const fee = helper.calculateBookingsFee(owner.position, bookingList, stadium);

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

    console.log(result);
    return result;
  },
  selectDate: (date) => async (dispatch, getState) => {
    dispatch({ type: actions.SELECT_DATE, selectedDate: date });
  },
  setBottomActionVisible: (visible) => (dispatch) => {
    dispatch({ type: actions.SET_BOTTOM_ACTION_VISIBLE, visible });
  },
  setOwner: (owner) => async (dispatch) => {
    dispatch({ type: actions.SET_OWNER, owner });
  },
  setOwnerPosition: (position) => async (dispatch, getState) => {
    const { stadiumId, bookingList, owner: o } = getState().Booking;
    const { stadiums } = getState().Stadium;

    const stadium = stadiums[stadiumId - 1];

    const fee = helper.calculateBookingsFee(position, bookingList, stadium);
    const owner = { ...o, position };

    dispatch({ type: actions.SET_FEE, fee });
    dispatch({ type: actions.SET_OWNER, owner });
  },
  callbackCreate: (bookings) => async (dispatch, getState) => {
    let store = getState().Booking.bookings;
    const result = helper.pushBookingList(store, bookings);

    dispatch({ type: actions.SET_BOOKINGS, bookings: result });
  },
  callbackUpdate: (bookings) => async (dispatch, getState) => {
    let store = getState().Booking.bookings;
    const result = helper.updateBookingList(store, bookings);

    dispatch({ type: actions.SET_BOOKINGS, bookings: result });
  },
  callbackDelete: (bookings) => async (dispatch, getState) => {
    let store = getState().Booking.bookings;
    const result = helper.deleteBookingList(store, bookings);

    dispatch({ type: actions.SET_BOOKINGS, bookings: result });
  }
};

export default actions;
