import { combineReducers } from 'redux';
import Admin from './admin/reducer';
import Auth from './auth/reducer';
import Bill from './bill/reducer';
import Booking from './booking/reducer';
import Modal from './modal/reducer';
import OperationTime from './operationTime/reducer';
import Stadium from './stadium/reducer';
import Screen from './screen/reducer';
import Users from './users/reducer'
import News from './news/reducer';

export default combineReducers({
    Admin,
    Auth,
    Bill,
    Booking,
    Modal,
    OperationTime,
    Screen,
    Stadium,
    Users,
    News
})