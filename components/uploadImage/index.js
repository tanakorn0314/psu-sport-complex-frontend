import React from 'react';
import { Upload, Icon } from 'antd';
import axios from 'axios';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class UploadImage extends React.Component {
    state = {
        loading: false,
    };

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    imageUrl,
                    loading: false,
                });
                this.props.onChange
            });
        }
    };

    handleRequest = (option) => {
        const { action } = this.props;
        const { file, filename, onSuccess, onError } = option;

        const formData = new FormData();
        formData.append(filename, file);

        axios.post(action, formData)
            .then(({ data: response }) => {
                this.props.onChange && this.props.onChange(response.filename)
                onSuccess(response, file);
            })
            .catch(onError);

        return {
            abort() {
                console.log('upload progress is aborted.');
            }
        }
    }

        render() {
            const uploadButton = (
                <div>
                    <Icon type={this.state.loading ? 'loading' : 'plus'} />
                    <div className="ant-upload-text">Upload</div>
                </div>
            );
            const { imageUrl } = this.state;
            return (
                <Upload
                    name="file"
                    listType="picture-card"
                    showUploadList={false}
                    onChange={this.handleChange}
                    customRequest={this.handleRequest}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" width='200px' /> : uploadButton}
                </Upload>
            );
        }
    }

    export default UploadImage;