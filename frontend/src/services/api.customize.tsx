import axios from "axios";
import NProgress from "nprogress";

NProgress.configure({
  showSpinner: false,
  trickleSpeed: 100,
});

const instance = axios.create({
  baseURL: import.meta.env.VITE_URL_BACKEND,
  headers: {
    delay: 2000,
  },
});

instance.interceptors.request.use(
  function (config) {
    NProgress.start();
    return config;
  },
  function (error) {
    NProgress.done();
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    NProgress.done();
    if (response && response.data && response.data.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    NProgress.done();
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export default instance;
