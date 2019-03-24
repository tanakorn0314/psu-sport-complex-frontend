import BookingAction from '../booking/actions';

const actions = {
  SELECT_COURT: 'SELECT_COURT',
  selectCourt: (courtId) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    const result = await BookingAction.fetchBooking(idToken, courtId + 1);
    const { bookings } = getState().Booking;

    dispatch({
      type: actions.SELECT_COURT,
      courtId,
      bookings: bookings[courtId + 1]
    });

    return result;
  },
};
export default actions;
