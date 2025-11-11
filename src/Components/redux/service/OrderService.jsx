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

export const placeOrder = async (shippingAddress, amount = null) => {
    try {
        const payload = { shippingaddress: shippingAddress };
        if (typeof amount === 'number' && amount > 0) {
            // amount in paise so backend can create Razorpay order for exact value
            payload.amount = amount;
        }
        const { data } = await apiInstance.post(`${baseUrl}/user/order/orderplace`, payload);
        console.log("data =",data);
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

export const fetchOrderHistory = async () => {
    try {
        const { data } = await apiInstance.get(`${baseUrl}/user/order/orderHistory`);
        return data;
    } catch (error) {
        if (error.response?.data) {
            return error.response.data;
        }
        throw error;
    }
};

export default {
    applyDiscountCode,
    placeOrder,
    processPayment,
    fetchOrderHistory,
};


