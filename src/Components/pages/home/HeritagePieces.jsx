import React, { useState } from "react";
import { useTheme } from "../../config/hooks/useTheme";

import Ring from "../../../assets/about/ring.svg";
import Bangle from "../../../assets/about/bangle.svg";
import Rings from "../../../assets/about/rings.svg";
import Chain from "../../../assets/about/chain.svg";
import underline from "../../../assets/about/underline.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";

const HeritagePieces = () => {
  const { colors } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const products = [
    { id: 1, name: "14k Gold", img: Ring, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "BEST SELLER" },
    { id: 2, name: "14k Gold", img: Bangle, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "MORE COLOR" },
    { id: 3, name: "14k Gold", img: Rings, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "" },
    { id: 4, name: "14k Gold", img: Chain, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "BEST SELLER" },
    { id: 5, name: "14k Gold", img: Ring, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "BEST SELLER" },
    { id: 6, name: "14k Gold", img: Bangle, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "MORE COLOR" },
    { id: 7, name: "14k Gold", img: Rings, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "" },
    { id: 8, name: "14k Gold", img: Chain, description: "Lorem Ipsum is simply dummy text of the", price: "₹1,00,000.00", tag: "BEST SELLER" },
  ];

  // Total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text}`}>
      <div className="text-center">
        <h2 className="md:text-[44px] text-[22px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[12px]">
          Heritage Pieces
          <img src={underline} alt="underline" className="w-[261.2px] h-[22px]" />
        </h2>
      </div>

      {/* Product Grid */}
      <div className="flex flex-col gap-[20px] justify-center py-5">
        <div className="grid xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="relative w-full max-w-[368px] h-auto gap-[4px] flex flex-col shadow-md hover:shadow-lg transition-transform duration-300 overflow-hidden"
            >
              {/* Tag */}
              {product.tag && (
                <span className="absolute top-[6px] left-[10px] bg-[#FFFFFF] text-black text-xs font-semibold px-[10px] py-[6px]">
                  {product.tag}
                </span>
              )}

              {/* Image */}
              <img src={product.img} alt={product.name} className="w-full max-w-[368px] h-auto max-h-[460px]" />

              {/* Details */}
              <div className="flex flex-row gap-[23px] w-full max-w-[368px]">
                <div className="flex flex-col justify-center items-start gap-[4px]">
                  <p className="text-[14px] font-kufam">{product.description}</p>
                  <p className="text-[#94A3B8] text-start text-[14px] font-normal">{product.name}</p>
                </div>
                <div>
                  <p className="text-[14px] font-normal text-[#D9D9D9]">{product.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center xl:mx-24 md:mx-10 mx-4">
          {/* Prev */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`p-2 rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            <img src={leftArrow} alt="prev" className="w-[72px] h-[12px]" />
          </button>

          {/* Next */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`p-2 rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"}`}
          >
            <img src={rightArrow} alt="next" className="w-[72px] h-[12px]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeritagePieces;
