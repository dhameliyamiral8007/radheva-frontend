import React, { useState } from 'react'
import underline from "../../../assets/about/underline.svg"
import { useTheme } from '../../config/hooks/useTheme.jsx'
import Ring from "../../../assets/about/ring.svg";
import Bangle from "../../../assets/about/bangle.svg";
import Rings from "../../../assets/about/rings.svg";
import Chain from "../../../assets/about/chain.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";
const PopularBlog = () => {
    const { colors } = useTheme();
    // const [currentPage, setCurrentPage] = useState(1);
    // const itemsPerPage = 4;
    const products = [
        { id: 1, img: Ring, description: "Ring Size Guide: Find Your Perfect Fit?" },
        { id: 2, img: Bangle, description: "Ring Size Guide: Find Your Perfect Fit?" },
        { id: 3, img: Rings, description: "Ring Size Guide: Find Your Perfect Fit?" },
        { id: 4, img: Chain, description: "Ring Size Guide: Find Your Perfect Fit?" },
    ];
    // Calculate total pages
    // const totalPages = Math.ceil(products.length / itemsPerPage);
    // Get current shapes to display
    // const indexOfLastItem = currentPage * itemsPerPage;
    // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    // const currentShapes = diamondShapes.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    // const paginate = (pageNumber) => {
    //     if (pageNumber > 0 && pageNumber <= totalPages) {
    //         setCurrentPage(pageNumber);
    //     }
    // };
    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
            <div className="text-center py-5">
                <h2 className="text-[44px] font-belleza inline-block relativ font-normal tracking-[0px] leading-100% uppercase">
                    POPULAR BLOG
                    <img src={underline} alt="underline" className="p-2 mx-auto" />
                </h2>
            </div>
            {/* Products Grid */}
            <div className="flex flex-col gap-[20px] justify-center">
                <div className="grid py-10 xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="relative gap-[20px] flex flex-col transition-transform duration-300 overflow-hidden "
                        >
                            {/* Product Image */}
                            <img
                                src={product.img}
                                alt="Product"
                                className="w-[368px] h-[368px] object-cover"
                            />

                            {/* Product Info */}
                            <div className="flex flex-row gap-[23px]">
                                <div className="flex flex-col justify-center items-start gap-[4px]">
                                    <p className={`${colors.aboutBlog.text} text-[26px] font-normal tracking-[0px] leading-100% font-belleza text-[#334155]`}>{product.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Pagination Controls - Moved outside and positioned to right */}
            {/* <div className="flex justify-end items-center xl:mx-24 md:mx-10 mx-4">
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
                </div> */}

        </div>

    )
}

export default PopularBlog
