import React from 'react'
import { useTheme } from '../../config/hooks/useTheme'
import rings from '../../../assets/rings.png'
import ringss from '../../../assets/ringsReal.png'
import underline from "../../../assets/about/underline.svg";


const galleryData = [
    {
        before: rings,
        after: ringss
    },
    {
        before: rings,
        after: ringss
    },
    {
        before: rings,
        after: ringss
    }
]

const Gallery = () => {
    const { colors } = useTheme()
    return (
        <div className={`${colors.Gallery.background} ${colors.Gallery.text} w-full flex flex-col justify-center items-center py-[80px]`}>
            <div className="text-center mb-10">
                <h2 className="text-[44px] font-kufam font-normal tracking-[0px] leading-[52.08px] inline-block relative">
                    Gallery
                    {/* <img src={underline} alt="underline" className="p-2 mx-auto" /> */}
                </h2>
            </div>

            {/* Gallery Grid */}
            <div className=" max-w-[1440px] grid justify-center items-center xl:mx-24 lg:mx-13 md:mx-10 mx-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {galleryData.map((item, idx) => (
                    <div
                        key={idx}
                        className="bg-[#FFFFFF] rounded-lg overflow-hidden shadow-lg flex"
                    >
                        {/* Before */}
                        <div className="relative w-1/2">
                            <img
                                src={item.before}
                                alt="Before"
                                className="w-[225px] h-[269.39px] object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-[#FFFFFF] text-black text-xs font-semibold px-2 py-1 rounded">
                                Before
                            </span>
                        </div>

                        {/* After */}
                        <div className="relative w-1/2">
                            <img
                                src={item.after}
                                alt="After"
                                className="w-[225px] h-[269.39px] object-cover"
                            />
                            <span className="absolute top-2 left-2 bg-white text-black text-xs font-semibold px-2 py-1 rounded">
                                After
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Gallery
