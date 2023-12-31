import axios from "axios";

export const defaultAxios = axios.create({
  baseURL: "/api",
});

export const authAxios = axios.create({
  baseURL: "/api",
});

let currentInterceptorId = null;

export const setToken = (token) => {
  if (currentInterceptorId !== null) {
    authAxios.interceptors.request.eject(currentInterceptorId);
  }

  currentInterceptorId = authAxios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => {
      console.log(error);
      return Promise.reject(error);
    }
  );
};
