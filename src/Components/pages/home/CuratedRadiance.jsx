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
  const getBannerButtonText = (index) => {

    if (banners[index]?.buttontxt) {
      return banners[index].buttontxt;
    }
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
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 md:top-10 md:right-10 flex justify-end items-start" data-aos="zoom-in" data-aos-delay="150">
            <div className="max-w-[280px] text-align-right sm:max-w-[320px] md:max-w-[350px] lg:max-w-[299px] px-2 overflow-hidden w-full">
              <p className="text-lg sm:text-xl md:text-3xl xl:text-[40px] lg:text-[30px] text-[#C79954] w-full font-cagier text-right uppercase leading-tight break-all overflow-hidden"
                style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                {getBannerTitle(0)}
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-10 sm:mb-6 md:mb-14 lg:mb-12 font-light text-right text-[#CFCFCF] mt-2 sm:mt-3 break-words overflow-hidden line-clamp-3"
                style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                {getBannerDescription(0)}
              </p>
              <div className="w-full flex justify-end">
                <button
                  onClick={() => handleShopNowClick(0)}
                  className="
    text-white
    px-3 sm:px-4 md:px-[16px]
    py-2 sm:py-[10px]
    rounded-[8px]
    font-kufam
    transition
    hover:opacity-90
    text-sm sm:text-base
  "
                  style={{
                    background: "linear-gradient(180deg, #E3924B 0%, #8F531E 100%)",
                  }}
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  {getBannerButtonText(0)}
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
                  className="
    text-white
    px-[16px] py-[10px]
    font-kufam
    rounded-[8px]
    transition
    hover:opacity-90
    text-sm sm:text-base
    self-start
  "
                  style={{
                    background: "linear-gradient(138.1deg, #679BB5 11.69%, #255A74 96.19%)",
                  }}
                  data-aos="fade-up"
                  data-aos-delay="250"
                >
                  {getBannerButtonText(1)}
                </button>

              </div>
            </div>
          </div>

          {/* Top Right Bottom - Half */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-4">
            <div className="relative overflow-hidden w-full sm:w-auto" data-aos="fade-up" data-aos-delay="100">
              <img
                src={getBannerImage(2)}
                alt={getBannerTitle(2)}
                className="w-full sm:w-[368px] h-auto sm:h-[390px] xl:h-[390px] md:h-[350px] lg:h-auto object-contain xl:object-cover lg:object-contain md:object-cover"
              />
              <div className="absolute inset-0 flex justify-start items-start left-2 sm:left-2 xl:left-2 lg:left-2 overflow-hidden max-w-full" data-aos="zoom-in" data-aos-delay="200">
                <div className="text-white text-left mt-2 sm:mt-2 xl:mt-2 md:mt-2 max-w-[90%] sm:max-w-[85%] px-2 overflow-hidden w-full">
                  <h3 className="text-[18px] sm:text-xl md:text-2xl lg:text-xl xl:text-[26px] font-Belleza mb-2 sm:mb-3 tracking-[0px] leading-tight break-all overflow-hidden text-white"
                    style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerTitle(2)}
                  </h3>
                  <p className="text-[12px] sm:text-[12px] md:text-[14px] tracking-[0px] mb-12 sm:mb-6 xl:mb-10 md:mb-24 font-medium text-[#CFCFCF] leading-relaxed break-words overflow-hidden line-clamp-3"
                    style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerDescription(2)}
                  </p>
                  <button
                    onClick={() => handleShopNowClick(2)}
                    className="
    text-white
    text-[11px] sm:text-[12px] md:text-[14px]
    tracking-[0px]
    px-[12px] py-[6px]
    rounded-[4px]
    font-kufam
    transition
    hover:opacity-90
  "
                    style={{
                      background: "linear-gradient(141.92deg, #CFBD57 12.37%, #776919 102.84%)",
                    }}
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    {getBannerButtonText(2)}
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
              <div className="absolute inset-0 left-0 sm:left-2 xl:left-2 lg:left-2 overflow-hidden max-w-full flex justify-end text-right" data-aos="zoom-in" data-aos-delay="250">
                <div className="text-white mt-5 sm:mt-6 xl:mt-8 lg:mt-4 max-w-[90%] sm:max-w-[85%] px-2 overflow-hidden w-full">
                  <h3 className="text-[18px] sm:text-xl xl:mb-0 lg:mb-4 xl:text-[26px] lg:text-[18px] md:text-[24px] md:mb-3 mb-2 font-Belleza tracking-[0px] leading-tight break-all overflow-hidden text-white"
                    style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerTitle(3)}
                  </h3>
                  <p className="text-[12px] sm:text-[12px] xl:text-[14px] lg:text-[14px] mb-12 sm:mb-6 xl:mb-12 lg:mb-[70px] md:mb-[92px] font-kufam tracking-[0px] text-[#CFCFCF] leading-relaxed break-words overflow-hidden line-clamp-3"
                    style={{ wordWrap: "break-word", overflowWrap: "break-word", wordBreak: "break-word", maxWidth: "100%" }}>
                    {getBannerDescription(3)}
                  </p>
                  <button
                    onClick={() => handleShopNowClick(3)}
                    className="
    text-white
    text-[11px] sm:text-[12px] md:text-[14px]
    tracking-[0px]
    px-[12px] py-[6px]
    rounded-[4px]
    font-kufam
    transition
    hover:opacity-90
  "
                    style={{
                      background: "linear-gradient(180deg, #E67275 0%, #D74B4F 100%)",
                    }}
                    data-aos="fade-up"
                    data-aos-delay="300"
                  >
                    {getBannerButtonText(3)}
                  </button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advertise Section */}
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full py-15`}>
        {/* Advertise Section */}
        <div className="w-full">
          <div className="relative w-full h-[260px] md:h-[300px] xl:h-[350px] overflow-hidden">

            {/* Background Image */}
            <img
              src={getBannerImage(4)}
              alt={getBannerTitle(4)}
              className="w-full h-full object-cover"
            />

            {/* Dark overlay (luxury feel) */}
            <div className="absolute inset-0 bg-black/55"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex justify-center items-center px-6 sm:px-10 xl:px-20">
              <div
                className="max-w-[600px] text-center"
                data-aos="fade-left"
                data-aos-delay="150"
              >

<h2
  className="
    font-Belleza
    text-[#C79954]
    uppercase
    leading-tight
    text-[20px]
    md:text-[30px]
    xl:text-[44px]
    mb-3
    whitespace-nowrap
    overflow-hidden
    text-ellipsis
  "
>
  {getBannerTitle(4)}
</h2>


                <p
                  className="
            text-[#CFCFCF]
            font-kufam
            text-[14px]
            md:text-[16px]
            leading-snug
            mb-6
            line-clamp-3
          "
                >
                  {getBannerDescription(4)}
                </p>

                <button
  onClick={() => handleShopNowClick(4)}
  className="
    px-[16px] py-[10px]
    rounded-[8px]
    font-kufam
    text-sm sm:text-base
    text-white
    transition
    hover:opacity-90
  "
  style={{
    background:
      "linear-gradient(136.87deg, #CDA867 -10.8%, #765B2B 89.61%)",
  }}
  data-aos="zoom-in"
  data-aos-delay="250"
>
  {getBannerButtonText(4)}
</button>


              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default CuratedRadiance;