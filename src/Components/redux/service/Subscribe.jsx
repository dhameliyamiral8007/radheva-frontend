import { apiInstance } from "../../../api/AxiosApi";

export const subscribeEmail = async (email) => {
  try {
    const response = await apiInstance.post(
      "http://localhost:8000/client/subscribe",
      { email }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to subscribe. Please try again."
    );
  }
};


