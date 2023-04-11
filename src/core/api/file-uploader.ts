import axios, { AxiosRequestConfig } from 'axios';
import camelize from 'camelize-ts';
import { getAccessToken } from './utils';


// Create new instance and configure
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL as string,
});

// Add Authorization header to the axios instance only if token exists
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = await getAccessToken(axios);

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    config.headers["Content-Type"] = 'multipart/form-data'

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response.data = camelize(response.data);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    throw new Error(error);
  }
);

export const api = {
  get: (url: string, config?: AxiosRequestConfig) => axiosInstance.get(url, config),
  post: (url: string, data: unknown, config?: AxiosRequestConfig) => axiosInstance.post(url, data, config),
  put: (url: string, data: unknown, config?: AxiosRequestConfig) => axiosInstance.put(url, data, config),
  delete: (url: string, config?: AxiosRequestConfig) => axiosInstance.delete(url, config),
  patch: (url: string, data: unknown, config?: AxiosRequestConfig) => axiosInstance.patch(url, data, config),
  head: (url: string) => axiosInstance.head(url),
};

