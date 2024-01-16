import { CloseCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import axios from "axios";

export const BASE_URL = 'https://animal-space-9ec9cc19e523.herokuapp.com'
// export const BASE_URL = 'http://localhost:3000'

export const storeToken = () => {
    const auth = window.localStorage.getItem('auth');
    if (!auth) {
        return null
    }
    const tmp = JSON.parse(auth)
    return tmp.token
}

export const api = axios.create({
    baseURL: BASE_URL,
});

api.interceptors.request.use(
    async (config) => {
        const token = storeToken();
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const fetcher = (url: string) => api.get(url).then((res) => res.data).catch((err) => {
    Modal.error({
        title: 'Error to Register',
        icon: <CloseCircleOutlined />,
        content: `${err.toString()}`,
    });
});

