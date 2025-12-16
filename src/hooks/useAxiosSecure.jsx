import axios from "axios";
import useAuth from "./useAuth";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const instance = axios.create({
    baseURL: "http://localhost:3000"
});

const useAxiosSecure = () => {
    const { user, signOutUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        // Request Interceptor
        const requestInterceptor = instance.interceptors.request.use(config => {
            const token = user?.accessToken;
            if (token) {
                config.headers.authorization = `Bearer ${token}`;
            }
            return config;
        });

        // Response Interceptor
        const responseInterceptor = instance.interceptors.response.use(
            res => res,
            err => {
                const status = err.response?.status;
                if (status === 401 || status === 403) {
                    signOutUser().then(() => navigate("/login"));
                }
                return Promise.reject(err);
            }
        );

        return () => {
            instance.interceptors.request.eject(requestInterceptor);
            instance.interceptors.response.eject(responseInterceptor);
        };
    }, [user, signOutUser, navigate]);

    return instance;
};

export default useAxiosSecure;

