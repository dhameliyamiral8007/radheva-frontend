
import React from "react";
import { useCart } from "../../context/CartProvider";
import { useTheme } from "../../config/hooks/useTheme";
import { useNavigate } from "react-router-dom";
import returnPolicy from "../../../assets/returnpolicy.svg"
import moneyBack from "../../../assets/moneyBack.svg"
import quality from "../../../assets/quality.svg"
const CartPopup = ({ isOpen, onClose }) => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate("/cart");
  };

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.price) * (item.quantity || 1),
    0
  );

  const handleService = () => {
    navigate("/terms-condition")
  }
  const handlePrivacy = () => {
    navigate("/privacy-policy")
  }
  const handleShipping = () => {
    navigate("/shipping-policy")
  }
  const handleReturnPolicy = () => {
    navigate("/return-policy")
  }
  return (
    <div
      className={`fixed inset-0 z-60 flex justify-end transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className={`absolute top-0 right-0 md:w-[700px] w-full h-full shadow-lg overflow-y-auto
          ${theme === "dark" ? "bg-[#2F2F2F] text-white" : "bg-white text-black"}
          transition-transform duration-500 ${isOpen ? "translate-x-0" : "translate-x-full"
          }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-600/40">
          <span className="text-[34px] font-normal font-belleza">
            Cart {" "}
            <span className="text-[20px] font-medium font-kufam">{cartItems.length} items</span>
          </span>
          <button onClick={onClose} className="text-xl">
            ✕
          </button>
        </div>

        {/* Free Gift Banner */}
        <div className="px-5 py-3 border-b border-gray-600/40">
          <p className="font-kufam text-green-400">
            Congratulations! You get free gift!
          </p>

        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="p-5">Your cart is empty.</p>
        ) : (
          <div className="p-5 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex gap-8 border border-gray-600 rounded-lg p-3 relative"
              >
                {/* Product Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-40 h-40 object-cover rounded"
                />

                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-semibold text-sm mb-1">
                    {item.name}
                  </h3>

                  {/* Badge (example: Lab Grown Diamond) */}
                  {item.badge && (
                    <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded mb-2">
                      {item.badge}
                    </span>
                  )}

                  <div className="text-sm space-y-1">
                    <p>
                      <span className="font-medium">Metal Type:</span>{" "}
                      {item.metalType}
                    </p>
                    <p>
                      <span className="font-medium">Metal Tone:</span>{" "}
                      {item.metalColor}
                    </p>
                    {item.ringSize && (
                      <p>
                        <span className="font-medium">Ring Size(US):</span>{" "}
                        {item.ringSize}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Price:</span>{" "}
                      <span className="text-[#B5904F] font-semibold">
                        Rs. {item.price.toLocaleString()}
                      </span>{" "}
                      {item.oldPrice && (
                        <span className="line-through text-gray-400 ml-1">
                          Rs. {item.oldPrice.toLocaleString()}
                        </span>
                      )}
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center *:mt-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))
                      }
                      className="px-2 py-1 border rounded-l"
                    >
                      −
                    </button>
                    <div className="px-3 py-1 border-t border-b min-w-[40px] text-center">
                      {item.quantity}
                    </div>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                      className="px-2 py-1 border rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Remove Button */}
                <button
                  className="absolute bottom-3 right-3 text-sm text-gray-300 hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
        {/* gift section */}
        <div className="px-5 py-3 border-b border-gray-600/40">
          <p className="text-sm opacity-70">
            You are eligible for Free Gift for spent over Rs. 85,500.00
          </p>
        </div>
        <div className="flex flex-row px-5 py-3 border-b border-gray-600/40 ">
          <button
            onClick={handleReturnPolicy}
            className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
          >
            RETURN POLICY
          </button>
          <button
            onClick={handleShipping}
            className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
          >
            SHIPPING POLICY
          </button>
          <button
            onClick={handlePrivacy}
            className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
          >
            PRIVACY POLICY
          </button>
          <button
            onClick={handleService}
            className="mt-3 w-full text-center text-sm font-kufam opacity-80 hover:underline"
          >
            TERMS OF SERVICE
          </button>
        </div>
        <div className="flex flex-row justify-between px-5 py-3 border-b border-gray-600/40">
          <div className="flex items-center gap-2">
            <img
              src={returnPolicy}
              alt="return policy"
              className="w-9 h-9 object-cover rounded"
            />
            <p>30 Days return policy</p>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={moneyBack}
              alt="money back"
              className="w-9 h-9 object-cover rounded"
            />
            <p>100% Money back guarantee</p>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={quality}
              alt="quality assured"
              className="w-9 h-9 object-cover rounded"
            />
            <p>Quality assured</p>
          </div>
        </div>

        {/* Subtotal */}
        <div className="px-5 py-4 border-t border-gray-600/40">
          <div className="flex justify-between text-xl font-kufam mb-4">
            <span>Subtotal</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-3 rounded-lg font-bold">
            CHECKOUT
          </button>
          <button
            onClick={handleViewCart}
            className="mt-3 w-full text-center text-sm font-medium opacity-80 hover:underline"
          >
            VIEW SHOPPING CART
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPopup;
