// services/ProductService.jsx
import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

// Build query string helpers
const toCsv = (arr) => (Array.isArray(arr) ? arr.filter(Boolean).join(",") : "");

export const fetchFilteredProductsService = async ({
  metal,
  color,
  diamond,
  diamondSize,
  sort,
}) => {
  const params = new URLSearchParams();
  if (metal) params.set("metal", toCsv(metal));
  if (color) params.set("color", toCsv(color));
  if (diamond) params.set("diamond", toCsv(diamond));
  if (diamondSize) params.set("diamondSize", toCsv(diamondSize));
  if (sort) params.set("sort", sort);

  try {
    const response = await apiInstance.get(
      `${baseUrl}/client/product/getFilteredProducts?${params.toString()}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch filtered products"
    );
  }
};

export const fetchProductByIdService = async (productId) => {
  try {
    const response = await apiInstance.get(
      `${baseUrl}/client/product/getProductById/${productId}`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch product details"
    );
  }
};

export const fetchLatestGoldPriceService = async () => {
  try {
    const response = await apiInstance.get(
      `${baseUrl}/client/product/getLatestGoldPrice`
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Failed to fetch gold price"
    );
  }
};



