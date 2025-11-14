import React, { useEffect } from "react";
import { useCart } from "../../context/CartProvider";
import { useTheme } from "../../config/hooks/useTheme";
import underline from "../../../assets/about/underline.svg";
import returnPolicy from "../../../assets/returnpolicy.svg";
import moneyBack from "../../../assets/moneyBack.svg";
import quality from "../../../assets/quality.svg";
import { useNavigate } from "react-router-dom";
import master from "../../../assets/master.svg";
import G from "../../../assets/gpay.svg"
import cart from "../../../assets/cart.svg"
import { baseUrl } from "../../../api/BaseUrl";
const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, incrementQuantity, decrementQuantity, fetchCart } = useCart();
  const { colors, theme } = useTheme();
  const resolveProduct = (item) => {
    console.log("item =",item);
    
    // API may return populated product object or just an id
    // Try common shapes
    return item?.productId && typeof item.productId === 'object' ? item.productId : (item?.product || null);
  };

  const resolveImageSrc = (item) => {
    const product = resolveProduct(item);
    console.log("item = ",item);
    
    const raw = product?.productimage || product?.imageUrl || product?.image || null;
    if (!raw) return "data:image/gif;base64,R0lGODlhAQABAAAAACw="; // 1x1 transparent
    // Prefix baseUrl if server returned a relative path
    if (typeof raw === 'string' && /^https?:\/\//i.test(raw)) return raw;
    return `${baseUrl}${raw.startsWith('/') ? '' : '/'}${raw}`;
  };
  const navigate = useNavigate();

  // Fetch cart data when component mounts
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + Number(item.finalAmount || item.totalPrice || 0) * (item.quantity || 1),
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
  const handleCheckout = () => {
    navigate("/payment-flow")
  }

  if (cartItems.length === 0) {
    return (
      <div
        className={`${colors.firstPart.background} ${colors.firstPart.text} w-full flex flex-col justify-center items-center`}
      >
        <div className="text-center py-5">
          <h2 className="text-[35px] font-belleza inline-block relative">
            MY CART
            <img src={underline} alt="underline" className="p-2" />
          </h2>
        </div>
        <div className="flex flex-col items-center text-center pt-4">
          <div className="w-[200px] h-[200px]">
            <img
              src={cart}
              alt="empty cart"
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col  gap-[10px]">
            <span className={`text-[44px] font-medium tracking-[0px] leading-[52.8px] font-belleza ${colors.firstPart.text}`}>Your cart is empty</span>
            <span className={colors.firstPart.text}>You have no items in your shopping cart.</span>
          </div>

  
        </div>

        {/* Bottom Icons */}
        <div className={`flex flex-row justify-between px-5 py-6 ${colors.firstPart.text}`}>
          <div className="flex items-center gap-2">
            <img src={returnPolicy} alt="return policy" className="w-9 h-9" />
            <p>30 Days return policy</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={moneyBack} alt="money back" className="w-9 h-9" />
            <p>100% Money back guarantee</p>
          </div>
          <div className="flex items-center gap-2">
            <img src={quality} alt="quality assured" className="w-9 h-9" />
            <p>Quality assured</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
    >
      {/* Header */}
      <div className="text-center ">
        <h2 className="text-[35px] font-belleza inline-block relative">
          MY CART
          <img src={underline} alt="underline" className="mx-auto mt-2" />
        </h2>
      </div>

      {/* Cart Items */}
      <div className="max-w-[1550px] py-10 xl:mx-24 md:mx-10 mx-4">
        <div className=" grid gap-[10px]">
          <p className={`font-kufam text-[20px] font-medium tracking-[0px] leading-[100%] ${colors.firstPart.text}`}>
            Congratulations! You get free gift!
          </p>
          <div className="border-double rounded-lg border-6 border-[#5E6A74]"></div>
        </div>
        {/* <div className="border-b-4 border-gray-600/40 p-2"> <span className="border-b-4 border-gray-600/40"></span></div> */}

        {/* Table Header */}
        <div className="mx-10">
          <div className={`grid grid-cols-12 pt-10 pb-3 mb-4 mx-16 text-sm font-semibold ${colors.firstPart.text}`}>
            <div className="col-span-5">PRODUCT</div>
            <div className="col-span-2 text-center">PRICE</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-3 text-right">SUBTOTAL</div>
          </div>
          <div className="border-b-[1px] opacity-[20%] border-[#A9B2B9]"></div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-12 items-start border-b-2 border-[#A9B2B9]/40 py-8"
            >
              {/* Product */}
              <div className="col-span-5 flex gap-4">
                <div className="flex items-start pt-2">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className={`${colors.firstPart.text} bg-white rounded-full text-[18px] font-semibold w-[33.25px] h-[33.25px] flex items-center justify-center hover:opacity-70 transition-opacity`}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
                <img
                  src={resolveImageSrc(item)}
                  alt={(resolveProduct(item)?.productname) || "Product"}
                  className="w-[184.45px] h-[180px] object-cover rounded"
                  crossOrigin="anonymous"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    try { e.currentTarget.src = "data:image/gif;base64,R0lGODlhAQABAAAAACw="; } catch {}
                  }}
                />
                <div className="flex flex-col gap-3 flex-1">
                  <div>
                    <h3 className={`font-medium font-kufam text-[20px] tracking-[0px] leading-[100%] ${colors.firstPart.text} opacity-80`}>
                      {item.productId?.productname || "Product"}
                    </h3>
                  </div>
                  <div className="flex flex-col gap-2">
                    {item.metalId?.metalname && (
                      <p className={`text-base tracking-[0px] leading-[100%] font-medium font-kufam ${colors.firstPart.text}`}>
                        <span>Metal Type:</span> <span className="ml-2 opacity-80">{item.metalId.metalname}</span>
                      </p>
                    )}
                    {item.colorId?.colorname && (
                      <p className={`text-base tracking-[0px] leading-[100%] font-medium font-kufam ${colors.firstPart.text}`}>
                        <span>Metal Tone:</span> <span className="ml-2 opacity-80">{item.colorId.colorname}</span>
                      </p>
                    )}
                    {item.diamondId && (
                      <p className={`text-base tracking-[0px] leading-[100%] font-medium font-kufam ${colors.firstPart.text}`}>
                        <span>Diamond:</span> <span className="ml-2 opacity-80">{item.diamondId.diamondname}</span>
                      </p>
                    )}
                    {item.sizeId && (
                      <p className={`text-base tracking-[0px] leading-[100%] font-medium font-kufam ${colors.firstPart.text}`}>
                        <span>Size:</span> <span className="ml-2 opacity-80">{item.sizeId.carat}ct</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-2 text-center pt-2">
                <span className={`font-medium font-kufam text-[20px] tracking-[0px] leading-[100%] ${colors.firstPart.text}`}>
                  Rs. {item.finalAmount?.toLocaleString() || item.totalPrice?.toLocaleString()}
                </span>
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex justify-center items-center pt-2">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => decrementQuantity(item._id)}
                    className={`w-[30px] h-[30px] bg-[#D9D9D9]/40 rounded-[6px] flex items-center justify-center ${colors.firstPart.text} hover:bg-[#D9D9D9]/60 transition-colors`}
                    aria-label="Decrease quantity"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                    </svg>
                  </button>
                  <div className={`w-[40px] h-[30px] font-medium font-kufam text-[20px] flex items-center justify-center text-center ${colors.firstPart.text}`}>
                    {item.quantity}
                  </div>
                  <button
                    onClick={() => incrementQuantity(item._id)}
                    className={`w-[30px] h-[30px] bg-[#D9D9D9]/40 rounded-[6px] flex items-center justify-center ${colors.firstPart.text} hover:bg-[#D9D9D9]/60 transition-colors`}
                    aria-label="Increase quantity"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Subtotal */}
              <div className={`col-span-3 text-right pt-2 font-medium font-kufam text-[20px] tracking-[0px] leading-[100%] ${colors.firstPart.text}`}>
                Rs. {((item.finalAmount || item.totalPrice || 0) * (item.quantity || 1)).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary Section */}
        <div className="mt-10 max-w-[583px] mx-auto w-full">
          <div className={`flex justify-between items-center mb-4 ${colors.firstPart.text}`}>
            <span className="text-lg font-kufam opacity-80">Total</span>
            <span className="text-2xl font-semibold">₹{subtotal.toLocaleString()}</span>
          </div>
          <p className={`text-sm opacity-70 mb-4 ${colors.firstPart.text}`}>Shipping, taxes, & discounts calculated during checkout.</p>
          <button
            onClick={handleCheckout}
            className="bg-[#C79954] text-[#FFFFFF] text-[20px] w-full font-semibold px-[17px] py-[15px] rounded-[10px] font-kufam"
          >
            CHECKOUT
          </button>
        </div>

      </div>
      {/* Payment Icons */}
      <div className="flex justify-center items-center gap-4 py-3">
        {/* MasterCard */}
        <div className="flex items-center gap-2 bg-[#686868] px-3 py-2 rounded-md">
          <img
            src={master}
            alt="master Card"
            className="h-5 w-auto object-contain"
          />
          <span className="text-white text-sm">Master Card</span>
        </div>

        {/* Google Pay */}
        <div className="flex items-center gap-2 bg-[#686868] px-3 py-2 rounded-md">
          <img
            src={G}
            alt="Google Pay"
            className="h-5 w-auto object-contain"
          />
          <span className="text-white text-sm">G Pay</span>
        </div>
      </div>

      <div className={`flex flex-row px-5 py-3 border-b  border-gray-600/40 ${colors.firstPart.text}`}>
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
      <div className={`flex flex-row justify-between px-5 py-6 ${colors.firstPart.text}`}>
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

    </div>
  );
};

export default CartPage;

