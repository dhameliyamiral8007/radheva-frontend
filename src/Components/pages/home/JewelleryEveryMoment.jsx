
import React, { useState, useEffect } from "react";
import { useTheme } from "../../config/hooks/useTheme";
import AOS from "aos";
import "aos/dist/aos.css";

// Example product images
import Ring from "../../../assets/about/ring.svg";
import Bangle from "../../../assets/about/bangle.svg";
import Rings from "../../../assets/about/rings.svg";
import Chain from "../../../assets/about/chain.svg";
import underline from "../../../assets/about/underline.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";
import like from "../../../assets/like.svg"
import view from "../../../assets/view.svg"
import { useNavigate } from "react-router-dom";
import likeFilled from "../../../assets/fillLike.svg"
import { useCart } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishListProvider";
const JewelleryEveryMoment = () => {
  const { colors } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

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
  }, []);

  const itemsPerPage = 4;
  const products = [
    {
      id: 1,
      name: "14k Gold",
      img: Ring,
      description: "Lorem Ipsum is simply dummy text of the",
      price: "₹1,00,000.00",
      tag: "BEST SELLER",
    },
    {
      id: 2,
      name: "14k Gold",
      img: Bangle,
      description: "Lorem Ipsum is simply dummy text of the",
      price: "₹1,00,000.00",
      tag: "MORE COLOR",
    },
    {
      id: 3,
      name: "14k Gold",
      img: Rings,
      description: "Lorem Ipsum is simply dummy text of the",
      price: "₹1,00,000.00",
      tag: "",
    },
    {
      id: 4,
      name: "14k Gold",
      img: Chain,
      description: "Lorem Ipsum is simply dummy text of the",
      price: "₹1,00,000.00",
      tag: "BEST SELLER",
    },
  ];


  const handleAddToWishlist = (item) => {
    const isInWishlist = wishlist.some((w) => w.id === item.id);

    if (isInWishlist) {
      removeFromWishlist(item.id);
    } else {
      wishlist.forEach((w) => removeFromWishlist(w.id)); // clear old item
      addToWishlist({
        id: item.id, // will now be "cat-1" or "prod-1"
        name: item.name,
        image: item.icon || item.img,
        price: item.price || 25000,
      });
    }
  };
  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage)

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
// #f6f1f4  white mode
  return (
    <div className={`${colors.secondPart.background} ${colors.secondPart.text}  `}>

      <div className="text-center py-5">
        <h2 className="md:text-[44px] text-[22px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[12px]">
          Jewelry for Every Moment
          <img
            src={underline}
            alt="underline"
            className="w-[261.2px] h-[22px]"
          />
        </h2>
      </div>

      {/* Product Grid */}
      <div className="flex flex-col gap-[20px] justify-center">
        <div className="grid xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {products.map((product, idx) => {
            const isInWishlist = wishlist.some((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                data-aos="fade-right"
                data-aos-delay={(products.length - 1 - idx) * 200}
                // data-aos-delay={idx * 200}
                className="relative w-full max-w-[368px] h-auto flex flex-col shadow-md hover:shadow-lg transition-transform duration-300 overflow-hidden"
              >
                {product.tag && (
                  <span className="absolute top-[6px] left-[10px] bg-[#FFFFFF] text-black text-xs font-semibold px-[10px] py-[6px]">
                    {product.tag}
                  </span>
                )}

                {/* Like Button */}
                <div className="absolute top-3 right-3 flex flex-col gap-2 transition-opacity">
                  <button
                    onClick={() => handleAddToWishlist(product)}
                    className="p-2 bg-white rounded-full shadow hover:scale-110"
                  >
                    <img
                      src={isInWishlist ? likeFilled : like}
                      alt="like"
                      className={isInWishlist ? "text-red-500" : ""}
                    />
                  </button>
                </div>

                <img src={product.img} alt={product.name} className="w-full max-w-[368px] h-auto max-h-[460px]" />

                {/* Add to Cart */}
                <div className="absolute bottom-18 w-full px-2 pb-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-white text-gray-800 font-kufam py-2 shadow hover:bg-gray-300 transition-all"
                  >
                    Add To Cart
                  </button>
                </div>

                {/* Details */}
                <div className="flex flex-row gap-[23px] w-full max-w-[368px]">
                  <div className="flex flex-col justify-center items-start gap-[4px]">
                    <p className="text-[14px] font-kufam">{product.description}</p>
                    <p className="text-[#94A3B8] text-start text-[14px] font-normal">{product.name}</p>
                  </div>
                  <div>
                    <p className="text-[14px] font-normal text-[#A9B2B9]">{product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {/* Pagination Controls - Moved outside and positioned to right */}
        <div className="flex justify-end items-center xl:mx-24 md:mx-10 mx-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <img
              src={leftArrow}
              alt="leftArrow"
              className="w-[72px] h-[12px]"
            />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-full ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
          >
            <img
              src={rightArrow}
              alt="rightArrow"
              className="w-[72px] h-[12px]"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JewelleryEveryMoment;
