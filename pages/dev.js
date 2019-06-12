import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import axios from 'axios';

const api = 'http://localhost:3001/api/news';
const apiKey = 'csug08dcfudl33zftz6gjul3m0u7xu4r369rzgx9n41dmvt0';

const handleEditorChange = (e) => {
    console.log('Content was updated:', e.target.getContent());
}

const imageUploadHandler = async (blobInfo, success, failure) => {
    var formData;

    formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    const result = await axios.post(`${api}/upload`, formData);

    console.log('result', result);

    return success(`news/image/${result.data.filename}`);
}

const postNews = async (content) => {
    const result = await axios.post(`${api}`, { content });
    console.log(result);
}

const fetchPost = async (updateState) => {
    const result = await axios.get(`${api}`);
    console.log(result);
    updateState(result.data);
}

export default props => {
    const [content, changeContent] = useState('');
    const [newsList, updateNewsList] = useState([]);
    return (
        <div>
            <Editor
                apiKey={apiKey}
                cloudChannel='stable'
                initialValue="<p>This is the initial content of the editor</p>"
                init={{
                    plugins: 'link image code',
                    toolbar: 'undo redo | bold italic | alignleft aligncenter alignright | code',
                    images_upload_handler: imageUploadHandler,
                }}
                onChange={(e) => {changeContent(e.target.getContent())}}
            />
            <button onClick={(e) => { postNews(content) }}>post</button>
            <button onClick={(e) => { fetchPost(updateNewsList) }}>fetch</button>
            {
                newsList.map((news, index) => (
                    <div key={index}>
                        <div dangerouslySetInnerHTML={{__html: news.content}}/>
                        <hr/>
                    </div>
                ))
            }
        </div>
    )
}