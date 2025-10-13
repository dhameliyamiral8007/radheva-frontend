import React, { useState, useEffect } from 'react';
import {  useLocation } from 'react-router-dom';
import { useTheme } from '../../config/hooks/useTheme';
import { fetchProductByIdService, fetchLatestGoldPriceService } from '../../redux/service/ProductService';
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
import { useCart } from '../../context/CartProvider';
import InformationSection from '../home/InformationSection';

const ProductDetail = () => {
    const location = useLocation();
    const { colors, theme } = useTheme();
    const { addToCart } = useCart();
    const [selectedPurity, setSelectedPurity] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedShape, setSelectedShape] = useState("");
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [goldPrice, setGoldPrice] = useState(22000); // Default 24K gold price

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


    const id = location.state.productId

    // Karat percentage mapping
    const karatPercentages = {
        '6kt': 25.0,
        '8kt': 33.3,
        '9kt': 37.5,
        '10kt': 41.7,
        '12kt': 50.0,
        '14kt': 58.3,
        '15kt': 62.5,
        '18kt': 75.0,
        '20kt': 83.3,
        '21kt': 87.5,
        '22kt': 91.6,
        '24kt': 99.9
      };
      

    // Function to calculate gold price based on karat
    const calculateGoldPrice = (karat) => {
        const percentage = karatPercentages[karat] || 99.9;
        return Math.round((goldPrice * percentage) / 100);
    };

    // Fetch latest gold price
    useEffect(() => {
        const fetchGoldPrice = async () => {
            try {
                const response = await fetchLatestGoldPriceService();
                if (response.IsSuccess && response.Data) {
                    setGoldPrice(response.Data.goldprice);
                }
            } catch (err) {
                console.error("Error fetching gold price:", err);
                // Keep default price if API fails
            }
        };
        fetchGoldPrice();
    }, []);

    // Fetch product data from API
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await fetchProductByIdService(id);
                if (response.IsSuccess && response.Data) {
                    setProduct(response.Data);
                    
                    // Set default selections from API data
                    if (response.Data.metals && response.Data.metals.length > 0) {
                        setSelectedPurity(response.Data.metals[0].metalname);
                    }
                    if (response.Data.colors && response.Data.colors.length > 0) {
                        setSelectedColor(response.Data.colors[0].colorname);
                    }
                    if (response.Data.sizes && response.Data.sizes.length > 0) {
                        setSelectedSize(response.Data.sizes[0].carat + "ct");
                    }
                    if (response.Data.diamonds && response.Data.diamonds.length > 0) {
                        setSelectedShape(response.Data.diamonds[0].diamondname);
                    }
                } else {
                    setError("Product not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError(err.message || "Failed to fetch product details");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const [mainImage, setMainImage] = useState(null);
    const [quantity, setQuantity] = useState(1);

    // Update main image when product loads
    useEffect(() => {
        if (product) {
            setMainImage(product.productimage);
        }
    }, [product]);

    if (loading) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full p-8`}>
                <div className="flex items-center justify-center h-64">
                    <div className="text-lg">Loading product details...</div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full p-8`}>
                <p className="mb-2">Product not found.</p>
                <p className="text-sm opacity-80">Please go back to the listing and select a product.</p>
                {error && <p className="text-sm text-red-500 mt-2">Error: {error}</p>}
            </div>
        );
    }

    const priceBreakup = product.priceBreakup || {
        gold: '₹32,000',
        diamond: '₹32,000',
        labour: '₹32,000',
        gst: '₹32,000',
        total: '₹78,000',
    };

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full px-6 py-8 md:px-10`}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-[1600px] mx-auto">
                {/* Left: Gallery */}
                <div className="lg:col-span-5">
                    <div className="w-full bg-black/5 rounded-lg overflow-hidden">
                        <img
                            src={mainImage || product.productimage}
                            alt={product.description || 'Product'}
                            className="w-full h-[460px] object-cover"
                        />
                    </div>
                    {product.gallery && product.gallery.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {product.gallery.map((galleryItem, idx) => (
                                <button
                                    key={galleryItem._id || idx}
                                    onClick={() => setMainImage(galleryItem.imageUrl)}
                                    className={`rounded overflow-hidden border ${mainImage === galleryItem.imageUrl ? 'border-[#B5904F]' : 'border-transparent'} focus:outline-none`}
                                >
                                    <img src={galleryItem.imageUrl} alt={`thumb-${idx}`} className="w-full h-70 object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {/* Right: Details */}
                <div className="lg:col-span-7">
                    {/* Product Title */}
                    <h1 className="text-2xl font-semibold mb-2">{product.productname || "Product Name"}</h1>

                    {/* Price Row */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[#B5904F]">₹{(calculateGoldPrice(selectedPurity) + 32000 + 11600 + 3000).toLocaleString()}</span>
                        {product.discount && (
                            <span className="bg-[#B5904F] text-white px-2 py-1 text-xs rounded">
                                {product.discount}% Off
                            </span>
                        )}
                    </div>

                    {/* Metal Purity */}
                    {product.metals && product.metals.length > 0 && (
                        <div className="mb-4">
                            <div className="text-sm font-semibold mb-1">
                                Metal Purity : <span className="text-[#B5904F]">{selectedPurity}</span>
                            </div>
                            <div className="flex gap-3">
                                {product.metals.map((metal) => (
                                    <button
                                        key={metal._id}
                                        onClick={() => setSelectedPurity(metal.metalname)}
                                        className={`px-4 py-2 rounded border ${selectedPurity === metal.metalname
                                            ? "border-[#B5904F] bg-[#B5904F] text-white"
                                            : "border-gray-400"
                                            }`}
                                    >
                                        {metal.metalname}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Metal Color */}
                    {product.colors && product.colors.length > 0 && (
                        <div className="mb-4">
                            <div className="text-sm font-semibold mb-1">
                                Metal Color : <span className="text-[#B5904F]">{selectedColor}</span>
                            </div>
                            <div className="flex gap-4">
                                {product.colors.map((color) => (
                                    <div
                                        key={color._id}
                                        onClick={() => setSelectedColor(color.colorname)}
                                        className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === color.colorname ? "border-[#B5904F] border-2" : "border-gray-400"
                                            }`}
                                        style={{
                                            backgroundColor: color.colorname === 'yellow' ? '#EAB308' : 
                                                           color.colorname === 'rose' ? '#F43F5E' : 
                                                           color.colorname === 'white' ? '#E5E7EB' :
                                                           color.colorname === 'silver' ? '#9CA3AF' :'#6B7280'
                                                          
                                        }}
                                    ></div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Diamond Size */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="mb-4">
                            <div className="text-sm font-semibold mb-1">
                                Diamond Size : <span className="text-[#B5904F]">{selectedSize}</span>
                            </div>
                            <div className="flex gap-3">
                                {product.sizes.map((size) => (
                                    <button
                                        key={size._id}
                                        onClick={() => setSelectedSize(size.carat + "ct")}
                                        className={`px-4 py-2 rounded border ${selectedSize === (size.carat + "ct")
                                            ? "border-[#B5904F] bg-[#B5904F] text-white"
                                            : "border-gray-400"
                                            }`}
                                    >
                                        {size.carat}ct
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Diamond Shape */}
                    {product.diamonds && product.diamonds.length > 0 && (
                        <div className="mb-4">
                            <div className="text-sm font-semibold mb-2">
                                Diamond Shape : <span className="text-[#B5904F]">{selectedShape}</span>
                            </div>
                            <div className="flex gap-3 flex-wrap">
                                {product.diamonds.map((diamond) => {
                                    // Find matching shape icon from shapes array
                                    const shapeIcon = shapes.find(shape => shape.name.toLowerCase() === diamond.diamondname.toLowerCase());
                                    return (
                                        <button
                                            key={diamond._id}
                                            onClick={() => setSelectedShape(diamond.diamondname)}
                                            className={`w-14 h-14 flex items-center justify-center rounded ${selectedShape === diamond.diamondname ? "border-[#B5904F] border-2" : "border-gray-400 border"
                                                }`}
                                        >
                                            {shapeIcon ? (
                                                <img 
                                                    src={shapeIcon.icon} 
                                                    alt={diamond.diamondname} 
                                                    className={`w-8 h-8 ${theme === "dark" ? "filter invert brightness-1800" : "filter brightness-1650"
                                                        }`} 
                                                />
                                            ) : (
                                                <span className="text-xs">{diamond.diamondname}</span>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                    {/* Description */}
                    <div className="mt-6">
                        <div className="text-sm font-semibold mb-2">Description</div>
                        <p className="opacity-90 leading-relaxed">
                            {product.description ||
                                "No description available for this product."}
                        </p>
                    </div>

                    {/* Price Breakup */}
                    <div className="mt-6">
                        <div className="text-sm font-semibold mb-2">Price Break Up</div>
                        <div className="rounded">
                            <div className="flex justify-between px-4 py-2 text-sm text-[#94A3B8] border-b">
                                <span>₹{calculateGoldPrice(selectedPurity).toLocaleString()}</span>
                                <span>Gold ({selectedPurity})</span>
                            </div>
                            <div className="flex justify-between px-4 py-2 text-sm text-[#94A3B8] border-b">
                                <span>₹32,000</span>
                                <span>Diamond</span>
                            </div>
                            <div className="flex justify-between px-4 py-2 text-sm text-[#94A3B8] border-b">
                                <span>₹11,600</span>
                                <span>Labour</span>
                            </div>
                            <div className="flex justify-between px-4 py-2 text-sm text-[#94A3B8] border-b">
                                <span>₹3,000</span>
                                <span>GST</span>
                            </div>
                            <div className={`flex justify-between px-4 py-2 text-sm font-semibold ${theme === "dark" ? "text-black " : "text-white"}`}>
                                <span>₹{(calculateGoldPrice(selectedPurity) + 32000 + 11600 + 3000).toLocaleString()}</span>
                                <span>Total</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6">
                        <div className="flex items-center gap-3 mb-4">
                            <span className="text-sm font-semibold">Quantity</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center border rounded-md overflow-hidden border-gray-400">
                                <button
                                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                                    className="px-3 py-1"
                                >
                                    −
                                </button>
                                <div className="px-4 py-1 min-w-[32px] text-center">{quantity}</div>
                                <button
                                    onClick={() => setQuantity(q => q + 1)}
                                    className="px-3 py-1"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={() => addToCart({
                                    ...product,
                                    id: `${product._id}-${selectedPurity}-${selectedColor}-${selectedSize}`, // unique per variation
                                    metalType: selectedPurity,
                                    metalColor: selectedColor,
                                    ringSize: selectedSize,
                                    quantity,
                                    price: calculateGoldPrice(selectedPurity) + 32000 + 11600 + 3000,
                                    name: product.productname,
                                    image: product.productimage,
                                })
                                }
                                className="flex-1 bg-[#2a2a2a] text-white px-3 py-3 rounded"
                            >
                                Add To Cart
                            </button>
                        </div>
                        <div className="mt-4">
                            <button className="flex-1 bg-[#5E6A74] text-white px-4 py-3 rounded w-full">
                                Shop This Piece
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            <div className='py-15'>
                <InformationSection />
            </div>

        </div>
    );
};

export default ProductDetail;
