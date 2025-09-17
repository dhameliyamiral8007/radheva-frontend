import React from "react";
import { useTheme } from "../../config/hooks/useTheme.jsx";
import underline from "../../../assets/about/underline.svg";

import queenImg from "../../../assets/crafted_queen.png";
import luxuryImg from "../../../assets/necklaceHome.png";
import jewelImg from "../../../assets/handRing.svg";
import diomand from "../../../assets/diomand_ring.svg";
const CuratedRadiance = () => {
  const { colors } = useTheme();

  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
      <div className="text-center py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] sm:text-[26px] md:text-[36px] lg:text-[44px] leading-[100%] tracking-[0px] font-belleza inline-flex flex-col items-center gap-[8px] sm:gap-[12px]">
          Curated Radiance
          <img
            src={underline}
            alt="underline"
            className="w-32 sm:w-40 md:w-56 lg:w-[261.2px] h-auto"
          />
        </h2>
      </div>

      {/* Grid Layout - Custom Layout */}
      <div className="flex flex-col lg:flex-row xl:mx-24 lg:mx-5 md:mx-4 mx-4 justify-center items-stretch gap-4 sm:gap-5 md:gap-4">
        {/* Top Left - Large Banner */}
        <div className="relative w-full lg:w-auto">
          <img
            src={queenImg}
            alt="Crafted for Queens"
            className="w-full lg:w-[900px] md:w-[768px] h-auto xl:h-[780px] lg:h-[550px] md:h-[700px] sm:h-[500px]"
          />
          <div className="absolute inset-0 flex justify-end md:justify-end items-start lg:items-start xl:top-[110px] lg:top-[80px] md:top-[100px] top-[70px] right-3 sm:right-6 md:right-5 lg:right-[0px] xl:right-[60px]">
            <div className="max-w-[280px] sm:max-w-[320px] md:max-w-[350px] lg:max-w-[299px]">
              <p className="text-lg sm:text-xl md:text-3xl xl:text-[46px] lg:text-[30px] text-[#C79954] w-full font-Belleza text-center uppercase leading-tight">
                CRAFTEDFOR QUEENS
              </p>
              <p className="text-sm sm:text-base md:text-lg mb-10 sm:mb-6 md:mb-14 lg:mb-12  font-light text-center text-[#CFCFCF] mt-2 sm:mt-3">
                Exclusive Heritage Jewelry
              </p>
              <div className="w-full flex justify-center">
                <button className="bg-[#B5904F] text-white px-3 sm:px-4 md:px-[16px] py-2 sm:py-[10px] rounded-[8px] font-kufam hover:bg-[#B8A076] transition-colors text-sm sm:text-base">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Top Right - Split into two sections */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-4 lg:mt-0 w-full lg:w-auto">
          {/* Top Right Top - Half */}
          <div className="relative overflow-hidden">
            <img
              src={luxuryImg}
              alt="Where Tradition Meets Luxury"
              className="w-full lg:w-[756px] xl:h-[374px] lg:h-[306px] md:h-[300px] h-[250px] object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-start items-start top-4 sm:top-6 md:top-8 lg:top-[60px] w-[90%] xl:w-[448px] lg:w-[250px] left-3 sm:left-4 xl:left-[30px] lg:left-4 text-left sm:text-center">
              <div className="text-white">
                <h3 className="text-lg sm:text-xl text-start max-sm:text-start md:text-2xl lg:text-xl font-Belleza mb-2 xl:mb-4 md:mb-2 text-[#FFFFFF] leading-tight">
                  Where Tradition Meets Luxury
                </h3>
                <p className="text-xs sm:text-sm md:text-base text-start mb-12 sm:mb-6 md:mb-8 lg:mb-20 xl:mx-10 lg:mx-0 font-medium text-[#CFCFCF] leading-relaxed max-sm:w-[270px]">
                  Drape yourself in the grandeur of handcrafted gold jewelry
                </p>
                <button className="bg-[#548AA6] text-white px-[16px] py-[10px] font-kufam rounded-[8px] transition-colors text-sm sm:text-base self-start sm:self-center">
                  Shop Now
                </button>
              </div>
            </div>

          </div>

          {/* Top Right Bottom - Half */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-4 justify-center">
            <div className="relative overflow-hidden w-full sm:w-auto">
              <img
                src={jewelImg}
                alt="Bold Brilliance"
                className="w-full sm:w-[368px] h-auto sm:h-[390px] xl:h-[390px] md:h-[350px] lg:h-auto object-contain xl:object-cover lg:object-contain md:object-cover"
              />
              <div className="absolute inset-0 flex justify-end items-start right-3 sm:right-4 mxl:right-6 md:right-4">
                <div className="text-white text-right mt-5 sm:mt-4 xl:mt-6 md:mt-3">
                  <h3 className="text-[18px] sm:text-xl md:text-2xl lg:text-xl xl:text-[26px] font-Belleza mb-2 sm:mb-3 tracking-[0px] leading-tight">
                    Bold Brilliance
                  </h3>
                  <p className="text-[12px] sm:text-[12px] md:text-[14px] tracking-[0px] mb-12 sm:mb-6 xl:mb-10 md:mb-24 font-medium leading-relaxed">
                    The Power of Yellow Diamonds
                  </p>
                  <button className="bg-[#BFAC40] text-[11px] sm:text-[12px] md:text-[14px] tracking-[0px] px-[12px] py-[6px] rounded-[4px] font-kufam">
                    Shop Now
                  </button>
                </div>
              </div>

            </div>
            <div className="relative overflow-hidden w-full sm:w-auto">
              <img
                src={diomand}
                alt="Bold Brilliance"
                className="w-full sm:w-[368px] h-auto sm:h-[390px] xl:h-[390px] md:h-[350px] lg:h-auto object-contain xl:object-cover lg:object-contain md:object-cover"
              />
              <div className="absolute inset-0 left-3 sm:left-4 xl:left-6 lg:left-3">
                <div className="text-white mt-5 sm:mt-6 xl:mt-8 lg:mt-4">
                  <h3 className="text-[18px] sm:text-xl xl:mb-0 lg:mb-4 xl:text-[26px] lg:text-[18px] md:text-[24px] md:mb-3 mb-2 font-Belleza tracking-[0px] leading-tight">
                    The Jewel of Dreams
                  </h3>
                  <p className="text-[12px] sm:text-[12px] xl:text-[14px] lg:text-[14px] mb-12 sm:mb-6 xl:mb-12 lg:mb-[70px] md:mb-[92px] font-kufam tracking-[0px] leading-relaxed">
                    Elegance Captured in Every Sparkle
                  </p>
                  <button className="bg-[#7FD7DA] text-black text-[11px] sm:text-[12px] md:text-[14px] tracking-[0px] px-[12px] py-[6px] rounded-[4px] font-kufam">
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuratedRadiance;
