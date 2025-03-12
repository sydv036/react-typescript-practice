import axios from "services/api.customize";

const registerAPI = (data: IRegister) => {
  const BACKEND_URL = "/api/v1/user/register";
  return axios.post<IBackendRes<IResRegister>>(BACKEND_URL, data);
};

const loginAPI = (data: ILogin) => {
  const BACKEND_URL = "/api/v1/auth/login";
  return axios.post<IBackendRes<IResLogin>>(BACKEND_URL, data);
};

export { registerAPI, loginAPI };
