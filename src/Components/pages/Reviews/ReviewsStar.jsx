import React, { useMemo, useState } from 'react'
import { useTheme } from '../../../Components/config/hooks/useTheme'
import { createReviewService } from '../../redux/service/ReviewService'

const Star = ({ filled }) => (
    <div className={`${filled ? 'text-[#B5904F] text-[24px] tracking-[0px] leading-100%' : 'text-gray-400 text-[24px] tracking-[0px] leading-100% text-center'}  `}>★</div>
);

const ReviewsStar = ({ productId: productIdProp, userId: userIdProp }) => {
    const { colors } = useTheme();


    const [isWriting, setIsWriting] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

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

    const effectiveUserId = useMemo(() => {
        if (userIdProp) return userIdProp;
        try {
            const auth = JSON.parse(localStorage.getItem('auth') || '{}');
            return auth?.user?._id || auth?._id || localStorage.getItem('userId') || undefined;
        } catch { return undefined; }
    }, [userIdProp]);

    const productId = productIdProp; // keep explicit name

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!rating) return alert('Please select a star rating');
        setSubmitting(true);
        try {
            const formFiles = Array.from(files || []);
            await createReviewService({
                rating,
                review: content,
                productId,
                title,
                files: formFiles,
            });
            setIsWriting(false);
            setRating(0); setHoverRating(0); setTitle(""); setContent(""); setFiles([]);
            setShowSuccess(true);
        } catch (err) {
            console.error(err);
            alert(err?.message || 'Failed to submit review');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
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
                                <div key={idx} className='flex justify-center items-center'>
                                    <div className="flex items-center gap-[20px] lg:w-[381px] w-full md:w-[300px]">
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
                            {isWriting ? (
                                <button
                                    onClick={() => setIsWriting(false)}
                                    className={`${colors.reviewsstar.buttonborder} ${colors.reviewsstar.text} px-[20px] py-[14px] rounded-[10px] font-kufam font-semibold border-[2px] text-[#334155] text-[20px] max-sm:mt-4 cursor-pointer`}
                                >
                                    Cancel Review
                                </button>
                            ) : (
                                <button
                                    onClick={() => setIsWriting(true)}
                                    className={`${colors.reviewsstar.buttonborder} ${colors.reviewsstar.text} px-[20px] py-[14px] rounded-[10px] font-kufam font-semibold border-[2px] text-[#334155] text-[20px] max-sm:mt-4 cursor-pointer`}
                                >
                                    Write Review
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Write Review Form */}
                    {isWriting && (
                        <div className="mt-6 border-t border-[#A9B2B9] pt-6">
                            <form onSubmit={onSubmit} className="space-y-4">
                                {/* rating selector */}
                                <div className="flex items-center gap-3">
                                    <span className="font-semibold">Your rating:</span>
                                    <div className='flex flex-row'>
                                        {[1,2,3,4,5].map(i => (
                                            <button
                                                type="button"
                                                key={i}
                                                onMouseEnter={() => setHoverRating(i)}
                                                onMouseLeave={() => setHoverRating(0)}
                                                onClick={() => setRating(i)}
                                                className="px-1"
                                            >
                                                <Star filled={i <= (hoverRating || rating)} />
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold">Title</label>
                                    <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Enter Review Title" className="w-full p-3 rounded-md outline-none bg-transparent border border-gray-400" />
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Content</label>
                                    <textarea value={content} onChange={e=>setContent(e.target.value)} placeholder="Enter Review Content" rows={5} className="w-full p-3 rounded-md outline-none bg-transparent border border-gray-400" />
                                </div>
                                <div>
                                    <label className="block mb-1 font-semibold">Upload Images/Video (Optional)</label>
                                    <input type="file" accept="image/*,video/*" multiple onChange={e=>setFiles(e.target.files)} className="w-full" />
                                </div>
                                <div className="pt-2">
                                    <button disabled={submitting} type="submit" className="bg-[#B5904F] text-white px-6 py-3 rounded-md font-semibold disabled:opacity-60">
                                        {submitting ? 'Submitting...' : 'Submit Review'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
        {/* Success Modal */}
        {showSuccess && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div className="absolute inset-0 bg-black/40" onClick={() => setShowSuccess(false)} />
                <div className={`${colors.reviewsstar.background} ${colors.reviewsstar.border} relative z-10 w-full max-w-md rounded-[12px] border-2 p-6 shadow-xl`}>
                    <div className="text-center space-y-3">
                        <div className="text-2xl font-semibold">Review submitted</div>
                        <div className={`${colors.reviewsstar.text}`}>Thank you for your feedback!</div>
                        <button
                            onClick={() => setShowSuccess(false)}
                            className="mt-2 bg-[#B5904F] text-white px-5 py-2 rounded-md font-semibold"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        )}
        </>
    )
}

export default ReviewsStar
