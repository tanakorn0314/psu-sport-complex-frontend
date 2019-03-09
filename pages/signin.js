import React from 'react';
import Head from 'next/head';
import SignIn from '../containers/Page/signin';
import SignPage from '../hocs/signPage';

export default SignPage(() => (
    <>
        <Head>
            <title>Sign in</title>
        </Head>
        <SignIn />
    </>
));