import React from 'react';
import Head from 'next/head';
import SignUp from '../containers/Page/signup';
import SignPage from '../hocs/signPage';

export default SignPage(() => (
    <>
        <Head>
            <title>Sign up</title>
        </Head>
        <SignUp/>
    </>
));