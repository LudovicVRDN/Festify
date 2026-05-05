import axios from "axios";
import { useAuthStore } from "../stores/auth.store";

const api = axios.create({
    baseURL: '/api' ,//NestJS baseURL 
    withCredentials : true, //Needed for send/receive cookies 
});

//Use axios interceptors for add token to every request 
api.interceptors.request.use((config) =>{
    //Get accessToken from AuthStore
    const token = useAuthStore.getState().accessToken;
    //Check if token exists
    if(token){
        //Config token to header authorization
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
});

// Handle unauthorized errors (401) and attempt token refresh
api.interceptors.response.use(
    (response) => response, // if it's 200 it's ok 
    async(error)=>{
        const originalRequest = error.config;

        //If error 401 and it's the first try
        if(error.response?.status === 401 && !originalRequest._retry){
            originalRequest._retry = true;
            
            try{
            //Call API refresh 
            const { data } = await axios.get('http://localhost:3000/auth/refresh_token');

            //Update authStore with new token
            useAuthStore.getState().setAccessToken(data.accessToken);

            //Retry first request with new token
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
            return api(originalRequest);
            }catch(refreshError){
                //If refreshToken is expired too log out
                useAuthStore.getState().logout()
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default api;