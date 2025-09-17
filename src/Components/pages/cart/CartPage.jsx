import React from "react";
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
const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { colors, theme } = useTheme();
  const navigate = useNavigate();

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
            <span className="text-[44px] font-medium text-[#475569] tracking-[0px] leading-[52.8px] font-belleza">Your cart is empty</span>
            <span className="">You have no items in your shopping cart.</span>
          </div>
          <button
            onClick={() => navigate("/payment-flow")}
            className="bg-[#C79954] text-white px-6 py-3 rounded font-kufam mt-10"
          >
            CHECKOUT
          </button>
        </div>

        {/* Bottom Icons */}
        <div className="flex flex-row justify-between px-5 py-6">
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
          <p className="font-kufam text-[#0F172A] text-[20px] font-medium tracking-[0px] leading-[100%]">
            Congratulations! You get free gift!
          </p>
          <div class="border-double rounded-lg border-6 border-[#5E6A74]"></div>
        </div>
        {/* <div className="border-b-4 border-gray-600/40 p-2"> <span className="border-b-4 border-gray-600/40"></span></div> */}

        {/* Table Header */}
        <div className="mx-10">
          <div className="grid grid-cols-12 pt-10 pb-3 mb-4 mx-16 text-sm font-semibold">
            <div className="col-span-6 text-[#0F172A]">PRODUCT</div>
            <div className="col-span-2 text-center">PRICE</div>
            <div className="col-span-2 text-center">QUANTITY</div>
            <div className="col-span-2 text-right">SUBTOTAL</div>

          </div>
          <div className="border-b-[1px] opacity-[20%] border-[#A9B2B9]"></div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-12 items-center border-b-2 border-[#A9B2B9]/40 py-8"
            >
              {/* Product */}
              <div className="col-span-6 flex gap-10">
                <div className="flex items-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-[#333333] bg-white rounded-full text-[18px] font-semibold w-[33.25px] h-[33.25px]"
                  >
                    ✕
                  </button>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[184.45px] h-[180px] object-cover"
                />
                <div className="flex flex-col gap-[20px]">
                  <div>
                    <h3 className="font-medium font-kufam text-[#0F172A] text-[20px] tracking-[0px] leading-[100%]">{item.name}</h3>
                  </div>
                  <div className="flex flex-col gap-[12px]">
                    {item.badge && (
                      <span className="inline-block bg-gray-200 text-[#334155] text-xs px-2 py-1 rounded mb-1">
                        {item.badge}
                      </span>
                    )}
                    <p className="text-[20px] tracking-[0px] leading-[100%] font-medium font-kufam">
                      <span className="text-[#334155] ">Metal Type:</span> <span className="pl-10  text-[#64748B]">{item.metalType}</span>
                    </p>
                    <p className="text-[20px] tracking-[0px] leading-[100%] font-medium font-kufam">
                      <span className="text-[#334155]">Metal Tone:</span> <span className="pl-10 text-[#64748B]">{item.metalColor}</span>
                    </p>
                    {item.ringSize && (
                      <p className="text-[20px] tracking-[0px] leading-[100%] font-medium font-kufam">
                        <span className="text-[#334155]">Ring Size(US):</span>{" "}
                        <span className="pl-10 text-[#64748B]">{item.ringSize}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>


              {/* Price */}
              <div className="col-span-2 text-center">
                <span className="font-medium font-kufam text-[#334155] text-[20px] tracking-[0px] leading-[100%]">
                  Price: Rs. {item.price.toLocaleString()}
                </span>
                {item.oldPrice && (
                  <p className="relative text-[#94A3B8] text-[20px] font-medium font-kufam inline-block tracking-[0px] leading-[100%]">
                    Rs. {item.oldPrice.toLocaleString()}
                    <span className="absolute left-0 right-0 top-2 border-t border-[#94A3B8]"></span>
                  </p>
                )}
              </div>

              {/* Quantity */}
              <div className="col-span-2 flex justify-center items-center">
                <button
                  onClick={() =>
                    updateQuantity(item.id, Math.max(1, (item.quantity || 1) - 1))
                  }
                  className="w-[30px] h-[30px] bg-[#D9D9D9]/40 text-[#292D32] rounded-[6px] flex items-center justify-center"
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
                <div className="w-[40px] h-[30px] text-[#292D32] font-medium font-kufam text-[20px] flex items-center justify-center text-center">
                  {item.quantity}
                </div>
                <button
                  onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  className="w-[30px] h-[30px] bg-[#D9D9D9]/40 text-[#292D32] rounded-[6px] flex items-center justify-center"
                  aria-label="Increase quantity"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </button>
              </div>

              {/* Subtotal */}
              <div className="col-span-2 font-medium font-kufam text-[#0F172A] text-[20px] tracking-[0px] leading-[100%]">
                Price: Rs. {(item.price * (item.quantity || 1)).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
        {/* Summary Section */}
        <div className="flex justify-center items-center mt-10">
          <button
            onClick={handleCheckout}
            className="bg-[#C79954] text-[#FFFFFF] text-[20px] w-full max-w-[583px] font-semibold px-[17px] py-[15px] rounded-[10px] font-kufam"
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

      <div className="flex flex-row px-5 py-3 border-b  border-gray-600/40  ">
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
      <div className="flex flex-row justify-between px-5 py-6">
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
