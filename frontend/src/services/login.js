import { defaultAxios, authAxios } from "./apiService";

const baseUrl = "/login";

const login = async (username, password) => {
  const response = await defaultAxios.post(baseUrl, { username, password });
  return response.data;
};

const verify = async () => {
  try {
    const response = await authAxios.get(`${baseUrl}/verify`);
    return response.status === 200;
  } catch {
    return false;
  }
}

const loginService = { login, verify };

export default loginService;
