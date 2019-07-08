import React from 'react';
import StyledWrapper from './style';
import { Link } from '../../i18n';
import { Typography } from 'antd';
import { H3 } from '../typo';

const { Paragraph } = Typography;

class PostBox extends React.Component {
    render() {
        const { newsId, img, title, content } = this.props;
        return (
            <StyledWrapper>
                <Link href={`/news?newsId=${newsId}`}>
                    <a className='link'>
                        <img src={`/news/image/${img}`} width='100%' style={{marginBottom: 5}}/>
                        <H3>{title}</H3>
                        <Paragraph ellipsis={{ rows: 3 }} style={{ margin: 0 }}>
                            <div className='content' dangerouslySetInnerHTML={{ __html: content }} />
                        </Paragraph>
                    </a>
                </Link>
            </StyledWrapper>
        )
    }
}

export default PostBox;