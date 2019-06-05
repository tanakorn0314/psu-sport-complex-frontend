import Head from 'next/head';
import Page from '../hocs/bookingPage';
import BookingScreen from '../Screen/Booking';

export default Page(() => (
    <>
        <Head>
            <title>Home</title>
        </Head>
        <BookingScreen />
    </>
  ));