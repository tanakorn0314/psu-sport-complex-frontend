import React from 'react';
import Post from '../../../containers/post';
import PostList from '../../../containers/postList';
import { Anchor } from 'antd';

class PostNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            featureImageUrl: null,
            content: ''
        }
    }

    render() {
        return (
            <div id='post' style={{ padding: 20 }} ref={ref => this.postRef = ref}>
                <Post
                    {...this.state}
                    style={{ marginBottom: 20 }}
                    onChange={this.handleChange}
                />
                <PostList id='postlist' onEdit={this.handleEdit} />
            </div>
        )
    }

    handleChange = (key, value) => {
        this.setState({ [key]: value })
    }

    handleEdit = (data) => {
        const { title, featureImageUrl, content } = data;
        this.setState({title, featureImageUrl, content})
    }
}

export default PostNews;