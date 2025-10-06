import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme';
import underline from '../../../assets/about/underline.svg';
import { MdFilterList, MdSort } from 'react-icons/md';
import weeddingring from "../../../assets/about/weeddingring.jpg";
import Rectangle from "../../../assets/about/Rectangle.jpg";
import Earring from "../../../assets/about/Earring.jpg";
import Bracelets from "../../../assets/about/Bracelets.jpg";
import { Link } from 'react-router-dom';
import { fetchCollectionsService } from '../../redux/service/CollectionService';
import { DiamondService } from '../../redux/service/DiamondService';
import { fetchFilteredProductsService } from '../../redux/service/ProductService';

const SolitairesRing = () => {
    const { colors, theme } = useTheme();
    const [selectedSort, setSelectedSort] = useState('price_high_to_low');
    const [totalProducts, setTotalProducts] = useState(0);
    const [currentRange, setCurrentRange] = useState({ start: 1, end: 0 });
    const [viewMore, setViewMore] = useState(12)
    const [showFilterDropdown, setShowFilterDropdown] = useState(false);
    const [inStockOnly, setInStockOnly] = useState(false);
    const [expandedCollections, setExpandedCollections] = useState([false, false, false]);
    const [collections, setCollections] = useState([]);
    const [diamonds, setDiamonds] = useState([]);
    const [selectedCollectionId, setSelectedCollectionId] = useState(null);
    const [selectedDiamondIds, setSelectedDiamondIds] = useState([]);
    const [selectedDiamondSizeIds, setSelectedDiamondSizeIds] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    // Initial data load: collections, diamonds
    useEffect(() => {
        let alive = true;
        const load = async () => {
            try {
                const [collectionsRes, diamondsRes] = await Promise.all([
                    fetchCollectionsService(),
                    DiamondService()
                ]);
                if (!alive) return;
                setCollections(collectionsRes?.Data || []);
                setDiamonds(diamondsRes?.Data || []);
            } catch (e) {
                // noop: could add toast
            }
        };
        load();
        return () => { alive = false };
    }, []);

    // Compute API query from selection
    const queryParams = useMemo(() => ({
        diamond: selectedDiamondIds,
        diamondSize: selectedDiamondSizeIds,
        sort: selectedSort,
        // backend may ignore unknown params; include if supported
        collection: selectedCollectionId ? [selectedCollectionId] : undefined,
    }), [selectedDiamondIds, selectedDiamondSizeIds, selectedSort, selectedCollectionId]);

    // Fetch products when filters change
    useEffect(() => {
        let alive = true;
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await fetchFilteredProductsService(queryParams);
                if (!alive) return;
                const list = res?.Data || [];
                setProducts(list);
                setTotalProducts(list.length);
                setCurrentRange(r => ({ start: 1, end: Math.min(viewMore, list.length) }));
            } catch (e) {
                if (!alive) return;
                setProducts([]);
                setTotalProducts(0);
                setCurrentRange({ start: 1, end: 0 });
            } finally {
                if (alive) setLoading(false);
            }
        };
        fetchProducts();
        return () => { alive = false };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams]);

    // Function to render product card
    const ProductCard = ({ product, className = "" }) => {
        if (!product) return null;
        return (
            <Link to={`/product-detail/${product?._id || product?.id}`} state={{ product }}>
                <div className={` rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ${className} ${theme === "dark" ? "bg-white" : "bg-[#303030]"}`}>
                    <div className={`flex items-center justify-center w-full ] bg-gray-100`}>
                        <img src={product.productimage || product.image || weeddingring} alt="image" className="w-[368px] h-[400px] object-cover" />
                    </div>
                    {/* Details below the image */}
                    <div className="flex flex-col justify-center items-start gap-[4px] p-4">
                        <p className="text-[14px] font-kufam">{product.productname || product.description}</p>
                        <p className="text-gray-600 text-start text-xs">{product.productsku || product.productslug}</p>
                        <p className="text-md font-bold">{product.price ? `₹ ${Number(product.price).toLocaleString('en-IN')}` : ''}</p>
                    </div>
                </div>
            </Link>
        );
    };

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
                <ProductCard key={product._id || product.id} product={product} />
            ))}
        </div>
    );

    // Generate rows dynamically based on viewMore count
    const generateRows = () => {
        const rows = [];
        let productIndex = 0;
        const maxCount = Math.min(viewMore, products.length);

        while (productIndex < maxCount) {
            // Add standard rows (4 products each)
            if (productIndex + 4 <= maxCount) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }
            if (productIndex + 4 <= maxCount) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add mixed layout row 1 (4 products)
            if (productIndex + 4 <= maxCount) {
                rows.push(<MixedLayoutRow1 key={`mixed1-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add standard row
            if (productIndex + 4 <= maxCount) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add mixed layout row 2 (4 products)
            if (productIndex + 4 <= maxCount) {
                rows.push(<MixedLayoutRow2 key={`mixed2-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            // Add standard rows
            if (productIndex + 4 <= maxCount) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }

            if (productIndex + 4 <= maxCount) {
                rows.push(<StandardRow key={`standard-${productIndex}`} startIndex={productIndex} />);
                productIndex += 4;
            }
            // Add mixed layout row 1 (4 products)
            if (productIndex + 4 <= maxCount) {
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
            {/* Collections heading list */}
            <div className="px-4 sm:px-6 lg:px-8">
                <h3 className="font-Belleza text-xl mb-3">Collections</h3>
                <div className="flex gap-3 overflow-x-auto pb-2">
                    {collections.map((c) => (
                        <button
                            key={c._id}
                            onClick={() => { setSelectedCollectionId(prev => prev === c._id ? null : c._id); }}
                            className={`flex items-center gap-2 border rounded-full px-3 py-2 whitespace-nowrap ${selectedCollectionId === c._id ? 'border-[#B5904F] text-[#B5904F]' : 'border-gray-400'}`}
                            title={c.collectionname}
                        >
                            <img src={c.collectionimage} alt={c.collectionname} className="w-6 h-6 rounded-full object-cover" />
                            <span className="text-sm">{c.collectionname}</span>
                        </button>
                    ))}
                </div>
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
                                                    {collections.map((c) => (
                                                        <div key={c._id} className={`cursor-pointer ${selectedCollectionId === c._id ? 'text-[#B5904F]' : ''}`}
                                                            onClick={() => setSelectedCollectionId(prev => prev === c._id ? null : c._id)}
                                                        >
                                                            {c.collectionname}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                    {/* Diamonds filter */}
                                    <div className="mt-4">
                                        <span className="font-semibold">Diamond Shape</span>
                                        <div className="flex flex-wrap gap-2 mt-2">
                                            {diamonds.map(d => (
                                                <button key={d._id}
                                                    onClick={() => setSelectedDiamondIds(prev => prev.includes(d._id) ? prev.filter(id => id !== d._id) : [...prev, d._id])}
                                                    className={`border rounded-full px-3 py-1 text-sm ${selectedDiamondIds.includes(d._id) ? 'border-[#B5904F] text-[#B5904F]' : 'border-gray-400'}`}
                                                >
                                                    {d.diamondname}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    {/* Diamond sizes when any diamond selected */}
                                    {diamonds.filter(d => selectedDiamondIds.includes(d._id)).map(d => (
                                        <div key={`sizes-${d._id}`} className="mt-3">
                                            <span className="font-medium text-sm">{d.diamondname} sizes</span>
                                            <div className="flex flex-wrap gap-2 mt-1">
                                                {d.sizes?.map(s => (
                                                    <button key={s._id}
                                                        onClick={() => setSelectedDiamondSizeIds(prev => prev.includes(s._id) ? prev.filter(id => id !== s._id) : [...prev, s._id])}
                                                        className={`border rounded-full px-2 py-1 text-xs ${selectedDiamondSizeIds.includes(s._id) ? 'border-[#B5904F] text-[#B5904F]' : 'border-gray-400'}`}
                                                    >
                                                        {s.carat} ct
                                                    </button>
                                                ))}
                                            </div>
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
                        {currentRange.start} - {Math.min(currentRange.end, totalProducts)} products of {totalProducts} products
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className={`px-46 py-8 `}>
                {loading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : (
                    generateRows()
                )}
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

