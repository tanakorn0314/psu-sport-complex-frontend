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
import CourtDetailCard from '../../../components/courtDetailCard';
import BillActions from '../../../redux/bill/actions';

import { Spin } from 'antd';

class BookingDetail extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {
            isLoading,
            isMobile
        } = this.props.Screen;

        return (
            <StyledWrapper>
                <h1 className='title'>BOOKING DETAIL</h1>
                <div>Play date: 10/10/2019</div>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 10, flexWrap: 'wrap'}}>
                    <div>Sport: Tennis</div>
                    <div>Booking Timestamp: 10/10/2019 10:10 PM</div>
                </div>
                {
                    isLoading ?
                        <div style={{ width: '100%', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Spin tip='Loading...' size='large' />
                        </div> :
                        <div className='content-container'>
                            {
                                _.range(0, 4).map((num) => {
                                    return (
                                        <CourtDetailCard key={num} style={{ marginBottom: 5 }} />
                                    )
                                })
                            }
                        </div>
                }
            </StyledWrapper >
        )
    }

    componentDidMount() {
        const { idToken } = this.props.Auth;
        this.props.fetchMyBills(idToken);
    }

}

export default connect(state => state, BillActions)(BookingDetail);