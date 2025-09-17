import React from 'react'
import contactUs from "../../../../assets/footer/contactUs.svg";
import { useTheme } from '../../../config/hooks/useTheme';
import story1 from "../../../../assets/footer/story.svg";
import necklace from "../../../../assets/necklace.png"
import necklace1 from "../../../../assets/footer/story1.svg"
import necklace2 from "../../../../assets/footer/story2.svg"
import necklace3 from "../../../../assets/footer/story3.svg"
import InformationSection from '../../home/InformationSection';

const OurStory = () => {
    const { colors, theme } = useTheme();

    const data = {
        title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        paragraphs: [
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled."
        ],
        images: {
            left: necklace1,
            middle: necklace2,
            right: necklace3
        }
    };

    const story = [
        {
            id: 1,
            img: story1,
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            description:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
        {
            id: 2,
            img: story1,
            title: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        },
    ];

    return (
        <div
            className={`${colors.firstPart.background} ${colors.firstPart.text} w-full min-h-screen`}
        >
            <div className="relative h-[500px]">
                <img
                    src={contactUs}
                    alt="Contact Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center top-[250px]">
                    <h2 className="text-[40px] text-white md:text-[50px] font-semibold font-kufam mb-4 tracking-[0px] leading-100%">
                        Our Story
                    </h2>
                    <p className="max-w-[1532px] text-white font-kufam font-normal text-[20px] tracking-[0px] leading-100%">
                        We don’t just sell jewelry — we tell stories. Every diamond we design is carefully selected, thoughtfully crafted, and beautifully finished to celebrate life’s most meaningful moments.
                    </p>
                </div>
            </div>

            {/* Story Sections */}
            {story.map((item, index) => (
                <div
                    key={item.id}
                    className={`flex lg:flex-row flex-col gap-[30px] xl:mx-24 md:mx-10 mx-4 pt-10  `}
                >
                    {index % 2 === 0 ? (
                        <>
                            <img
                                src={item.img}
                                alt="story"
                                className="xl:w-[750px] lg:w-[550px] h-auto object-cover"
                            />
                            <div className='xl:pt-20 grid gap-[16px]'>
                                <h3 className={` text-[26px] font-bold font-kufam tracking-[0px] leading-100%`}>
                                    {item.title}
                                </h3>
                                <p className={` text-[22px] font-kufam font-normal tracking-[0px] leading-100% ${theme === "dark" ? "text-[#64748B]" : "text-white"}`}>{item.description}</p>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='xl:pt-20 grid gap-[16px]'>
                                <h3 className={` text-[26px] font-bold font-kufam tracking-[0px] leading-100%`}>
                                    {item.title}
                                </h3>
                                <p className={` text-[22px] font-kufam font-normal tracking-[0px] leading-100%  ${theme === "dark" ? "text-[#64748B]" : "text-white"}`}>{item.description}</p>
                            </div>
                            <img
                                src={item.img}
                                alt="story"
                                className="xl:w-[800px] lg:w-[550px] h-auto object-cover lg:pb-0 md:pb-10 pb-10"
                            />
                        </>
                    )}
                </div>
            ))}
            <div className="w-full relative py-10">
                <img
                    src={necklace}
                    alt="Left Side"
                    className="w-full h-[570px] "
                />
            </div>
            <div className={``}>     
                <div className=" pt-10 xl:mx-24 md:mx-10 mx-4 gap-[30px]">
                    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-1 md:grid-cols-1 gap-10">

                        {/* Left Side - Text */}
                        <div className="grid gap-[16px] overflow-auto lg:h-[650px]">
                            <h2 className={` text-[26px] font-bold font-kufam tracking-[0px] leading-100%`}>{data.title}</h2>
                            {data.paragraphs.map((para, index) => (
                                <p key={index} className={` ${theme === "dark" ? "text-[#64748B]" : "text-white"} text-[22px] font-kufam text-[#64748B] font-normal tracking-[0px] leading-100%`}>
                                    {para}
                                </p>
                            ))}
                        </div>

                        {/* Right Side - Images in custom layout */}
                        <div className="grid gap-4 grid-cols-3 max-sm:grid-cols-1">

                            {/* Left tall image */}
                            <div className="flex-1">
                                <img
                                    src={data.images.left}
                                    alt="Left"
                                    className="object-cover md:w-[236.68px] lg:w-full w-full md:h-[500px]"
                                />
                            </div>

                            {/* Middle small image (shorter) */}
                            <div className="flex-1 flex md:mt-72">
                                <img
                                    src={data.images.middle}
                                    alt="Middle"
                                    className="object-cover md:w-[236px] lg:w-full w-full h-auto"
                                />
                            </div>

                            {/* Right tall image */}
                            <div className="flex-1">
                                <img
                                    src={data.images.right}
                                    alt="Right"
                                    className="object-cover md:w-[236.68px] lg:w-full w-full md:h-[500px]"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='py-10'>
                <InformationSection />
            </div>
        </div>
    );
};

export default OurStory;
