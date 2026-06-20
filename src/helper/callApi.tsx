import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const API_BASE = 'http://localhost:8080';

const API_ROUTES = API_BASE + "/api"

const api = axios.create({
    baseURL: API_ROUTES,
    timeout: 5000,
});

api.interceptors.request.use(config => {
    const token = cookies.get("access_token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,

    (error) => {
        const status = error?.response?.status;

        if (status === 401) {
            cookies.remove("access_token");

            window.location.href = "/auth/login";
        }

        return Promise.reject(error);
    }
);
export default api;