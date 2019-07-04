import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import Bill from '../../Screen/Dashboard/Bill';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <Bill />
    </>
))