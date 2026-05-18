import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const api = axios.create({
    baseURL: '/api',//NestJS baseURL 
    withCredentials: true, //Needed for send/receive cookies 
});

//Use axios interceptors for add token to every request 
api.interceptors.request.use((config) => {
    //Get accessToken from AuthStore
    const token = useAuthStore.getState().accessToken;
    //Check if token exists
    if (token) {
        //Config token to header authorization
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

// Handle unauthorized errors (401) and attempt token refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/auth/refresh_token")
        ) {
            originalRequest._retry = true;

            try {

                const { data } = await api.get('/auth/refresh_token', {
                    withCredentials: true
                });


                useAuthStore.getState().setAccessToken(data.access_token);


                originalRequest.headers.Authorization = `Bearer ${data.access_token}`;
                return api(originalRequest);
            } catch (refreshError) {

                useAuthStore.getState().logout();
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;