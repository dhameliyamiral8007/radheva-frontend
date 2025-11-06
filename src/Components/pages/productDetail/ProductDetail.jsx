import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
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
import { addToCartService } from '../../redux/service/CartService';

const ProductDetail = () => {
    const location = useLocation();
    const { id: routeId } = useParams();
    const navigate = useNavigate();
    const { colors, theme } = useTheme();
    const { addToCart, fetchCart, cartItems, incrementQuantity, decrementQuantity } = useCart();
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

    const id = (location?.state && location.state.productId) || routeId;

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

    // Get diamond price based on selected shape and size (carat)
    const getSelectedDiamondPrice = () => {
        if (!product || !selectedShape) return 0;
        const diamond = (product.diamonds || []).find(
            d => (d.diamondname || '').toLowerCase() === (selectedShape || '').toLowerCase()
        );
        if (!diamond || !diamond.sizes || diamond.sizes.length === 0) return 0;
        if (!selectedSize) return diamond.sizes[0]?.price || 0;
        const sizeItem = diamond.sizes.find(s => (s.carat + 'ct') === selectedSize);
        return sizeItem?.price || 0;
    };

    // Get dynamic labour charge from product data
    const getLabourCharge = () => {
        return product?.labourCharge || 11600; // fallback to default if not available
    };

    const getGstAmount = () => {
        const gold = calculateGoldPrice(selectedPurity);
        const diamond = getSelectedDiamondPrice();
        const labour = getLabourCharge();
        const subtotal = gold + diamond + labour;
        return Math.round(subtotal * 0.18); // 18% GST
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
                    // Initialize quantity from API cartQuantity if provided
                    if (typeof response.Data.cartQuantity === 'number' && response.Data.cartQuantity > 0) {
                        setQuantity(response.Data.cartQuantity);
                    } else {
                        setQuantity(1);
                    }
                    
                    // Set default selections from API data (nested structure)
                    if (response.Data.metals && response.Data.metals.length > 0) {
                        const firstMetal = response.Data.metals[0];
                        setSelectedPurity(firstMetal.metalname);
                        if (firstMetal.colors && firstMetal.colors.length > 0) {
                            setSelectedColor(firstMetal.colors[0].colorname);
                        } else {
                            setSelectedColor("");
                        }
                    }
                    if (response.Data.diamonds && response.Data.diamonds.length > 0) {
                        const firstDiamond = response.Data.diamonds[0];
                        setSelectedShape(firstDiamond.diamondname);
                        if (firstDiamond.sizes && firstDiamond.sizes.length > 0) {
                            setSelectedSize(firstDiamond.sizes[0].carat + "ct");
                        } else {
                            setSelectedSize("");
                        }
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

    // When metal purity changes, derive colors from that metal
    useEffect(() => {
        if (!product || !selectedPurity) return;
        const metal = (product.metals || []).find(m => (m.metalname || '').toLowerCase() === selectedPurity.toLowerCase());
        const availableColors = metal?.colors || [];
        if (availableColors.length === 0) {
            setSelectedColor("");
            return;
        }
        // If current selectedColor is not in available list, reset to first
        const exists = availableColors.some(c => c.colorname === selectedColor);
        if (!exists) {
            setSelectedColor(availableColors[0].colorname);
        }
    }, [product, selectedPurity]);

    // When diamond shape changes, derive sizes from that diamond
    useEffect(() => {
        if (!product || !selectedShape) return;
        const diamond = (product.diamonds || []).find(d => (d.diamondname || '').toLowerCase() === selectedShape.toLowerCase());
        const availableSizes = diamond?.sizes || [];
        if (availableSizes.length === 0) {
            setSelectedSize("");
            return;
        }
        // If current selectedSize is not in available list, reset to first
        const exists = availableSizes.some(s => (s.carat + "ct") === selectedSize);
        if (!exists) {
            setSelectedSize(availableSizes[0].carat + "ct");
        }
    }, [product, selectedShape]);

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
                        <span className="text-2xl font-bold text-[#B5904F]">₹{(calculateGoldPrice(selectedPurity) + getSelectedDiamondPrice() + getLabourCharge() + getGstAmount()).toLocaleString()}</span>
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

                    {/* Metal Color (derived from selected metal) */}
                    {(() => {
                        const metal = (product.metals || []).find(m => (m.metalname || '').toLowerCase() === selectedPurity.toLowerCase());
                        const metalColors = metal?.colors || [];
                        return metalColors.length > 0 ? (
                        <div className="mb-4">
                            <div className="text-sm font-semibold mb-1">
                                Metal Color : <span className="text-[#B5904F]">{selectedColor}</span>
                            </div>
                            <div className="flex gap-4">
                                {metalColors.map((color) => (
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
                        ) : null;
                    })()}

                    {/* Diamond Size (derived from selected diamond) */}
                    {(() => {
                        const diamond = (product.diamonds || []).find(d => (d.diamondname || '').toLowerCase() === selectedShape.toLowerCase());
                        const diamondSizes = diamond?.sizes || [];
                        return diamondSizes.length > 0 ? (
                        <div className="mb-4">
                            <div className="text-sm font-semibold mb-1">
                                Diamond Size : <span className="text-[#B5904F]">{selectedSize}</span>
                            </div>
                            <div className="flex gap-3">
                                {diamondSizes.map((size) => (
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
                        ) : null;
                    })()}

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
                                <span>₹{getSelectedDiamondPrice().toLocaleString()}</span>
                                <span>Diamond {selectedSize ? `(${selectedSize})` : ''}</span>
                            </div>
                            <div className="flex justify-between px-4 py-2 text-sm text-[#94A3B8] border-b">
                                <span>₹{getLabourCharge().toLocaleString()}</span>
                                <span>Labour</span>
                            </div>
                            <div className="flex justify-between px-4 py-2 text-sm text-[#94A3B8] border-b">
                                <span>₹{getGstAmount().toLocaleString()}</span>
                                <span>GST (18%)</span>
                            </div>
                            <div className={`flex justify-between px-4 py-2 text-sm font-semibold ${theme === "dark" ? "text-black " : "text-white"}`}>
                                <span>₹{(calculateGoldPrice(selectedPurity) + getSelectedDiamondPrice() + getLabourCharge() + getGstAmount()).toLocaleString()}</span>
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
                                    onClick={async () => {
                                        // Try server decrement if current variant is in cart
                                        try {
                                            const metal = (product.metals || []).find(m => (m.metalname || '').toLowerCase() === (selectedPurity || '').toLowerCase());
                                            const color = (metal?.colors || []).find(c => (c.colorname || '').toLowerCase() === (selectedColor || '').toLowerCase());
                                            const diamond = (product.diamonds || []).find(d => (d.diamondname || '').toLowerCase() === (selectedShape || '').toLowerCase());
                                            const size = (diamond?.sizes || []).find(s => (s.carat + 'ct') === selectedSize);

                                            const matching = (cartItems || []).find(ci =>
                                                ci?.productId?._id === product._id &&
                                                ci?.metalId?._id === metal?._id &&
                                                ci?.colorId?._id === color?._id &&
                                                (selectedShape ? ci?.diamondId?._id === diamond?._id : true) &&
                                                (selectedSize ? ci?.sizeId?._id === size?._id : ci?.sizeId == null)
                                            );

                                            if (matching) {
                                                await decrementQuantity(matching._id);
                                            } else {
                                                setQuantity(q => Math.max(1, q - 1));
                                            }
                                        } catch {
                                            setQuantity(q => Math.max(1, q - 1));
                                        }
                                    }}
                                    className="px-3 py-1"
                                >
                                    −
                                </button>
                                <div className="px-4 py-1 min-w-[32px] text-center">{quantity}</div>
                                <button
                                    onClick={async () => {
                                        // Try server increment if current variant is in cart
                                        try {
                                            const metal = (product.metals || []).find(m => (m.metalname || '').toLowerCase() === (selectedPurity || '').toLowerCase());
                                            const color = (metal?.colors || []).find(c => (c.colorname || '').toLowerCase() === (selectedColor || '').toLowerCase());
                                            const diamond = (product.diamonds || []).find(d => (d.diamondname || '').toLowerCase() === (selectedShape || '').toLowerCase());
                                            const size = (diamond?.sizes || []).find(s => (s.carat + 'ct') === selectedSize);

                                            const matching = (cartItems || []).find(ci =>
                                                ci?.productId?._id === product._id &&
                                                ci?.metalId?._id === metal?._id &&
                                                ci?.colorId?._id === color?._id &&
                                                (selectedShape ? ci?.diamondId?._id === diamond?._id : true) &&
                                                (selectedSize ? ci?.sizeId?._id === size?._id : ci?.sizeId == null)
                                            );

                                            if (matching) {
                                                await incrementQuantity(matching._id);
                                            } else {
                                                setQuantity(q => q + 1);
                                            }
                                        } catch {
                                            setQuantity(q => q + 1);
                                        }
                                    }}
                                    className="px-3 py-1"
                                >
                                    +
                                </button>
                            </div>
                            <button
                                onClick={async () => {
                                    // Require auth: if no token, redirect to login
                                    const token = localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt');
                                    if (!token) {
                                        // remember current path to redirect after login
                                        try { localStorage.setItem('postLoginRedirect', window.location.pathname + window.location.search); } catch {}
                                        navigate('/login');
                                        return;
                                    }
                                    try {
                                        const metal = (product.metals || []).find(m => (m.metalname || '').toLowerCase() === (selectedPurity || '').toLowerCase());
                                        const color = (metal?.colors || []).find(c => (c.colorname || '').toLowerCase() === (selectedColor || '').toLowerCase());
                                        const diamond = (product.diamonds || []).find(d => (d.diamondname || '').toLowerCase() === (selectedShape || '').toLowerCase());
                                        const size = (diamond?.sizes || []).find(s => (s.carat + 'ct') === selectedSize);

                                        await addToCartService({
                                            productId: product._id,
                                            metalId: metal?._id,
                                            colorId: color?._id,
                                            diamondId: diamond?._id,
                                            sizeId: size?._id,
                                            discountId: "",
                                            discountcode: "",
                                            discountAmount: "",
                                        });

                                        // Refresh cart from server after adding item and open popup
                                        fetchCart();
                                        try {
                                            const evt = new CustomEvent('open-cart-popup');
                                            window.dispatchEvent(evt);
                                        } catch {}
                                    } catch (err) {
                                        console.error('Add to cart failed', err);
                                        // alert('Failed to add to cart.');
                                    }
                                }}
                                className="flex-1 bg-[#2a2a2a] text-white px-3 py-3 rounded"
                            >
                                Add To Cart
                            </button>
                        </div>
                        <div className="mt-4">
                            <button className="flex-1 bg-[#5E6A74] text-white px-4 py-3 rounded w-full" onClick={() => {
                                // open cart popup after adding
                                try { window.scrollTo({ top: 0, behavior: 'smooth' }); } catch {}
                            }}>
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
