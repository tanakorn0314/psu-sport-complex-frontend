import React from 'react';
import StyledWrapper from './style';
import { Col, Icon, Typography } from 'antd';
import { H3, H4 } from '../typo';
import { connect } from 'react-redux';
import { Link, withNamespaces } from '../../i18n';

class NewsNavigate extends React.Component {
    render() {
        const { t, currentPost, newsList } = this.props;
        const idx = newsList.findIndex(news => news.newsId === currentPost.newsId)

        const prevPost = newsList[idx + 1];
        const nextPost = newsList[idx - 1];

        return (
            <StyledWrapper>
                <Col xs={24} md={12} >
                    {
                        prevPost && (
                            <Link href={`/news?newsId=${prevPost.newsId}`}>
                                <a className='nav-container'>
                                    <div className='nav-title'>
                                        <Icon type='arrow-left' style={{ marginRight: 3 }} />
                                        <H3 msg='prevPost' className='link'/>
                                    </div>
                                    <H4 className='content'>{prevPost.title}</H4>
                                </a>
                            </Link>
                        )
                    }
                </Col>
                <Col xs={24} md={12} >
                    {
                        nextPost && (
                            <Link href={`/news?newsId=${nextPost.newsId}`}>
                                <a className='nav-container'>
                                    <div className='nav-title nav-title-right'>
                                        <H3 msg='nextPost' className='link'/>
                                        <Icon type='arrow-right' style={{ marginLeft: 3 }} />
                                    </div>
                                    <H4 className='content content-right'>{nextPost.title}</H4>
                                </a>
                            </Link>
                        )
                    }
                </Col>
            </StyledWrapper>
        )
    }
}

export default connect(state => state.News)(withNamespaces('common')(NewsNavigate));