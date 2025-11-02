import { apiInstance } from "../../../api/AxiosApi";

const baseUrl = ""; // baseURL comes from apiInstance config

export const applyDiscountCode = async (discountcode) => {
    try {
        const { data } = await apiInstance.post(`${baseUrl}/user/order/applydiscount`, {
            discountcode,
        });
        return data;
    } catch (error) {
        // If error has response data, return it (this allows backend error messages to be shown)
        if (error.response?.data) {
            return error.response.data;
        }
        // Otherwise throw to trigger catch block in component
        throw error;
    }
};

export const placeOrder = async (shippingAddress) => {
    try {
        const { data } = await apiInstance.post(`${baseUrl}/user/order/orderplace`, {
            shippingaddress: shippingAddress,
        });
        return data;
    } catch (error) {
        // If error has response data, return it
        if (error.response?.data) {
            return error.response.data;
        }
        // Otherwise throw to trigger catch block in component
        throw error;
    }
};

export const processPayment = async (paymentData) => {
    try {
        const { data } = await apiInstance.post(`${baseUrl}/user/order/payment`, {
            razorpay_order_id: paymentData.razorpay_order_id,
            razorpay_payment_id: paymentData.razorpay_payment_id,
            razorpay_signature: paymentData.razorpay_signature,
        });
        return data;
    } catch (error) {
        // If error has response data, return it
        if (error.response?.data) {
            return error.response.data;
        }
        // Otherwise throw to trigger catch block in component
        throw error;
    }
};

export default {
    applyDiscountCode,
    placeOrder,
    processPayment,
};


