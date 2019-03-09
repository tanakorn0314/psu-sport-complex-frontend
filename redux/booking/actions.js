const actions = {
    FETCH_BOOKING: 'FETCH_BOOKING',
    FETCH_BOOKING_ERROR: 'FETCH_BOOKING_ERROR',
    FETCH_BOOKING_SUCESS: 'FETCH_BOOKING_SUCESS',
    BOOKING_REQUEST: 'BOOKING_REQUEST',
    BOOKING_SUCCESS: 'BOOKING_SUCCESS',
    BOOKING_ERROR: 'BOOKING_ERROR',
    fetchBooking: (token, courtId) => ({
      type: actions.FETCH_BOOKING,
      payload: { token, courtId }
    }),
    booking: (bookingInfo) => ({
        type: actions.BOOKING_REQUEST,
        payload: { bookingInfo }
    })
  };
export default actions;
  