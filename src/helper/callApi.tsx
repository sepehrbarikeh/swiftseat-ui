import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const api = axios.create({
    baseURL: 'http://localhost:8080/api',
    timeout: 5000,
});

// افزودن interceptor برای تنظیم هدر Authorization در هر درخواست
api.interceptors.request.use(config => {
    const token = cookies.get("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;