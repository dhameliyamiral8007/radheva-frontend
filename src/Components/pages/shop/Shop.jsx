// import React from "react";

// const ShopMenu = ({ theme, data, isMobile }) => {
//     return (
//         <div
//             className={`${isMobile ? "block lg:hidden" : "hidden lg:block"} ${theme === "dark"
//                 ? "bg-white shadow-gray-300"
//                 : "bg-neutral-800 shadow-black/30"
//                 } shadow-lg`}
//         >
//             <div
//                 className={`mx-auto w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-8 py-6 ${isMobile ? "flex flex-col gap-4" : ""
//                     }`}
//             >
//                 {data.map((group) => (
//                     <div key={group.id}>
//                         <h4
//                             className={`${theme === "dark" ? "text-black border-gray-600" : "text-white"
//                                 } text-xs tracking-widest font-kufam border-t pt-2`}
//                         >
//                             {group.title}
//                         </h4>
//                         <ul
//                             className={`${theme === "dark" ? "text-black" : "text-white"
//                                 } text-xs font-kufam space-y-2 mt-3`}
//                         >
//                             {group.items.map((label, idx) => (
//                                 <li key={`${group.id}-${idx}`}>{label}</li>
//                             ))}
//                         </ul>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default ShopMenu;
import React from "react";

const ShopMenu = ({ theme, data, isMobile }) => {
    // Filter out empty collections and ensure data is valid
    const validData = data?.filter(group => 
        group && group.title && group.items && group.items.length > 0
    ) || [];

    if (validData.length === 0) {
        return null; 
    }

    return (
        <div
            className={`${isMobile ? "block lg:hidden" : "hidden lg:block absolute top-full left-0 right-0"} ${
                theme === "dark"
                    ? "bg-white shadow-gray-300"
                    : "bg-neutral-800 shadow-black/30"
            } shadow-lg border-t ${theme === "dark" ? "border-gray-200" : "border-gray-700"}`}
        >
            <div
                className={`mx-auto w-full max-w-7xl grid grid-cols-2 md:grid-cols-4 gap-8 px-6 md:px-8 py-6 ${
                    isMobile ? "flex flex-col gap-4" : ""
                }`}
            >
                {validData.map((group) => (
                    <div key={group.id} className="animate-fade-in">
                        <h4
                            className={`${
                                theme === "dark" ? "text-black border-gray-300" : "text-white border-gray-500"
                            } text-xs tracking-widest font-kufam border-t pt-3 pb-2 font-semibold`}
                        >
                            {group.title}
                        </h4>
                        <ul
                            className={`${
                                theme === "dark" ? "text-gray-700" : "text-gray-300"
                            } text-sm font-kufam space-y-2 mt-3`}
                        >
                            {group.items.map((label, idx) => (
                                <li 
                                    key={`${group.id}-${idx}`}
                                    className="hover:text-yellow-400 transition-colors duration-200 cursor-pointer py-1"
                                >
                                    {label}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ShopMenu;