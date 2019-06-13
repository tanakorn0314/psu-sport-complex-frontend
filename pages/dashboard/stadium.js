import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import Stadium from '../../Screen/Dashboard/Stadium';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <Stadium/>
    </>
))