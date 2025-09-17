import React from "react";
import { useWishlist } from "../../context/WishlistProvider";
import underline from "../../../assets/about/underline.svg";
import nowishlist from "../../../assets/noWishlist.svg";
import { useNavigate } from "react-router-dom";
import returnPolicy from "../../../assets/returnpolicy.svg";
import moneyBack from "../../../assets/moneyBack.svg";
import quality from "../../../assets/quality.svg";
import { useTheme } from "../../config/hooks/useTheme";

const WishList = () => {
    const { colors, theme } = useTheme()
    const { wishlist, removeFromWishlist } = useWishlist();
    const navigate = useNavigate();

    const handleService = () => navigate("/terms-condition");
    const handlePrivacy = () => navigate("/privacy-policy");
    const handleShipping = () => navigate("/shipping-policy");
    const handleReturnPolicy = () => navigate("/return-policy");

    return (
        <div
            className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
        >
            {/* Title */}
            <div className="text-center py-5">
                <h2 className="md:text-[40px] text-[22px] font-belleza flex flex-col items-center gap-[12px]">
                    YOUR WISHLIST
                    <img src={underline} alt="underline" className="w-[261px] h-[22px]" />
                </h2>
            </div>

            {wishlist.length > 0 ? (
                // ✅ Wishlist Items Grid
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 xl:mx-24 lg:mx-5 md:mx-10 mx-4">
                    {wishlist.map((item) => (
                        <div
                            key={item.id}
                            className={`py-3 flex flex-col items-center  transition `}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-[320px] h-[350px] object-cover py-3"
                            />
                            <h3 className="text-lg font-kufam">{item.name}</h3>

                            <button className="bg-[#5E6A74] text-black px-4 py-2 rounded-md mt-3 w-full">
                                Move to Cart
                            </button>
                            <p className="text-sm text-gray-400 pt-1">
                                Added on {new Date().toDateString()}
                            </p>
                            {/* <button
                                onClick={() => removeFromWishlist(item.id)}
                                className="text-red-500 text-sm mt-2"
                            >
                                Remove
                            </button> */}
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className="flex flex-col justify-center items-center gap-4 py-16">
                        <img src={nowishlist} alt="Empty Wishlist" className="w-[180px]" />
                        <p className="text-4xl font-belleza font-semibold py-3">
                            No Product Found!
                        </p>
                        <button
                            onClick={() => navigate("/")}
                            className="bg-[#C79954] text-white font-kufam w-[250px] px-6 py-2 rounded-md"
                        >
                            Add Product
                        </button>
                    </div>

                    {/* Policy Buttons */}
                    <div className="flex flex-row border-b border-gray-600/40">
                        <button
                            onClick={handleReturnPolicy}
                            className="w-full py-3 text-sm font-kufam opacity-80 hover:underline"
                        >
                            RETURN POLICY
                        </button>
                        <button
                            onClick={handleShipping}
                            className="w-full py-3 text-sm font-kufam opacity-80 hover:underline"
                        >
                            SHIPPING POLICY
                        </button>
                        <button
                            onClick={handlePrivacy}
                            className="w-full py-3 text-sm font-kufam opacity-80 hover:underline"
                        >
                            PRIVACY POLICY
                        </button>
                        <button
                            onClick={handleService}
                            className="w-full py-3 text-sm font-kufam opacity-80 hover:underline"
                        >
                            TERMS OF SERVICE
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
                </>
            )}
        </div>
    );
};

export default WishList;
