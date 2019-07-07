import React from 'react';
import StyledWrapper from './style';
import { NewsBannerTitle } from '../../components/typo';
import Showtime from '../../components/showtime';
import NewsNavigate from '../../components/newsNavigate';
import { Divider } from 'antd';

class NewsScreen extends React.Component {
    render() {
        const { title, createdAt, content, featuredImageUrl } = this.props.news;

        const url = `news/image/${featuredImageUrl}`;
        return (
            <StyledWrapper>
                <div className='banner'>
                    <img className='image' src={url} onError={this.addDefaultImage} />
                    <NewsBannerTitle className='title'>{title}</NewsBannerTitle>
                </div>
                <div className='content-container'>
                    <Showtime className='showtime' date={createdAt} />
                    <div className='content' dangerouslySetInnerHTML={{ __html: content }} />
                </div>
                <NewsNavigate currentPost={this.props.news}/>
            </StyledWrapper>
        )
    }

    addDefaultImage = (e) => {
        e.target.src = `/static/image/noimage.png`;

        return false;
    }
}

export default NewsScreen;