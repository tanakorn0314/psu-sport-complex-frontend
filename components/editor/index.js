import React from 'react';
import { Editor as Edit } from '@tinymce/tinymce-react';
import NewsService from '../../core/service/newsService';
import { tinyMceApiKey as apiKey } from '../../config/secret';
import styled from 'styled-components';

const Editor = styled(Edit)`
    .mce-tinymce {
        box-shadow: none;
        -webkit-box-shadow: none;
    }
`

const imageUploadHandler = async (blobInfo, success, failure) => {
    var formData;

    formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    const result = await NewsService.uploadImage(formData);

    if (result.error)
        failure();

    return success(`/news/image/${result.data.filename}`);
}

class ContentEditor extends React.Component {

    render() {
        const initialValue = this.props.initialValue || '';
        return (
            <Editor
                ref={(editor) => {this.editor = editor}}
                apiKey={apiKey}
                cloudChannel='stable'
                initialValue={initialValue}
                init={{
                    selector: 'textarea',
                    plugins: 'preview image link media mediaembed table hr pagebreak nonbreaking anchor insertdatetime wordcount imagetools textpattern help mentions advlist lists',
                    toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link image media | alignleft aligncenter alignright alignjustify | numlist bullist outdent indent',
                    images_upload_handler: imageUploadHandler,
                    content_css: '/static/css/style.css',
                    height: 300
                }}
                onChange={this.handleChange}
            />
        )
    }

    handleChange = (e) => {
        this.props.onChange && this.props.onChange(e.target.getContent());
    }

}

export default ContentEditor;