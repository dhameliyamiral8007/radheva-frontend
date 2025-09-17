import React from 'react'
import necklace from "../../../assets/necklace.png"
import { useTheme } from "../../config/hooks/useTheme.jsx";

const Advertise = () => {
  const { colors, theme } = useTheme();
  return (
    <div
      className={`${colors.firstPart.background} ${colors.firstPart.text} w-full py-15`}
    >
      <div className={`flex flex-col md:flex-row items-start ${theme === "dark" ? "bg-white" : "bg-gradient-to-r to-[#000000] from-[#262626]"
        }`}>
        <div className=" relative">
          <img
            src={necklace}
            alt="Left Side"
            className="xl:w-[900px] lg:w-[550px] md:w-[700px] md:h-[300px] h-[250px]"
          />
        </div>

        {/* Right Side Text */}
        <div className="flex flex-col justify-center xl:mx-14 lg:mx-5 mx-5 md:absolute lg:relative max-sm:my-5">
          <h2 className="xl:text-[44px] lg:text-[30px] md:text-3xl text-[20px] mb-4 text-[#C79954] font-Belleza uppercase md:mt-[44px]">
            Your Moment To Shine
          </h2>
          <p className={`text-[#CFCFCF] leading-snug text-[16px] font-kufam tracking-[0px] xl:mb-14 lg:mb-10 md:mb-14 mb-6 md:w-[450px] lg:w-full ${theme === "dark" ? "text-black" : "text-[#475569]"}`}>
            An extraordinary necklace designed for life’s finest celebrations. Where artistry and diamonds
            meet to create elegance that lasts forever.
          </p>
          <button className="bg-[#B5904F] text-white px-[16px] py-[10px] font-kufam rounded-[8px] transition-colors text-sm sm:text-base self-start cursor-pointer">
            Find Your Sparkle
          </button>
        </div>
      </div>
      {/* Left Side Image */}

    </div>

  )
}

export default Advertise
