import axios from 'axios';

const defaultUrl = 'http://localhost:3001/api/news/upload';

export default class UploadAdapter {

    constructor(loader, url = defaultUrl) {
        this.loader = loader;
        this.url = url;
    }

    upload() {
        return this.loader.file.then(file => new Promise((resolve, reject) => {
            this.uploadRequest(resolve, reject, file);
        }))
    }

    abort() {
        this.cancel()
        console.log('abort')
    }

    uploadRequest(resolve, reject, file) {
        const formData = new FormData();
        formData.append('file', file)

        axios.post(this.url, formData, {
            onUploadProgress: (progress) => {

            },
            cancelToken: new axios.CancelToken(c => {
                this.cancel = c
            })
        }).then((res) => {
            const result = res.data;
            resolve({
                default: `/news/image/${result.filename}`
            });
        }).catch((err) => {
            reject(err)
        })
    }
}