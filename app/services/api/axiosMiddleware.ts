import axios, { AxiosInstance, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";
import { getCookie } from 'cookies-next';

const config: AxiosRequestConfig = {
    baseURL: 'http://localhost:3001/api/',
};
const server: AxiosInstance = axios.create(config);

server.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

server.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        if (!config.headers) {
            return config;
        }

        const authToken = getCookie('token');
        if (authToken) {
            config.headers.Authorization = `Bearer ${authToken}`;
        }

        return config
    }
);

export default server;
