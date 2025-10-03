
import React, { useState, useEffect } from "react";
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

const JewelleryEveryMoment = () => {
  const { colors, theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  // CORRECTED: Use 'jwelary' instead of 'latestProducts'
  const {
    products = [],
    loading = false,
    error = null,
    isSuccess = false
  } = useSelector((state) => state.jwelary || {});

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    // Fetch latest products when component mounts
    dispatch(fetchJwelaryProducts()); // Use the correct thunk name
  }, [dispatch]);

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
  }, [products]);

  const handleAddToWishlist = (product) => {
    const isInWishlist = wishlist.some((w) => w.id === product._id);

    if (isInWishlist) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist({
        id: product._id,
        name: product.productname,
        image: product.productimage,
        price: product.price,
        discount: product.discount,
        slug: product.productslug
      });
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product._id,
      name: product.productname,
      image: product.productimage,
      price: product.price,
      discount: product.discount,
      quantity: 1
    });
  };

  // const handleProductClick = (product) => {
  //   navigate(`/product/${product.productslug}`, { state: { product } });
  // };

  // Calculate pagination
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
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
      <div className="flex flex-col gap-[20px] justify-center">
        {products && products.length > 0 ? (
          <>
            <div className="grid xl:gap-[20px] xl:mx-24 md:mx-10 lg:mx-5 mx-4 gap-[15px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
              {currentProducts.map((product, idx) => {
                const isInWishlist = wishlist.some((item) => item.id === product._id);
                const discountedPrice = calculateDiscountedPrice(product.price, product.discount);

                return (
                  <div
                    key={product._id}
                    data-aos="fade-up"
                    data-aos-delay={idx * 100}
                    className="relative w-full max-w-[368px] h-auto flex flex-col shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
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
                        onClick={() => handleAddToWishlist(product)}
                        className="p-2 bg-white rounded-full shadow hover:scale-110 transition-transform"
                      >
                        <img
                          src={isInWishlist ? likeFilled : like}
                          alt="like"
                          className="w-5 h-5"
                        />
                      </button>
                    </div>

                    {/* Product Image */}
                    <div
                      className="cursor-pointer"
                      onClick={() => handleProductClick(product)}
                    >
                      <img
                        src={product.productimage}
                        alt={product.productname}
                        className="w-full h-[280px] object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/368x280?text=Image+Not+Found';
                        }}
                      />
                    </div>

                    {/* Add to Cart Button */}
                    <div className="absolute bottom-20 w-full px-3">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-white text-gray-800 font-kufam py-3 shadow-lg hover:bg-gray-100 transition-all rounded font-semibold"
                      >
                        Add To Cart
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className={`${theme === "dark" ? "bg-white text-black " : "bg-[#262626] text-white"} p-4`}>
                      <h3
                        className="text-lg font-semibold cursor-pointer mt-3"
                        onClick={() => handleProductClick(product)}
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-end items-center xl:mx-24 md:mx-10 mx-4 mt-4">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                >
                  <img
                    src={leftArrow}
                    alt="leftArrow"
                    className="w-[72px] h-[12px]"
                  />
                </button>
                <span className="mx-4 text-sm">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200'}`}
                >
                  <img
                    src={rightArrow}
                    alt="rightArrow"
                    className="w-[72px] h-[12px]"
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