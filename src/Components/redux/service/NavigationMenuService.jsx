// service/navigationMenuService.js
import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const fetchNavigationMenuService = async () => {
    try {
        const response = await apiInstance.get(
            `${baseUrl}/client/navigation`
        );
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch navigation menu data"
        );
    }
};