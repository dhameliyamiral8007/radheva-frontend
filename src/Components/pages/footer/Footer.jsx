import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import radheva from "../../../assets/Radhevalogo.svg";
import { useTheme } from "../../config/hooks/useTheme";

// Inline footer data so this component is fully self-contained
const footerData = {
  contact: {
    title: "Contact",
    items: [
      { type: "phone", label: "+91 9856324569", href: "tel:+919856324569" },
      {
        type: "email",
        label: "radhevajewels@gmail.com",
        href: "mailto:radhevajewels@gmail.com",
      },
      {
        type: "address",
        label:
          "GF-12, Royal Crown Plaza, Laxmi Road, Surat, Gujarat 395003, India",
        href: "https://maps.google.com/?q=Royal+Crown+Plaza,Surat",
      },
    ],
  },
  company: {
    title: "Company",
    links: [
      { label: "Our Story", href: "/our-story" },
      { label: "Contact Us", href: "/contactUs" },
      { label: "Ring Size Guide", href: "/ring-size-guide" },
    ],
  },
  supports: {
    title: "Supports",
    links: [
      { label: "Privacy Policy", href: "privacy-policy" },
      { label: "Terms and Conditions", href: "/terms-condition" },
      { label: "Returns Policy", href: "/return-policy" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Our Policy", href: "/our-policy" },
    ],
  },
  newsletter: {
    title: "Shine Smarter Get Updates",
    placeholder: "Email Address",
    buttonText: "Subscribe",
  },
  social: [
    { name: "instagram", href: "https://instagram.com/" },
    { name: "facebook", href: "https://facebook.com/" },
    { name: "youtube", href: "https://youtube.com/" },
    { name: "linkedin", href: "https://linkedin.com/" },
    { name: "pinterest", href: "https://pinterest.com/" },
  ],
  copyright: "© 2025 Radhevajewels.com",
};

const Footer = () => {
  const { colors } = useTheme();
  return (
    <div className={`${colors.footer.background} ${colors.footer.text}`}>
      {/* top */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-8 md:py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5  gap-6 md:gap-4">
        <div className="space-y-2">
          <img src={radheva} alt="Radheva" className="h-16 md:h-20" />
        </div>
        {/* contact */}
        <div className="space-y-4">
          <h3 className="text-base md:text-lg font-semibold">
            {footerData.contact.title}
          </h3>
          <ul className="text-xs md:text-sm space-y-2 opacity-90">
            {footerData.contact.items.map((item, idx) => (
              <li
                key={idx}
                className={item.type === "address" ? "leading-snug" : ""}
              >
                {item.type === "phone" && <span className="mr-2">📞</span>}
                {item.type === "email" && <span className="mr-2">✉️</span>}
                {item.type === "address" && <span className="mr-2">📍</span>}
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:underline"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Company */}
        <div>
          <h3 className="text-base md:text-lg font-semibold">
            {footerData.company.title}
          </h3>
          <ul className="mt-4 text-xs md:text-sm space-y-2 opacity-90">
            {footerData.company.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:opacity-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        {/* Supports */}
        <div>
          <h3 className="text-base md:text-lg font-semibold">
            {footerData.supports.title}
          </h3>
          <ul className="mt-4 text-xs md:text-sm space-y-2 opacity-90">
            {footerData.supports.links.map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:opacity-100">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-[300px] w-[250px]">
          <h3 className="text-base md:text-lg font-semibold">
            {footerData.newsletter.title}
          </h3>
          <form className="mt-4 flex items-center gap-2 bg-white/10 rounded-full p-1 pr-1.5">
            <input
              type="email"
              placeholder={footerData.newsletter.placeholder}
              className="w-full bg-transparent outline-none placeholder:text-white/70 text-white text-sm md:text-base px-4 py-2"
            />
            <button
              type="submit"
              className="bg-[#C5AE87] text-black rounded-full px-4 py-2 text-sm font-medium hover:opacity-90"
            >
              {footerData.newsletter.buttonText}
            </button>
          </form>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-white" />

      {/* Bottom bar */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs opacity-80">{footerData.copyright}</p>

        <div className="flex items-center gap-3">
          {footerData.social.map((s) => (
            <a
              key={s.name}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="h-8 w-8 inline-flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition"
            >
              {s.name === "instagram" && (
                <FaInstagram className="text-white text-sm" />
              )}
              {s.name === "facebook" && (
                <FaFacebookF className="text-white text-sm" />
              )}
              {s.name === "youtube" && (
                <FaYoutube className="text-white text-sm" />
              )}
              {s.name === "linkedin" && (
                <FaLinkedinIn className="text-white text-sm" />
              )}
              {s.name === "pinterest" && (
                <FaPinterestP className="text-white text-sm" />
              )}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
