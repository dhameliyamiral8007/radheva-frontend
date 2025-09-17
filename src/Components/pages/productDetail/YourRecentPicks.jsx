import React, { useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme';
import Ring from "../../../assets/about/ring.svg";
import Bangle from "../../../assets/about/bangle.svg";
import Rings from "../../../assets/about/rings.svg";
import Chain from "../../../assets/about/chain.svg";
import underline from "../../../assets/about/underline.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";

const YourRecentPicks = () => {
const { colors } = useTheme();
      const [currentPage, setCurrentPage] = useState(1);
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
      // Calculate total pages
      const totalPages = Math.ceil(products.length / itemsPerPage);
      // Get current shapes to display
      // const indexOfLastItem = currentPage * itemsPerPage;
      // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
      // const currentShapes = products.slice(indexOfFirstItem, indexOfLastItem);
    
      // Change page
      const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
          setCurrentPage(pageNumber);
        }
      };
  return (
     <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
          <div className="text-center py-5">
            <h2 className="text-[35px] font-belleza inline-block relative">
              Your Recent Picks
              <img src={underline} alt="underline" className="p-2" />
            </h2>
          </div>
    
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:mx-20 md:mx-10 mx-5 gap-6 justify-items-center">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative gap-[10px] flex flex-col shadow-md hover:shadow-lg transition-transform duration-300 overflow-hidden"
              >
                {/* Tag */}
                {product.tag && (
                  <span className="absolute top-2 left-3 bg-gray-200 text-black text-xs font-semibold px-2 py-1 rounded-sm">
                    {product.tag}
                  </span>
                )}
    
                {/* Image */}
                <div className="flex items-center justify-center w-full">
                  <img src={product.img} alt={product.name} className="w-[368px] h-[460px]" />
                </div>
    
                {/* Details */}
                <div className=" flex flex-row gap-[23px]">
                  <div className="flex flex-col justify-center items-start gap-[4px]">
                    <p className="text-[14px] font-kufam">{product.description}</p>
                    <p className="text-gray-500 text-start text-xs">{product.name}</p>
                  </div>
                  <div>
                    <p className="text-md font-bold">{product.price}</p>
    
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination Controls - Moved outside and positioned to right */}
          <div className="flex justify-end items-center xl:mx-20 md:mx-10 mx-5 pt-10">
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
  )
}

export default YourRecentPicks
