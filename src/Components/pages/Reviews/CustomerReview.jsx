import React, { useState } from 'react'
import { useTheme } from '../../config/hooks/useTheme'
import contactUs from "../../../assets/footer/contactUs.svg";
import ReviewsSection from './ReviewSection';
import rings from "../../../assets/about/rings.svg"

const reviews = [
  {
    id: 1,
    name: "Daenerys Targaryen",
    rating: 4,
    date: "26-10-2025",
    title: "The Most Beautiful Engagement Ring Ever!",
    text: "I'm beyond thrilled with my purchase! The craftsmanship is flawless, the diamond sparkles from every angle, and the design is exactly what I dreamed of. My fiancé hasn't stopped smiling since the proposal. Thank you for making our special moment even more magical.",
    product: "Celestial Glow Round-Cut Diamond Necklace",
    image: rings,
    reply:
      "They're written to sound authentic, varied in tone, and reflect different buying experiences — perfect for website testimonials or product review sections.",
  },
  {
    id: 2,
    name: "Daenerys Targaryen",
    rating: 4,
    date: "26-10-2025",
    title: "The Most Beautiful Engagement Ring Ever!",
    text: "I'm beyond thrilled with my purchase! The craftsmanship is flawless, the diamond sparkles from every angle, and the design is exactly what I dreamed of. My fiancé hasn't stopped smiling since the proposal. Thank you for making our special moment even more magical.",
    product: "Celestial Glow Round-Cut Diamond Necklace",
    image: rings,
  },
  {
    id: 3,
    name: "Daenerys Targaryen",
    rating: 3,
    date: "26-10-2025",
    title: "The Most Beautiful Engagement Ring Ever!",
    text: "I'm beyond thrilled with my purchase! The craftsmanship is flawless, the diamond sparkles from every angle, and the design is exactly what I dreamed of. My fiancé hasn't stopped smiling since the proposal. Thank you for making our special moment even more magical.",
    product: "Celestial Glow Round-Cut Diamond Necklace",
    image: rings,
  },
  {
    id: 4,
    name: "Daenerys Targaryen",
    rating: 4,
    date: "26-10-2025",
    title: "The Most Beautiful Engagement Ring Ever!",
    text: "I'm beyond thrilled with my purchase! The craftsmanship is flawless, the diamond sparkles from every angle, and the design is exactly what I dreamed of. My fiancé hasn't stopped smiling since the proposal. Thank you for making our special moment even more magical.",
    product: "Celestial Glow Round-Cut Diamond Necklace",
    image: rings,
    reply:
      "They're written to sound authentic, varied in tone, and reflect different buying experiences — perfect for website testimonials or product review sections.",
  },
];

const CustomerReview = () => {
  const { colors, theme } = useTheme()

  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2; // 👈 change how many reviews per page

  // Pagination logic
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
      {/* Hero Section */}
      <div className="relative h-[500px]">
        <img
          src={contactUs}
          alt="Contact Banner"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute" /> */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center lg:top-[220px] md:top-[250px] xl:mx-24 lg:mx-5 md:mx-10 mx-4">
          <h2 className="text-[30px] text-white font-semibold md:text-[40px] font-kufam tracking-[0px] leading-100%">
            Customers Review
          </h2>
          <p className="max-w-[1532px] text-white font-kufam font-normal text-[20px] tracking-[0px] leading-100% max-sm:px-4">
            From heartfelt proposals to timeless anniversary gifts, our creations have been part of life's most treasured moments. Here, our valued customers share their genuine experiences, celebrating not just the sparkle of our diamonds, but the care, craftsmanship, and trust that make each piece truly unforgettable.
          </p>
        </div>
      </div>

      <div className="">
        <ReviewsSection showSummary={true} showList={false} />
      </div>
      {/* ${theme === "dark" ? "bg-white text-black" : "bg-[#1d1d1d] text-white"} */}
      <div className={`max-w-[1532px] grid grid-cols-1 xl:mx-24 md:mx-10 mx-4`}>
        {reviews.map((review) => (
          <div key={review.id} className="grid gap-[12px]">
            <div className="flex justify-between items-start">
              <div>
                <h4 className={`${colors.reviewsstar.reviewstext} font-semibold text-[18px] font-kufam tracking-[0px] leading-100%`}>{review.name}</h4>
                <div className="flex text-[#C79954] text-[24px] gap-[8px] tracking-[0px] leading-100%">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className=''>{i < review.rating ? "★" : "☆"}</span>
                  ))}
                </div>
              </div>
              <p className={`${colors.reviewsstar.datetext} text-[18px] font-normal font-kufam  tracking-[0px] leading-100%`}>{review.date}</p>
            </div>
            <span className={`${colors.reviewsstar.text} font-semibold text-[22px] font-kufam tracking-[0px] leading-100%`}>{review.title}</span>
            <p className={`${colors.reviewsstar.replaytext} font-normal text-[18px] font-kufam tracking-[0px] leading-100%`}>{review.text}</p>

            {review.reply && (
              <div className={`py-[20px] px-[30px] flex gap-[10px] flex-col rounded-[10px] ${theme === "dark" ? "bg-white" : "bg-[#292929] border-2"}`}>
                <span className="font-semibold text-[#C79954] font-kufam text-[18px] tracking-[0px] leading-100%">Radheva's Reply</span>
                <p className={`${colors.reviewsstar.replaytext}  text-[18px] font-normal font-kufam tracking-[0px] leading-100%`}>{review.reply}</p>
              </div>
            )}
            <div>
              <span className="text-[#EEF1F3] tracking-[0px] font-normal font-kufam text-[18px] leading-100%">Celestial Glow Round-Cut Diamond Necklace</span>
            </div>
            <div className="flex gap-[12px] flex-col">
              {review.image && (
                <img
                  src={review.image}
                  alt={review.product}
                  className="w-[160px] h-[120px] object-cover"
                />
              )}
              <p className="text-[18px] text-[#EEF1F3] font-normal font-kufam tracking-[0px] leading-100%">{review.product}</p>
            </div>
            <div className="w-full border-b-[2px] border-[#A9B2B9] mb-4" />
          </div>

        ))}

      </div>

      <div className="flex justify-center items-center gap-2 py-10">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md disabled:opacity-40 ${theme === "dark" ? "text-black" : "text-white"}`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          if (
            page === 1 ||
            page === totalPages ||
            (page >= currentPage - 1 && page <= currentPage + 1)
          ) {
            return (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-[16.2px] py-[10px] rounded-[10px] cursor-pointer font-kufam ${page === currentPage
                  ? "bg-gray-700 text-white"
                  : "hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
              >
                {page}
              </button>
            );
          } else if (page === currentPage - 2 || page === currentPage + 2) {
            return <span key={page}>...</span>
          }
          return null;
        })}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md text-gray-600 disabled:opacity-40  ${theme === "dark" ? "text-black" : "text-white"}`}
        >
          Next
        </button>
      </div>
    </div>
  )
}

export default CustomerReview
