import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import OperationTime from '../../containers/Page/dashboard/operationTime';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <OperationTime/>
    </>
))