import { apiInstance } from "../../../api/AxiosApi"
import { baseUrl } from "../../../api/BaseUrl"

export const homeBannerService = async () => {
    try {
        const response = await apiInstance.get(`${baseUrl}/client/slider?slidertype=banner`);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch diamond data"
        );

    }
}