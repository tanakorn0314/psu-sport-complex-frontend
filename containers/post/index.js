import React from 'react';
import { Card, notification } from 'antd';
import { connect } from 'react-redux';
import NewsAction from '../../redux/news/actions';
import { H2, Label } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import _ from 'lodash';
import Button from '../../components/button';
import Input from '../../components/input';
import UploadImage from '../../components/uploadImage';
import { newsApi } from '../../core/api';
import dynamic from 'next/dynamic';
import StyledWrapper from './style';

const uploadUrl = `${newsApi}/upload`;
const Editor = dynamic(() => import('../../components/ckEditor'), {
    ssr: false
})

class Post extends React.Component {

    render() {
        const { t, title, featuredImageUrl, content } = this.props;

        return (
            <Card style={this.props.style} ref={this.props.ref}>
                <H2 msg='createPost' />
                <div style={{ marginBottom: 5, marginTop: 5 }}>
                    <Label htmlFor='title' msg='postTitle' />
                </div>
                <Input id='title' placeholder={t('postTitle')}
                    value={title}
                    style={{ maxWidth: 300 }}
                    onChange={(e) => { this.handleChange('title', e.target.value) }}
                />
                <div style={{ marginBottom: 5, marginTop: 5 }}>
                    <Label htmlFor='coverImage' msg='coverImage' />
                </div>
                <UploadImage
                    imageUrl={featuredImageUrl}
                    action={uploadUrl}
                    onChange={(url) => { this.handleChange('featuredImageUrl', url) }}
                />
                <StyledWrapper>
                    <Editor
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            this.handleChange('content', data)
                        }}
                        uploadUrl={uploadUrl}
                    />
                </StyledWrapper>
                <Button type='primary' onClick={this.handleSubmit}>{t('post')}</Button>
            </Card>
        )
    }

    handleChange = (key, value) => {
        this.props.onChange && this.props.onChange(key, value);
    }

    handleSubmit = async () => {
        const { t, title, featuredImageUrl, content } = this.props;
        const dto = {
            title,
            featuredImageUrl,
            content
        }
        const result = await this.props.postNews(dto);

        if (result.error) {
            notification['success']({
                message: t('error'),
                description: t(result.error),
                duration: 2
            })
        } else {
            notification['success']({
                message: t('success'),
                description: t('postNewsSuccess'),
                duration: 2
            })
        }
    }

}

export default connect(
    state => state,
    NewsAction
)(withNamespaces('common')(Post))