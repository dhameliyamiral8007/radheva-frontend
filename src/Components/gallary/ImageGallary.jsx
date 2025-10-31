import React from "react";

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

  return (
    <div className=" w-full text-white min-h-screen curser-pointer" >
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-4">
        {gallery.map((p, index) => {
          const isCollection = Boolean(p.isCollectionCard);
          const spanClass = isCollection ? "col-span-2 row-span-2" : (index === 2 && !isFilterd ? "col-span-2 row-span-2" : "col-span-1 row-span-1");
          const mediaHeight = isCollection ? "h-245" : (index === 2 && !isFilterd ? "h-245" : "h-100");
          return (
          <div
            key={p.id}
            onClick={() => onProductClick(p)}
            className={`${spanClass} relative bg-neutral-900 border border-neutral-800 rounded-lg overflow-hidden`}
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
