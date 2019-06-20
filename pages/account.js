import Head from 'next/head';
import Page from '../hocs/authGuardPage';
import AccountScreen from '../Screen/Account';

export default Page(() => (
    <>
        <Head>
            <title>Home</title>
        </Head>
        <AccountScreen />
    </>
  ));