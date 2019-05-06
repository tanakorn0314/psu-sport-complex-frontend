import React from 'react';
import BookingHistory from '../containers/Page/booking_history';
import Head from 'next/head';
import Page from '../hocs/bookingPage';

export default Page(() => (
    <>
        <Head>
            <title>Booking History</title>
        </Head>
        <BookingHistory/>
    </>
))