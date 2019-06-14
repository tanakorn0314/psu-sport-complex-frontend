import React from 'react';
import 'isomorphic-unfetch';
import NewsService from '../core/service/newsService';

export default ComposedComponent => {
    class withNews extends React.Component {
        static async getInitialProps(ctx) {
            const { query } = ctx;
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
        
            const { newsId } = query;
            
            const news = await NewsService.fetchNews(newsId);

            if (news && !news.error)
                pageProps.news = news;

            return pageProps;
        }

        render() {
            return (
                <ComposedComponent {...this.props} />
            )
        }
    }
    return withNews;
}
