import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const createReviewService = async ({ rating, review, productId, title, files }) => {
  const form = new FormData();
  if (rating != null) form.append("rating", String(rating));
  if (review) form.append("review", review);
  if (productId) form.append("productId", productId);
  if (title) form.append("title", title);
  if (Array.isArray(files)) {
    // Backend expects repeated 'media' parts (curl: --form 'media=@file' ...)
    files.forEach((f) => f && form.append("media", f));
  }

  const response = await apiInstance.post(`${baseUrl}/client/review/create`, form, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};


