import api from "../utils/api";

// login user
export const loginUser = async (credentials) => {
  const res = await api.post("/auth/login", credentials);
  return res.data;
};

// signup user
export const signupUser = async (data) => {
  const res = await api.post("/auth/signup", data);
  return res.data;
};

// save auth data
export const saveAuth = ({ token, username }) => {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
};

// logout user
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
};

// get token (helper)
export const getToken = () => {
  return localStorage.getItem("token");
};
