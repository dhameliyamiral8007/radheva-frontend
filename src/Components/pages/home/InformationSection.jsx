import { useTheme } from "../../config/hooks/useTheme";
import gift from "../../../assets/about/gift.svg";
import diamond from "../../../assets/about/selectDiamond.svg";
import design from "../../../assets/about/ringDesign.svg";
import certified from "../../../assets/about/certified.svg";

const InformationSection = () => {
  const { theme } = useTheme();
  // Restore original order if you want
  const information = [
    { id: 1, title: "Gift Package", description: "We'll Choose The Perfect Gift Box For Your Present.", icon: gift },
    { id: 2, title: "Diamond Selection", description: "Our Consultants Will Help You To Choose The Right Size.", icon: diamond },
    { id: 3, title: "Design Your Ring", description: "Individual Engraving To Perpetuate The Deepest Feelings.", icon: design },
    { id: 4, title: "Certified Jewelry", description: "Certified Craftsmanship That Speaks For Itself.", icon: certified },
  ];
  return (
    <div className="xl:mx-24 md:mx-10 mx-4">
      <div className="xl:w-[1186px] w-auto mx-auto">
        <div className=" grid xl:gap-[50px] gap-[30px] grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 justify-items-center">
          {information.map((info, idx) => (
            <div
              key={info.id}
              data-aos="fade-left"
              data-aos-delay={idx * 200}
              className="xl:w-[259px] w-auto flex flex-col items-center text-center justify-center gap-[20px]"
            >
              <div>
                <img
                  src={info.icon}
                  alt={info.title}
                  className={`w-[100px] h-[100px] ${theme === "dark"
                      ? "filter invert brightness-1800"
                      : "filter brightness-1650"
                    }`}
                />
              </div>
              <div className="grid gap-[12px]">
                <h3 className="text-[26px] font-kufam tracking-normal leading-8">
                  {info.title}
                </h3>
                <p className={`text-[14px] leading-5 max-w-[259px] font-kufam ${theme === "dark" ? "text-[#94A3B8]" : "text-[#A9B2B9]"}`}>
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export default InformationSection