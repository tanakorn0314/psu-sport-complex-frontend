import React from 'react';
import BookingDetail from '../containers/Page/booking_detail';
import Head from 'next/head';
import Page from '../hocs/bookingPage';

export default Page((props) => (
    <>
        <Head>
            <title>Booking Detail</title>
        </Head>
        <BookingDetail {...props}/>
    </>
))