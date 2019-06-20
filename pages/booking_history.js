import Head from 'next/head';
import Page from '../hocs/authGuardPage';
import BookingHistoryScreen from '../Screen/BookingHistory';

export default Page(() => (
    <>
        <Head>
            <title>Home</title>
        </Head>
        <BookingHistoryScreen />
    </>
  ));