import React from 'react'
import { useTheme } from '../../../config/hooks/useTheme'
import contactUs from "../../../../assets/footer/contactUs.svg"

const termsData = [
    {
        title: "Radheva's Overview",
        content: `Vivamus id hendrerit sapien. Nam eu tincidunt tellus, eu finibus nibh. Vivamus vulputate et ligula bibendum mattis. Integer nec lorem sed tortor aliquam lacinia ut molestie justo. Suspendisse non rhoncus quam, nec maximus elit. Integer tincidunt ligula velit, ac tempor massa accumsan in. Pellentesque tortor neque, sodales vitae felis eget, mollis lacinia mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed vitae eleifend odio. In hac habitasse platea dictumst. Fusce nulla nunc, porta vel lacinia at, interdum sagittis risus. Vivamus molestie id neque eget semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis dictum tellus hendrerit arcu dictum, non euismod dui mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales ipsum nibh, eget pretium eros eleifend sed.

Vivamus id hendrerit sapien. Nam eu tincidunt tellus, eu finibus nibh. Vivamus vulputate et ligula bibendum mattis. Integer nec lorem sed tortor aliquam lacinia ut molestie justo. Suspendisse non rhoncus quam, nec maximus elit. Integer tincidunt ligula velit, ac tempor massa accumsan in. Pellentesque tortor neque, sodales vitae felis eget, mollis lacinia mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed vitae eleifend odio. In hac habitasse platea dictumst. Fusce nulla nunc, porta vel lacinia at, interdum sagittis risus. Vivamus molestie id neque eget semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis dictum tellus hendrerit arcu dictum, non euismod dui mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales ipsum nibh, eget pretium eros eleifend sed.`
    },
    {
        title: "SECTION 1 – ONLINE STORE TERMS",
        content: `Vivamus id hendrerit sapien. Nam eu tincidunt tellus, eu finibus nibh. Vivamus vulputate et ligula bibendum mattis. Integer nec lorem sed tortor aliquam lacinia ut molestie justo. Suspendisse non rhoncus quam, nec maximus elit. Integer tincidunt ligula velit, ac tempor massa accumsan in. Pellentesque tortor neque, sodales vitae felis eget, mollis lacinia mi. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed vitae eleifend odio. In hac habitasse platea dictumst. Fusce nulla nunc, porta vel lacinia at, interdum sagittis risus. Vivamus molestie id neque eget semper. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Duis dictum tellus hendrerit arcu dictum, non euismod dui mollis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sodales ipsum nibh, eget pretium eros eleifend sed.`
    },
    {
        title: "SECTION 2 – GENERAL CONDITIONS",
        content: `Phasellus imperdiet libero sit amet pretium elementum. Suspendisse potenti. Aenean viverra 
        augue nec neque consequat vulputate.

Phasellus imperdiet libero sit amet pretium elementum. Suspendisse potenti. Aenean viverra 
        augue nec neque consequat vulputate.`
    },
    {
        title: "SECTION 3 – ACCURACY OF INFORMATION",
        content: `We strive to provide accurate and up-to-date information. However, errors or omissions 
        may occur. Vivamus non risus nec turpis fermentum convallis.

We strive to provide accurate and up-to-date information. However, errors or omissions 
        may occur. Vivamus non risus nec turpis fermentum convallis.`
    }
]

const TermsAndCondition = () => {
    const { colors, theme } = useTheme()

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
            {/* Hero Section */}
            <div className="relative h-[500px]">
                <img
                    src={contactUs}
                    alt="Contact Banner"
                    className="w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 bg-black/40" /> */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center lg:top-[250px] md:top-[250px]">
                    <h2 className="text-[40px] text-white md:text-[40px] font-semibold font-kufam mb-4 tracking-[0px] leading-100%">
                        Terms and Conditions
                    </h2>
                    <p className="max-w-[1532px] text-white font-kufam font-normal text-[20px] tracking-[0px] leading-100% max-sm:px-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        It has survived not only five centuries, but also the leap into electronic typesetting.
                    </p>
                </div>
            </div>

            {/* Dynamic Condition Sections */}
            <div className="relative xl:mx-24 md:mx-10 mx-4 py-10">
                <div className="relative z-10 max-w-[1532px] mx-auto text-white">
                    {termsData.map((section, index) => (
                        <div key={index} className="mb-5">
                            <h3 className={`${theme === "dark" ? "text-black" : "text-white"} text-[20px] font-kufam text-[#1E293B] font-normal tracking-[0px] leading-100%`}>{section.title}</h3>

                            {/* Split content into paragraphs */}
                            {section.content.split("\n\n").map((para, i) => (
                                <p
                                    key={i}
                                    className={` text-[20px] font-kufam font-normal tracking-[0px] leading-100% mb-4 ${theme === "dark" ? "text-[#64748B]"  : "text-[#A9B2B9]" }`}  
                                >
                                    {para.trim()}   
                                </p>
                            ))}
                        </div>
                    ))}
                </div>
                <div className="max-w-[1532px] mx-auto">
                    <h1 className={`text-[20px] font-kufam font-normal tracking-[0px] leading-100% ${theme === "dark" ? "text-black" : "text-white"}`}
                    >
                        Email Us {" "}
                        <span className={`underline text-[20px] tracking-[0px] leading-100% font-kufam font-normal ${theme === "dark" ? "text-black" : "text-[#A9B2B9]"}`}>
                            <spam>:- {" "}</spam>
                            <a href="mailto:radhevajewels@gmail.com">
                                radhevajewels@gmail.com
                            </a>
                        </span>
                    </h1>
                </div>
            </div>
        </div>
    )
}

export default TermsAndCondition
