import axios from "@services/api.global.customize";

export const ApiLogin = (data: ILogin) => {
  const URL_BACKEND = "/api/v1/auth/login";
  return axios.post<IResBackend<IResLogin<IUser>>>(URL_BACKEND, data);
};
