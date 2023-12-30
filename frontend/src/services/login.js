import axios from "axios";

const baseUrl = '/api/login'

const login = async (username, password) => {
  const response = await axios.post(baseUrl, { username, password });
  return response.data;
}

const verify = async (token) => {
  const response = await axios.post(`${baseUrl}/verify`, { token });
  return response.status === 200;
}

const loginService = { login, verify }

export default loginService;