import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const getUserProfileService = async () => {
  const response = await apiInstance.get(`${baseUrl}/user/auth`);
  return response.data;
};

export const updateUserProfileService = async (userId, payload) => {
  const response = await apiInstance.put(`${baseUrl}/user/auth/update/${userId}`, payload);
  return response.data;
};

// import { apiInstance } from "../../../api/AxiosApi";
// import { baseUrl } from "../../../api/BaseUrl";

export const registerService = async (payload) => {
  const { data } = await apiInstance.post(`${baseUrl}/auth/register`, payload);
  return data;
};

export const loginService = async ({ email, password }) => {
  const { data } = await apiInstance.post(`${baseUrl}/auth/login`, {
    email,
    password,
  });
  // Persist token under the key axios expects ('uuid')
  const token =
    data?.token ||
    data?.accessToken ||
    data?.jwt ||
    data?.data?.token ||
    data?.Data?.token ||
    data?.result?.token ||
    data?.user?.token;
  if (token) {
    localStorage.setItem('uuid', token);
  }
  return data;
};

export const logout = () => {
  localStorage.removeItem('uuid');
};


