import axios from "services/api.customize";

const registerAPI = async (data: IRegister) => {
  const BACKEND_URL = "/api/v1/user/register";
  const res = await axios.post(BACKEND_URL, data);
  return res;
};

export { registerAPI };
