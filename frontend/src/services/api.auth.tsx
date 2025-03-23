import axios from "@services/api.global.customize";

export const ApiLogin = (data: ILogin) => {
  const URL_BACKEND = "/api/v1/auth/login";
  return axios.post<IResBackend<IResLogin<IUser>>>(URL_BACKEND, data);
};
export const ApiFetchUser = () => {
  const URL_BACKEND = "/api/v1/auth/account";
  return axios.get<IResBackend<IFetchUser>>(URL_BACKEND);
};

export const ApiRegister = (data: IRegister) => {
  const URL_BACKEND = "/api/v1/user/register";
  return axios.post<IResBackend<IResRegister>>(URL_BACKEND, data);
};
