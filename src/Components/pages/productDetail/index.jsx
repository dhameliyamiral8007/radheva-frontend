import React from 'react'
import ProductDetail from './ProductDetail'
import InformationSection from '../home/InformationSection'
import GlameUpWith from './GlameUpWith'
import YourRecentPicks from './YourRecentPicks'
import ReviewsStar from '../Reviews/ReviewsStar'
import TrustedReviews from '../Reviews/TrustedReviews'
import { useTheme } from '../../config/hooks/useTheme'
import GeneralQuestions from '../solitaires/GeneralQuestions'
import AskQuestion from './AskQuestion'
import underline from "../../../assets/about/underline.svg";
import ReviewsSection from '../Reviews/ReviewSection'

const ProductIndex = () => {
  const { colors } = useTheme();
  return (
    <div>
      <ProductDetail />
      <GlameUpWith />
      <YourRecentPicks />
      {/* <ReviewsStar /> */}
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
        <div className="text-center py-8">
          <h2 className="text-[35px] font-belleza inline-block relative uppercase tracking-wide">
            Trusted Reviews
            <img src={underline} alt="underline" className="p-2 mx-auto" />
          </h2>
          <ReviewsSection showSummary={true} showList={true} />
        </div>
      </div>
      <div
        className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
       >
        <div className="text-center py-5">
          <h2 className="text-[35px] font-belleza inline-block relative">
            Frequently Asked Questions
            <img src={underline} alt="underline" className="p-2" />
          </h2>
        </div>
        <GeneralQuestions />
      </div>

      <AskQuestion />
    </div>
  )
}

export default ProductIndex
