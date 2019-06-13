import React from 'react';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import BillCard from '../../components/billCard';
import BillActions from '../../redux/bill/actions';
import BookingActions from '../../redux/booking/actions';
import ModalActions from '../../redux/modal/actions';
import { PageTitle, H1 } from '../../components/typo';
import { Spin } from 'antd';
import PubSub from 'pubsub-js';

class BookingHistory extends React.Component {

    componentDidMount() {
        const { idToken } = this.props.Auth;
        this.props.fetchBills();
        
        this.token = PubSub.subscribe('updateBill', () => {
            this.props.fetchMyBills(idToken);
        });
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    render() {
        return (
            <StyledWrapper>
                <div className='title'><PageTitle msg='bookingHistory'/></div>
                {this.renderComponent()}
            </StyledWrapper >
        )
    }

    renderComponent = () => {
        const { isLoading } = this.props.Screen;
        const { myBills } = this.props.Bill;
        const { stadiums } = this.props.Stadium;

        if (isLoading)
            return (
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Spin tip='Loading...' size='large' />
                </div>
            );

        if (myBills.length === 0)
            return (
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <H1 msg='noData'></H1>
                </div>
            )

        return (
            <div className='content-container'>
                {
                    myBills.map((bill, index) => {
                        const dataSource = {
                            billId: bill.billId,
                            bookingTime: moment(bill.createdAt),
                            bookings: bill.bookings,
                            balance: bill.fee,
                            sport: stadiums[bill.bookings[0].stadiumId - 1].name
                        }

                        return (
                            <BillCard key={index} style={{ marginBottom: 5 }} dataSource={dataSource} onEdit={this.handleEdit} />
                        )
                    })
                }
            </div>
        )

    }

    handleEdit = (booking) => {
        this.props.showEditBookingModal(booking);
    }

}

export default connect(
    state => state,
    { ...BillActions, ...BookingActions, ...ModalActions }
)(BookingHistory);