import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import OperationTime from '../../Screen/Dashboard/OperationTime';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <OperationTime/>
    </>
))