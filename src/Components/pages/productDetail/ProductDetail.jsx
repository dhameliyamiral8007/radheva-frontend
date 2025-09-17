import React, { useMemo, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useTheme } from '../../config/hooks/useTheme';
import { products as allProducts } from '../../config/data/products';
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
    const { id } = useParams();
    const location = useLocation();
    const { colors, theme } = useTheme();
    const { addToCart } = useCart();
    const [selectedPurity, setSelectedPurity] = useState("14K");
    const [selectedColor, setSelectedColor] = useState("yellow");
    const [selectedSize, setSelectedSize] = useState("1.00ct");

    const metalColors = [
        { name: "Yellow", color: "yellow-500" },
        { name: "Rose", color: "rose-400" },
        { name: "White", color: "gray-300" },
    ];
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
    const [selectedShape, setSelectedShape] = useState(shapes[0]?.name || "Shape"); // default first shape

    // Get product from state and merge with fallback from data by id
    const productFromState = location.state && location.state.product ? location.state.product : null;
    const product = useMemo(() => {
        const fromData = allProducts.find(p => String(p.id) === String(id));
        if (productFromState || fromData) {
            return { ...(fromData || {}), ...(productFromState || {}) };
        }
        return null;
    }, [productFromState, id]);

    const [mainImage, setMainImage] = useState(product?.image);
    const [quantity, setQuantity] = useState(1);

    if (!product) {
        return (
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full p-8`}>
                <p className="mb-2">Product not found.</p>
                <p className="text-sm opacity-80">Please go back to the listing and select a product.</p>
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
                            src={mainImage || product.image}
                            alt={product.description || 'Product'}
                            className="w-full h-[460px] object-cover"
                        />
                    </div>
                    {product.gallery && product.gallery.length > 0 && (
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            {product.gallery.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setMainImage(img)}
                                    className={`rounded overflow-hidden border ${mainImage === img ? 'border-[#B5904F]' : 'border-transparent'} focus:outline-none`}
                                >
                                    <img src={img} alt={`thumb-${idx}`} className="w-full h-70 object-cover" />
                                </button>
                            ))}
                        </div>
                    )}
                </div>
                {/* Right: Details */}
                <div className="lg:col-span-7">
                    {/* Product Title */}
                    <h1 className="text-2xl font-semibold mb-2">{product.name || "Product Name"}</h1>

                    {/* Price Row */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl font-bold text-[#B5904F]">{product.price}</span>
                        {product.oldPrice && (
                            <span className="line-through text-gray-400 text-lg">{product.oldPrice}</span>
                        )}
                        {product.discount && (
                            <span className="bg-[#B5904F] text-white px-2 py-1 text-xs rounded">
                                {product.discount} Off
                            </span>
                        )}
                    </div>

                    {/* Metal Purity */}
                    <div className="mb-4">
                        <div className="text-sm font-semibold mb-1">
                            Metal Purity : <span className="text-[#B5904F]">{selectedPurity}</span>
                        </div>
                        <div className="flex gap-3">
                            {["14K", "18K", "22K"].map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setSelectedPurity(item)}
                                    className={`px-4 py-2 rounded border ${selectedPurity === item
                                        ? "border-[#B5904F] bg-[#B5904F] text-white"
                                        : "border-gray-400"
                                        }`}
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Metal Color */}
                    <div className="mb-4">
                        <div className="text-sm font-semibold mb-1">
                            Metal Color : <span className="text-[#B5904F]">{selectedColor}</span>
                        </div>
                        <div className="flex gap-4">
                            {metalColors.map((c) => (
                                <div
                                    key={c.name}
                                    onClick={() => setSelectedColor(c.name)}
                                    className={`w-8 h-8 rounded-full border cursor-pointer ${selectedColor === c.name ? "border-[#B5904F] border-2" : ""
                                        } bg-${c.color}`}
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Diamond Size */}
                    <div className="mb-4">
                        <div className="text-sm font-semibold mb-1">
                            Diamond Size : <span className="text-[#B5904F]">{selectedSize}</span>
                        </div>
                        <div className="flex gap-3">
                            {["1.00ct", "1.60ct", "2.00ct"].map((size) => (
                                <button
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`px-4 py-2 rounded border ${selectedSize === size
                                        ? "border-[#B5904F] bg-[#B5904F] text-white"
                                        : "border-gray-400"
                                        }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Diamond Shape */}
                    <div className="mb-4">
                        <div className="text-sm font-semibold mb-2">
                            Diamond Shape : <span className="text-[#B5904F]">{selectedShape}</span>
                        </div>
                        <div className="flex gap-3 flex-wrap">
                            {shapes.map((shape) => (
                                <button
                                    key={shape.id}
                                    onClick={() => setSelectedShape(shape.name)}
                                    className={`w-14 h-14 flex items-center justify-center ${selectedShape === shape.name ? "border-[#B5904F] border-2" : ""
                                        }`}
                                >
                                    <img src={shape.icon} alt={shape.name} className={`w-8 h-8 ${theme === "dark" ? "filter invert brightness-1800" : "filter brightness-1650"
                                        }`} />
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Description */}
                    <div className="mt-6">
                        <div className="text-sm font-semibold mb-2">Description</div>
                        <p className="opacity-90 leading-relaxed">
                            {product.longDescription ||
                                "No description available for this product."}
                        </p>
                    </div>

                    {/* Price Breakup */}
                    <div className="mt-6">
                        <div className="text-sm font-semibold mb-2">Price Break Up</div>
                        <div className="rounded">
                            <div className="flex justify-between px-4 py-2 text-sm text-[#94A3B8] border-b">
                                <span>₹32,000</span>
                                <span>Gold</span>
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
                                <span>₹78,600</span>
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
                                    id: `${product.id}-${selectedPurity}-${selectedColor}-${selectedSize}`, // unique per variation
                                    metalType: selectedPurity,
                                    metalColor: selectedColor,
                                    ringSize: selectedSize,
                                    quantity,
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
