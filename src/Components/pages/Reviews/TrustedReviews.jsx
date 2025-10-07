import React, { useEffect, useMemo, useState } from "react";
import { useTheme } from "../../config/hooks/useTheme.jsx";
import underline from "../../../assets/about/underline.svg";
import leftArrow from "../../../assets/about/leftArrow.svg";
import rightArrow from "../../../assets/about/rightArrow.svg";
import { useNavigate } from "react-router-dom";
import { apiInstance } from "../../../api/AxiosApi";

// Map API doc to UI shape
const mapApiDoc = (doc) => ({
  id: doc._id,
  name: doc.name,
  date: doc.reviewDate ? new Date(doc.reviewDate).toLocaleDateString() : "",
  rating: doc.rating || 0,
  title: doc.title,
  text: doc.review,
});

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
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const reviewsPerPage = 4;
  const navigate = useNavigate()

  // Fetch reviews
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await apiInstance.get('/client/review');
        const docs = Array.isArray(res?.data?.docs) ? res.data.docs.map(mapApiDoc) : [];
        if (mounted) setItems(docs);
      } catch (e) {
        if (mounted) setItems([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false };
  }, []);

  // Calculate pagination
  const indexOfLast = currentPage * reviewsPerPage;
  const indexOfFirst = indexOfLast - reviewsPerPage;
  const totalPages = Math.max(1, Math.ceil(items.length / reviewsPerPage));
  const currentReviews = useMemo(() => items.slice(indexOfFirst, indexOfLast), [items, indexOfFirst, indexOfLast]);

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
        {loading && (
          <div className="col-span-full text-center py-8 opacity-70">Loading reviews...</div>
        )}
        {!loading && currentReviews.map((review) => (
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
          <span className="text-sm font-kufam font-normal">{items.length} Reviews</span>
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
