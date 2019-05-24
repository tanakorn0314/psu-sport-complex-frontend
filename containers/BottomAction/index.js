import React from 'react';
import StyleWrapper from './style';
import { connect } from 'react-redux';
import BookingActions from '../../redux/booking/actions';
import Router from 'next/router';
import {
    Row,
    Col,
    Button
} from 'antd';
import { countBooking } from './helper';

class BottomAction extends React.Component {

    render() {
        let { idToken, profile } = this.props.Auth;
        let { fee, selectedBooking, bottomActionVisible } = this.props.Booking;

        let message = '';
        let btnTitle = 'Confirm';
        let action = null;

        const count = countBooking(selectedBooking);
        const s = count > 1 ? 's' : '';

        if (!idToken) {
            message = `Please login`;
            btnTitle = 'Login';
            action = this.handleLogin
        } else if(count <= 0) {
            bottomActionVisible = false;
        } else if(profile.position === 'admin') {
            message = `Count : ${count} Slot${s}`;
            action = this.props.onClick ? this.props.onClick : () => {}
        }
        else {
            message = `Total : ${fee} Baht`;
            action = this.props.onClick ? this.props.onClick : () => {}
        }

        return (
            bottomActionVisible && 
            <StyleWrapper>
                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <h1 className='total'>{message}</h1>
                </Col>
                <Col className='confirm' xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Button onClick={action}>{btnTitle}</Button>
                </Col>
            </StyleWrapper>
        )
    }

    handleLogin = () => {
        Router.push('/signin');
    }

}

export default connect(state => state, BookingActions)(BottomAction);