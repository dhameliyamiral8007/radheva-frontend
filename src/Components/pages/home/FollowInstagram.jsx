import React, { useState } from "react";
import { useTheme } from "../../config/hooks/useTheme.jsx";
import underline from "../../../assets/about/underline.svg";

// Import your images here
import Ring from "../../../assets/about/ring.svg";
import Bangle from "../../../assets/about/bangle.svg";
import Rings from "../../../assets/about/rings.svg";
import Chain from "../../../assets/about/chain.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";
const FollowInstagram = () => {
    const { colors } = useTheme();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const products = [
        { id: 1, img: Ring },
        { id: 2, img: Bangle },
        { id: 3, img: Rings },
        { id: 4, img: Chain },
    ];
    // Calculate total pages
    const totalPages = Math.ceil(products.length / itemsPerPage);

    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };
    return (
        <div className={`${colors.secondPart.background} ${colors.secondPart.text} w-full`}>
            {/* Title */}
            <div className="text-center">
                <h2 className="md:text-[38px] text-[22px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[12px]">
                    FOLLOW US ON INSTAGRAM
                    <img
                        src={underline}
                        alt="underline"
                        className="w-[261.2px] h-[22px]"
                    />
                </h2>
            </div>

            {/* Products Grid */}
            <div className="flex flex-col gap-[20px] justify-center py-5">
                <div className="grid xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative gap-[4px] flex flex-col shadow-md hover:shadow-lg transition-transform duration-300 overflow-hidden"
                        >
                            <img
                                src={product.img}
                                alt={`Product`}
                                className="w-[368px] h-[368px] object-cover"
                            />
                        </div>
                    ))}
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

export default FollowInstagram;
