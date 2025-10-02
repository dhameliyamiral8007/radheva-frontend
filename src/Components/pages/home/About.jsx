
import Bracelets from "../../../assets/about/Bracelets.jpg";
import Earrings from "../../../assets/about/Earring.jpg";
import WeddingRings from "../../../assets/about/weeddingring.jpg";
import underline from "../../../assets/about/underline.svg";

import InformationSection from "./InformationSection";
import like from "../../../assets/like.svg"
import view from "../../../assets/view.svg"
import { useCart } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishListProvider";
import JwellaryEveryMoment from "./JewelleryEveryMoment"
import likeFilled from "../../../assets/fillLike.svg";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "../../config/hooks/useTheme";
import { fetchDiamonds } from "../../redux/slice/DiamondSlice";
import Rectangle from "../../../assets/about/Rectangle.jpg";

const About = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { diamonds, loading, error } = useSelector((state) => state.diamonds);
  const { colors, theme } = useTheme();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // AOS initialization
  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        offset: 200,
        delay: 0,
        duration: 2000,
        easing: "ease",
        once: false,
        mirror: true,
      });
      AOS.refresh();
    }, 100);
  }, [location]);

  // Fetch diamonds on component mount
  useEffect(() => {
    dispatch(fetchDiamonds());
  }, [dispatch]);

  // Transform API data to match your component structure
  const diamondShapes = diamonds.map((diamond) => ({
    id: diamond._id,
    name: diamond.diamondname,
    icon: diamond.diamondImage,
    width: 80,
    height: 80,
  }));

  const categories = [
    { id: 1, name: "ENGAGEMENT RINGS", icon: Rectangle },
    { id: 2, name: "WEDDING RINGS", icon: WeddingRings },
    { id: 3, name: "EARRINGS", icon: Earrings },
    { id: 4, name: "BRACELETS", icon: Bracelets },
  ];

  const handleAddToWishlist = (item) => {
    const isInWishlist = wishlist.some((w) => w.id === item.id);

    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist({
        id: item.id,
        name: item.name,
        image: item.icon || item.img,
        price: item.price || 25000,
      });
    }
  };

  const handleAddToCart = (cat) => {
    addToCart({
      id: cat.id,
      name: cat.name,
      image: cat.icon,
      price: 25000,
      quantity: 1,
    });

    toast.success(`${cat.name} added to cart! 🛒`, {
      style: {
        background: "#fff",
        color: "#000",
        borderRadius: "10px",
        fontWeight: "bold",
      },
    });
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500 text-center">
          <p>Error loading diamonds: {error}</p>
          <button
            onClick={() => dispatch(fetchDiamonds())}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`animate__animated animate__fadeInUp ${colors.firstPart.background} ${colors.firstPart.text} w-full `}
    >
      {/* SHOP BY DIAMOND */}
      <div className="text-center mb-12 py-5">
        <h2 className="text-[35px] font-belleza inline-block relative">
          Shop By Diamond
          <img src={underline} alt="underline" className="p-2 font-belleza" />
        </h2>
      </div>

      {/* Diamond Shapes Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:mx-24 lg:mx-5 md:mx-10 mx-4 xl:grid-cols-10 gap-6 justify-items-center">
        {diamondShapes.map((shape, idx) => (
          <div
            key={shape.id}
            data-aos={idx % 2 === 0 ? "fade-right" : "fade-left"}
            className="flex flex-col items-center w-[130px] gap-[20px] p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={shape.icon}
              alt={shape.name}
              style={{ width: `${shape.width}px`, height: `${shape.height}px` }}
              className={`p-2 ${theme === "dark" ? "filter invert brightness-1800" : "filter brightness-1650"}`}
            />
            <span className="text-sm font-medium">{shape.name}</span>
          </div>
        ))}
      </div>

      {/* SHOP BY STYLE */}
      <div className="text-center md:my-16 my-8">
        <h2 className="md:text-[35px] text-[30px] font-belleza inline-block relative">
          Shop By Style
          <img src={underline} alt="underline" className="p-2" />
        </h2>
      </div>

      <div className="flex flex-col gap-[20px] justify-center">
        {/* Categories Section */}
        <div className="grid xl:gap-[20px] xl:mx-24 lg:mx-5 md:mx-10 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {categories.map((cat, idx) => {
            const isInWishlist = wishlist.some((item) => item.id === cat.id);

            return (
              <div
                key={cat.id}
                data-aos={idx % 2 === 0 ? "fade-up" : "fade-down"}
                data-aos-delay={idx * 150}
                className="relative group gap-[4px] flex flex-col shadow-md transition-transform duration-300 overflow-hidden rounded-xl"
              >
                {/* Like & View buttons */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleAddToWishlist(cat)}
                    className="p-2 bg-white rounded-full shadow hover:scale-110"
                  >
                    <img
                      src={isInWishlist ? likeFilled : like}
                      alt="like"
                      className={isInWishlist ? "text-red-500" : ""}
                    />
                  </button>

                  <button className="p-2 bg-white rounded-full shadow hover:scale-110">
                    <img src={view} alt="view" />
                  </button>
                </div>

                {/* Product Image */}
                <img
                  src={cat.icon}
                  alt={cat.name}
                  className="w-[368px] h-[460px] object-cover"
                />

                {/* Add to Cart Button */}
                <div className="absolute bottom-10 w-full px-2 pb-2">
                  <button
                    onClick={() => handleAddToCart(cat)}
                    className="w-full bg-white text-gray-800 font-kufam py-2 shadow hover:bg-gray-300 transition-all"
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Product Title */}
                <div className="text-start px-2 py-1">
                  <span
                    className={`${colors.firstPart.text} text-[12px] uppercase leading-none letter-spacing-0 font-semibold font-kufam`}
                  >
                    {cat.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <InformationSection />
        <JwellaryEveryMoment />
      </div>
    </div>
  );
};

export default About;