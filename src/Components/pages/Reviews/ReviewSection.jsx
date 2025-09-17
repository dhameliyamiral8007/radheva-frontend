// src/components/reviews/ReviewsSection.jsx
import React from "react";
import ReviewsStar from "./ReviewsStar";
import TrustedReviews from "./TrustedReviews";

const ReviewsSection = ({ showSummary = true, showList = true }) => {
  return (
    <div className="w-full space-y-8">
      {showSummary && <ReviewsStar />}
      {showList && <TrustedReviews />}
    </div>
  );
};

export default ReviewsSection;
