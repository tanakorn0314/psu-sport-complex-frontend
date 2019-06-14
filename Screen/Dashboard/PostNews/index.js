import React from 'react';
import Post from '../../../containers/post';
import PostList from '../../../containers/postList';
import { Anchor } from 'antd';

class PostNews extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id='post' style={{ padding: 20 }} ref={ref => this.postRef = ref}>
                <Post
                    style={{ marginBottom: 20 }}
                />
                <PostList id='postlist' onEdit={this.handleEdit} />
            </div>
        )
    }

    handleEdit = (data) => {
        console.log(data);
    }
}

export default PostNews;