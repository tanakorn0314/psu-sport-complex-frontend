import React from 'react';
import { connect } from 'react-redux';
import PubSub from 'pubsub-js';
import BookingAction from '../../redux/booking/actions';
import StyledWrapper from './style';
import Input from '../../components/input';
import { Label, H2 } from '../../components/typo';
import SelectPosition from '../selectPosition';
import dataHandler from './dataHandler';
import { notification } from 'antd';
import { withNamespaces } from '../../i18n';

class BookingAdmin extends React.Component {

    componentDidMount() {
        this.token1 = PubSub.subscribe('bookByAdmin', () => { this.bookByAdmin() })
        this.token2 = PubSub.subscribe('edit')
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
    }

    render() {
        const { fee } = this.props.Booking;
        const { t } = this.props;
        return (
            <StyledWrapper>
                <div style={{ marginBottom: 5, marginTop: 5 }}><Label msg='ownerName'/></div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder={`${t('firstname')} ${t('lastname')}`}
                    name='name'
                    onChange={this.handleChange}
                />
                <div style={{ marginBottom: 5 }}><Label msg='ownerInformation'/></div>
                <Input
                    style={{ maxWidth: 300 }}
                    placeholder='xxxxxxxxxxx'
                    name='info'
                    onChange={this.handleChange}
                />
                <div style={{ marginBottom: 5 }}><Label msg='ownerType'/></div>
                <SelectPosition style={{ marginBottom: 5} }/>
                <H2>{t('serviceFee')} : {fee} {t('baht')}</H2>
            </StyledWrapper>
        )
    }

    handleChange = e => {
        const { owner } = this.props.Booking;
        const { name, value } = e.target;

        owner[name] = value;

        this.props.setOwner(owner);
    }

    bookByAdmin = async () => {
        const { t } = this.props;
        const { bookingList, stadiumId, selectedDate, owner } = this.props.Booking;
        const { idToken, user } = this.props.Auth;

        const bookAdminDTO = dataHandler.toBookingDTO(bookingList, user.userId, owner, stadiumId, selectedDate);

        const result = await this.props.reserveByAdmin(idToken, bookAdminDTO);

        if (result && !result.error) {
            notification['success']({
                title: t('success'),
                message: t('bookingSuccess'),
                duration: 3
            });

            this.hideModal();
        } 

        PubSub.publish('done');
    }

    hideModal = () => {
        PubSub.publish('hideModal');
    }

}

export default connect(state => state, BookingAction)(withNamespaces('common')(BookingAdmin));