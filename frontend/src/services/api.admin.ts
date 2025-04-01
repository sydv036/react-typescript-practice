import axios from "@services/api.global.customize";

export const ApiGetDashBoard = () => {
  const URL_BACKEND = `/api/v1/database/dashboard`;
  return axios.get<IResBackend<IDashBoard>>(URL_BACKEND);
};
