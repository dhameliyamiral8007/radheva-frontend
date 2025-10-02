// import React, { useState } from 'react'
// import underline from "../../../assets/about/underline.svg"
// import { useTheme } from '../../config/hooks/useTheme.jsx'
// import Ring from "../../../assets/about/ring.svg";
// import Bangle from "../../../assets/about/bangle.svg";
// import Rings from "../../../assets/about/rings.svg";
// import Chain from "../../../assets/about/chain.svg";
// import leftArrow from "../../../assets/about/leftArrow.svg";
// import rightArrow from "../../../assets/about/rightArrow.svg";
// const PopularBlog = () => {
//     const { colors } = useTheme();
//     // const [currentPage, setCurrentPage] = useState(1);
//     // const itemsPerPage = 4;
//     const products = [
//         { id: 1, img: Ring, description: "Ring Size Guide: Find Your Perfect Fit?" },
//         { id: 2, img: Bangle, description: "Ring Size Guide: Find Your Perfect Fit?" },
//         { id: 3, img: Rings, description: "Ring Size Guide: Find Your Perfect Fit?" },
//         { id: 4, img: Chain, description: "Ring Size Guide: Find Your Perfect Fit?" },
//     ];
//     // Calculate total pages
//     // const totalPages = Math.ceil(products.length / itemsPerPage);
//     // Get current shapes to display
//     // const indexOfLastItem = currentPage * itemsPerPage;
//     // const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//     // const currentShapes = diamondShapes.slice(indexOfFirstItem, indexOfLastItem);

//     // Change page
//     // const paginate = (pageNumber) => {
//     //     if (pageNumber > 0 && pageNumber <= totalPages) {
//     //         setCurrentPage(pageNumber);
//     //     }
//     // };
//     return (
//         <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
//             <div className="text-center py-5">
//                 <h2 className="text-[44px] font-belleza inline-block relativ font-normal tracking-[0px] leading-100% uppercase">
//                     POPULAR BLOG
//                     <img src={underline} alt="underline" className="p-2 mx-auto" />
//                 </h2>
//             </div>
//             {/* Products Grid */}
//             <div className="flex flex-col gap-[20px] justify-center">
//                 <div className="grid py-10 xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
//                     {products.map((product) => (
//                         <div
//                             key={product.id}
//                             className="relative gap-[20px] flex flex-col transition-transform duration-300 overflow-hidden "
//                         >
//                             {/* Product Image */}
//                             <img
//                                 src={product.img}
//                                 alt="Product"
//                                 className="w-[368px] h-[368px] object-cover"
//                             />

//                             {/* Product Info */}
//                             <div className="flex flex-row gap-[23px]">
//                                 <div className="flex flex-col justify-center items-start gap-[4px]">
//                                     <p className={`${colors.aboutBlog.text} text-[26px] font-normal tracking-[0px] leading-100% font-belleza text-[#334155]`}>{product.description}</p>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//             {/* Pagination Controls - Moved outside and positioned to right */}
//             {/* <div className="flex justify-end items-center xl:mx-24 md:mx-10 mx-4">
//                     <button
//                         onClick={() => paginate(currentPage - 1)}
//                         disabled={currentPage === 1}
//                         className={`rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
//                     >
//                         <img
//                             src={leftArrow}
//                             alt="leftArrow"
//                             className="w-[72px] h-[12px]"
//                         />
//                     </button>
//                     <button
//                         onClick={() => paginate(currentPage + 1)}
//                         disabled={currentPage === totalPages}
//                         className={`rounded-full ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
//                     >
//                         <img
//                             src={rightArrow}
//                             alt="rightArrow"
//                             className="w-[72px] h-[12px]"
//                         />
//                     </button>
//                 </div> */}

//         </div>

//     )
// }

// export default PopularBlog
import React, { useEffect, useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { getPopularBlogs } from '../../redux/slice/BlogSlice'
import underline from "../../../assets/about/underline.svg"
import { Link } from 'react-router-dom'

const PopularBlog = () => {
    const { colors } = useTheme();
    const dispatch = useDispatch()
    const { popularBlogs, popularLoading, error } = useSelector((state) => state.blog)
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // Fetch popular blogs when component mounts
    useEffect(() => {
        dispatch(getPopularBlogs())
    }, [dispatch])

    // Calculate total pages
    const totalPages = Math.ceil(popularBlogs.length / itemsPerPage);
    
    // Get current blogs to display
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlogs = popularBlogs.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const paginate = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    // Get excerpt from content
    const getExcerpt = (content, maxLength = 100) => {
        if (!content) return '';
        // Remove HTML tags and get plain text
        const plainText = content.replace(/<[^>]*>/g, '');
        if (plainText.length <= maxLength) return plainText;
        return plainText.substring(0, maxLength) + '...';
    }

    // Loading state
    if (popularLoading) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full py-10`}>
                <div className="text-center py-5">
                    <h2 className="text-[44px] font-belleza inline-block relative font-normal tracking-[0px] leading-100% uppercase">
                        POPULAR BLOG
                        <img src={underline} alt="underline" className="p-2 mx-auto" />
                    </h2>
                </div>
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C79954]"></div>
                </div>
            </div>
        )
    }

    // Error state
    if (error) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full py-10`}>
                <div className="text-center py-5">
                    <h2 className="text-[44px] font-belleza inline-block relative font-normal tracking-[0px] leading-100% uppercase">
                        POPULAR BLOG
                        <img src={underline} alt="underline" className="p-2 mx-auto" />
                    </h2>
                </div>
                <div className="text-center py-10">
                    <p className="text-red-500 text-lg">Error loading popular blogs: {error}</p>
                </div>
            </div>
        )
    }

    // No blogs state
    if (!popularBlogs || popularBlogs.length === 0) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full py-10`}>
                <div className="text-center py-5">
                    <h2 className="text-[44px] font-belleza inline-block relative font-normal tracking-[0px] leading-100% uppercase">
                        POPULAR BLOG
                        <img src={underline} alt="underline" className="p-2 mx-auto" />
                    </h2>
                </div>
                <div className="text-center py-10">
                    <p className="text-lg">No popular blogs available at the moment.</p>
                </div>
            </div>
        )
    }

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
            <div className="text-center py-5">
                <h2 className="text-[44px] font-belleza inline-block relative font-normal tracking-[0px] leading-100% uppercase">
                    POPULAR BLOG
                    <img src={underline} alt="underline" className="p-2 mx-auto" />
                </h2>
            </div>
            
            {/* Popular Blogs Grid */}
            <div className="flex flex-col gap-[20px] justify-center">
                <div className="grid py-10 xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
                    {currentBlogs.map((blog) => (
                        <div
                            key={blog._id}
                            className="relative gap-[20px] flex flex-col transition-transform duration-300 overflow-hidden group"
                        >
                            {/* Blog Image */}
                            <Link to={`/blog/${blog._id}`}>
                                <img
                                    src={blog.blogImage || 'https://via.placeholder.com/368x368'}
                                    alt={blog.title}
                                    className="w-[368px] h-[368px] object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </Link>

                            {/* Blog Info */}
                            <div className="flex flex-col justify-center items-start gap-[4px]">
                                <Link to={`/blog/${blog._id}`}>
                                    <h3 className={`${colors.aboutBlog.text} text-[26px] font-normal tracking-[0px] leading-[30px] font-belleza text-[#334155] hover:text-[#C79954] transition-colors duration-200`}>
                                        {blog.title || 'Untitled Blog'}
                                    </h3>
                                </Link>
                                <p className={`${colors.aboutBlog.text} text-[16px] font-kufam font-normal tracking-[0px] leading-[20px] text-[#64748B] mt-2`}>
                                    {getExcerpt(blog.content || blog.description)}
                                </p>
                                <p className={`${colors.aboutBlog.text} text-[14px] font-kufam font-normal tracking-[0px] leading-[18px] text-[#94A3B8] mt-2`}>
                                    {blog.author || 'Unknown Author'}
                                </p>
                                <Link 
                                    to={`/blog/${blog._id}`}
                                    className="text-[16px] font-kufam underline font-normal tracking-[0px] leading-100% text-[#C79954] hover:text-[#b68947] transition-colors duration-200 mt-2"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Pagination Controls - Only show if there are multiple pages */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center xl:mx-24 md:mx-10 mx-4 pb-10">
                    <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`p-2 rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    
                    {/* Page numbers */}
                    <div className="flex gap-2 mx-4">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => paginate(page)}
                                className={`px-3 py-1 rounded ${
                                    currentPage === page 
                                    ? 'bg-[#C79954] text-white' 
                                    : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                                }`}
                            >
                                {page}
                            </button>
                        ))}
                    </div>

                    <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`p-2 rounded-full ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            )}
        </div>
    )
}

export default PopularBlog