import About from "./About";
import Advertise from "./Advertise";
import CuratedRadiance from "./CuratedRadiance";
import FollowInstagram from "./FollowInstagram";
import HeritagePieces from "./HeritagePieces";
import Hero from "./Hero"
import InformationSection from "./InformationSection";
import JewelleryEveryMoment from "./JewelleryEveryMoment";
import TrustedReviews from "../Reviews/TrustedReviews";
import ReviewsSection from "../Reviews/ReviewSection";
import { useTheme } from "../../config/hooks/useTheme";
import underline from "../../../assets/about/underline.svg"

const index = () => {
    const { colors } = useTheme();
    return (
        <>
            <Hero />
            <About />
            {/* <JewelleryEveryMoment /> */}
            <CuratedRadiance />
            <Advertise />
            {/* <HeritagePieces /> */}
            <FollowInstagram />
            <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}>
                <div className="text-center py-8" >
                    <h2 className="text-[35px] font-belleza inline-block relative uppercase tracking-wide">
                        Trusted Reviews
                        <img src={underline} alt="underline" className="p-2 mx-auto" />
                    </h2>
                    <div className="pt-10 ">
                        <ReviewsSection showSummary={false} showList={true} />
                    </div>

                </div>
            </div>

        </>
    )
}
export default index;