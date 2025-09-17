import { useTheme } from "../../config/hooks/useTheme";
import necklace from "../../../assets/necklaceHome.png";
import SolitairesRing from "./SolitairesRing";
import GeneralQuestions, { TitleGeneralQuestions } from "./GeneralQuestions";
import TrustedReviews from "../Reviews/TrustedReviews";
import underline from "../../../assets/about/underline.svg";
import ReviewsSection from "../Reviews/ReviewSection";

const SolitairesPage = () => {
  const { theme, colors } = useTheme();
  return (
    <div className={`${theme === "dark" ? " text-white" : "text-gray-900"} `}>
      <img src={necklace} alt="Necklace" className="w-full h-[500px] object-cover" />
      <div>
        <SolitairesRing />
      </div>

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
      <div>
        <TitleGeneralQuestions/>
        <GeneralQuestions/>
      </div>
    </div>
  )
};

export default SolitairesPage;


