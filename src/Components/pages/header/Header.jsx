// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { MdDarkMode, MdLightMode, MdOutlineDarkMode } from "react-icons/md";
// import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
// import search from "../../../assets/search_black.svg";
// import radheva from "../../../assets/Radhevalogo.svg";
// import TopBar from "./TopBar.jsx";
// import { useTheme } from "../../config/hooks/useTheme.jsx";
// import navigation from "../../config/navigation.jsx";
// import person from "../../../assets/person.png";
// import Cart from "../../../assets/cart.png";
// import wishList from "../../../assets/wishlist.png";
// import CartPopup from "../cart/CartPopup.jsx";
// import { useCart } from "../../context/CartProvider.jsx";
// import ShopMenu from "../shop/Shop.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchNavigationMenu } from "../../redux/slice/NavigationMenuSlice.jsx";

// const Header = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [isShopOpen, setIsShopOpen] = useState(false);
//   const shopRef = useRef(null);
//   const [shopMenu, setShopMenu] = useState([]);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const { theme, toggleTheme, colors } = useTheme();
//   const [isCartOpen, setIsCartOpen] = useState(false);
//   const [openMobileMenu, setOpenMobileMenu] = useState(null);

//   const { cartItems } = useCart();
//   const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
//   const navigate = useNavigate();

//   const dispatch = useDispatch();

//   // Safe Redux state access with proper error handling
//   const navigationState = useSelector((state) => state.navigationMenu || {});
//   const navigationData = navigationState?.data;
//   const loading = navigationState?.loading || false;
//   const error = navigationState?.error;

//   useEffect(() => {
//     dispatch(fetchNavigationMenu());
//   }, [dispatch]);

//   useEffect(() => {
//     // Use centralized config as fallback
//     setMenuItems(navigation.map((n) => n.label));
//   }, []);

//   useEffect(() => {
//     if (navigationData && navigationData.navigation) {
//       setMenuItems(navigationData.navigation.map((n) => n.navigationname));
//     }
//   }, [navigationData]);

//   // Error handling
//   useEffect(() => {
//     if (error) {
//       console.error('Failed to fetch navigation:', error);
//     }
//   }, [error]);

//   // Close on outside click
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (shopRef.current && !shopRef.current.contains(event.target)) {
//         setIsShopOpen(false);
//       }
//     };
//     if (isShopOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isShopOpen]);

//   // Mock shop menu data
//   // useEffect(() => {
//   //   const mockResponse = [
//   //     {
//   //       id: "rings",
//   //       title: "RINGS",
//   //       items: [
//   //         "Solitaires",
//   //         "Classics",
//   //         "Promise",
//   //         "Engagement",
//   //         "Bands",
//   //         "Cocktails",
//   //         "Eternity",
//   //         "Three Stone Triads",
//   //       ],
//   //     },
//   //     { id: "earrings", title: "EARRINGS", items: ["Studs", "Drops", "Hoops"] },
//   //     {
//   //       id: "solitaires",
//   //       title: "SOLITAIRES",
//   //       items: ["Rings", "Pendants", "Earrings", "Necklaces"],
//   //     },
//   //     {
//   //       id: "bracelets-bangles",
//   //       title: "BRACELETS & BANGLES",
//   //       items: ["Flexible", "Solitaire", "Solids"],
//   //     },
//   //   ];
//   //   setShopMenu(mockResponse);
//   // }, []);

//   return (
//     <div className="sticky top-0 z-50 w-full">
//       <TopBar />
//       <div
//         className={`${colors?.header?.background} px-4 md:px-6 lg:px-8 duration-500 relative `}
//       >
//         <div className="w-full mx-auto flex items-center justify-between py-2">
//           {/* Logo and Search Container */}
//           <div className="flex items-center xl:gap-16 lg:gap-4 md:gap-10 gap-4">
//             <img
//               src={radheva}
//               alt="radheva"
//               className="h-10 w-24 md:h-15 md:w-32 mr-0"
//             />
//             <div
//               className={` ${colors?.header?.searchborder} flex rounded-full px-3 py-2 w-40 xl:w-64 md:w-64 lg:w-48`}
//             >
//               <img
//                 src={search}
//                 alt="search"
//                 className={`h-5 w-5 mr-2 p-0 ${theme === "dark"
//                   ? "filter invert brightness-1800"
//                   : "filter brightness-1650"
//                   }`}
//               />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className={`${colors?.header?.text} outline-none w-full text-sm`}
//               />
//             </div>
//           </div>

//           {/* Navigation + Icons */}
//           <div
//             className="flex items-center xl:gap-4 lg:gap-3 max-sm:ml-2 gap-4"
//             ref={shopRef}
//           >
//             {/* Navigation Menu */}
//             {loading ? (
//               <div className="hidden lg:flex text-sm">Loading navigation...</div>
//             ) : (
//               <nav className="hidden lg:flex gap-5 ml-2">
//                 {menuItems.map((item, idx) => {
//                   const itemConfig = navigation.find((n) => n.label === item);
//                   const isShop = itemConfig?.type === "mega";
//                   return (
//                     <button
//                       key={idx}
//                       onClick={() => {
//                         if (isShop) {
//                           if (window.innerWidth >= 1024) {
//                             setIsShopOpen((prev) => !prev);
//                           } else {
//                             setIsShopOpen((prev) => !prev);
//                           }
//                           return;
//                         }
//                         if (itemConfig?.path) {
//                           setIsShopOpen(false);
//                           navigate(itemConfig.path);
//                         }
//                       }}
//                       className={`${colors.header.text} hover:text-yellow-400 font-medium cursor-pointer`}
//                     >
//                       {item}
//                     </button>
//                   );
//                 })}
//               </nav>
//             )}

//             {/* Icons Section */}
//             <div className="hidden md:flex items-center xl:gap-4 lg:gap-2 md:gap-4">
//               <button className={`p-1 rounded-full`}>
//                 <img
//                   src={person}
//                   alt="auth"
//                   className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
//                 />
//               </button>

//               <button className={`p-1 rounded-full hover:bg-opacity-20 `} onClick={() => navigate("/wishlist")}
//               >
//                 <img
//                   src={wishList}
//                   alt="wishlist"
//                   className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
//                 />
//               </button>

//               <div className="relative">
//                 <button
//                   onClick={() => {
//                     setIsCartOpen(true);
//                     setIsMobileMenuOpen(false);
//                     setIsShopOpen(false);
//                   }}
//                 >
//                   <img
//                     src={Cart}
//                     alt="cart"
//                     className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
//                   />
//                 </button>

//                 {cartCount > 0 && (
//                   <span className="absolute -top-2 -right-2 bg-[#C79954] text-white text-xs font-bold px-2 py-0.5 rounded-full">
//                     {cartCount}
//                   </span>
//                 )}
//               </div>
//             </div>

//             {/* Theme Toggle */}
//             <button onClick={toggleTheme} className={`p-1 hover:bg-opacity-20`}>
//               {theme === "dark" ? (
//                 <MdLightMode className="h-5 w-5 text-black" />
//               ) : (
//                 <MdOutlineDarkMode className="h-5 w-5 text-white" />
//               )}
//             </button>

//             {/* Mobile Menu Toggle */}
//             <button
//               className={`${colors?.header?.text} lg:hidden p-2`}
//               onClick={() => setIsMobileMenuOpen((prev) => !prev)}
//               aria-label="Toggle menu"
//             >
//               {isMobileMenuOpen ? (
//                 <HiOutlineX className="h-6 w-6" />
//               ) : (
//                 <HiOutlineMenu className="h-6 w-6" />
//               )}
//             </button>
//           </div>

//           {/* Mega dropdown for Shop (desktop only) */}
//           {isShopOpen && (
//             <div
//               className={`hidden absolute lg:block left-0 top-full w-full ${theme === "dark"
//                 ? "bg-white shadow-gray-300"
//                 : "bg-neutral-800 shadow-black/30"
//                 } shadow-lg`}
//             >
//               {isShopOpen && window.innerWidth >= 1024 && (
//                 <ShopMenu theme={theme} data={shopMenu} isMobile={false} />
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Mobile menu panel */}
//       <div
//         className={`lg:hidden absolute ${theme === "dark" ? "bg-white" : "bg-neutral-900"
//           } w-full shadow-md overflow-y-auto transition-all duration-700 ease-out origin-top ${isMobileMenuOpen
//             ? "opacity-100 translate-y-0 max-h-[80vh]"
//             : "opacity-0 -translate-y-2 max-h-0"
//           }`}
//         aria-hidden={!isMobileMenuOpen}
//       >
//         <div className={`px-4 ${isMobileMenuOpen ? "py-3" : "py-0"} space-y-3`}>
//           {/* Search (mobile) */}
//           <div
//             className={` ${colors?.header?.searchborder} flex rounded-full px-3 py-2 w-full`}
//           >
//             <img
//               src={search}
//               alt="search"
//               className={`h-5 w-5 mr-2 p-0 ${theme === "dark"
//                 ? "filter invert brightness-1800"
//                 : "filter brightness-1650"
//                 }`}
//             />
//             <input
//               type="text"
//               placeholder="Search"
//               className={`${colors?.header?.text} outline-none w-full text-sm`}
//             />
//           </div>

//           {/* Nav items */}
//           {loading ? (
//             <div className="text-sm py-2">Loading navigation...</div>
//           ) : (
//             <nav className="flex flex-col">
//               {menuItems.map((item, idx) => {
//                 const itemConfig = navigation.find((n) => n.label === item);
//                 const isShop = itemConfig?.type === "mega";
//                 const isOpen = openMobileMenu === idx;

//                 return (
//                   <div key={`m-${idx}`}>
//                     <button
//                       onClick={() => {
//                         if (isShop) {
//                           setOpenMobileMenu(isOpen ? null : idx);
//                           return;
//                         }
//                         if (itemConfig?.path) {
//                           setOpenMobileMenu(null);
//                           setIsMobileMenuOpen(false);
//                           navigate(itemConfig.path);
//                         }
//                       }}
//                       className={`${colors.header.text} text-left py-2 w-full`}
//                     >
//                       {item}
//                     </button>

//                     {isShop && isOpen && (
//                       <ShopMenu theme={theme} data={shopMenu} isMobile={true} />
//                     )}
//                   </div>
//                 );
//               })}
//             </nav>
//           )}

//           {/* Icons row */}
//           <div className="flex items-center space-x-5 md:hidden">
//             <button className={`p-1 rounded-full`}>
//               <img
//                 src={person}
//                 alt="auth"
//                 className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
//               />
//             </button>
//             <button className={`p-1 rounded-full hover:bg-opacity-20`}>
//               <img
//                 src={wishList}
//                 alt="wishlist"
//                 className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
//               />
//             </button>
//             <button
//               className={`p-1 rounded-full hover:bg-opacity-20`}
//               onClick={() => {
//                 setIsCartOpen(true);
//                 setIsMobileMenuOpen(false);
//                 setIsShopOpen(false);
//               }}
//             >
//               <img
//                 src={Cart}
//                 alt="cart"
//                 className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
//               />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Global Cart Popup */}
//       <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
//     </div>
//   );
// };

// export default Header;


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
import { useDispatch, useSelector } from "react-redux";
import { fetchNavigationMenu } from "../../redux/slice/NavigationMenuSlice.jsx";

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

  const dispatch = useDispatch();

  const [navigationData, setNavigationData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch data directly and manage state locally
  useEffect(() => {
    const loadNavigationData = async () => {
      setLoading(true);
      setError(null);
      try {
        // console.log("Loading navigation data...");
        const result = await dispatch(fetchNavigationMenu()).unwrap();
        // console.log("✅ Navigation data loaded:", result);
        setNavigationData(result);

        // Process the data immediately
        if (result?.Data) {
          const navItems = result.Data.map((item) => item.navigationname);
          setMenuItems(navItems);

          // Extract shop data
          const shopData = result.Data.find(item =>
            item.navigationname && item.navigationname.toLowerCase() === "shop"
          );

          if (shopData?.collections?.length > 0) {
            const transformedShopMenu = shopData.collections.map(collection => ({
              id: collection._id,
              title: collection.collectionname.toUpperCase(),
              items: collection.items.map(item => item.itemname)
            }));
            // console.log("🛍️ Shop menu created:", transformedShopMenu);
            setShopMenu(transformedShopMenu);
          }
        }
      } catch (err) {
        console.error("❌ Failed to load navigation:", err);
        setError(err.message);
        // Use fallback data
        setMenuItems(navigation.map((n) => n.label));
      } finally {
        setLoading(false);
      }
    };

    loadNavigationData();
  }, [dispatch]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (shopRef.current && !shopRef.current.contains(event.target)) {
        setIsShopOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleShopClick = () => {
    // console.log("🖱️ Shop clicked", { 
    //   isShopOpen, 
    //   shopMenuLength: shopMenu.length,
    //   shopMenuData: shopMenu 
    // });

    if (shopMenu.length > 0) {
      setIsShopOpen(prev => !prev);
    } else {
      console.warn("⚠️ No shop data available");
    }
    setOpenMobileMenu(null);
    setIsMobileMenuOpen(false);
  };

  const handleNavigationClick = (item, idx) => {
    // Normalize the item name for comparison
    const normalizedItem = item.toLowerCase().trim();
    const isShop = normalizedItem === "shop";

    // console.log(`📍 Navigation clicked: "${item}"`, { 
    //   isShop, 
    //   hasShopData: shopMenu.length > 0,
    //   normalizedItem 
    // });

    if (isShop) {
      if (window.innerWidth >= 1024) {
        handleShopClick();
      } else {
        setOpenMobileMenu(openMobileMenu === idx ? null : idx);
      }
      return;
    }

    // Direct route mapping based on your App.jsx routes
    const routeMap = {
      'home': '/',
      'blogs': '/blogs',
      'book appointment': '/book-apoinment',
      'book appoinment': '/book-apoinment',
      'solitaires': '/solitaires',
      'customize': '/customize'
    };

    const route = routeMap[normalizedItem];

    if (route) {
      // console.log(`🚀 Navigating to: ${route}`);
      setIsShopOpen(false);
      setOpenMobileMenu(null);
      setIsMobileMenuOpen(false);
      navigate(route);
    } else {
      console.warn(`❌ No route found for: "${item}"`);
      // console.log("Available routes:", routeMap);
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full" ref={shopRef}>
      <TopBar />
      <div
        className={`${colors?.header?.background} px-4 md:px-6 lg:px-8 duration-500 relative`}
      >
        <div className="w-full mx-auto flex items-center justify-between py-2">
          {/* Logo and Search Container */}
          <div className="flex items-center xl:gap-16 lg:gap-4 md:gap-10 gap-4">
            <img
              src={radheva}
              alt="radheva"
              className="h-10 w-24 md:h-15 md:w-32 mr-0 cursor-pointer"
              onClick={() => navigate('/')}
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
          <div className="flex items-center xl:gap-4 lg:gap-3 max-sm:ml-2 gap-4">
            {/* Navigation Menu */}
            {loading ? (
              <div className="hidden lg:flex text-sm">Loading navigation...</div>
            ) : error ? (
              <div className="hidden lg:flex text-sm text-red-500">Error loading navigation</div>
            ) : (
              <nav className="hidden lg:flex gap-5 ml-2">
                {menuItems.map((item, idx) => {
                  const isShop = item.toLowerCase() === "shop";

                  return (
                    <button
                      key={`nav-${idx}-${item}`}
                      onClick={() => handleNavigationClick(item, idx)}
                      className={`${colors.header.text} hover:text-yellow-400 font-medium cursor-pointer relative ${isShop && isShopOpen ? 'text-yellow-400' : ''
                        }`}
                    >
                      {item}
                      {isShop && isShopOpen && (
                        <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"></span>
                      )}
                    </button>
                  );
                })}
              </nav>
            )}

            {/* Icons Section */}
            <div className="hidden md:flex items-center xl:gap-4 lg:gap-2 md:gap-4">
              <button className={`p-1 rounded-full`}>
                <img
                  src={person}
                  alt="auth"
                  className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
                />
              </button>

              <button
                className={`p-1 rounded-full hover:bg-opacity-20`}
                onClick={() => navigate("/wishlist")}
              >
                <img
                  src={wishList}
                  alt="wishlist"
                  className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
                />
              </button>

              <div className="relative">
                <button
                  onClick={() => {
                    setIsCartOpen(true);
                    setIsMobileMenuOpen(false);
                    setIsShopOpen(false);
                    setOpenMobileMenu(null);
                  }}
                >
                  <img
                    src={Cart}
                    alt="cart"
                    className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
                  />
                </button>

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-[#C79954] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </div>

            {/* Theme Toggle */}
            <button onClick={toggleTheme} className={`p-1 hover:bg-opacity-20`}>
              {theme === "dark" ? (
                <MdLightMode className="h-5 w-5 text-black" />
              ) : (
                <MdOutlineDarkMode className="h-5 w-5 text-white" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
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
        </div>

        {/* Mega dropdown for Shop */}
        {isShopOpen && shopMenu.length > 0 && (
          <div className="absolute top-full left-0 right-0 z-40">
            <ShopMenu theme={theme} data={shopMenu} isMobile={false} />
          </div>
        )}

        {/* Debug info */}
        {isShopOpen && shopMenu.length === 0 && (
          <div className={`absolute top-full left-0 right-0 z-40 p-4 text-center ${theme === 'dark' ? 'bg-yellow-100 text-yellow-800' : 'bg-yellow-800 text-yellow-100'
            }`}>
            No shop categories available. Loaded {menuItems.length} menu items.
          </div>
        )}
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 z-40 ${theme === "dark" ? "bg-white" : "bg-neutral-900"
          } w-full shadow-md overflow-y-auto transition-all duration-300 ease-out ${isMobileMenuOpen
            ? "opacity-100 translate-y-0 max-h-[80vh]"
            : "opacity-0 -translate-y-2 max-h-0 pointer-events-none"
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
          {loading ? (
            <div className="text-sm py-2">Loading navigation...</div>
          ) : (
            <nav className="flex flex-col">
              {menuItems.map((item, idx) => {
                const isShop = item.toLowerCase() === "shop";
                const isOpen = openMobileMenu === idx;

                return (
                  <div key={`m-${idx}`}>
                    <button
                      onClick={() => handleNavigationClick(item, idx)}
                      className={`${colors.header.text} text-left py-2 w-full flex justify-between items-center ${isShop && isOpen ? 'text-yellow-400' : ''
                        }`}
                    >
                      {item}
                      {isShop && (
                        <span className={`transform transition-transform ${isOpen ? 'rotate-180' : ''
                          }`}>▼</span>
                      )}
                    </button>

                    {/* Mobile Shop Menu */}
                    {isShop && isOpen && shopMenu.length > 0 && (
                      <div className="ml-4 border-l-2 border-gray-400 pl-4 my-2">
                        <ShopMenu theme={theme} data={shopMenu} isMobile={true} />
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}

          {/* Icons row */}
          <div className="flex items-center space-x-5 md:hidden pt-4 border-t border-gray-400">
            <button className={`p-1 rounded-full`}>
              <img
                src={person}
                alt="auth"
                className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
              />
            </button>
            <button className={`p-1 rounded-full hover:bg-opacity-20`}>
              <img
                src={wishList}
                alt="wishlist"
                className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
              />
            </button>
            <button
              className={`p-1 rounded-full hover:bg-opacity-20 relative`}
              onClick={() => {
                setIsCartOpen(true);
                setIsMobileMenuOpen(false);
                setIsShopOpen(false);
                setOpenMobileMenu(null);
              }}
            >
              <img
                src={Cart}
                alt="cart"
                className={`h-5 w-5 ${theme === "dark" ? "invert" : ""}`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C79954] text-white text-xs font-bold px-1 rounded-full min-w-[16px] h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Global Cart Popup */}
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Header;