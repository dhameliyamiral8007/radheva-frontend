import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const fetchProducts = async (category) => {
  try {
    const response = await apiInstance.get(
      `${baseUrl}/client/product/${category}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diamond data"
    );
  }
};

export const fetchProductsCollections = async () => {
  try {
    const response = await apiInstance.get(`${baseUrl}/client/collection/list`);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diamond data"
    );
  }
};

export const fetchProductsCollectionsItems = async () => {
  try {
    const response = await apiInstance.get(
      `${baseUrl}/client/collection/allItem`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diamond data"
    );
  }
};

export const fetchFilteredProducts = async (filterData) => {
  const params = Object.fromEntries(
    Object.entries(filterData).map(([key, value]) => [key, value.join(",")])
  );

  try {
    const response = await apiInstance.get(
      `${baseUrl}/client/product/getFilteredProducts`,
      { params }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch diamond data"
    );
  }
};
