import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import Booking from '../../containers/Page/dashboard/booking';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <Booking />
    </>
))