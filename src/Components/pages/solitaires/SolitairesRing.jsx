import { useMemo, useState, useEffect } from "react";
import { useTheme } from "../../config/hooks/useTheme";
import underline from "../../../assets/about/underline.svg";
import { MdFilterList, MdSort } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  fetchFilteredProducts,
  fetchProducts,
  fetchProductsCollections,
  fetchProductsCollectionsItems,
} from "../../redux/service/SolitairesRingService";
import ImageGallery from "../../gallary/ImageGallary";
import { useDispatch } from "react-redux";
import { setProductFilter } from "../../redux/slice/ProductFilterSlice";

const SolitairesRing = () => {
  const { colors, theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const productFilter = useSelector((state) => state.productFilter);
  const [selectedSort, setSelectedSort] = useState();
  const [metalsForUsers, setMetalsForUsers] = useState([]);
  const [colorsForUsers, setColorsForUsers] = useState([]);
  const [sizesForUsers, setSizesForUsers] = useState([]);
  const [diamondsForUsers, setDiamondsForUsers] = useState([]);
  const [collections, setCollections] = useState([]);
  const [collectionsItems, setCollectionsItems] = useState([]);
  const [totalProducts] = useState(53);
  const [currentRange] = useState({ start: 1, end: 30 });
  const [viewMore, setViewMore] = useState(12); // Show 30 images initially
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [showSortingDropdown, setShowSortingDropdown] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [expandedCollections, setExpandedCollections] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState({});
  const [pageTitle, setPageTitle] = useState("Products");

  const [products1, setProducts] = useState([]);

  console.log("call--", {
    products1,
    collections,
    selectedFilters,
  });

  console.log("Products1 length:", products1.length);
  console.log("First product:", products1[0]);

  //   getColorsForUsers
  //getDiamondsForUsers
  //getSizesForUsers

  const handleCheckboxChange = (groupKey, optionId) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[groupKey] || [];
      const updatedValues = currentValues.includes(optionId)
        ? currentValues.filter((id) => id !== optionId)
        : [...currentValues, optionId];
      return { ...prev, [groupKey]: updatedValues };
    });
  };
  const handleProductClick = (product) => {
    // If this is a collection card, navigate to that collection filter
    if (product?.isCollectionCard) {
      dispatch(setProductFilter({ navigationID: null, collectionID: product.id, collectionItemID: null }));
      navigate('/products');
      return;
    }
    const productId = product?._id || product?.id;
    if (!productId) return;
    navigate(`/product-detail/${productId}`, { state: { productId } });
  };

  useEffect(() => {
    // seed filters from Redux (navigationID / collectionID / collectionItemID)
    const { navigationID, collectionID, collectionItemID } = productFilter || {};

    const next = {};
    if (navigationID) next.navigationID = [navigationID];
    if (collectionID) next.collectionID = [collectionID];
    if (collectionItemID) next.collectionItemID = [collectionItemID];

    // Replace entirely so stale IDs are removed when switching
    setSelectedFilters(next);
  }, [productFilter]);

  // derive page title from query + fetched collections data
  useEffect(() => {
    const { collectionID, collectionItemID } = productFilter || {};
    const col = collections?.Data?.find?.((c) => c?._id === collectionID);
    const item = collectionsItems?.Data?.find?.((i) => i?._id === collectionItemID);

    if (col && item) {
      setPageTitle(`${col.collectionname} ${item.itemname}`);
    } else if (col) {
      setPageTitle(col.collectionname);
    } else {
      setPageTitle("Products");
    }
  }, [productFilter, collections, collectionsItems]);

  useEffect(() => {
    const fetchData = async () => {
    const metalsForUsers = await fetchProducts("getMetalsForUsers");

    if (metalsForUsers) {
      setMetalsForUsers(metalsForUsers);
    }

    const colorsForUsers = await fetchProducts("getColorsForUsers");

    if (colorsForUsers) {
      setColorsForUsers(colorsForUsers);
    }

    const diamondsForUsers = await fetchProducts("getDiamondsForUsers");

    if (diamondsForUsers) {
      setDiamondsForUsers(diamondsForUsers);
    }
    const sizesForUsers = await fetchProducts("getSizesForUsers");

    if (sizesForUsers) {
      setSizesForUsers(sizesForUsers);
    }

    const collections = await fetchProductsCollections();

    if (collections) {
      setCollections(collections);
    }

    const collectionItems = await fetchProductsCollectionsItems();

    if (collectionItems) {
      setCollectionsItems(collectionItems);
    }
    };

    fetchData();
  }, []);

  const filterMap = [
    {
      label: "Metal",
      values: metalsForUsers.Data,
      key: "metalname",
      filterKey: "metal",
    },
    {
      label: "Diamond",
      values: diamondsForUsers.Data,
      key: "diamondname",
      filterKey: "diamond",
    },
    {
      label: "Color",
      values: colorsForUsers.Data,
      key: "colorname",
      filterKey: "color",
    },
    {
      label: "Size",
      values: sizesForUsers.Data,
      key: "carat",
      filterKey: "diamondSize",
    },
    {
      label: "Collection",
      values: collections.Data,
      key: "collectionname",
      filterKey: "collectionID",
    },
    {
      label: "Collection Items",
      values: collectionsItems.Data,
      key: "collectionname",
      filterKey: "collectionItemID",
    },
  ];

  // Using API data from products1 state

  const imgGellary = products1.map(
    ({ _id, discount, price, productimage, productname }, i) => {
      return {
        id: _id,
        label: i % 2 === 0 ? "BEST SELLER" : "MORE COLOR",
        name: productname,
        price: price,
        oldPrice: `${discount}% Off`,
        image: productimage,
      };
    }
  );

  const isFilterd = Object.values(selectedFilters).some(
    (values) => values.length
  );

  console.log("call--isFilterd", isFilterd);

  const updatedImageGallary = useMemo(() => {
    const base = [...imgGellary];

    const allCollections = collections?.Data || [];

    // Determine primary collection card
    const selectedColId = selectedFilters?.collectionID?.[0] || null;
    const primaryCollection = selectedColId
      ? allCollections.find((c) => c?._id === selectedColId)
      : allCollections[0];

    // Determine secondary collection (different from primary)
    const secondaryCollection = allCollections.find(
      (c) => c && c._id !== (primaryCollection?._id || null)
    );

    const collectionCards = [];
    if (primaryCollection) {
      collectionCards.push({
        id: primaryCollection._id,
        label: "Shop Now",
        name: primaryCollection.collectionname,
        oldPrice: null,
        image: primaryCollection.collectionimage,
        // marker for gallery consumers if needed
        isCollectionCard: true,
      });
    }
    if (secondaryCollection) {
      collectionCards.push({
        id: secondaryCollection._id,
        label: "Shop Now",
        name: secondaryCollection.collectionname,
        oldPrice: null,
        image: secondaryCollection.collectionimage,
        isCollectionCard: true,
      });
    }

    // Insert two collection cards at visually pleasing slots
    // guard against small arrays
    if (collectionCards[0]) {
      const insertAt = Math.min(2, base.length);
      base.splice(insertAt, 0, collectionCards[0]);
    }
    if (collectionCards[1]) {
      const insertAt = Math.min(14, base.length);
      base.splice(insertAt, 0, collectionCards[1]);
    }

    return base;
  }, [collections, imgGellary, selectedFilters]);

  // Function to render product card
  const ProductCard = ({ product, className = "" }) => (
    <Link to={`/product-detail/${product._id}`} state={{ productId:product._id }}>
      <div
        className={` rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ${className} ${
          theme === "dark" ? "bg-white" : "bg-[#303030]"
        }`}
        onClick={() => handleProductClick(product)}
      >
        <div
          className={`flex items-center justify-center w-full ] bg-gray-100`}
        >
          <img
            src={product.productimage}
            alt="image"
            className="w-[368px] h-[400px]"
          />
        </div>
        {/* Details below the image */}
        <div className="flex flex-col justify-center items-start gap-[4px] p-4">
          <p className="text-gray-600 text-start text-xs">
            {product.productname}
          </p>
          <p className="text-md font-bold">{product.price}</p>
        </div>
      </div>
    </Link>
  );

  // Function to render mixed layout row (left stacked, right large)
  const MixedLayoutRow1 = ({ startIndex }) => (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {/* Left side - 2 stacked images */}
      <div className="col-span-1 space-y-4">
        <ProductCard
          product={products1[startIndex + 1]}
          className="h-[calc(50%-8px)]"
        />
      </div>
      <div className="col-span-1 space-y-4">
        <ProductCard
          product={products1[startIndex]}
          className="h-[calc(50%-8px)]"
        />
        <ProductCard
          product={products1[startIndex + 1]}
          className="h-[calc(50%-8px)]"
        />
      </div>
      {/* Middle - 1 large image */}
      <div className="col-span-2">
        <ProductCard product={products1[startIndex + 2]} className="h-full" />
      </div>
    </div>
  );

  // Function to render mixed layout row (left large, right stacked)
  const MixedLayoutRow2 = ({ startIndex }) => (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {/* Left side - 1 small image */}
      <div className="col-span-2">
        <ProductCard product={products1[startIndex + 2]} className="h-full" />
      </div>

      {/* Middle - 1 large image */}
      <div className="col-span-1 space-y-4">
        <ProductCard
          product={products1[startIndex]}
          className="h-[calc(50%-8px)]"
        />
        <ProductCard
          product={products1[startIndex + 1]}
          className="h-[calc(50%-8px)]"
        />
      </div>
      <div className="col-span-1 space-y-4">
        <ProductCard
          product={products1[startIndex]}
          className="h-[calc(50%-8px)]"
        />
        <ProductCard
          product={products1[startIndex + 1]}
          className="h-[calc(50%-8px)]"
        />
      </div>
    </div>
  );

  // Function to render standard 4-image row
  const StandardRow = ({ startIndex }) => (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {products1.slice(startIndex, startIndex + 4).map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );

  // Generate rows dynamically based on viewMore count
  const generateRows = () => {
    const rows = [];
    let productIndex = 0;

    while (productIndex < viewMore) {
      // Add standard rows (4 products each)
      if (productIndex + 4 <= viewMore) {
        rows.push(
          <StandardRow
            key={`standard-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }
      if (productIndex + 4 <= viewMore) {
        rows.push(
          <StandardRow
            key={`standard-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }

      // Add mixed layout row 1 (4 products)
      if (productIndex + 4 <= viewMore) {
        rows.push(
          <MixedLayoutRow1
            key={`mixed1-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }

      // Add standard row
      if (productIndex + 4 <= viewMore) {
        rows.push(
          <StandardRow
            key={`standard-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }

      // Add mixed layout row 2 (4 products)
      if (productIndex + 4 <= viewMore) {
        rows.push(
          <MixedLayoutRow2
            key={`mixed2-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }

      // Add standard rows
      if (productIndex + 4 <= viewMore) {
        rows.push(
          <StandardRow
            key={`standard-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }

      if (productIndex + 4 <= viewMore) {
        rows.push(
          <StandardRow
            key={`standard-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }
      // Add mixed layout row 1 (4 products)
      if (productIndex + 4 <= viewMore) {
        rows.push(
          <MixedLayoutRow1
            key={`mixed1-${productIndex}`}
            startIndex={productIndex}
          />
        );
        productIndex += 4;
      }
    }

    return rows;
  };

  const options = [
    {
      label: "Latest",
      value: "latest",
      onClick: (value) => {
        setSelectedSort(value);
        setSelectedFilters((prev) => {
          return { ...prev, sort: [value] };
        });
      },
    },
    {
      label: "Price: High to Low",
      value: "price_high_to_low",
      onClick: (value) => {
        setSelectedSort(value);
        setSelectedFilters((prev) => {
          return { ...prev, sort: [value] };
        });
      },
    },
    {
      label: "Price: Low to High",
      value: "price_low_to_high",
      onClick: (value) => {
        setSelectedSort(value);
        setSelectedFilters((prev) => {
          return { ...prev, sort: [value] };
        });
      },
    },
  ];

  useEffect(() => {
    const fetchFilteredData = async () => {
    const filteredProducts = await fetchFilteredProducts({
      ...selectedFilters,
      ...(selectedSort ? { sort: [selectedSort] } : {}),
    });

    if (filteredProducts?.Data) {
      setProducts(filteredProducts.Data);
    }
    };

    fetchFilteredData();
  }, [JSON.stringify(selectedFilters), selectedSort, showSortingDropdown]);

  return (
    <div
      className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
    >
      <div className="text-center py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] sm:text-[26px] md:text-[36px] lg:text-[44px] leading-[100%] tracking-[0px] font-Belleza inline-flex flex-col items-center gap-[8px] sm:gap-[12px]">
          {pageTitle}
          <img
            src={underline}
            alt="underline"
            className="w-32 sm:w-40 md:w-56 lg:w-[261.2px] h-auto"
          />
        </h2>
      </div>

      <div className="px-[50px] w-full select-none flex justify-center items-center">
        <div
          className={`${colors.dropdown.background}  w-full h-[56px] p-5 flex justify-between items-center`}
        >
          {/* Left side - Filter and Sort */}
          <div className="flex items-center space-x-8">
            {/* Filter */}
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-100 transition-opacity relative">
              <div
                className="flex flex-row gap-2"
                onClick={() => setShowFilterDropdown((prev) => !prev)}
              >
                <MdFilterList className="text-2xl" />
                <span className="text-sm font-medium">
                  Filter
                </span>
              </div>
              {/* Dropdown */}
            </div>

            <div className="w-px h-6 bg-gray-400 mr-2"></div>
            <div
              className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={() => {
                setShowSortingDropdown((prev) => {
                  if (prev) {
                    setSelectedFilters((prev) => {
                      const updated = { ...prev };
                      delete updated.sort;
                      return updated;
                    });
                  }
                  return !prev;
                });
              }}
            >
              <MdSort className=" text-xl" />

              <span className="text-sm font-medium">Sort By</span>
            </div>
          </div>

          {/* Right side - Product count */}
          <div className=" text-sm ">
            <span>
              {currentRange.start} - {currentRange.end} products of{" "}
              {totalProducts} products
            </span>
          </div>
        </div>
      </div>

      <div className="px-[50px] flex">
        <div
          className={`transition-all duration-300 ease-in-out transform overflow-hidden
    ${
      showFilterDropdown
        ? "w-[300px] min-w-[300px] opacity-100 translate-y-0 scale-100"
        : "w-0 opacity-0 min-w-[0px] max-w-[0px] -translate-y-2 scale-95 pointer-events-none"
    }`}
        >
          <div
            className={`h-[100%] overflow-auto p-4 ${colors.dropdown.background} ${colors.dropdown.text} `}
          >
            {/* In-Stock Only Toggle */}
            <div
              hidden={showSortingDropdown}
              className={`flex items-center justify-between mb-4 `}
            >
              <span className={`font-medium `}>In-Stock Only</span>
              <button
                className={`w-10 h-5 flex items-center bg-gray-200 p-1 duration-300 focus:outline-none ${
                  inStockOnly ? "bg-[#B5904F]" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setInStockOnly((v) => !v);
                }}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ${
                    inStockOnly ? "translate-x-5" : ""
                  }`}
                ></div>
              </button>
            </div>
            {/* Shop by collection sections */}
            {!showSortingDropdown &&
              filterMap.map(({ label, values, key, filterKey }) => {
                return (
                  <div key={label} className="mb-2">
                    <div
                      className="flex items-center justify-between cursor-pointer hover:text-[#B5904F]"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCollections((prev) => ({
                          ...prev,
                          [label]: !prev[label],
                        }));
                      }}
                    >
                      <span className="font-semibold">{label}</span>
                      <span className="text-xl">
                        {expandedCollections[label] ? "-" : "+"}
                      </span>
                    </div>

                    {expandedCollections[label] && (
                      <div className="pl-4 mt-2 text-sm">
                        {values?.map((value) => {
                          return (
                            <div
                              className="flex flex-row justify-between"
                              key={value?.[key]}
                            >
                              <label
                                htmlFor={value._id}
                                className="text-xl cursor-pointer"
                              >
                                {value?.[key] || "-"}
                              </label>

                              <input
                                id={value._id}
                                type="checkbox"
                                className="mr-5 rounded-sm cursor-pointer"
                                checked={selectedFilters[filterKey]?.includes(
                                  value?._id
                                )}
                                onChange={() =>
                                  handleCheckboxChange(filterKey, value?._id)
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}

            {showSortingDropdown && (
              <div
                className={` w-full ${colors.dropdown.background} ${colors.dropdown.text} `}
              >
                <div className="text-sm w-full">
                  {options?.map(({ label, onClick, value }) => {
                    return (
                      <div
                        className="flex flex-row justify-between"
                        key={value}
                      >
                        <label
                          htmlFor={value._id}
                          className="font-semibold text-xl cursor-pointer"
                        >
                          {label}
                        </label>

                        <input
                          id={value._id}
                          type="radio"
                          className="rounded-sm cursor-pointer"
                          checked={value === selectedSort}
                          onChange={() => onClick(value)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Grid */}
        <div className={`flex grow overflow-hidden  `}>
          <ImageGallery isFilterd={isFilterd} gallery={updatedImageGallary} onProductClick={handleProductClick} />
        </div>
      </div>
      {/* <div className={`px-46 py-8 `}>{generateRows()}</div> */}

      {/* Load More Button */}
      <div className="text-center py-8 h-[100px]">
        {viewMore < products1.length && (
          <button
            onClick={() => setViewMore((prev) => prev + 8)} // 👈 load 8 more per click
            className="bg-[#B5904F] text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors duration-300 font-Belleza"
          >
            View More
          </button>
        )}
      </div>
    </div>
  );
};

export default SolitairesRing;
