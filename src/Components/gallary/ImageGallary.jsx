import React, { useEffect } from "react";
// wishlist add handled via context's addToWishlist; avoid double-calling service here
import { addToCartService } from "../redux/service/CartService";
import { fetchProductByIdService } from "../redux/service/ProductService";
import { useWishlist } from "../context/WishListProvider";
import { useTheme } from "../config/hooks/useTheme";
import { FcLike } from "react-icons/fc";
import { IoEyeSharp, IoHeartOutline } from "react-icons/io5";
import AOS from "aos";
import "aos/dist/aos.css";

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  label: i % 2 === 0 ? "BEST SELLER" : "MORE COLOR",
  name: "Luxury Love Band (placeholder)",
  price: "₹1,49,000.00",
  oldPrice: "₹1,89,000.00",
  image: "https://via.placeholder.com/300x400?text=Product+Image",
}));

export default function ImageGallary({ gallery = products, isFilterd ,onProductClick }) {

  console.log("gallery",gallery)
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist?.() || { wishlist: [], addToWishlist: async () => {}, removeFromWishlist: async () => {} };
  const wishlistProductIdSet = new Set((wishlist || []).map((w) => (w?.productId?._id) || (w?._id) || (w?.id)));
  const [addingToCart, setAddingToCart] = React.useState(null); // Track which product is being added

  // Initialize AOS once for product grid animations
  useEffect(() => {
    try {
      AOS.init({ offset: 120, duration: 800, easing: "ease", once: false, mirror: true });
      AOS.refresh();
    } catch {}
  }, []);
  const { theme } = useTheme()
  // Determine visible columns to stagger per-row nicely
  const [columns, setColumns] = React.useState(4);
  useEffect(() => {
    const calcCols = () => {
      const w = typeof window !== 'undefined' ? window.innerWidth : 1200;
      if (w >= 1024) return 4; // lg:grid-cols-4
      if (w >= 640) return 2;  // sm:grid-cols-2
      return 1;                // grid-cols-1
    };
    const apply = () => setColumns(calcCols());
    apply();
    window.addEventListener('resize', apply);
    return () => window.removeEventListener('resize', apply);
  }, []);

  return (
    <div className=" w-full text-white min-h-screen curser-pointer" >
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {gallery.map((p, index) => {
          const isCollection = Boolean(p.isCollectionCard);
          const spanClass = isCollection ? "col-span-2 row-span-2" : (index === 2 && !isFilterd ? "col-span-2 row-span-2" : "col-span-1 row-span-1");
          const mediaHeight = isCollection ? "h-245" : (index === 2 && !isFilterd ? "h-245" : "h-100");
          const productId = p.id || p._id;
          const isLoggedIn = Boolean(localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt'));
          const isInWishlist = wishlistProductIdSet.has(productId);

          return (
          <div
            key={productId}
            onClick={() => onProductClick(p)}
            data-aos="fade-up"
            data-aos-delay={(index % columns) * 180}
            className={`${spanClass} group relative rounded-lg overflow-hidden`}
          >
            {/* Tag */}
            {(index !== 2 || isFilterd) && !isCollection && (
              <span className="absolute top-2 left-2 bg-neutral-100 text-black text-xs font-semibold px-2 py-1 ">
                {p.label}
              </span>
            )}

            <div
              className={`rounded-lg ${mediaHeight} flex items-center justify-center`}
            >
              <img className="h-full w-full object-cover" src={p.image} />

              {/* Hover controls for product cards only */}
              {!isCollection && (
                <div className="absolute inset-0 pointer-events-none group-hover:bg-black/10 transition">
                  {/* top-right icons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition pointer-events-auto">
                    <button
                      aria-label="Add to wishlist"
                      onClick={async (e) => {
                        e.stopPropagation();
                        // Require auth
                        const token = localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt');
                        if (!token) {
                          window.location.href = '/login';
                          return;
                        }
                        try {
                          if (isInWishlist) {
                            // find wishlist entry id and remove
                            const entry = (wishlist || []).find((w) => (w?.productId?._id) === productId || (w?._id) === productId || (w?.id) === productId);
                            if (entry?._id) {
                              await removeFromWishlist(entry._id);
                            }
                          } else {
                            // fetch product to derive default variant ids and add
                            const res = await fetchProductByIdService(productId);
                            const prod = res?.Data;
                            const metal = (prod?.metals || [])[0];
                            const color = (metal?.colors || [])[0];
                            const diamond = (prod?.diamonds || [])[0];
                            const size = (diamond?.sizes || [])[0];
                            await addToWishlist({
                              productId: prod?._id || productId,
                              metalId: metal?._id || null,
                              colorId: color?._id || null,
                              diamondId: diamond?._id || null,
                              sizeId: size?._id || null,
                            });
                          }
                        } catch {}
                      }}
                      className="w-10 h-10 rounded-md bg-white/90 text-black flex items-center justify-center shadow"
                    >
                      {isLoggedIn && isInWishlist ? (
                        <FcLike className="text-2xl" />
                      ) : (
                        <IoHeartOutline className="text-2xl" />
                      )}
                    </button>
                    <button
                      aria-label="View details"
                      onClick={(e) => { e.stopPropagation(); onProductClick(p); }}
                      className="w-10 h-10 rounded-md bg-white/90 text-black flex items-center justify-center shadow"
                    >
                      <IoEyeSharp className="text-xl" />
                    </button>
                  </div>

                  {/* bottom add to cart */}
                  <div className="absolute left-0 right-0 bottom-0 opacity-0 group-hover:opacity-100 transition pointer-events-auto">
                    <button
                      onClick={async (e) => {
                        e.stopPropagation();
                        const productId = p.id || p._id;
                        try {
                          setAddingToCart(productId);
                          const res = await fetchProductByIdService(productId);
                          const prod = res?.Data;
                          const metal = (prod?.metals || [])[0];
                          const color = (metal?.colors || [])[0];
                          const diamond = (prod?.diamonds || [])[0];
                          const size = (diamond?.sizes || [])[0];
                          await addToCartService({
                            productId: prod?._id || productId,
                            metalId: metal?._id || null,
                            colorId: color?._id || null,
                            diamondId: diamond?._id || null,
                            sizeId: size?._id || null,
                          });
                          try { window.dispatchEvent(new CustomEvent('open-cart-popup')); } catch {}
                        } catch (err) {
                          console.error('Add to cart failed:', err);
                        } finally {
                          setAddingToCart(null);
                        }
                      }}
                      disabled={addingToCart === (p.id || p._id)}
                      className="w-full bg-white text-black py-3 font-semibold flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {addingToCart === (p.id || p._id) ? (
                        <>
                          <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Adding...</span>
                        </>
                      ) : (
                        "Add To Cart"
                      )}
                    </button>
                  </div>
                </div>
              )}

            {isCollection || (index === 2 && !isFilterd) ? (
                <div className="p-10 absolute bottom-0 w-full bg-gradient-to-t from-black/90 via-black/60  to-transparent">
                  <p
                    style={{ fontFamily: "Belleza" }}
                    className="text-[26px]  text-gray-300 text-center"
                  >
                    {p.name}
                  </p>

                   <div className="text-center flex gap-3 flex-row items-center w-full justify-center">
                    <button
                      style={{ fontFamily: "Belleza" }}
                      className="p-[6px 10px] text-center bg-neutral-100 text-black text-xs  font-semibold px-2 py-1 cursor-pointer"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onProductClick(p);
                      }}
                    >
                      {p.label}
                    </button>
                  </div>
                </div>
              ) : null}
            </div>

            {/* Info */}
            {(index !== 2 || isFilterd) && !isCollection && (
              <div className="p-4">
                <p className={`text-sm text-bold ${theme === "dark" ? "text-black" : "text-white"}`}>{p.name}</p>
                <div className="flex gap-2 mt-1 text-sm text-bold">
                  <span className="line-through text-[#94A3B8] text-bold">
                    {p.oldPrice}
                  </span>

                  <span className={`text-bold text-[#A9B2B9]`}>{p.price}</span>
                </div>
              </div>
            )}
          </div>
        );})}
      </div>
    </div>
  );
}
