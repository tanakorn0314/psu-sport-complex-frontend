import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import Booking from '../../Screen/Dashboard/Booking';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <Booking />
    </>
))