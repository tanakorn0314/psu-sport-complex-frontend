import Head from 'next/head';
import Page from '../hocs/newsPage';
import NewsScreen from '../Screen/News';

export default Page((props) => {
    const { news } = props;
    if (!news)
        return "news not found"
    else
        return (
            <>
                <Head>
                    <title>{news.title}</title>
                </Head>
                <NewsScreen {...props} />
            </>
        )
})