import axios from 'axios';
import { getToken, serverUrl } from './tools';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

const instance = axios.create({
  baseURL: serverUrl,
  timeout: 5000,
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    config.headers.token = getToken();
    NProgress.start();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

/** A collection of HTTP request functions. */
export const request = {
  /**
   * Send a GET request.
   * @param url - The URL for the request.
   * @param [params={}] - The URL parameters to send with the request.
   * @returns The response data.
   */
  get: async (url: string, params: any = {}) => {
    return instance.get(url, { params }).then((res) => res.data);
  },
  /**
   * Send a POST request.
   * @param url - The URL for the request.
   * @param [data={}] - The data to send with the request.
   * @returns The response data.
   */
  post: async (url: string, data: any = {}) => {
    return instance.post(url, data).then((res) => res.data);
  },
  /**
   * Send a PUT request.
   * @param url - The URL for the request.
   * @param [data={}] - The data to send with the request.
   * @returns The response data.
   */
  put: async (url: string, data: any = {}) => {
    return instance.put(url, data).then((res) => res.data);
  },
  /**
   * Send a PATCH request.
   * @param url - The URL for the request.
   * @param [data={}] - The data to send with the request.
   * @returns The response data.
   */
  patch: async (url: string, data: any = {}) => {
    return instance.put(url, data).then((res) => res.data);
  },
  /**
   * Send a DELETE request.
   * @param url - The URL for the request.
   * @returns The response data.
   */
  delete: async (url: string) => {
    return instance.delete(url).then((res) => res.data);
  },
};
