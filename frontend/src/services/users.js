import { authAxios } from "./apiService";

const baseUrl = "/users";

const getUserInfo = async () => {
  const response = await authAxios.get(`${baseUrl}/info`);
  return response.data;
}

const usersService = { getUserInfo };

export default usersService;