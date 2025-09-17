import React from "react";

const ShopMenu = ({ theme, data, isMobile }) => {
    return (
        <div
            className={`${isMobile ? "block lg:hidden" : "hidden lg:block"} ${theme === "dark"
                ? "bg-white shadow-gray-300"
                : "bg-neutral-800 shadow-black/30"
                } shadow-lg`}
        >
            <div
                className={`mx-auto w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-8 py-6 ${isMobile ? "flex flex-col gap-4" : ""
                    }`}
            >
                {data.map((group) => (
                    <div key={group.id}>
                        <h4
                            className={`${theme === "dark" ? "text-black border-gray-600" : "text-white"
                                } text-xs tracking-widest font-kufam border-t pt-2`}
                        >
                            {group.title}
                        </h4>
                        <ul
                            className={`${theme === "dark" ? "text-black" : "text-white"
                                } text-xs font-kufam space-y-2 mt-3`}
                        >
                            {group.items.map((label, idx) => (
                                <li key={`${group.id}-${idx}`}>{label}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopMenu;
