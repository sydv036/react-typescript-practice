import axios from "@services/api.global.customize";

export const ApiGetUserPagination = (query: string) => {
  console.log("check query api:", query);

  const BACKEND_URL = `/api/v1/user${query}`;
  return axios.get<IResBackend<IModelPagination<IUserTable>>>(BACKEND_URL);
};
