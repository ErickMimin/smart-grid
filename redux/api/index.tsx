import axios from 'axios';

const baseURL = 'http://192.168.0.35:5000/smart-gr/us-central1/widgets/';

export const apiCall = (url: any, data: any, headers: any, method: any) => axios({
    method,
    url: baseURL + url,
    data, 
    headers: headers || {
        "x-request-id": "12345"
    }
});