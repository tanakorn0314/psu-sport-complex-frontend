import Head from 'next/head';
import Page from '../hocs/bookingPage';
import BookingHistoryScreen from '../Screen/BookingHistory';

export default Page(() => (
    <>
        <Head>
            <title>Home</title>
        </Head>
        <BookingHistoryScreen />
    </>
  ));