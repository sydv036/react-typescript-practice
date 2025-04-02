import axios from "@services/api.global.customize";

export const ApiGetBookPagination = () => {
  const URL_BACKEND = `/api/v1/book?current=1&pageSize=10`;
  return axios.get<IResBackend<IModelPagination<IBookTable>>>(URL_BACKEND);
};

export const ApiGetCategory = () => {
  const URL_BACKEND = `/api/v1/database/category`;
  return axios.get<IResBackend<string[]>>(URL_BACKEND);
};
