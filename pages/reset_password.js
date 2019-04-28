import React from 'react';
import Head from 'next/head';
import ResetPassword from '../containers/Page/reset_password';
import ResetPasswordPage from '../hocs/resetPasswordPage';

export default ResetPasswordPage(props => (
    <>
        <Head>
            <title>Reset password</title>
        </Head>
        <ResetPassword {...props}/>
    </>
));