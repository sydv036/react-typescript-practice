import axios from "@services/api.global.customize";

export const ApiGetUserPagination = (query: string) => {
  const BACKEND_URL = `/api/v1/user${query}`;
  return axios.get<IResBackend<IModelPagination<IUserTable>>>(BACKEND_URL);
};

export const ApiInsertUser = (data: IUserInsert) => {
  const BACKEND_URL = `/api/v1/user`;
  return axios.post<IResBackend<IUserTable>>(BACKEND_URL, data);
};
export const ApiUpdateUser = (data: IUserUpdate) => {
  const BACKEND_URL = `/api/v1/user`;
  return axios.put<IResBackend<IResUpdateData>>(BACKEND_URL, data);
};

export const ApiDeleteUser = (id: string) => {
  const BACKEND_URL = `/api/v1/user/${id}`;
  return axios.delete<IResBackend<IResDeleteData>>(BACKEND_URL);
};
