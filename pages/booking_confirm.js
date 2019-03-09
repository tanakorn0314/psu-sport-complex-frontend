import React from 'react';
import Head from 'next/head';
import BookingConfirm from '../containers/Page/booking_confirm';
import Page from '../hocs/bookingPage';

const page = Page(props => (
    <>
        <Head>
            <title>Booking Confirm</title>
        </Head>
        <BookingConfirm {...props}/>
    </>
))

export default page;