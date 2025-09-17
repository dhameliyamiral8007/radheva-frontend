import React, { useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme';
import { FaMinus, FaPlus } from 'react-icons/fa';
import underline from "../../../assets/about/underline.svg"


const faqData = [
    {
        question: "What materials do you use in your jewelry?",
        answer:
            "We use high-quality materials including 925 sterling silver, 14K/18K gold, platinum, and ethically sourced gemstones. Each product description details the specific materials used.",
    },
    {
        question: "Is your jewelry handmade?",
        answer:
            "Yes, our jewelry is handcrafted by skilled artisans to ensure uniqueness and the highest quality.",
    },
    {
        question: "Do you offer custom or personalized jewelry?",
        answer:
            "Yes, we provide custom design services. You can personalize jewelry with engravings, stones, or fully custom designs.",
    },
    {
        question: "How should I care for my jewelry?",
        answer:
            "We recommend storing jewelry in a soft pouch, avoiding contact with harsh chemicals, and cleaning it with a soft cloth to maintain its shine.",
    },
    {
        question: "What is your return and exchange policy?",
        answer:
            "We offer returns and exchanges within 14 days of purchase. Items must be unworn and in their original condition.",
    },
];
export const TitleGeneralQuestions = () => {
    const { colors } = useTheme();
    return (
        <div
            className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
        >
            <div className="text-center py-5">
                <h2 className="text-[35px] font-Belleza inline-block relative">
                    Frequently Asked Questions
                    <img src={underline} alt="underline" className="p-2" />
                </h2>
            </div>
        </div>
    )
}

const GeneralQuestions = () => {
    const { colors, theme } = useTheme();
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleQuestion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div
            className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
        >

            {/* FAQ Section */}
            <div className="xl:mx-24 md:mx-10 mx-4 py-6 grid md:gap-[35px] gap-[30px]">
                {faqData.map((faq, index) => (
                    <div
                        key={index}
                        className=" grid gap-4 cursor-pointer"
                        onClick={() => toggleQuestion(index)}
                    >
                        {/* Question Row  */}
                        <div className="flex justify-between items-center gap-4">
                            <h3 className={`${theme === "dark" ? "text-black" : "text-white"}md:text-[26px] text-[20px] tracking-[0px] leading-[100%] font-kufam font-semibold`}>{faq.question}</h3>
                            <span>
                                {activeIndex === index ? (
                                    <FaMinus className="text-gray-400" />
                                ) : (
                                    <FaPlus className="text-gray-400" />
                                )}
                            </span>
                        </div>

                        {/* Answer */}
                        {activeIndex === index && (
                            <p className={`${theme === "dark" ? "text-[#64748B]" : "text-[#A9B2B9]"} font-normal font-kufam md:text-[20px] text-[15px] tracking-[0px] leading-100%`}>{faq.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GeneralQuestions;
