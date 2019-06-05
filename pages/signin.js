import Head from 'next/head';
import Page from '../hocs/mainPage';
import HomeScreen from '../Screen/Home';

export default Page(() => (
    <>
        <Head>
            <title>Home</title>
        </Head>
        <HomeScreen />
    </>
  ));