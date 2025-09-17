import React, { useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme';
import underline from '../../../assets/about/underline.svg';
import { MdFilterList, MdSort } from 'react-icons/md';
import weeddingring from "../../../assets/about/weeddingring.jpg";
import Rectangle from "../../../assets/about/Rectangle.jpg";
import Earring from "../../../assets/about/Earring.jpg";
import Bracelets from "../../../assets/about/Bracelets.jpg";
import { Link } from 'react-router-dom';

const SolitairesRing = () => {
    const { colors, theme } = useTheme();
    const [selectedSort, setSelectedSort] = useState('sort');
    const [totalProducts] = useState(53);
    const [currentRange] = useState({ start: 1, end: 30 });
    const [viewMore, setViewMore] = useState(12) // Show 30 images initially
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [expandedCollections, setExpandedCollections] = useState([false, false, false]);

    // Mock product data - replace with API data later
    const products = [
        { id: 1, price: "₹ 1,20,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 2, price: "₹ 95,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 3, price: "₹ 1,50,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 4, price: "₹ 2,10,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 5, price: "₹ 1,80,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 6, price: "₹ 75,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 7, price: "₹ 2,50,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 8, price: "₹ 1,95,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 9, price: "₹ 1,65,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 10, price: "₹ 1,35,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 11, price: "₹ 2,20,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 12, price: "₹ 1,40,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 13, price: "₹ 1,90,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 14, price: "₹ 2,80,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 15, price: "₹ 3,10,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 16, price: "₹ 2,45,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 17, price: "₹ 1,75,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 18, price: "₹ 1,55,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 19, price: "₹ 2,60,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 20, price: "₹ 1,25,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 21, price: "₹ 2,20,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 22, price: "₹ 1,40,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 23, price: "₹ 1,90,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 24, price: "₹ 2,80,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 25, price: "₹ 3,10,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 26, price: "₹ 2,45,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 27, price: "₹ 1,75,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 28, price: "₹ 1,55,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 29, price: "₹ 2,60,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 30, price: "₹ 1,25,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 31, price: "₹ 2,45,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 32, price: "₹ 1,75,000", image: weeddingring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 33, price: "₹ 1,55,000", image: Rectangle, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 34, price: "₹ 2,60,000", image: Earring, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
        { id: 35, price: "₹ 1,25,000", image: Bracelets, description: "Lorem Ipsum is simply dummy text of the", longDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
    ];

    // Function to render product card
    const ProductCard = ({ product, className = "" }) => (
        <Link to={`/product-detail/${product.id}`} state={{ product }}>
            <div className={` rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ${className} ${theme === "dark" ? "bg-white" : "bg-[#303030]"}`}>
                <div className={`flex items-center justify-center w-full ] bg-gray-100`}>
                    <img src={product.image} alt="image" className="w-[368px] h-[400px]" />
                </div>
                {/* Details below the image */}
                <div className="flex flex-col justify-center items-start gap-[4px] p-4">
                    <p className="text-[14px] font-kufam">{product.description}</p>
                    <p className="text-gray-600 text-start text-xs">{product.name}</p>
                    <p className="text-md font-bold">{product.price}</p>
                </div>
            </div>
        </Link>
    );

    // Function to render mixed layout row (left stacked, right large)
    const MixedLayoutRow1 = ({ startIndex }) => (
        <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Left side - 2 stacked images */}
            <div className="col-span-1 space-y-4">
                <ProductCard product={products[startIndex]} className="h-[calc(50%-8px)]" />
                <ProductCard product={products[startIndex + 1]} className="h-[calc(50%-8px)]" />
            </div>
            <div className="col-span-1 space-y-4">
                <ProductCard product={products[startIndex]} className="h-[calc(50%-8px)]" />
                <ProductCard product={products[startIndex + 1]} className="h-[calc(50%-8px)]" />
            </div>
            {/* Middle - 1 large image */}
            <div className="col-span-2">
                <ProductCard product={products[startIndex + 2]} className="h-full" />
            </div>

        </div>
    );

    // Function to render mixed layout row (left large, right stacked)
    const MixedLayoutRow2 = ({ startIndex }) => (
        <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Left side - 1 small image */}
            <div className="col-span-2">
                <ProductCard product={products[startIndex + 2]} className="h-full" />
            </div>

            {/* Middle - 1 large image */}
            <div className="col-span-1 space-y-4">
                <ProductCard product={products[startIndex]} className="h-[calc(50%-8px)]" />
                <ProductCard product={products[startIndex + 1]} className="h-[calc(50%-8px)]" />
            </div>
            <div className="col-span-1 space-y-4">
                <ProductCard product={products[startIndex]} className="h-[calc(50%-8px)]" />
                <ProductCard product={products[startIndex + 1]} className="h-[calc(50%-8px)]" />
            </div>
        </div>
    );

    // Function to render standard 4-image row
    const StandardRow = ({ startIndex }) => (
        <div className="grid grid-cols-4 gap-4 mb-4">
            {products.slice(startIndex, startIndex + 4).map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );

    // Generate rows dynamically based on viewMore count
    const generateRows = () => {
        const rows = [];
        let productIndex = 0;

        while (productIndex < viewMore) {
            // Add standard rows (4 products each)
            if (productIndex + 4 <= viewMore) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }
            if (productIndex + 4 <= viewMore) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add mixed layout row 1 (4 products)
            if (productIndex + 4 <= viewMore) {
                rows.push(<MixedLayoutRow1 key={`mixed1-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add standard row
            if (productIndex + 4 <= viewMore) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add mixed layout row 2 (4 products)
            if (productIndex + 4 <= viewMore) {
                rows.push(<MixedLayoutRow2 key={`mixed2-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add standard rows
            if (productIndex + 4 <= viewMore) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            if (productIndex + 4 <= viewMore) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }
            // Add mixed layout row 1 (4 products)
            if (productIndex + 4 <= viewMore) {
                rows.push(<MixedLayoutRow1 key={`mixed1-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }
        }

        return rows;
    };

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
            <div className="text-center py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
                <h2 className="text-[20px] sm:text-[26px] md:text-[36px] lg:text-[44px] leading-[100%] tracking-[0px] font-Belleza inline-flex flex-col items-center gap-[8px] sm:gap-[12px]">
                    Solitaires Rings
                    <img
                        src={underline}
                        alt="underline"
                        className="w-32 sm:w-40 md:w-56 lg:w-[261.2px] h-auto"
                    />
                </h2>
            </div>
            <div className='flex justify-center items-center xl:mx-24 lg:mx-5 md:mx-4 mx-4'>
                <div className='bg-[#303030] w-[1532px] h-[56px] p-5 flex justify-between items-center'>
                    {/* Left side - Filter and Sort */}
                    <div className='flex items-center space-x-8'>
                        {/* Filter */}
                        <div
                            className='flex items-center space-x-2 cursor-pointer hover:opacity-100 transition-opacity relative'
                            onClick={() => setShowFilterDropdown((prev) => !prev)}
                        >
                            <MdFilterList className='text-gray-300 text-xl' />
                            <span className='text-gray-300 text-sm font-medium'>Filter</span>
                            {/* Dropdown */}
                            {showFilterDropdown && (
                                <div className={`absolute top-0 mt-6.5 w-[368px] -ml-5 h-[1687px] shadow-lg rounded-lg z-50 p-4 min-w-[220px] ${colors.dropdown.background} ${colors.dropdown.text} `}>
                                    {/* In-Stock Only Toggle */}
                                    <div className={`flex items-center justify-between mb-4 `}>
                                        <span className={`font-medium `}>In-Stock Only</span>
                                        <button
                                            className={`w-10 h-5 flex items-center bg-gray-200 rounded-full p-1 duration-300 focus:outline-none ${inStockOnly ? 'bg-[#B5904F]' : ''}`}
                                            onClick={e => { e.stopPropagation(); setInStockOnly(v => !v); }}
                                        >
                                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${inStockOnly ? 'translate-x-5' : ''}`}></div>
                                        </button>
                                    </div>
                                    {/* Shop by collection sections */}
                                    {[0, 1, 2].map((idx) => (
                                        <div key={idx} className="mb-2">
                                            <div
                                                className={`flex items-center justify-between cursor-pointer hover:text-[#B5904F] `}
                                                onClick={e => { e.stopPropagation(); setExpandedCollections(arr => arr.map((v, i) => i === idx ? !v : v)); }}
                                            >
                                                <span className={`font-semibold`}>Shop by collection</span>
                                                <span className="text-xl">{expandedCollections[idx] ? '-' : '+'}</span>
                                            </div>
                                            {expandedCollections[idx] && (
                                                <div className={`pl-4 mt-2 text-sm `}>
                                                    <div>Collection Option 1</div>
                                                    <div>Collection Option 2</div>
                                                    <div>Collection Option 3</div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Sort By */}
                        <div className='w-px h-6 bg-gray-400 mr-2'></div>
                        <div
                            className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity ${selectedSort === 'sort' ? 'border-2 border-dashed border-purple-400 rounded px-2 py-1' : ''
                                }`}
                            onClick={() => setSelectedSort('sort')}
                        >
                            <MdSort className='text-gray-300 text-xl' />
                            <span className='text-gray-300 text-sm font-medium'>Sort By</span>
                        </div>
                    </div>

                    {/* Right side - Product count */}
                    <div className='text-gray-300 text-sm'>
                        {currentRange.start} - {currentRange.end} products of {totalProducts} products
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className={`px-46 py-8 `}>
                {generateRows()}
            </div>

            {/* Load More Button */}
            <div className="text-center py-8">
                {viewMore < products.length && (
                    <button
                        onClick={() => setViewMore(prev => prev + 8)} // 👈 load 8 more per click
                        className="bg-[#B5904F] text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-Belleza"
                    >
                        View More
                    </button>
                )}
            </div>
        </div>
    )
}

export default SolitairesRing

