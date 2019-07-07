import React from 'react';
import StyledWrapper from './style';
import PostBox from '../../components/postBox';
import { Row, Col, Pagination } from 'antd';
import _ from 'lodash';
import { withNamespaces } from '../../i18n';
import { connect } from 'react-redux';
import NewsAction from '../../redux/news/actions';
import { H1, H3 } from '../../components/typo';

const PAGE_SIZE = 3;

class SectionNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        }

        this.data = props.newsList
    }

    render() {
        const { t } = this.props;
        const { current } = this.state;
        const dataList = this.data;
        const len = dataList ? dataList.length : 0;

        const start = (current - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        const display = dataList ? dataList.slice(start, end) : [];

        return (
            <StyledWrapper>
                <H1>{t('Sport Complex Today')}</H1>
                <H3>{t('The lastest news from sport complex')}</H3>
                <Row gutter={8}>
                    {
                        display.map((data, index) => (
                            <Col key={index} xs={24} sm={24} md={8}>
                                <PostBox
                                    newsId={data.newsId}
                                    img={data.featuredImageUrl}
                                    title={data.title}
                                    content={data.content}
                                />
                            </Col>
                        ))
                    }
                </Row>
                <div className='paginateContainer'>
                    <Pagination size='small' total={len} pageSize={PAGE_SIZE} onChange={this.handleChangePage} />
                </div>
            </StyledWrapper>
        )
    }

    handleChangePage = (current) => {
        const dataList = this.data;
        const len = dataList.length;

        const currentIdx = current * PAGE_SIZE;

        //reach end
        if (currentIdx >= len)
            this.props.fetchNewsFeed();

        this.setState({current});
    }
}

export default connect(
    state => state.News,
    NewsAction
    )(withNamespaces('common')(SectionNews));