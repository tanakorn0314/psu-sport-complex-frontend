import React from 'react';

import { withRouter } from 'next/router';
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

import { Row, Col, notification } from 'antd';
import { PageTitle } from '../../components/typo';
import PageLoader from '../../components/pageLoader';
import { withNamespaces } from '../../i18n';
import PubSub from 'pubsub-js';

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
        this.token1 = PubSub.subscribe('showTransactionCompleteModal', () => {
            this.showTransactionComplete();
        });
        this.token2 = PubSub.subscribe('bookingApproved', () => {
            this.notifyApproved();
        });
        this.token3 = PubSub.subscribe('bookingRejected', () => {
            this.notifyRejected();
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token1);
        PubSub.unsubscribe(this.token2);
        PubSub.unsubscribe(this.token3);
    }

    render() {
        const { t } = this.props
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
            const dataSource = dataHandler.createConfirmDataSource(fee, result.billId, result.expiresAt);

            this.props.showBookingConfirmModal(dataSource);
        }
    }

    restoreConfirmModal = () => {
        const { billId, fee, expiresAt } = this.lastBill;

        this.billId = billId;
        this.shouldRestoreConfirm = false;

        const dataSource = dataHandler.createConfirmDataSource(fee, billId, expiresAt);

        this.props.showBookingConfirmModal(dataSource);
    }

    showTransactionComplete = () => {
        this.props.showTransactionCompleteModal();
    }

    notifyApproved = () => {
        const { t } = this.props;
        notification['success']({
            message: t('success'),
            description: t('yourBookingIsApproved'),
            duration: 2
        });
    }

    notifyRejected = () => {
        const { t } = this.props;
        _.debounce(() => {
            notification['info']({
                message: t('fail'),
                description: t('yourBookingIsRejected'),
                duration: 2
            })
        }, 1000)
    }

}

const includeRouter = withRouter(BookingScreen);
const includeNamespaces = withNamespaces('common')(includeRouter);

export default connect(
    state => state,
    { ...BookingAction, ...ModalAction }
)(includeNamespaces);