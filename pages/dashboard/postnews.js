import React from 'react';
import Head from 'next/head';
import Page from '../../hocs/dashboardPage';
import PostNews from '../../Screen/Dashboard/PostNews';

export default Page(() => (
    <>
        <Head>
            <title>Dashboard</title>
        </Head>
        <PostNews />
    </>
))