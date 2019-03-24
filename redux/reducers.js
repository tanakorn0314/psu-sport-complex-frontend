import { combineReducers } from 'redux';
import Auth from './auth/reducer';
import Booking from './booking/reducer';
import Stadium from './stadium/reducer';
import BookingInput from './bookingInput/reducer';

export default combineReducers({
    Auth,
    Booking,
    BookingInput,
    Stadium
})