import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaLinkedinIn,
  FaPinterestP,
} from "react-icons/fa";
import radheva from "../../../assets/Radhevalogo.svg";
import { useTheme } from "../../config/hooks/useTheme";
import { useDispatch, useSelector } from "react-redux";
import { submitSubscription, clearSubscribeState } from "../../redux/slice/Subscribe";
import { useEffect, useState } from "react";
import { fetchNavigationMenu } from "../../redux/slice/NavigationMenuSlice";
import { useNavigate } from "react-router-dom";
import { setProductFilter } from "../../redux/slice/ProductFilterSlice";

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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, success, error, message } = useSelector((state) => state.subscribe || {});
  const [email, setEmail] = useState("");
  const [footerNavigation, setFooterNavigation] = useState(null);
  const staticPageRoutes = {
    "privacy policy": "/privacy-policy",
    "terms and condition": "/terms-condition",
    "terms and conditions": "/terms-condition",
    "our policy": "/our-policy",
    "shipping policy": "/shipping-policy",
    "return policy": "/return-policy",
    "contact us": "/contactUs",
    "our story": "/our-story",
  };

  // Fetch footer navigation data
  useEffect(() => {
    const loadFooterNavigation = async () => {
      try {
        const result = await dispatch(fetchNavigationMenu('footer')).unwrap();
        if (result?.Data) {
          setFooterNavigation(result.Data);
        }
      } catch (err) {
        console.error("Failed to load footer navigation:", err);
        // Keep using static footerData as fallback
      }
    };
    loadFooterNavigation();
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setEmail("");
    }
    // Auto-clear only error after delay; success is cleared when modal closes
    if (error) {
      const t = setTimeout(() => dispatch(clearSubscribeState()), 2500);
      return () => clearTimeout(t);
    }
  }, [success, error, dispatch]);

  const getRouteForLabel = (label) => {
    if (!label) return null;
    const key = label.toLowerCase().trim();
    return staticPageRoutes[key] || null;
  };

  const goToProductListing = (navigationID = null, collectionID = null, collectionItemID = null) => {
    dispatch(
      setProductFilter({
        navigationID: navigationID || null,
        collectionID: collectionID || null,
        collectionItemID: collectionItemID || null,
      })
    );
    navigate("/products");
  };

  const handleCollectionClick = (navId, collection) => {
    if (!collection) return;
    const staticRoute = getRouteForLabel(collection.collectionname);
    if (staticRoute) {
      navigate(staticRoute);
      return;
    }
    if (navId && collection._id) {
      goToProductListing(navId, collection._id, null);
    }
  };

  const handleCollectionItemClick = (navId, collectionId, item) => {
    if (!item?._id) return;
    goToProductListing(navId, collectionId || null, item._id);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    dispatch(submitSubscription(email));
  };
  return (
    <div className={`${colors.footer.background} ${colors.footer.text}`}>
      {/* top */}
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 py-8 md:py-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 md:gap-4">
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
        {/* Dynamic Navigation Sections from API */}
        {footerNavigation && footerNavigation.length > 0 ? (
          footerNavigation.map((navItem) => (
            <div key={navItem._id} className="space-y-4">
              <h3 className="text-base md:text-lg font-semibold">
                {navItem.navigationname}
              </h3>
              {navItem.collections && navItem.collections.length > 0 ? (
                <div className="space-y-3">
                  {navItem.collections.map((collection) => (
                    <div key={collection._id} className="space-y-2">
                      {collection.collectionname && (
                        <button
                          type="button"
                          onClick={() => handleCollectionClick(navItem._id, collection)}
                          className="text-sm font-medium opacity-80 hover:opacity-100 text-left"
                        >
                          {collection.collectionname}
                        </button>
                      )}
                      {collection.items && collection.items.length > 0 && (
                        <ul className="text-xs md:text-sm space-y-1.5 opacity-90">
                          {collection.items.map((item) => (
                            <li key={item._id}>
                              <button
                                type="button"
                                onClick={() => handleCollectionItemClick(navItem._id, collection._id, item)}
                                className="hover:opacity-100 transition-opacity text-left w-full"
                              >
                                {item.itemname}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-4 text-xs md:text-sm opacity-70">No collections available</p>
              )}
            </div>
          ))
        ) : (
          <>
            {/* Fallback: Company */}
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
            {/* Fallback: Supports */}
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
          </>
        )}
        <div className="md:w-[300px] w-[250px]">
          <h3 className="text-base md:text-lg font-semibold">
            {footerData.newsletter.title}
          </h3>
          <form onSubmit={onSubmit} className="mt-4 flex items-center gap-2 bg-white/10 rounded-full p-1 pr-1.5">
            <input
              type="email"
              placeholder={footerData.newsletter.placeholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-white/70 text-white text-sm md:text-base px-4 py-2"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-[#C5AE87] text-black rounded-full px-4 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-60"
            >
              {loading ? 'Submitting...' : footerData.newsletter.buttonText}
            </button>
          </form>
          {success && (
            <p className="mt-2 text-xs text-green-300">Subscribed successfully.</p>
          )}
          {error && (
            <p className="mt-2 text-xs text-red-300">{String(error)}</p>
          )}
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

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-lg max-w-md w-full p-5 text-gray-800">
            <div className="flex items-start justify-between gap-4">
              <h4 className="text-lg font-semibold">Subscribed</h4>
              <button
                onClick={() => dispatch(clearSubscribeState())}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              {message || 'Thank you for subscribing!'}
            </p>
            <div className="mt-5 flex justify-end">
              <button
                onClick={() => dispatch(clearSubscribeState())}
                className="bg-[#C5AE87] text-black rounded-md px-4 py-2 text-sm font-medium hover:opacity-90"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Footer;
