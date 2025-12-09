import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const subscribeEmail = async (email) => {
  try {
    const response = await apiInstance.post(`${baseUrl}/client/subscribe`, {
      email,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to subscribe. Please try again."
    );
  }
};
