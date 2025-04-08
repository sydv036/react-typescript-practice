import axios from "@services/api.global.customize";

export const ApiGetBookPagination = (query: string) => {
  const URL_BACKEND = `/api/v1/book?${query}`;
  return axios.get<IResBackend<IModelPagination<IBookTable>>>(URL_BACKEND);
};

export const ApiGetCategory = () => {
  const URL_BACKEND = `/api/v1/database/category`;
  return axios.get<IResBackend<string[]>>(URL_BACKEND);
};

export const ApiInsertBook = (data: IBookInsertOrUpdate) => {
  const URL_BACKEND = `/api/v1/book`;
  return axios.post<IResBackend<IBookTable>>(URL_BACKEND, data);
};

export const ApiUpdateBook = (id: string, data: IBookInsertOrUpdate) => {
  console.log("check data api update book", data);

  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.put<IResBackend<IResUpdateData>>(URL_BACKEND, data);
};
export const ApiDeleteBook = (id: string) => {
  const URL_BACKEND = `/api/v1/book/${id}`;
  return axios.delete<IResBackend<IResDeleteData>>(URL_BACKEND);
};
