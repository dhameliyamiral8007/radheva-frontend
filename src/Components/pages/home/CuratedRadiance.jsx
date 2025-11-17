import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../config/hooks/useTheme.jsx";
import underline from "../../../assets/about/underline.svg";
import necklace from "../../../assets/necklace.png";
import queenImg from "../../../assets/crafted_queen.png";
import luxuryImg from "../../../assets/necklaceHome.png";
import jewelImg from "../../../assets/handRing.svg";
import diomand from "../../../assets/diomand_ring.svg";
import { fetchBanner } from "../../redux/slice/HomeBannerSlice.jsx";
import { setProductFilter } from "../../redux/slice/ProductFilterSlice";
import { useLocation } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CuratedRadiance = () => {
  const { colors, theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the entire banner state
  const bannerState = useSelector((state) => state.banner);
  const banners = bannerState?.banners || [];
  const loading = bannerState?.loading || false;
  const error = bannerState?.error || null;

  // Fetch banner data on component mount
  useEffect(() => {
    dispatch(fetchBanner());
  }, [dispatch]);

  // AOS animation init similar to About.jsx
  useEffect(() => {
    const t = setTimeout(() => {
      AOS.init({
        offset: 200,
        delay: 0,
        duration: 1200,
        easing: "ease",
        once: false,
        mirror: true,
      });
      AOS.refresh();
    }, 100);
    return () => clearTimeout(t);
  }, [location]);

  // Debug: Check what's in the state
  // useEffect(() => {
  //   console.log('Full banner state:', bannerState);
  //   console.log('Extracted banners:', banners);
  //   console.log('Banners length:', banners.length);
  // }, [bannerState, banners]);

  // Loading state
  if (loading) {
    return (
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-[500px] flex justify-center items-center`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C79954] mx-auto"></div>
          <p className="mt-4 text-lg">Loading curated content...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-[500px] flex justify-center items-center`}>
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Error loading content: {error}</p>
          <button
            onClick={() => dispatch(fetchBanner())}
            className="px-6 py-2 bg-[#C79954] text-white rounded-md hover:bg-[#b68947] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // // Default images as fallback
  // const defaultImages = [queenImg, luxuryImg, jewelImg, diomand, necklace];
  // const defaultTitles = [
  //   "CRAFTED FOR QUEENS",
  //   "Where Tradition Meets Luxury", 
  //   "Bold Brilliance",
  //   "The Jewel of Dreams",
  //   "Your Moment To Shine"
  // ];
  // const defaultDescriptions = [
  //   "Exclusive Heritage Jewelry",
  //   "Drape yourself in the grandeur of handcrafted gold jewelry",
  //   "The Power of Yellow Diamonds",
  //   "Elegance Captured in Every Sparkle",
  //   "An extraordinary necklace designed for life's finest celebrations. Where artistry and diamonds meet to create elegance that lasts forever."
  // ];

  // Helper functions to get content with fallbacks
  const getBannerImage = (index) => {
    if (banners[index]?.image) {
      return banners[index].image;
    }
    // return defaultImages[index];
  };

  const getBannerTitle = (index) => {
    if (banners[index]?.title) {
      return banners[index].title;
    }
    // return defaultTitles[index];
  };

  const getBannerDescription = (index) => {
    // Use shortdesc from API if available, otherwise description, otherwise fallback
    if (banners[index]?.shortdesc) {
      return banners[index].shortdesc;
    }
    if (banners[index]?.description) {
      return banners[index].description;
    }
    // return defaultDescriptions[index];
  };

  // Helper function to get collection ID from banner
  const getBannerCollectionId = (index) => {
    return banners[index]?.collectionid?._id || banners[index]?.collectionid?.id || null;
  };

  // Handle Shop Now button click
  const handleShopNowClick = (index) => {
    const collectionId = getBannerCollectionId(index);
    if (collectionId) {
      dispatch(setProductFilter({ navigationID: null, collectionID: collectionId, collectionItemID: null }));
      navigate('/products');
    } else {
      // If no collection ID, just navigate to products page
      navigate('/products');
    }
  };

  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
      <div className="text-center py-4 sm:py-5 px-4 sm:px-6 lg:px-8" data-aos="fade-down">
        <h2 className="text-[20px] sm:text-[26px] md:text-[36px] lg:text-[44px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[8px] sm:gap-[12px]">
          Curated Radiance
          <img
            src={underline}
            alt="underline"
            className="w-32 sm:w-40 md:w-56 lg:w-[261.2px] h-auto"
          />
        </h2>
      </div>

      {/* Debug info - remove in production
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-yellow-100 p-2 rounded text-xs z-50">
          Banners: {banners.length}
        </div>
      )} */}

      {/* Show message if no banners */}
      {banners.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-lg text-yellow-600">No banners available. Using default content.</p>
        </div>
      )}

      {/* Grid Layout */}
      <div className="flex flex-col lg:flex-row xl:mx-24 lg:mx-5 md:mx-4 mx-4 justify-center items-stretch gap-4 sm:gap-5 md:gap-4">
        {/* Top Left - Large Banner */}
        <div className="relative w-full lg:w-auto overflow-hidden" data-aos="fade-right">
          <img
            src={getBannerImage(0)}
            alt={getBannerTitle(0)}
            className="w-full lg:w-[900px] md:w-[768px] h-auto xl:h-[780px] lg:h-[550px] md:h-[700px] sm:h-[500px] object-cover"
          />
          <div className="absolute inset-0 flex justify-end md:justify-end items-start lg:items-start xl:top-[110px] lg:top-[80px] md:top-[100px] top-[70px] right-3 sm:right-6 md:right-5 lg:right-[0px] xl:right-[60px] max-w-full overflow-hidden" data-aos="zoom-in" data-aos-delay="150">
            <div className="max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[299px] px-2 overflow-hidden w-full">
              <p className="text-lg sm:text-xl md:text-3xl xl:text-[46px] lg:text-[30px] text-[#C79954] w-full font-Belleza text-center uppercase leading-tight break-all overflow-hidden"
                 style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                {getBannerTitle(0)}
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-10 sm:mb-6 md:mb-14 lg:mb-12 font-light text-center text-[#CFCFCF] mt-2 sm:mt-3 break-words overflow-hidden line-clamp-3"
                 style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                {getBannerDescription(0)}
              </p>
              <div className="w-full flex justify-center">
                <button 
                  onClick={() => handleShopNowClick(0)}
                  className="bg-[#B5904F] text-white px-3 sm:px-4 md:px-[16px] py-2 sm:py-[10px] rounded-[8px] font-kufam hover:bg-[#B8A076] transition-colors text-sm sm:text-base"
                  data-aos="fade-up" data-aos-delay="250"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right - Split into two sections */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-4 lg:mt-0 w-full lg:w-auto">
          {/* Top Right Top - Half */}
          <div className="relative overflow-hidden" data-aos="fade-left">
            <img
              src={getBannerImage(1)}
              alt={getBannerTitle(1)}
              className="w-full lg:w-[756px] xl:h-[374px] lg:h-[306px] md:h-[300px] h-[250px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-start items-start top-4 sm:top-6 md:top-8 lg:top-[60px] w-[90%] xl:w-[448px] lg:w-[250px] left-3 sm:left-4 xl:left-[30px] lg:left-4 text-left sm:text-center overflow-hidden max-w-full" data-aos="zoom-in" data-aos-delay="150">
              <div className="text-white w-full overflow-hidden px-2 max-w-full">
                <h3 className="text-lg sm:text-xl text-start max-sm:text-start md:text-2xl lg:text-xl font-Belleza mb-2 xl:mb-4 md:mb-2 text-[#FFFFFF] leading-tight break-all overflow-hidden"
                    style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                  {getBannerTitle(1)}
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-start mb-12 sm:mb-6 md:mb-8 lg:mb-20 xl:mx-10 lg:mx-0 font-medium text-[#CFCFCF] leading-relaxed max-sm:w-[270px] break-words overflow-hidden line-clamp-4"
                   style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                  {getBannerDescription(1)}
                </p>
                <button 
                  onClick={() => handleShopNowClick(1)}
                  className="bg-[#548AA6] text-white px-[16px] py-[10px] font-kufam rounded-[8px] transition-colors text-sm sm:text-base self-start sm:self-center"
                  data-aos="fade-up" data-aos-delay="250"
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Top Right Bottom - Half */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-4 justify-center">
            <div className="relative overflow-hidden w-full sm:w-auto" data-aos="fade-up" data-aos-delay="100">
              <img
                src={getBannerImage(2)}
                alt={getBannerTitle(2)}
                className="w-full sm:w-[368px] h-auto sm:h-[390px] xl:h-[390px] md:h-[350px] lg:h-auto object-contain xl:object-cover lg:object-contain md:object-cover"
              />
              <div className="absolute inset-0 flex justify-end items-start right-3 sm:right-4 mxl:right-6 md:right-4 overflow-hidden max-w-full" data-aos="zoom-in" data-aos-delay="200">
                <div className="text-white text-right mt-5 sm:mt-4 xl:mt-6 md:mt-3 max-w-[90%] sm:max-w-[85%] px-2 overflow-hidden w-full">
                  <h3 className="text-[18px] sm:text-xl md:text-2xl lg:text-xl xl:text-[26px] font-Belleza mb-2 sm:mb-3 tracking-[0px] leading-tight break-all overflow-hidden"
                      style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerTitle(2)}
                  </h3>
                  <p className="text-[12px] sm:text-[12px] md:text-[14px] tracking-[0px] mb-12 sm:mb-6 xl:mb-10 md:mb-24 font-medium leading-relaxed break-words overflow-hidden line-clamp-3"
                     style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerDescription(2)}
                  </p>
                  <button 
                    onClick={() => handleShopNowClick(2)}
                    className="bg-[#BFAC40] text-[11px] sm:text-[12px] md:text-[14px] tracking-[0px] px-[12px] py-[6px] rounded-[4px] font-kufam" data-aos="fade-up" data-aos-delay="300"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden w-full sm:w-auto" data-aos="fade-up" data-aos-delay="150">
              <img
                src={getBannerImage(3)}
                alt={getBannerTitle(3)}
                className="w-full sm:w-[368px] h-auto sm:h-[390px] xl:h-[390px] md:h-[350px] lg:h-auto object-contain xl:object-cover lg:object-contain md:object-cover"
              />
              <div className="absolute inset-0 left-3 sm:left-4 xl:left-6 lg:left-3 overflow-hidden max-w-full" data-aos="zoom-in" data-aos-delay="250">
                <div className="text-white mt-5 sm:mt-6 xl:mt-8 lg:mt-4 max-w-[90%] sm:max-w-[85%] px-2 overflow-hidden w-full">
                  <h3 className="text-[18px] sm:text-xl xl:mb-0 lg:mb-4 xl:text-[26px] lg:text-[18px] md:text-[24px] md:mb-3 mb-2 font-Belleza tracking-[0px] leading-tight break-all overflow-hidden"
                      style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerTitle(3)}
                  </h3>
                  <p className="text-[12px] sm:text-[12px] xl:text-[14px] lg:text-[14px] mb-12 sm:mb-6 xl:mb-12 lg:mb-[70px] md:mb-[92px] font-kufam tracking-[0px] leading-relaxed break-words overflow-hidden line-clamp-3"
                     style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerDescription(3)}
                  </p>
                  <button 
                    onClick={() => handleShopNowClick(3)}
                    className="bg-[#7FD7DA] text-black text-[11px] sm:text-[12px] md:text-[14px] tracking-[0px] px-[12px] py-[6px] rounded-[4px] font-kufam" data-aos="fade-up" data-aos-delay="300"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertise Section */}
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full py-15`}>
        <div className={`flex flex-col md:flex-row items-start ${theme === "dark" ? "bg-white" : "bg-gradient-to-r to-[#000000] from-[#262626]"}`}>
          <div className="relative" data-aos="fade-right">
            <img
              src={getBannerImage(4)}
              alt={getBannerTitle(4)}
              className="xl:w-[900px] lg:w-[550px] md:w-[700px] md:h-[300px] h-[250px] object-cover"
            />
          </div>

          <div className="flex flex-col justify-center xl:mx-14 lg:mx-5 mx-5 md:absolute lg:relative max-sm:my-5 overflow-hidden max-w-full" data-aos="fade-left" data-aos-delay="150">
            <h2 className="xl:text-[44px] lg:text-[30px] md:text-3xl text-[20px] mb-4 text-[#C79954] font-Belleza uppercase md:mt-[44px] break-all overflow-hidden"
                style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
              {getBannerTitle(4)}
            </h2>
            <p className={`text-[#CFCFCF] leading-snug text-[16px] font-kufam tracking-[0px] xl:mb-14 lg:mb-10 md:mb-14 mb-6 md:w-[450px] lg:w-full break-words overflow-hidden line-clamp-4 ${theme === "dark" ? "text-black" : "text-[#475569]"}`}
               style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
              {getBannerDescription(4)}
            </p>
            <button 
              onClick={() => handleShopNowClick(4)}
              className="bg-[#B5904F] text-white px-[16px] py-[10px] font-kufam rounded-[8px] transition-colors text-sm sm:text-base self-start cursor-pointer" data-aos="zoom-in" data-aos-delay="250"
            >
              Find Your Sparkle
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedRadiance;