// service/navigationMenuService.js
import { apiInstance } from "../../../api/AxiosApi";
import { baseUrl } from "../../../api/BaseUrl";

export const fetchNavigationMenuService = async (position = null) => {
    try {
        let url = `${baseUrl}/client/navigation`;
        if (position) {
            url += `?positions=${position}`;
        }
        const response = await apiInstance.get(url);
        return response.data;
    } catch (error) {
        throw new Error(
            error.response?.data?.message || "Failed to fetch navigation menu data"
        );
    }
};