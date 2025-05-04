import axios, { AxiosRequestConfig } from "axios";

const options = {
    baseURL: import.meta.env.VITE_FVTT_API_URL,
};

const fvttApiClient = axios.create(options);

fvttApiClient.interceptors.request.use((request) => {
    request.headers["x-api-key"] = import.meta.env.VITE_FVTT_API_KEY;
    return request;
});

export const requestConfig: AxiosRequestConfig = {
    validateStatus(status) {
        return status < 500;
    },
};

export default fvttApiClient;
