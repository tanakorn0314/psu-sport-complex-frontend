import Head from 'next/head';
import Page from '../hocs/mainPage';
import HomeScreen from '../Screen/Home';

export default Page(() => {
    return (
        <>
            <Head>
                <title>Home</title>
            </Head>
            <HomeScreen />
        </>
    )
});