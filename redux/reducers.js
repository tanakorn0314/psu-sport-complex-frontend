import { combineReducers } from 'redux';
import Auth from './auth/reducer';
import Booking from './booking/reducer';

export default combineReducers({
    Auth,
    Booking
})