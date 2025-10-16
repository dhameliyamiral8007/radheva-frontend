import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const addToCartService = async ({
  productId,
  metalId,
  colorId,
  diamondId,
  sizeId,
  discountId = "",
  discountcode = "",
  discountAmount = "",
}) => {
  const payload = {
    productId,
    metalId,
    colorId,
    diamondId,
    sizeId,
    discountId,
    discountcode,
    discountAmount,
  };

  const response = await apiInstance.post(
    `${baseUrl}/user/cart/add`,
    payload
  );
  return response.data;
};

export const removeFromCartService = async (cartItemId) => {
  const response = await apiInstance.delete(
    `${baseUrl}/user/cart/removeFromCart/${cartItemId}`
  );
  return response.data;
};

export const fetchCartService = async () => {
  const response = await apiInstance.get(`${baseUrl}/user/cart/getcartitems`);
  return response.data;
};

export const updateCartQuantityService = async (cartItemId, quantity) => {
  const response = await apiInstance.put(`${baseUrl}/user/cart/updateQuantity/${cartItemId}`, {
    quantity
  });
  return response.data;
};

export const incrementCartItemService = async (cartItemId) => {
  const response = await apiInstance.put(`${baseUrl}/user/cart/increment/${cartItemId}`);
  return response.data;
};

export const decrementCartItemService = async (cartItemId) => {
  const response = await apiInstance.put(`${baseUrl}/user/cart/decrement/${cartItemId}`);
  return response.data;
};

 