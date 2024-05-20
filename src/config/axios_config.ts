import axios from 'axios';

axios.defaults.baseURL = `${process.env.REACT_APP_API_ENDPOINT}`;

axios.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            request.headers['Authorization'] = `Token ${token}`;
        }
        request.headers['Content-type'] = 'application/json';
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

