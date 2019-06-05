import React from 'react';

import { connect } from 'react-redux';
import BookingAction from '../../redux/booking/actions';
import ModalAction from '../../redux/modal/actions';

import dataHandler from './dataHandler';

import StyledWrapper from './style';
import SelectStadium from '../../containers/selectStadium';
import SelectDate from '../../containers/selectDate';
import InputDate from '../../containers/datePicker';
import BookingBoard from '../../containers/bookingBoard';
import BottomAction from '../../containers/bottomAction';


import { Row, Col } from 'antd';
import { PageTitle } from '../../components/typo';
import PageLoader from '../../components/pageLoader';

class BookingScreen extends React.Component {

    constructor(props) {
        super(props);

        const { myBills: bills } = props.Bill;
        const { profile } = props.Auth;

        if (bills && bills.length > 0) {
            this.lastBill = bills[0];
            if (!bills[0].confirmDate && profile.position !== 'admin')
                this.shouldRestoreConfirm = true;
        }

        this.billId = 0;

    }

    componentDidMount() {
        this.token1 = PubSub.subscribe('showTransactionErrorModal', () => {
            this.showTransactionError();
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
    }

    render() {
        const { isLoading, isMobile } = this.props.Screen;

        this.shouldRestoreConfirm && this.restoreConfirmModal();

        return (
            <StyledWrapper>
                <PageTitle style={{ textAlign: 'center' }}>BOOKING</PageTitle>
                {isLoading ? <PageLoader /> :
                    [
                        <Row key={0}>
                            <Col className='select-date' xs={{ order: 2, span: 24 }} sm={12} md={12} lg={12} xl={12}>
                                {isMobile ? <SelectDate style={{ display: 'flex', justifyContent: 'center' }} /> : <InputDate />}
                            </Col>
                            <Col className='select-container' xs={{ order: 1, span: 24 }} sm={12} md={12} lg={12} xl={12}>
                                <SelectStadium style={{ width: isMobile ? '100%' : 200 }} />
                            </Col>
                        </Row>,
                        <div key={1}>
                            <BookingBoard />
                        </div>
                    ]
                }
                <BottomAction onBook={this.handleBook} onAuth={this.handleAuth} />
            </StyledWrapper>
        );
    }

    handleAuth = () => {
        this.props.showAuthModal();
    }

    handleBook = () => {
        const { profile } = this.props.Auth;
        if (profile.position === 'admin') {
            this.bookByAdmin();
        } else {
            this.bookByUser();
        }
    }

    bookByAdmin = () => {
        this.props.showBookByAdminModal();
    }

    bookByUser = async () => {
        const { bookingList, stadiumId, owner, fee, selectedDate } = this.props.Booking;
        const { idToken, profile } = this.props.Auth;

        const bookManyDTO = dataHandler.toBookingDTO(bookingList, profile.userId, owner, stadiumId, selectedDate);

        const result = await this.props.reserve(idToken, bookManyDTO);

        if (result.error) {
            if (result.error === 'Unauthorized') {
                this.props.showRefreshModal('unauthorizedDetail', '/booking');
            }
        } else {
            const dataSource = dataHandler.createConfirmDataSource(fee, result.billId, result.createdAt);

            this.props.showConfirmModal(dataSource);
        }
    }

    restoreConfirmModal = () => {
        const { billId, fee, createdAt } = this.lastBill;

        this.billId = billId;
        this.shouldRestoreConfirm = false;

        const dataSource = dataHandler.createConfirmDataSource(fee, billId, createdAt);

        this.props.showConfirmModal(dataSource);
    }

    showTransactionError = () => {
        this.props.showTransactionErrorModal();
    }

}

export default connect(
    state => state,
    { ...BookingAction, ...ModalAction }
)(BookingScreen);