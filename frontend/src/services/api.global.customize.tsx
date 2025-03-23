import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    delay: 2000,
  },
});

instance.interceptors.request.use(
  function (config) {
    if (window && window.localStorage) {
      const access_token = localStorage.getItem("access_token")
        ? localStorage.getItem("access_token")
        : null;
      config.headers.Authorization = `Bearer ${access_token}`;
    }
    return config;
  },
  function (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response && response.data && response.data.data) {
      return response.data;
    }
    return response;
  },
  function (error) {
    if (error.response && error.response.data) {
      return error.response.data;
    }
    return Promise.reject(error);
  }
);

export default instance;
