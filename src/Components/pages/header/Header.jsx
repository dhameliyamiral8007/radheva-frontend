import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDarkMode, MdLightMode, MdOutlineDarkMode } from "react-icons/md";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import search from "../../../assets/search_black.svg";
import radheva from "../../../assets/Radhevalogo.svg";
import TopBar from "./TopBar.jsx";
import { useTheme } from "../../config/hooks/useTheme.jsx";
import navigation from "../../config/navigation.jsx";
import person from "../../../assets/person.png";
import Cart from "../../../assets/cart.png";
import wishList from "../../../assets/wishlist.png";
import CartPopup from "../cart/CartPopup.jsx";
import { useCart } from "../../context/CartProvider.jsx";
import ShopMenu from "../shop/Shop.jsx";
const Header = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const shopRef = useRef(null);
  const [shopMenu, setShopMenu] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme, colors } = useTheme();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(null);

  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();
  useEffect(() => {
    // Use centralized config; can be swapped with API later
    setMenuItems(navigation.map((n) => n.label));
  }, []);

  // close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopRef.current && !shopRef.current.contains(event.target)) {
        setIsShopOpen(false);
      }
    };
    if (isShopOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isShopOpen]);
  // cart
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };
  // simulate fetching shop menu from API; replace with real fetch later
  useEffect(() => {
    // Example shape expected from API
    const mockResponse = [
      {
        id: "rings",
        title: "RINGS",
        items: [
          "Solitaires",
          "Classics",
          "Promise",
          "Engagement",
          "Bands",
          "Cocktails",
          "Eternity",
          "Three Stone Triads",
        ],
      },
      { id: "earrings", title: "EARRINGS", items: ["Studs", "Drops", "Hoops"] },
      {
        id: "solitaires",
        title: "SOLITAIRES",
        items: ["Rings", "Pendants", "Earrings", "Necklaces"],
      },
      {
        id: "bracelets-bangles",
        title: "BRACELETS & BANGLES",
        items: ["Flexible", "Solitaire", "Solids"],
      },
    ];
    setShopMenu(mockResponse);
  }, []);
  return (
    <div className="sticky top-0 z-50 w-full">
      <TopBar />
     <div
  className={`${colors?.header?.background} px-4 md:px-6 lg:px-8 duration-500 relative `}
>
        <div className="w-full mx-auto flex items-center justify-between py-2">
          {/* Logo and Search Container */}
          <div className="flex items-center xl:gap-16 lg:gap-4 md:gap-10 gap-4">
            <img
              src={radheva}
              alt="radheva"
              className="h-10 w-24 md:h-15 md:w-32 mr-0"
            />
            <div
              className={` ${colors?.header?.searchborder} flex rounded-full px-3 py-2 w-40 xl:w-64 md:w-64 lg:w-48`}
            >
              <img
                src={search}
                alt="search"
                className={`h-5 w-5 mr-2 p-0 ${theme === "dark"
                  ? "filter invert brightness-1800"
                  : "filter brightness-1650"
                  }`}
              />
              <input
                type="text"
                placeholder="Search"
                className={`${colors?.header?.text} outline-none w-full text-sm`}
              />
            </div>
          </div>
          {/* Navigation + Icons */}
          <div
            className="flex items-center xl:gap-4 lg:gap-3 max-sm:ml-2 gap-4"
            ref={shopRef}
          >
            <nav className="hidden lg:flex gap-5 ml-2">
              {menuItems.map((item, idx) => {
                const itemConfig = navigation.find((n) => n.label === item);
                const isShop = itemConfig?.type === "mega";
                return (
                  <button
                    key={idx}
                    onClick={() => {
                      const isShop = itemConfig?.type === "mega";
                      if (isShop) {
                        // screen width check karo
                        if (window.innerWidth >= 1024) {
                          // Desktop → Mega menu
                          setIsShopOpen((prev) => !prev);
                        } else {
                          // Mobile → Accordion style
                          setIsShopOpen((prev) => !prev);
                        }
                        return;
                      }
                      if (itemConfig?.path) {
                        setIsShopOpen(false);
                        navigate(itemConfig.path);
                      }
                    }}
                    className={`${colors.header.text} hover:text-yellow-400 font-medium cursor-pointer`}
                  >
                    {item}
                  </button>

                );
              })}
              {/* {isShopOpen && <ShopMenu theme={theme} />} */}
            </nav>
            <div className="hidden md:flex items-center xl:gap-4 lg:gap-2 md:gap-4">
              <button className={`p-1 rounded-full`}>
                <img
                  src={person}
                  alt="auth"
                  className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
                />
              </button>

              {/* Wishlist Icon */}
              <button className={`p-1 rounded-full hover:bg-opacity-20 `} onClick={() => navigate("/wishlist")}
              >
                <img
                  src={wishList}
                  alt="wishlist"
                  className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
                />
              </button>

              {/* Cart Icon */}
              <div className="relative">
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                    setIsShopOpen(false);
                  }}
                >
                  <img
                    src={Cart}
                    alt="cart"
                    className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
                  />
                </button>

                {/* 🔴 Cart Notification Badge */}
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C79954] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>
            {/* Mobile menu toggle */}
            <button onClick={toggleTheme} className={`p-1 hover:bg-opacity-20`}>
              {theme === "dark" ? (
                <MdLightMode className="h-5 w-5 text-black" />
              ) : (
                <MdOutlineDarkMode className="h-5 w-5 text-white" />
              )}
            </button>
            <button
              className={`${colors?.header?.text} lg:hidden p-2`}
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiOutlineX className="h-6 w-6" />
              ) : (
                <HiOutlineMenu className="h-6 w-6" />
              )}
            </button>
          </div>

          {/* Mega dropdown for Shop (desktop only) */}
          {isShopOpen && (
            <div
              className={`hidden absolute lg:block left-0 top-full w-full ${theme === "dark"
                ? "bg-white shadow-gray-300"
                : "bg-neutral-800 shadow-black/30"
                }
              shadow-lg`}
            >
              {/* Mega dropdown for Shop (desktop only) */}
              {isShopOpen && window.innerWidth >= 1024 && (
                <ShopMenu theme={theme} data={shopMenu} isMobile={false} />
              )}
              {/* // <div
              //   className={`mx-auto w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-8 py-6`}
              //  >
              //   {shopMenu.map((group) => (
              //     <div key={group.id}>
              //       <h4
              //         className={`${theme === "dark"
              //           ? "text-black border-gray-600"
              //           : "text-white"
              //           } text-xs tracking-widest font-kufam border-t pt-2`}
              //       >
              //         {group.title}
              //       </h4>
              //       <ul
              //         className={`${theme === "dark" ? "text-black" : "text-white"
              //           } text-xs font-kufam space-y-2 mt-3`}
              //       >
              //         {group.items.map((label, idx) => (
              //           <li key={`${group.id}-${idx}`}>{label}</li>
              //         ))}
              //       </ul>
              //     </div>
              //   ))}
              // </div> */}
            </div>
          )}


        </div>
      </div>
      {/* Mobile menu panel */}
      <div
        className={`lg:hidden absolute ${theme === "dark" ? "bg-white" : "bg-neutral-900"
          } w-full shadow-md overflow-y-auto transition-all duration-700 ease-out origin-top ${isMobileMenuOpen
            ? "opacity-100 translate-y-0 max-h-[80vh]"
            : "opacity-0 -translate-y-2 max-h-0"
          }`}
        aria-hidden={!isMobileMenuOpen}
      >

        <div className={`px-4 ${isMobileMenuOpen ? "py-3" : "py-0"} space-y-3`}>
          {/* Search (mobile) */}
          <div
            className={` ${colors?.header?.searchborder} flex rounded-full px-3 py-2 w-full`}
          >
            <img
              src={search}
              alt="search"
              className={`h-5 w-5 mr-2 p-0 ${theme === "dark"
                ? "filter invert brightness-1800"
                : "filter brightness-1650"
                }`}
            />
            <input
              type="text"
              placeholder="Search"
              className={`${colors?.header?.text} outline-none w-full text-sm`}
            />
          </div>
          {/* Nav items */}
          <nav className="flex flex-col">
            {menuItems.map((item, idx) => {
              const itemConfig = navigation.find((n) => n.label === item);
              const isShop = itemConfig?.type === "mega";
              const isOpen = openMobileMenu === idx; // check specific open state

              return (
                <div key={`m-${idx}`}>
                  <button
                    onClick={() => {
                      if (isShop) {
                        setOpenMobileMenu(isOpen ? null : idx); // toggle only this item
                        return;
                      }
                      if (itemConfig?.path) {
                        setOpenMobileMenu(null);
                        setIsMobileMenuOpen(false);
                        navigate(itemConfig.path);
                      }
                    }}
                    className={`${colors.header.text} text-left py-2 w-full`}
                  >
                    {item}
                  </button>

                  {/* Mobile Shop Menu */}
                  {isShop && isOpen && (
                    <ShopMenu theme={theme} data={shopMenu} isMobile={true} />
                  )}
                </div>
              );
            })}
          </nav>


          {/* Icons row */}
          <div className="flex items-center space-x-5 md:hidden">
            <button className={`p-1 rounded-full`}>
              <img
                src="/src/assets/person.png"
                alt="auth"
                className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
              />
            </button>
            <button className={`p-1 rounded-full hover:bg-opacity-20`}>
              <img
                src="/src/assets/wishList.png"
                alt="wishlist"
                className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
              />
            </button>
            <button
              className={`p-1 rounded-full hover:bg-opacity-20`}
              onClick={() => {
                setIsCartOpen(true);
                setIsMobileMenuOpen(false);
                setIsShopOpen(false);
              }}
            >
              <img
                src="/src/assets/Cart.png"
                alt="cart"
                className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
              />
            </button>
          </div>
        </div>
      </div>
      {/* Global Cart Popup (available for both desktop and mobile) */}
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};
export default Header;
