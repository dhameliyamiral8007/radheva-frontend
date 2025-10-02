import { apiInstance } from "../../../api/AxiosApi"
import { baseUrl } from "../../../api/BaseUrl"

export const fetchAllBlog = async () => {
    try {
        const response = await apiInstance.get(
            `${baseUrl}/client/blog/all`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "failed to fatch blog data"
        )
    }
}

export const fetchBlogById = async (blogId) => {
    try {
        const response = await apiInstance.get(
            `${baseUrl}/client/blog/${blogId}`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch blog data"
        )
    }
}

export const fetchPopularBlogs = async () => {
    try {
        const response = await apiInstance.get(
            `${baseUrl}/client/blog/popularblogs`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch popular blogs"
        )
    }
}