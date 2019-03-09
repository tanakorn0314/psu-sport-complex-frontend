import React from 'react';
import Head from 'next/head';
import Booking from '../containers/Page/booking';
import Page from '../hocs/bookingPage';

export default Page(() => (
    <>
        <Head>
            <title>Booking</title>
        </Head>
        <Booking/>
    </>
))