// services/CollectionService.jsx
import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const fetchCollectionsService = async () => {
  try {
    const response = await apiInstance.get(`${baseUrl}/client/collection/list`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch collections"
    );
  }
};



