import React from "react";
// wishlist add handled via context's addToWishlist; avoid double-calling service here
import { addToCartService } from "../redux/service/CartService";
import { fetchProductByIdService } from "../redux/service/ProductService";
import { useWishlist } from "../context/WishListProvider";
import { FcLike } from "react-icons/fc";
import { IoEyeSharp, IoHeartOutline } from "react-icons/io5";

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
  const { wishlist, addToWishlist } = useWishlist?.() || { wishlist: [], addToWishlist: async () => {} };
  const wishlistProductIdSet = new Set((wishlist || []).map((w) => (w?.productId?._id) || (w?._id) || (w?.id)));

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
            className={`${spanClass} group relative bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden`}
          >
            {/* Tag */}
            {(index !== 2 || isFilterd) && !isCollection && (
              <span className="absolute top-2 left-2 bg-neutral-100 text-black text-xs font-semibold px-2 py-1 ">
                {p.label}
              </span>
            )}

            <div
              className={`bg-neutral-700 rounded-lg ${mediaHeight} flex items-center justify-center`}
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
                          // fetch product to derive default variant ids
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
                        try {
                          const res = await fetchProductByIdService(p.id || p._id);
                          const prod = res?.Data;
                          const metal = (prod?.metals || [])[0];
                          const color = (metal?.colors || [])[0];
                          const diamond = (prod?.diamonds || [])[0];
                          const size = (diamond?.sizes || [])[0];
                          await addToCartService({
                            productId: prod?._id || p.id,
                            metalId: metal?._id || null,
                            colorId: color?._id || null,
                            diamondId: diamond?._id || null,
                            sizeId: size?._id || null,
                          });
                          try { window.dispatchEvent(new CustomEvent('open-cart-popup')); } catch {}
                        } catch {}
                      }}
                      className="w-full bg-white text-black py-3 font-semibold"
                    >
                      Add To Cart
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
                <p className="text-sm text-gray-300">{p.name}</p>
                <div className="flex gap-2 mt-1 text-sm">
                  <span className="line-through text-gray-500">
                    {p.oldPrice}
                  </span>
                  <span className="text-yellow-400">{p.price}</span>
                </div>
              </div>
            )}
          </div>
        );})}
      </div>
    </div>
  );
}
