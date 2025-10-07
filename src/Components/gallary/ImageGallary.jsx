import React from "react";

const products = Array.from({ length: 12 }).map((_, i) => ({
  id: i,
  label: i % 2 === 0 ? "BEST SELLER" : "MORE COLOR",
  name: "Luxury Love Band (placeholder)",
  price: "₹1,49,000.00",
  oldPrice: "₹1,89,000.00",
}));

export default function ImageGallary({ gallery = products, isFilterd }) {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {gallery.map((p, index) => (
          <div
            key={p.id}
            className={`${
              index === 2 && !isFilterd
                ? "col-span-2 row-span-2"
                : "col-span-1 row-span-1"
            } relative bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden`}
          >
            {/* Tag */}
            {index !== 2 && (
              <span className="absolute top-2 left-2 bg-neutral-100 text-black text-xs font-semibold px-2 py-1 ">
                {p.label}
              </span>
            )}

            {/* Image Placeholder */}
            <div
              className={`bg-neutral-700 rounded-lg ${
                index === 2 && !isFilterd ? "h-245" : "h-100"
              } flex items-center justify-center`}
            >
              <img className="h-full w-full" src={p.image} />

              {index === 2 && !isFilterd && (
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
                      className="p-[6px 10px] text-center bg-neutral-100 text-black text-xs  font-semibold px-2 py-1 "
                    >
                      {p.label}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Info */}
            {(index !== 2 || isFilterd) && (
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
        ))}
      </div>

      {/* Promo Section */}
      <div className="relative bg-neutral-900 my-10 mx-6 rounded-xl overflow-hidden flex flex-col md:flex-row items-center">
        <div className="flex-1 p-10 text-center md:text-left">
          <h2 className="text-2xl font-serif mb-4">
            Wedding Rings In Stock & Ready
          </h2>
          <p className="text-gray-400 mb-6">
            Need it now? Shop our ready-to-ship bands today.
          </p>
          <button className="bg-white text-black px-6 py-2 rounded-md hover:bg-yellow-400 transition">
            Shop Now
          </button>
        </div>
        <div className="flex-1 bg-neutral-700 h-80 flex items-center justify-center">
          <span className="text-gray-400">Banner Image Placeholder</span>
        </div>
      </div>

      {/* View More */}
      <div className="text-center py-10">
        <button className="bg-yellow-600 hover:bg-yellow-700 transition text-white font-medium px-6 py-3 rounded-md">
          View More
        </button>
      </div>
    </div>
  );
}
