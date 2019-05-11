import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import Users from '../../containers/Page/dashboard/users';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <Users/>
    </>
))