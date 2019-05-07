import React from 'react';
import enquire from 'enquire-js';
import {
    Table,
    Card,
    List,
    Button
} from 'antd';
import StatusTag from '../../../components/statusTag';
import Router from 'next/router';
import Link from 'next/link';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import moment from 'moment';
import { courts } from '../../../commonData';

import _ from 'lodash';
import BillCard from '../../../components/billCard';
import BillActions from '../../../redux/bill/actions';

import { Spin } from 'antd';

class BookingHistory extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING HISTORY</h1>
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
                    <h2>No data</h2>
                </div>
            )

        return (
            <div className='content-container'>
                {
                    myBills.map((bill, index) => {
                        const dataSource = {
                            billId: bill.billId,
                            bookingTime: moment(bill.createdAt).format('LLL'),
                            balance: bill.fee,
                            sport: stadiums[bill.bookings[0].stadiumId - 1].name
                        }

                        return (
                            <BillCard key={index} style={{ marginBottom: 5 }} dataSource={dataSource} />
                        )
                    })
                }
            </div>
        )

    }

    componentDidMount() {
        const { idToken } = this.props.Auth;
        this.props.fetchMyBills(idToken);
    }

}

export default connect(state => state, BillActions)(BookingHistory);