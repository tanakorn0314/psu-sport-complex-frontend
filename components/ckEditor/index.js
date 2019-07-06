import React from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import CKEditor from '@ckeditor/ckeditor5-react';
import UploadAdapter from './uploadAdapter';

class CKEditorWrapper extends React.Component {

    render() {
        return <CKEditor
            {...this.props}
            editor={ClassicEditor}
            onInit={editor => {
                this.CustomUploadAdapterPlugin(editor)
            }}
        />
    }

    CustomUploadAdapterPlugin(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new UploadAdapter(loader, this.props.uploadUrl);
        };
    }

}
export default CKEditorWrapper;