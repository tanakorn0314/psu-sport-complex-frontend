import React from 'react';
import StyledWrapper from './style';
import { NewsBannerTitle } from '../../components/typo';
import Showtime from '../../components/showtime';
import { Divider } from 'antd';

class NewsScreen extends React.Component {
    render() {
        const { title, createdAt, content, featuredImageUrl } = this.props.news;

        const url = '/static/image/operation_time.jpg';
        return (
            <StyledWrapper>
                <div className='banner'>
                    <img className='image' src={url} />
                    <NewsBannerTitle className='title'>{title}</NewsBannerTitle>
                </div>
                <div className='content-container'>
                    <Showtime className='showtime' />
                    <div className='content' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <Divider type='horizontal' />
            </StyledWrapper>
        )
    }
}

export default NewsScreen;