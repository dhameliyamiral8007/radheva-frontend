import React, { useState } from "react";
import { useTheme } from "../../config/hooks/useTheme.jsx";
import underline from "../../../assets/about/underline.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";
import { useNavigate } from "react-router-dom";

// Dummy review data (can be fetched from API later)
const reviews = [
  {
    id: 1,
    name: "Daenerys Targaryen",
    date: "25/05/2025",
    rating: 4,
    title: "Unique designs that always stand out",
    text: "I was blown away when I opened my package. The craftsmanship and creativity are unlike anything I’ve ever owned. These pieces feel personal and timeless.",
  },
  {
    id: 2,
    name: "Lena Headey",
    date: "25/05/2025",
    rating: 5,
    title: "Absolutely in love with every piece.",
    text: "This jewelry has completely changed the way I accessorize. Each design is so unique that I feel like I’m wearing a piece of art, not just an ornament.",
  },
  {
    id: 3,
    name: "Kit Harington",
    date: "25/05/2025",
    rating: 4,
    title: "Creative jewelry with a personal touch.",
    text: "Each piece feels like it was designed just for me. It’s rare to find jewelry that’s this original and still so wearable.",
  },
  {
    id: 4,
    name: "Arya Stark",
    date: "25/05/2025",
    rating: 4,
    title: "Loved the detailing.",
    text: "The little details in each piece make it stand out. Really happy with my purchase.",
  },
  {
    id: 5,
    name: "Jon Snow",
    date: "25/05/2025",
    rating: 5,
    title: "Worth every penny.",
    text: "High quality and elegant. This is not ordinary jewelry, this is art.",
  },
  {
    id: 6,
    name: "Cersei Lannister",
    date: "25/05/2025",
    rating: 4,
    title: "Stylish and classy.",
    text: "Each piece feels unique, and I always get compliments when I wear them.",
  },
  {
    id: 7,
    name: "Tyrion Lannister",
    date: "25/05/2025",
    rating: 5,
    title: "Perfect gift idea.",
    text: "Got this as a gift for my sister and she absolutely loved it. Amazing work!",
  },
  {
    id: 8,
    name: "Brienne of Tarth",
    date: "25/05/2025",
    rating: 4,
    title: "Durable and elegant.",
    text: "I wear this almost daily and it still looks brand new. Very impressed.",
  },
];

// Star rating component
const Stars = ({ rating }) => {
  return (
    <div className="flex gap-1 text-[#C79954] text-[24px] h-[24px] text-center items-center mb-3">
      {Array(5)
        .fill(0)
        .map((_, i) => (
          <span key={i}>{i < rating ? "★" : "☆"}</span>
        ))}
    </div>
  );
};

const TrustedReviews = () => {
  const { colors } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 4;
  const navigate = useNavigate()

  // Calculate pagination
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Pagination function
  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };
  const handleAllReviews = () => {
    navigate("/all-review")
  }

  return (
    <div className={`${colors.secondPart.background} ${colors.secondPart.text} w-full`}>
      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 lg:grid-cols-2 gap-[20px]">
        {currentReviews.map((review) => (
          <div
            key={review.id}
            className="bg-[#FFFFFF] shadow p-[20px] flex flex-col gap-4"
          >
            {/* Header */}
            <div className="flex justify-between items-center">
              <h4 className="font-bold font-kufam leading-[100%] tracking-[0px] text-[18px] text-[#232C34]">
                {review.name}
              </h4>
              <span className="text-sm text-[#5E6A74] font-normal font-kufam leading-[100%] tracking-[0px]">
                {review.date}
              </span>
            </div>

            {/* Rating */}
            <Stars rating={review.rating} />

            {/* Title */}
            <span className="font-semibold text-[18px] tracking-[0px] leading-[100%] font-kufam text-[#232C34]">
              {review.title}
            </span>

            {/* Text */}
            <p className="text-[18px] text-[#5E6A74] font-normal font-kufam leading-[150%] tracking-[0px]">
              {review.text}
            </p>
          </div>
        ))}
      </div>

      {/* Pagination & footer */}
      <div className="flex flex-col-reverse md:flex-row justify-between md:justify-end items-end md:items-center gap-2 px-4 md:px-10 xl:px-24 mt-6">
        {/* Stars & Reviews */}
        <div className="flex justify-end items-center gap-2">
          <Stars rating={4} />
          <span className="text-sm font-kufam font-normal">6235 Reviews</span>
          <a onClick={handleAllReviews} className="text-[#D9D9D9] font-semibold underline cursor-pointer">
            See All Reviews
          </a>
        </div>

        {/* Pagination Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`rounded-full ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <img src={leftArrow} alt="leftArrow" className="w-[72px] h-[12px]" />
          </button>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`rounded-full ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <img src={rightArrow} alt="rightArrow" className="w-[72px] h-[12px]" />
          </button>
        </div>
      </div>
    </div>
  );

};

export default TrustedReviews;
