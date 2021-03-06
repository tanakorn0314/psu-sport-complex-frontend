import React from 'react';
import BookingList from '../containers/Page/booking_list';
import Head from 'next/head';
import Page from '../hocs/bookingPage';

export default Page(() => (
    <>
        <Head>
            <title>Booking List</title>
        </Head>
        <BookingList/>
    </>
))