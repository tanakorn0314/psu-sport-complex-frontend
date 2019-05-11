import { combineReducers } from 'redux';
import Auth from './auth/reducer';
import Booking from './booking/reducer';
import Stadium from './stadium/reducer';
import Screen from './screen/reducer';
import Admin from './admin/reducer';
import Bill from './bill/reducer';
import Users from './users/reducer'

export default combineReducers({
    Admin,
    Auth,
    Bill,
    Booking,
    Screen,
    Stadium,
    Users
})