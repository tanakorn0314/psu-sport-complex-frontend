import React from 'react';
import Account from '../containers/Page/account';
import Head from 'next/head';
import Page from '../hocs/mainPage';

export default Page(() => (
    <>
        <Head>
            <title>Account</title>
        </Head>
        <Account/>
    </>
))