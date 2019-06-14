import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import NewsService from '../../core/service/newsService';
import { apiKey } from './config';

const imageUploadHandler = async (blobInfo, success, failure) => {
    var formData;

    formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());

    const result = await NewsService.uploadImage(formData);

    if (result.error)
        failure();

    return success(`news/image/${result.data.filename}`);
}

class ContentEditor extends React.Component {
    render() {
        return (
            <div>
                <Editor
                    apiKey={apiKey}
                    cloudChannel='stable'
                    initialValue=''
                    init={{
                        selector: 'textarea',
                        plugins: 'preview image link media mediaembed table hr pagebreak nonbreaking anchor insertdatetime wordcount imagetools textpattern help formatpainter pageembed mentions advlist lists',
                        toolbar: 'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment | icons',
                        images_upload_handler: imageUploadHandler,
                        content_css: '/static/css/style.css',
                        height: 300
                    }}
                    onChange={(e) => { this.props.onChange(e.target.getContent()) }}
                />
            </div>
        )
    }

}

export default ContentEditor;