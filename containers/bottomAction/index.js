import React from 'react';
import StyleWrapper from './style';
import { connect } from 'react-redux';
import BookingActions from '../../redux/booking/actions';
import ModalActions from '../../redux/modal/actions';
import { Col } from 'antd';
import Button from '../../components/button';
import { countBooking } from './helper';
import { H2 } from '../../components/typo';
import { withNamespaces } from '../../i18n';

class BottomAction extends React.Component {

    render() {
        const { t } = this.props;
        let { idToken, profile } = this.props.Auth;
        let { fee, selectedBooking, bottomActionVisible } = this.props.Booking;

        let message = '';
        let btnTitle = 'confirm';
        let action = null;

        const count = countBooking(selectedBooking);
        const s = count > 1 ? t('s') : '';

        if (!idToken) {
            message = `pleaseLogin`;
            btnTitle = 'login';
            action = this.props.onAuth ? this.props.onAuth : () => {}
        } else if(count <= 0) {
            bottomActionVisible = false;
        } else if(profile.position === 'admin') {
            message = `${t('count')} : ${count} ${t('slot')}${s}`;
            action = this.props.onBook ? this.props.onBook : () => {}
        }
        else {
            message = `${t('total')} : ${fee} ${t('baht')}`;
            action = this.props.onBook ? this.props.onBook : () => {}
        }

        return (
            bottomActionVisible && 
            <StyleWrapper>
                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <H2 className='tota'>{message}</H2>
                </Col>
                <Col className='confirm' xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Button onClick={action} type='primary' msg={btnTitle}/>
                </Col>
            </StyleWrapper>
        )
    }

}

export default connect(
    state => state
)(withNamespaces('common')(BottomAction));