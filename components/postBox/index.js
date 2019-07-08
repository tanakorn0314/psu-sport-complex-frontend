import React from 'react';
import StyledWrapper from './style';
import { Link } from '../../i18n';
import { Typography } from 'antd';
import { H3 } from '../typo';
import cheerio from 'cheerio';
import { withNamespaces } from '../../i18n';

const { Paragraph } = Typography;

class PostBox extends React.Component {
    render() {
        const { t, newsId, img, title, content } = this.props;
        const $ = cheerio('p', content);
        const text = $.text();

        let contentText = text.length > 0 ? text : t('read more');

        return (
            <StyledWrapper>
                <Link href={`/news?newsId=${newsId}`}>
                    <a className='link'>
                        <img src={`/news/image/${img}`} width='100%' height='180vw' style={{marginBottom: 5}}/>
                        <H3>{title}</H3>
                        <Paragraph ellipsis={{ rows: 3 }} style={{ margin: 0 }}>
                            <div className='content'>{contentText}</div>
                        </Paragraph>
                    </a>
                </Link>
            </StyledWrapper>
        )
    }
}

export default withNamespaces('common')(PostBox);