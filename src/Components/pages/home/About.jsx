import React, { useState } from "react";
import { useTheme } from "../../config/hooks/useTheme";
// Switched to SVG icons for better contrast and crisp rendering
import Round from "../../../assets/about/round.svg";
import Oval from "../../../assets/about/cylinder.svg";
import Cushion from "../../../assets/about/hexagone.svg";
import Emerald from "../../../assets/about/octagone.svg";
import Pear from "../../../assets/about/cone.svg";
import Heart from "../../../assets/about/heart.svg";
import Radiant from "../../../assets/about/heptagone.svg";
import Princess from "../../../assets/about/square.svg";
import Marquise from "../../../assets/about/leaf.svg";
import Asscher from "../../../assets/about/hexagon.svg";
import Bracelets from "../../../assets/about/Bracelets.jpg";
import Earrings from "../../../assets/about/Earring.jpg";
import WeddingRings from "../../../assets/about/weeddingring.jpg";
import Rectangle from "../../../assets/about/Rectangle.jpg";
import underline from "../../../assets/about/underline.svg";
import gift from "../../../assets/about/gift.svg";
import diamond from "../../../assets/about/selectDiamond.svg"
import design from "../../../assets/about/ringDesign.svg";
import certified from "../../../assets/about/certified.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";
import InformationSection from "./InformationSection";
import { useNavigate } from "react-router-dom";
import like from "../../../assets/like.svg"
import view from "../../../assets/view.svg"
import { useCart } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishListProvider";
import JwellaryEveryMoment from "./JewelleryEveryMoment"
import likeFilled from "../../../assets/fillLike.svg";

const About = () => {
  const { colors, theme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  // Each shape now has its own width & height
  const shapes = [
    { id: 11, name: "Round", icon: Round, width: 80, height: 80 },
    { id: 12, name: "Oval", icon: Oval, width: 80, height: 80 },
    { id: 13, name: "Cushion", icon: Cushion, width: 80, height: 80 },
    { id: 14, name: "Emerald", icon: Emerald, width: 80, height: 80 },
    { id: 15, name: "Pear", icon: Pear, width: 80, height: 80 },
    { id: 16, name: "Heart", icon: Heart, width: 80, height: 80 },
    { id: 17, name: "Radiant", icon: Radiant, width: 80, height: 80 },
    { id: 18, name: "Princess", icon: Princess, width: 80, height: 80 },
    { id: 19, name: "Marquise", icon: Marquise, width: 80, height: 80 },
    { id: 20, name: "Asscher", icon: Asscher, width: 80, height: 80 },
  ];

  // Use SVG-based icons for crisp rendering in both themes
  const diamondShapes = shapes;
  const categories = [
    { id: 1, name: "ENGAGEMENT RINGS", icon: Rectangle },
    { id: 2, name: "WEDDING RINGS", icon: WeddingRings },
    { id: 3, name: "EARRINGS", icon: Earrings },
    { id: 4, name: "BRACELETS", icon: Bracelets },
  ];

  const information = [
    { id: 1, title: "Gift Package", description: "We'll Choose The Perfect Gift Box For Your Present.", icon: gift, },
    { id: 2, title: "Diamond Selection", description: "Our Consultants Will Help You To Choose The Right Size.", icon: diamond },
    { id: 3, title: "Design Your Ring", description: "Individual Engraving To Perpetuate The Deepest Feelings.", icon: design },
    { id: 4, title: "Certified Jewelry", description: "Certified Craftsmanship That Speaks For Itself.", icon: certified },

  ]
  // Calculate total pages
  const totalPages = Math.ceil(diamondShapes.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleAddToWishlist = (item) => {
    const isInWishlist = wishlist.some((w) => w.id === item.id);

    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist({
        id: item.id, // will now be "cat-1" or "prod-1"
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
  return (
    <div
      className={`${colors.firstPart.background} ${colors.firstPart.text} w-full `}
    >
      {/* SHOP BY DIAMOND */}
      <div className="text-center mb-12 py-5">
        <h2 className="text-[35px] font-belleza inline-block relative">
          Shop By Diamond
          {/* Golden line with swirl */}
          <img src={underline} alt="underline" className="p-2 font-belleza" />
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:mx-24 lg:mx-5 md:mx-10 mx-4 xl:grid-cols-10 gap-6 justify-items-center">
        {diamondShapes.map((shape) => (
          <div
            key={shape.id}
            className="flex flex-col items-center w-[130px] gap-[20px] p-4 hover:scale-105 transition-transform duration-300"
          >
            <img
              src={shape.icon}
              alt={shape.name}
              style={{ width: `${shape.width}px`, height: `${shape.height}px` }}
              className={` p-2 ${theme === "dark" ? "filter invert brightness-1800" : "filter brightness-1650"
                }`}
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
          {categories.map((cat) => {
            const isInWishlist = wishlist.some((item) => item.id === cat.id);

            return (
              <div
                key={cat.id}
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


        {/* Pagination Controls */}
        <div className="flex justify-end items-center xl:mx-24 lg:mx-5 md:mx-10 mx-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-full ${currentPage === 1
              ? "opacity-50 cursor-not-allowed"
              : " dark:hover:bg-gray-700"
              }`}
          >
            <img src={leftArrow} alt="leftArrow" className="w-[72px] h-[12px]" />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-full ${currentPage === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "dark:hover:bg-gray-700"
              }`}
          >
            <img src={rightArrow} alt="rightArrow" className="w-[72px] h-[12px]" />
          </button>
        </div>
        <InformationSection />
        <JwellaryEveryMoment
        // handleAddToCart={handleAddToCart}
        // handleAddToWishlist={handleAddToWishlist}
        // wishlist={wishlist}
        />
      </div>

    </div>
  );
};

export default About;
