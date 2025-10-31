import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const addToWishlistService = async ({
  productId,
  metalId,
  colorId,
  diamondId,
  sizeId,
}) => {
  const payload = { productId, metalId, colorId, diamondId, sizeId };
  const response = await apiInstance.post(`${baseUrl}/user/wishlist/add`, payload);
  return response.data;
};

export const getWishlistService = async () => {
  const response = await apiInstance.get(`${baseUrl}/user/wishlist/getWishlist`);
  return response.data;
};

export const removeFromWishlistService = async (wishlistItemId) => {
  const response = await apiInstance.delete(`${baseUrl}/user/wishlist/remove/${wishlistItemId}`);
  return response.data;
};


