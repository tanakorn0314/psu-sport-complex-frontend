import React from 'react';
import Head from 'next/head';
import BookingConfirm from '../containers/Page/booking_list';
import Page from '../hocs/mainPage';

export default Page(() => (
    <>
        <Head>
            <title>Booking Confirm</title>
        </Head>
        <BookingConfirm/>
    </>
))