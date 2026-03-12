import axios from "axios";

const api = axios.create({
    baseURL : "http://localhost:5001/api/v1",
    withCredentials: true,
});

// interceptor
// 1. There is an error
// 2. If status code === 401 {unauthorized}
// 3. Hit the /auth/refresh endpoint
// 4. After running from the refresh endpoint , rehit the original request

api.interceptors.response.use(
    (response) => response,
    async(error) =>{
        const originalRequest = error.config;
        const isRefreshCall = originalRequest?.url?.includes("/auth/refresh");
        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshCall
        ){
            originalRequest._retry=true;
            try{
                await api.post("/auth/refresh");
                return api(originalRequest);
            } catch(refreshErr){
                return Promise.reject(refreshErr);
            }
        }
    }
)

export { api };