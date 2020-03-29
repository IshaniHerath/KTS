import axios from 'axios';

const UNAUTHORIZED = 401;
const axiosInstance = axios;

axiosInstance.defaults.headers.common = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type' : 'application/json',
  'X-Content-Type-Options' : 'nosniff',
  'X-Frame-Options' : 'sameorigin',
  'Cache-Control' : 'public, no-transform'
};

axios.defaults.withCredentials = true;

/**
 * Sets JWT authentication token
 */
axios.interceptors.request.use(
  config => {
    let token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

/**
 * redirects to home page in case of unauthorized request
 */
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === UNAUTHORIZED) {
      window.location = window.location.protocol + '//' + window.location.host;
    }
    return Promise.reject(error);
  }
);

export default {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete
};
