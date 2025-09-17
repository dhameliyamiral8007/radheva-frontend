import React from 'react'
import { useTheme } from '../../../config/hooks/useTheme'
import contactUs from "../../../../assets/footer/contactUs.svg"
import GeneralQuestions from '../../solitaires/GeneralQuestions'
const OurPolicy = () => {
    const { colors } = useTheme()

    return (
        <div
            className={`${colors.firstPart.background} ${colors.firstPart.text} w-full `}
        >
            {/* Hero Section */}
            <div className="relative h-[500px]">
                <img
                    src={contactUs}
                    alt="Contact Banner"
                    className="w-full h-full object-cover"
                />
                {/* <div className="absolute inset-0 bg-black/40" /> */}
                <div className="absolute inset-0 flex flex-col justify-center items-center text-center lg:top-[250px] md:top-[220px]">
                    <h2 className="text-[35px] text-white md:text-[40px] font-semibold font-kufam mb-4 tracking-[0px] leading-100%">
                        Our Policy
                    </h2>
                    <p className="max-w-[1532px] text-white font-kufam font-normal text-[17px] md:text-[20px] tracking-[0px] leading-100% max-sm:px-4">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s.
                    </p>
                </div>
            </div>
            <div className='py-10'>
                <GeneralQuestions />
            </div>
        </div>
    )
}

export default OurPolicy
