// services/DiamondService.js
import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const DiamondService = async () => {
  try {
    const response = await apiInstance.get(`${baseUrl}/client/diamond/all`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diamond data"
    );
  }
};