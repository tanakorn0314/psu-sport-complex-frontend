import React from 'react';
import { Card, notification } from 'antd';
import { connect } from 'react-redux';
import NewsAction from '../../redux/news/actions';
import { H2, Label } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import _ from 'lodash';
import Button from '../../components/button';
import Editor from '../../components/editor';
import Input from '../../components/input';

class Post extends React.Component {

    state = {
        title: '',
        featuredImageUrl: '',
        content: ''
    }

    render() {
        const { t } = this.props;
        const { title, featuredImageUrl, content } = this.state;

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
                    <Label htmlFor='featured_image' msg='featuredImage' />
                </div>
                <Input id='featured_image' placeholder={t('featuredImage')}
                    value={featuredImageUrl}
                    style={{ maxWidth: 300 }}
                    onChange={(e) => { this.handleChange('featuredImageUrl', e.target.value) }}
                />
                <div style={{ marginBottom: 5, marginTop: 5 }}>
                    <Editor value={content} onChange={(content) => { this.handleChange('content', content) }} />
                </div>
                <Button type='primary' onClick={this.handleSubmit}>{t('post')}</Button>
            </Card>
        )
    }

    handleChange = (key, value) => {
        console.log(value);
        this.setState({ [key]: value });
    }

    handleSubmit = async () => {
        const { t } = this.props;
        const dto = this.state;
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