import React from 'react'
import { useTheme } from '../../../Components/config/hooks/useTheme'

const Star = ({ filled }) => (
    <div className={`${filled ? 'text-[#B5904F] text-[24px] tracking-[0px] leading-100%' : 'text-gray-400 text-[24px] tracking-[0px] leading-100% text-center'}  `}>★</div>
);

const ReviewsStar = () => {
    const { colors } = useTheme();

    const totalReviews = 40;
    const avgRating = 4.0;
    const breakdown = [
        { stars: 5, count: 26 },
        { stars: 4, count: 8 },
        { stars: 3, count: 4 },
        { stars: 2, count: 2 },
        { stars: 1, count: 30 },
    ];

    const maxCount = Math.max(...breakdown.map(b => b.count));

    return (
        <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
            <div className="text-center py-5 flex justify-center items-center flex-col xl:mx-24 md:mx-10 mx-4">
                <span className={`${colors.reviewsstar.reviewstext} text-[26px] font-kufam font-semibold inline-flex items-center relative tracking-[0px] leading-[100%] gap-[4px]`}>
                    <span>3357</span>
                    <span>Reviews</span>
                </span>
                <div className='flex flex-row'>
                    {[1, 2, 3, 4, 5].map(i => (
                        <Star key={i} filled={i <= Math.round(avgRating)} />
                    ))}
                </div>
            </div>
            <div className="flex justify-center xl:mx-24 md:mx-10 mx-4 py-10">
                <div className={`${colors.reviewsstar.background} ${colors.reviewsstar.border} w-full max-w-[1532px] border-2 rounded-[10px] p-[30px]`}>
                    <div className="grid md:grid-cols-12 grid-cols-1 items-stretch ">
                        {/* Left: average */}
                        <div className=" md:col-span-3 flex flex-col items-center justify-center gap-[12px]">
                            <div className="flex items-center justify-center gap-[4px] tracking-[0px] lg:flex-row md:flex-col leading-100%">
                                <div className='flex flex-row'>
                                    {[1, 2, 3, 4, 5].map(i => (
                                        <Star key={i} filled={i <= Math.round(avgRating)} />
                                    ))}
                                </div>
                                <span className={`${colors.reviewsstar.text} lg:ml-2 text-[16px]  font-kufam font-normal tracking-[0px] leading-100% underline text-center`}>{avgRating} out of 5</span>
                            </div>
                            <div className={`${colors.reviewsstar.reviewstext} text-[18px] font-kufam font-medium tracking-[0px] leading-100% max-sm:mb-4`}>Based on {totalReviews} reviews</div>
                        </div>

                        {/* Middle: breakdown */}
                        <div className="col-span-12 md:col-span-7 md:border-l-4 md:border-[#A9B2B9] md:pl-6">
                            <div className={`${colors.reviewsstar.reviewstext} flex justify-center items-center text-[#1E293B] md:text-left text-[18px] tracking-[0px] leading-100% font-kufam font-bold mb-4`}>Customer Reviews</div>
                            {breakdown.map((b, idx) => (
                                <div className='flex justify-center items-center'>
                                    <div key={idx} className="flex items-center gap-[20px] lg:w-[381px] w-full md:w-[300px]">
                                        <div className="flex gap-[4px]">
                                            {[1, 2, 3, 4, 5].map(i => (
                                                <Star key={i} filled={i <= b.stars} />
                                            ))}
                                        </div>
                                        <div className="flex-1 h-[20px] bg-[#D9D9D9] overflow-hidden">
                                            <div
                                                className={`h-full bg-[#B5904F]`}
                                                style={{ width: `${(b.count / maxCount) * 100}%` }}
                                            />
                                        </div>
                                        <div className={`${colors.reviewsstar.text} text-start text-[16px] font-semibold font-kufam tracking-[0px] leading-100%`}>{b.count}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right: CTA */}
                        <div className="flex justify-center items-center md:border-l-4 md:border-[#A9B2B9] md:pl-6 md:col-span-2">
                            <button className={`${colors.reviewsstar.buttonborder} ${colors.reviewsstar.text} px-[20px] py-[14px] rounded-[10px] font-kufam font-semibold border-[2px] text-[#334155] text-[20px] max-sm:mt-4 cursor-pointer`}>Write Review</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReviewsStar
