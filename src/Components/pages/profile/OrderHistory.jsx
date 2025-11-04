import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrderHistory } from "../../redux/service/OrderService";
import { useTheme } from "../../config/hooks/useTheme";

const OrderHistory = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("uuid") || localStorage.getItem("token") || localStorage.getItem("jwt");
    if (!token) {
      navigate("/login");
      return;
    }
    const loadOrderHistory = async () => {
      try {
        setLoading(true);
        const res = await fetchOrderHistory();
        // API response structure: res.Data.orders
        const ordersData = res?.Data?.orders || res?.data?.orders || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (e) {
        setError(e?.message || "Failed to load order history");
      } finally {
        setLoading(false);
      }
    };
    loadOrderHistory();
  }, [navigate]);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getStatusBadgeClass = (status) => {
    const lowerStatus = status?.toLowerCase() || "";
    if (lowerStatus === "success" || lowerStatus === "paid") {
      return "bg-green-500 text-white";
    } else if (lowerStatus === "pending") {
      return "bg-orange-500 text-white";
    } else if (lowerStatus === "cancelled") {
      return "bg-red-500 text-white";
    } else if (lowerStatus === "unpaid") {
      return "bg-orange-500 text-white";
    }
    return "bg-gray-500 text-white";
  };

  const handleInvoiceDownload = async (invoiceUrl, orderNo) => {
    if (!invoiceUrl) return;
    
    try {
      // Fetch the PDF file
      const response = await fetch(invoiceUrl);
      const blob = await response.blob();
      
      // Create a blob URL and trigger download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Invoice-${orderNo}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download invoice:', error);
      // Fallback: open in new tab
      window.open(invoiceUrl, '_blank');
    }
  };

  const handleInvoiceView = (invoiceUrl) => {
    if (!invoiceUrl) return;
    window.open(invoiceUrl, '_blank');
  };

  if (loading) {
    return (
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-[500px] flex justify-center items-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C79954] mx-auto"></div>
          <p className="mt-4 text-lg">Loading order history...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <nav className="text-sm">
            <span 
              className="cursor-pointer hover:text-[#C79954]" 
              onClick={() => navigate('/')}
            >
              Home
            </span>
            <span className="mx-2">/</span>
            <span className="text-gray-500">Order History</span>
          </nav>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-8">Order History</h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-500">No orders found.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className={`w-full ${theme === "dark" ? "bg-white" : "bg-white"} rounded-lg shadow-md`}>
              <thead>
                <tr className={`${theme === "dark" ? "bg-gray-200" : "bg-gray-100"}`}>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Total Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Payment Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Order Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Invoice
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.orderId || order._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.order_no || order.orderId || "N/A"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.items?.length || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₹{order.totalamount || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                          order.paymentstatus
                        )}`}
                      >
                        {order.paymentstatus ? order.paymentstatus.charAt(0).toUpperCase() + order.paymentstatus.slice(1) : "Unpaid"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${getStatusBadgeClass(
                          order.orderstatus
                        )}`}
                      >
                        {order.orderstatus ? order.orderstatus.charAt(0).toUpperCase() + order.orderstatus.slice(1) : "Pending"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {order.invoiceUrl ? (
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleInvoiceView(order.invoiceUrl)}
                            className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition-colors text-xs"
                          >
                            VIEW INVOICE
                          </button>
                          <button
                            onClick={() => handleInvoiceDownload(order.invoiceUrl, order.order_no)}
                            className="px-4 py-2 border border-green-500 text-green-500 rounded hover:bg-green-50 transition-colors text-xs"
                            title="Download Invoice"
                          >
                            📥 DOWNLOAD
                          </button>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

