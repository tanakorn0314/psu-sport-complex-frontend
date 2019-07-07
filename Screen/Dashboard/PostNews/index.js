import React from 'react';
import Post from '../../../containers/post';
import PostList from '../../../containers/postList';

class PostNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            featuredImageUrl: null,
            content: ''
        }
    }

    render() {
        const { title, featuredImageUrl, content } = this.state;
        return (
            <div id='post' style={{ padding: 20 }} ref={ref => this.postRef = ref}>
                <Post
                    title={title}
                    featuredImageUrl={featuredImageUrl}
                    content={content}
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
        const { title, featuredImageUrl, content } = data;
        this.setState({title, featuredImageUrl, content})
    }
}

export default PostNews;