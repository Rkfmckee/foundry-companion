import axios from "axios";

const options = {
    baseURL: import.meta.env.VITE_FVTT_API_URL,
};

const fvttApiClient = axios.create(options);

fvttApiClient.interceptors.request.use((request) => {
    request.headers["x-api-key"] = import.meta.env.VITE_FVTT_API_KEY;
    return request;
});

export default fvttApiClient;
