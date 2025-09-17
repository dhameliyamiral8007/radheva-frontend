import React from 'react'
import Customize from './Customize'
import GeneralQuestions from '../solitaires/GeneralQuestions'
import Gallery from './Gallery'
import AboutCutomJweles from './AboutCutomJweles'
import TrustedReviews from '../Reviews/TrustedReviews'
import { useTheme } from '../../config/hooks/useTheme'
import underline from "../../../assets/about/underline.svg";
import ReviewsSection from '../Reviews/ReviewSection'

const CustomizeIndex = () => {
  const { colors } = useTheme();
  return (
    <div>
      <Customize />
      <Gallery />
      <AboutCutomJweles />
      {/* <ReviewsStar /> */}
      <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
        <div className="text-center py-8">
          <h2 className="text-[35px] font-belleza inline-block relative uppercase tracking-wide">
            Trusted Reviews
            <img src={underline} alt="underline" className="p-2 mx-auto" />
          </h2>
          <div className='py-10'>
            <ReviewsSection showSummary={false} showList={true} />
          </div>
        </div>
      </div>
      </div>
  )
}

export default CustomizeIndex
