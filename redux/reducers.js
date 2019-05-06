import { combineReducers } from 'redux';
import Auth from './auth/reducer';
import Booking from './booking/reducer';
import Stadium from './stadium/reducer';
import Screen from './screen/reducer';
import Admin from './admin/reducer';
import Bill from './bill/reducer';

export default combineReducers({
    Auth,
    Booking,
    Stadium,
    Screen,
    Admin,
    Bill
})