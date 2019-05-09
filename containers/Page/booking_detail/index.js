import React from 'react';
import enquire from 'enquire-js';
import Button from '../../../components/uielements/button';
import StatusTag from '../../../components/statusTag';
import Router from 'next/router';
import Link from 'next/link';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import moment from 'moment';

import _ from 'lodash';
import CourtDetailCard from '../../../components/courtDetailCard';
import BillActions from '../../../redux/bill/actions';

import { Spin } from 'antd';

class BookingDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { isLoading } = this.props.Screen;
        const { stadiums } = this.props.Stadium;
        const { billId } = this.props.query;
        const selectedBill = this.props.Bill.myBills.find((bill) => bill.billId === +billId);

        if (!selectedBill)
            return (
                <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h2>No data</h2>
                </div>
            )

        const { bookings, createdAt } = selectedBill;
        const stadium = stadiums[bookings[0].stadiumId - 1]

        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING DETAIL</h1>
                <div>Play date: {moment(bookings[0].startDate).format('MMMM D, YYYY')}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap' }}>
                    <div>Sport: {stadium.name}</div>
                    <div>Booking Timestamp: {moment(createdAt).format('LLL')}</div>
                </div>
                {
                    isLoading ?
                        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Spin tip='Loading...' size='large' />
                        </div> :
                        <div className='content-container'>
                            {this.renderCourtDetails(bookings)}
                            <div style={{width: '100%'}}>
                                <Button type='secondary' onClick={this.navigateBack}>Back</Button>
                            </div>
                        </div>
                }
            </StyledWrapper >
        )
    }

    componentDidMount() {
        const { idToken } = this.props.Auth;
        this.props.fetchMyBills(idToken);
    }

    renderCourtDetails = (bookings) => {
        const courtDetails = [];
        bookings.forEach((booking, index) => {
            const { courtId } = booking;
            if (!courtDetails[courtId - 1])
                courtDetails[courtId - 1] = [];
            courtDetails[courtId - 1].push(booking.startDate);
        })
        return courtDetails.map((courtDetail, num) => {
            return (
                <CourtDetailCard key={num} court={num + 1} durations={courtDetail} style={{ marginBottom: 5 }} />
            )
        })
    }

    navigateBack = () => {
        Router.back();
    }

}

export default connect(state => state, BillActions)(BookingDetail);