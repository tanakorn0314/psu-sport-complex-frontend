import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import Summary from '../../Screen/Dashboard/Summary';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <Summary />
    </>
))