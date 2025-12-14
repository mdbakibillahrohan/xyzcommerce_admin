import axios from "axios";
import applicationConfig from "./applicationConfig";
import { getCurrentUserAuthToken } from "../services/auth.service";

const http = axios.create({
    baseURL: applicationConfig.API_BASE_URL,
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
});

// Automatically add updated token
http.interceptors.request.use((config) => {
    const token = getCurrentUserAuthToken();
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
});

export default http;
