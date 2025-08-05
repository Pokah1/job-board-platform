import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type" : "application/json",
    },
});


const PUBLIC_ENDPOINTS = ["/auth/login/", "/auth/register/"];

// Automatically attach token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token") || "";
    

    //this normalize both sides to avoid case sensitivity
    const isPublic = PUBLIC_ENDPOINTS.some((endpoint) => config.url?.toLowerCase().includes(endpoint.toLowerCase()));

    if (token && !isPublic) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config
});

export default api