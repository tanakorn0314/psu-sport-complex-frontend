import { combineReducers } from 'redux';
import Auth from './auth/reducer';
import Booking from './booking/reducer';
import Stadium from './stadium/reducer';
import Screen from './screen/reducer';

export default combineReducers({
    Auth,
    Booking,
    Stadium,
    Screen
})