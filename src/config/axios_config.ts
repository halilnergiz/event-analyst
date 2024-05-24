import axios from 'axios';


axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}`;

axios.interceptors.request.use(
    (request) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            request.headers['Authorization'] = `Token ${token}`;
        }
        request.headers['Content-Type'] = 'application/json';
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const axiosFileUploadInterceptor = axios.create();
axiosFileUploadInterceptor.interceptors.request.use((request) => {
    try {
        const token = localStorage.getItem('access_token');
        if (token) {
            request.headers['Authorization'] = `Token ${token}`;
        }
        request.headers['Content-Type'] = 'multipart/form-data';
        return request;
    } catch (err) {
        console.log(err);
        throw new Error(err as string);
    }
});