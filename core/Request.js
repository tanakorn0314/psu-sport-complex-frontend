import fetch from 'isomorphic-unfetch';

export default class Request {
    url;
    method;
    body;
    auth;

    constructor(url, method = 'GET') {
        this.url = url;
        this.method = method;
    }

    setMethod = (method) => {
        this.method = method;
    }

    setBody = (body) => {
        this.body = body;
    }

    setAuth = (token) => {
        this.auth = 'bearer ' + token
    }

    createHeaders = () => {
        const { auth, body } = this;
        const headers = {};

        if (auth)
            headers['Authorization'] = auth;
        if (body)
            headers['Content-type'] = 'application/json';

        if (Object.values(headers).length <= 0)
            return false;

        return headers;
    }

    createOptions = () => {
        const { body } = this;
        const options = {};
        const headers = this.createHeaders();

        options.method = this.method;
        if (headers)
            options['headers'] = headers;
        if (body)
            options['body'] = JSON.stringify(body);

        return options;
    }

    send = async () => {
        const options = this.createOptions();

        const res = await new Promise(async (resolve, reject) => {
            const respose = await fetch(this.url, options).catch((e) => { reject({ error: e }) });
            const result = await respose.json().catch((e) => { reject({ error: e }) });
            if (result)
                resolve(result);
            else
                reject(result);
        });

        return res;
    }
}