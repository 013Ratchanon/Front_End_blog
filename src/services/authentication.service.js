import api from "./api";
import TokenService from "./token.service";

const API_URL = import.meta.env.VITE_AUTH_URL;

// แก้ตรงนี้: เพิ่ม email
const register = async (username, email, password) => {
  console.log("API URL ", API_URL);
  return await api.post(API_URL + "/register", { username, email, password });
};

const login = async (username, password) => {
  const response = await api.post(API_URL + "/login", { username, password });
  const { status, data } = response;
  if (status === 200) {
    if (data?.accessToken) {
      TokenService.setUser(data);
    }
  }
  return response;
};

const logout = () => {
  TokenService.removeUser();
};

const AuthService = {
  register,
  login,
  logout,
};

export default AuthService;
