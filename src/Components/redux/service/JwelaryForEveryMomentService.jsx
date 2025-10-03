// latest product

import { apiInstance } from "../../../api/AxiosApi"
import { baseUrl } from "../../../api/BaseUrl"

export const jwelaryForEveryMoment = async () => {
    try {
        const response = apiInstance.get(`${baseUrl}/client/product/latestproducts`);
        return (await response).data;
    } catch (error) {
        error.response?.data?.message || "Failed to fetch latest Product data"

    }
}