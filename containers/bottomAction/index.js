import React from 'react';
import StyleWrapper from './style';
import { connect } from 'react-redux';
import { Col } from 'antd';
import Button from '../../components/button';
import { countBooking } from './helper';
import { H2 } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import PubSub from 'pubsub-js';

class BottomAction extends React.Component {

    state = {
        visible: false
    }

    componentDidMount() {
        this.token = PubSub.subscribe('setBottomActionVisible', (message, visible) => {
            this.setState({visible})
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token)
    }

    render() {
        const { t } = this.props;
        let { idToken, user } = this.props.Auth;
        let { fee, selectedBooking } = this.props.Booking;
        let { visible } = this.state;

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
            visible = false;
        } else if(user.position === 'admin') {
            message = `${t('count')} : ${count} ${t('slot')}${s}`;
            action = this.props.onBook ? this.props.onBook : () => {}
        }
        else {
            message = `${t('total')} : ${fee} ${t('baht')}`;
            action = this.props.onBook ? this.props.onBook : () => {}
        }

        return (
            visible && 
            <StyleWrapper>
                <Col xs={16} sm={16} md={16} lg={16} xl={16} xxl={16}>
                    <H2 className='tota'>{message}</H2>
                </Col>
                <Col className='confirm' xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
                    <Button onClick={action} type='primary' msg={btnTitle} loading/>
                </Col>
            </StyleWrapper>
        )
    }

}

export default connect(
    state => state
)(withNamespaces('common')(BottomAction));