import React from 'react'
import { useTheme } from '../../config/hooks/useTheme'
import underline from "../../../assets/about/underline.svg";

const AboutCustomJewels = () => {
  const { colors, theme } = useTheme();
  return (
    <div className={`${colors.firstPart.background} ${colors.firstPart.text} w-full py-14`}>
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-[28px] md:text-[35px] font-belleza uppercase tracking-wide">
          Why To Buy Custom Jewelry?
        </h2>
        <img src={underline} alt="underline" className="mx-auto mt-3" />
      </div>

      {/* Paragraph Section */}
      <div className="text-center xl:mx-24 md:mx-10 mx-4 space-y-6">
        <p className={`font-nunito leading-relaxed text-sm md:text-base ${theme === "dark" ? "text-[#64748B]" : "text-[#D9D9D9]"}`}>
          The custom engagement rings has more sentiments and attachments then the premade rings,
          which are specially made only for you, so it’s like one of a kind. Radheva Jewels allows
          users to get their dream engagement ring by allowing 100% customization and design your own
          engagement ring your way. Viewers can submit the details on the form above, including the
          reference or inspiration images, and we can make the same design for you. We can custom
          made engagement rings in any shape, size, and color of lab grown diamonds, moissanite, or
          other gemstones. For custom orders Radheva Jewels specializes in lab grown diamond engagement
          rings, moissanite engagement rings, stud earrings, moissanite wedding bands, bracelets and
          many more. If you have questions or would like an expert opinion feel free to schedule a
          virtual appointment with us.
        </p>

        <p className={`font-nunito leading-relaxed text-sm md:text-base ${theme === "dark" ? "text-[#64748B]" : "text-[#D9D9D9]"}`}>
          Customized Diamond Rings are specially made by experienced craftsmen, with perfection and
          high quality finishing. Design your own rings with Radheva Jewels and get one of a kind ring
          which will be made by you for you and your loved ones. Not only makes custom engagement rings
          but we also make custom moissanite earrings which are very useful for gifting purposes.
        </p>
      </div>
    </div>
  )
}

export default AboutCustomJewels
