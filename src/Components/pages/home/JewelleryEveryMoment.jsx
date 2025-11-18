
import React, { useState, useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../config/hooks/useTheme";
import AOS from "aos";
import "aos/dist/aos.css";

// Import your assets
import underline from "../../../assets/about/underline.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";
import like from "../../../assets/like.svg";
import likeFilled from "../../../assets/fillLike.svg";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartProvider";
import { useWishlist } from "../../context/WishListProvider";
import { fetchJwelaryProducts } from "../../redux/slice/jwelaryEveryMomentslice";
import { addToCartService } from "../../redux/service/CartService";
import { addToWishlistService, removeFromWishlistService } from "../../redux/service/WishlistService";

const JewelleryEveryMoment = () => {
  const { colors, theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, fetchWishlist } = useWishlist();
  const { fetchCart } = useCart();

  // CORRECTED: Use 'jwelary' instead of 'latestProducts'
  const {
    products = [],
    loading = false,
    error = null,
  } = useSelector((state) => state.jwelary || {});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const productsRef = useRef(products);

  useEffect(() => {
    // Fetch latest products when component mounts
    dispatch(fetchJwelaryProducts()); // Use the correct thunk name
  }, [dispatch]);

  // Only reset to page 1 if products array is empty or current page is truly out of bounds
  // This prevents unnecessary resets when scrolling or other sections load
  useEffect(() => {
    if (products.length === 0) {
      if (currentPage !== 1) {
        setCurrentPage(1);
      }
      return;
    }
    
    const totalPages = Math.ceil(products.length / itemsPerPage);
    // Only reset if current page is actually out of bounds (greater than total pages)
    // Don't reset if we're on a valid page
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
    // Only depend on products array reference, not length, to prevent unnecessary resets
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [products, itemsPerPage]);

  useEffect(() => {
    setTimeout(() => {
      AOS.init({
        offset: 200,
        delay: 0,
        duration: 2000,
        easing: "ease",
        once: false,
        mirror: true,
      });
      AOS.refresh();
    }, 100);
  }, [products, currentPage]);

  const handleAddToWishlist = async (product, e) => {
    e?.stopPropagation();
    e?.preventDefault();
    
    try {
      const token = localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt');
      if (!token) {
        navigate('/login');
        return;
      }

      // Check if product is in wishlist
      const wishlistItem = wishlist.find((w) => w.productId?._id === product._id);
      
      if (wishlistItem) {
        // Remove from wishlist
        await removeFromWishlistService(wishlistItem._id);
        await fetchWishlist();
      } else {
        // Add to wishlist
        await addToWishlistService({
          productId: product._id,
          metalId: product.metalId || null,
          colorId: product.colorId || null,
          diamondId: product.diamondId || null,
          sizeId: product.sizeId || null,
        });
        await fetchWishlist();
      }
    } catch (error) {
      console.error('Wishlist operation failed:', error);
    }
  };

  const handleAddToCart = async (product, e) => {
    e?.stopPropagation();
    e?.preventDefault();
    
    try {
      const token = localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt');
      if (!token) {
        navigate('/login');
        return;
      }

      await addToCartService({
        productId: product._id,
        metalId: product.metalId || null,
        colorId: product.colorId || null,
        diamondId: product.diamondId || null,
        sizeId: product.sizeId || null,
        discountId: "",
        discountcode: "",
        discountAmount: "",
      });

      // Refresh cart
      await fetchCart();
      
      // Open cart popup
      try {
        window.dispatchEvent(new CustomEvent('open-cart-popup'));
      } catch (err) {
        console.error('Failed to open cart popup:', err);
      }
    } catch (error) {
      console.error('Add to cart failed:', error);
    }
  };

  const handleProductClick = (product, e) => {
    e?.stopPropagation();
    navigate(`/product-detail/${product._id}`, { state: { productId: product._id } });
  };

  // Calculate pagination
  const totalPages = useMemo(() => {
    return Math.ceil(products.length / itemsPerPage);
  }, [products.length, itemsPerPage]);

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return products.slice(startIndex, startIndex + itemsPerPage);
  }, [products, currentPage, itemsPerPage]);

  const paginate = (pageNumber) => {
    const calculatedTotalPages = Math.ceil(products.length / itemsPerPage);
    if (pageNumber > 0 && pageNumber <= calculatedTotalPages && pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
      // Always scroll to products section when pagination changes
      // This ensures user can see the new page content, especially when scrolled down
      setTimeout(() => {
        const element = document.getElementById('jewellery-products-section') || 
                       document.querySelector('[data-products-section]');
        if (element) {
          // Always scroll to section, ensuring it's visible
          // Use 'start' to show products from the top
          element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        }
      }, 100);
    }
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount) / 100;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  if (loading) {
    return (
      <div className={`${colors.secondPart.background} ${colors.secondPart.text} py-8`}>
        <div className="text-center">
          <h2 className="md:text-[44px] text-[22px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[12px]">
            Jewelry for Every Moment
            <img src={underline} alt="underline" className="w-[261.2px] h-[22px]" />
          </h2>
        </div>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`${colors.secondPart.background} ${colors.secondPart.text} py-8`}>
        <div className="text-center">
          <h2 className="md:text-[44px] text-[22px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[12px]">
            Jewelry for Every Moment
            <img src={underline} alt="underline" className="w-[261.2px] h-[22px]" />
          </h2>
        </div>
        <div className="text-center py-12 text-red-500">
          Error loading products: {error}
        </div>
      </div>
    );
  }

  return (
    <div className={`${colors.secondPart.background} ${colors.secondPart.text}`}>
      <div className="text-center py-5">
        <h2 className="md:text-[44px] text-[22px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[12px]">
          Jewelry for Every Moment
          <img
            src={underline}
            alt="underline"
            className="w-[261.2px] h-[22px]"
          />
        </h2>
      </div>

      {/* Product Grid */}
      <div 
        className="flex flex-col gap-[20px] justify-center" 
        data-products-section
        id="jewellery-products-section"
      >
        {products && products.length > 0 ? (
          <>
            <div className="grid xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {currentProducts.map((product, idx) => {
                const isInWishlist = wishlist.some((item) => item.productId?._id === product._id);
                const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

                return (
                  <div
                    key={product._id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className={`group relative w-full max-w-[368px] h-auto flex flex-col shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${theme === "dark" ? "bg-white text-black" : "bg-[#1f1f1f] text-white"}`}
                  >
                    {/* Discount Badge */}
                    {product.discount > 0 && (
                      <span className="absolute top-[10px] left-[10px] bg-red-500 text-white text-xs font-semibold px-[10px] py-[6px] rounded">
                        {product.discount}% OFF
                      </span>
                    )}

                    {/* Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                      <button
                        type="button"
                        onClick={(e) => handleAddToWishlist(product, e)}
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition-transform z-20"
                      >
                        <img
                          src={isInWishlist ? likeFilled : like}
                          alt="like"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>

                    {/* Product Image + Hover CTA */}
                    <div className="relative">
                      <div
                        className="cursor-pointer"
                        onClick={(e) => handleProductClick(product, e)}
                      >
                        <img
                          src={product.productimage}
                          alt={product.productname}
                          className="w-full h-[280px] object-cover group-hover:scale-[1.02] transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/368x280?text=Image+Not+Found';
                          }}
                        />
                      </div>
                      {/* Hover-only Add to Cart overlay */}
                      <div className="absolute left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-3 pb-3">
                        <button
                          type="button"
                          onClick={(e) => handleAddToCart(product, e)}
                          className={`${theme === "dark" ? "bg-[#1f2937] text-white hover:bg-[#111827]" : "bg-white text-[#1f2937] hover:bg-gray-100"} w-full font-kufam py-3 shadow-lg rounded font-semibold`}
                        >
                          Add To Cart
                        </button>
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className={`${theme === "dark" ? "bg-white text-black" : "bg-[#262626] text-white"} p-4 pt-4`}> 
                      <h3
                        className={`text-lg font-semibold cursor-pointer mt-3 transition-colors ${theme === "dark" ? "hover:text-[#C79954]" : "hover:text-[#C79954]"}`}
                        onClick={(e) => handleProductClick(product, e)}
                      >
                        {product.productname}
                      </h3>
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {/* {product.description} */}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        {product.discount > 0 ? (
                          <>
                            <span className="text-lg font-bold ">
                              {formatCurrency(discountedPrice)}
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {formatCurrency(product.price)}
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            {formatCurrency(product.price)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls - Always visible and clickable */}
            {totalPages > 1 && (
              <div 
                className="flex justify-end items-center xl:mx-24 md:mx-10 mx-4 mt-4 mb-4 relative z-50"
                data-pagination-section
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (currentPage > 1) {
                      paginate(currentPage - 1);
                    }
                  }}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full transition-all duration-200 relative z-50 ${
                    currentPage === 1 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-200 active:scale-95 cursor-pointer'
                  }`}
                  aria-label="Previous page"
                >
                  <img
                    src={leftArrow}
                    alt="leftArrow"
                    className="w-[72px] h-[12px] pointer-events-none"
                  />
                </button>
                <span className="mx-4 text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (currentPage < totalPages) {
                      paginate(currentPage + 1);
                    }
                  }}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full transition-all duration-200 relative z-50 ${
                    currentPage === totalPages 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-gray-200 active:scale-95 cursor-pointer'
                  }`}
                  aria-label="Next page"
                >
                  <img
                    src={rightArrow}
                    alt="rightArrow"
                    className="w-[72px] h-[12px] pointer-events-none"
                  />
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JewelleryEveryMoment;