import { useMemo, useState } from "react";
import { useTheme } from "../../config/hooks/useTheme";
import underline from "../../../assets/about/underline.svg";
import { MdFilterList, MdSort } from "react-icons/md";
import weeddingring from "../../../assets/about/weeddingring.jpg";
import Rectangle from "../../../assets/about/Rectangle.jpg";
import Earring from "../../../assets/about/Earring.jpg";
import Bracelets from "../../../assets/about/Bracelets.jpg";
import { Link } from "react-router-dom";
import {
  fetchFilteredProducts,
  fetchProducts,
  fetchProductsCollections,
  fetchProductsCollectionsItems,
} from "../../redux/service/SolitairesRingService";
import ImageGallery from "../../gallary/ImageGallary";

const SolitairesRing = () => {
  const { colors, theme } = useTheme();
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

  const [products1, setProducts] = useState([]);

  console.log("call--", {
    products1,
    collections,
    selectedFilters,
  });

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

  useMemo(async () => {
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

  // Mock product data - replace with API data later
  const products = [
    {
      id: 1,
      price: "₹ 1,20,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 2,
      price: "₹ 95,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 3,
      price: "₹ 1,50,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 4,
      price: "₹ 2,10,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 5,
      price: "₹ 1,80,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 6,
      price: "₹ 75,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 7,
      price: "₹ 2,50,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 8,
      price: "₹ 1,95,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 9,
      price: "₹ 1,65,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 10,
      price: "₹ 1,35,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 11,
      price: "₹ 2,20,00021212",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 12,
      price: "₹ 1,40,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 13,
      price: "₹ 1,90,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 14,
      price: "₹ 2,80,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 15,
      price: "₹ 3,10,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 16,
      price: "₹ 2,45,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 17,
      price: "₹ 1,75,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 18,
      price: "₹ 1,55,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 19,
      price: "₹ 2,60,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 20,
      price: "₹ 1,25,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 21,
      price: "₹ 2,20,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 22,
      price: "₹ 1,40,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 23,
      price: "₹ 1,90,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 24,
      price: "₹ 2,80,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 25,
      price: "₹ 3,10,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 26,
      price: "₹ 2,45,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 27,
      price: "₹ 1,75,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 28,
      price: "₹ 1,55,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 29,
      price: "₹ 2,60,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 30,
      price: "₹ 1,25,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 31,
      price: "₹ 2,45,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 32,
      price: "₹ 1,75,000",
      image: weeddingring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 33,
      price: "₹ 1,55,000",
      image: Rectangle,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 34,
      price: "₹ 2,60,000",
      image: Earring,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      id: 35,
      price: "₹ 1,25,000",
      image: Bracelets,
      description: "Lorem Ipsum is simply dummy text of the",
      longDescription:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
  ];

  //   const products = Array.from({ length: 12 }).map((_, i) => ({
  //   id: i,
  //   label: i % 2 === 0 ? "BEST SELLER" : "MORE COLOR",
  //   name: "Luxury Love Band (placeholder)",
  //   price: "₹1,49,000.00",
  //   oldPrice: "₹1,89,000.00",
  // }));

  //   {
  //     "_id": "68dcc7f9ef5d9da901301e83",
  //     "navigationid": {
  //         "_id": "68dcc796ef5d9da901301e43",
  //         "navigationname": "Shop"
  //     },
  //     "collectionname": "Earrings",
  //     "collectionimage": "https://res.cloudinary.com/dmlhjgiyb/image/upload/v1759484253/collections/68c65ccd65d85c97e35f2dea/ttnjyrmimbzxwmuoyioz.png",
  //     "collectionslug": "earrings",
  //     "status": true,
  //     "isDeleted": false,
  //     "createdBy": "68c65ccd65d85c97e35f2dea",
  //     "createdAt": "2025-10-01T06:19:37.243Z",
  //     "updatedAt": "2025-10-03T09:37:32.958Z",
  //     "__v": 0,
  //     "updatedBy": "68c65ccd65d85c97e35f2dea"
  // }

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

  console.log('call--isFilterd',isFilterd);

  const updatedImageGallary = useMemo(() => {
    if (!Object.values(selectedFilters).some((values) => values.length)) {
      const firstCollection = collections.Data?.[2];

      const updatedGallary = imgGellary.toSpliced(2, 0, {
        id: firstCollection?._id,
        label: "Shop Now",
        name: firstCollection?.collectionname,
        oldPrice: null,
        image: firstCollection?.collectionimage,
      });

      return updatedGallary;
    }

    return imgGellary;
  }, [collections, imgGellary, selectedFilters]);

  // Function to render product card
  const ProductCard = ({ product, className = "" }) => (
    <Link to={`/product-detail/${product.productslug}`} state={{ product }}>
      <div
        className={` rounded-lg shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow duration-300 ${className} ${
          theme === "dark" ? "bg-white" : "bg-[#303030]"
        }`}
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
        {/* <ProductCard
          product={products[startIndex]}
          className="h-[calc(50%-8px)]"
        /> */}
        <ProductCard
          product={products[startIndex + 1]}
          className="h-[calc(50%-8px)]"
        />
      </div>
      <div className="col-span-1 space-y-4">
        <ProductCard
          product={products[startIndex]}
          className="h-[calc(50%-8px)]"
        />
        <ProductCard
          product={products[startIndex + 1]}
          className="h-[calc(50%-8px)]"
        />
      </div>
      {/* Middle - 1 large image */}
      <div className="col-span-2">
        <ProductCard product={products[startIndex + 2]} className="h-full" />
      </div>
    </div>
  );

  // Function to render mixed layout row (left large, right stacked)
  const MixedLayoutRow2 = ({ startIndex }) => (
    <div className="grid grid-cols-4 gap-4 mb-4">
      {/* Left side - 1 small image */}
      <div className="col-span-2">
        <ProductCard product={products[startIndex + 2]} className="h-full" />
      </div>

      {/* Middle - 1 large image */}
      <div className="col-span-1 space-y-4">
        <ProductCard
          product={products[startIndex]}
          className="h-[calc(50%-8px)]"
        />
        <ProductCard
          product={products[startIndex + 1]}
          className="h-[calc(50%-8px)]"
        />
      </div>
      <div className="col-span-1 space-y-4">
        <ProductCard
          product={products[startIndex]}
          className="h-[calc(50%-8px)]"
        />
        <ProductCard
          product={products[startIndex + 1]}
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

  useMemo(async () => {
    const filteredProducts = await fetchFilteredProducts({
      ...selectedFilters,
      ...(selectedSort ? { sort: [selectedSort] } : {}),
    });

    if (filteredProducts?.Data) {
      setProducts(filteredProducts.Data);
    }
  }, [JSON.stringify(selectedFilters), selectedSort]);

  return (
    <div
      className={`${colors.firstPart.background} ${colors.firstPart.text} w-full`}
    >
      <div className="text-center py-4 sm:py-5 px-4 sm:px-6 lg:px-8">
        <h2 className="text-[20px] sm:text-[26px] md:text-[36px] lg:text-[44px] leading-[100%] tracking-[0px] font-Belleza inline-flex flex-col items-center gap-[8px] sm:gap-[12px]">
          Solitaires Rings
          <img
            src={underline}
            alt="underline"
            className="w-32 sm:w-40 md:w-56 lg:w-[261.2px] h-auto"
          />
        </h2>
      </div>
      <div className="select-none flex justify-center items-center xl:mx-24 lg:mx-5 md:mx-4 mx-4">
        <div className="bg-[#303030] w-[1532px] h-[56px] p-5 flex justify-between items-center">
          {/* Left side - Filter and Sort */}
          <div className="flex items-center space-x-8">
            {/* Filter */}
            <div className="flex items-center space-x-2 cursor-pointer hover:opacity-100 transition-opacity relative">
              <div
                className="flex flex-row gap-2"
                onClick={() => setShowFilterDropdown((prev) => !prev)}
              >
                <MdFilterList className="text-gray-300 text-2xl" />
                <span className="text-gray-300 text-sm font-medium">
                  Filter
                </span>
              </div>
              {/* Dropdown */}
              {showFilterDropdown && (
                <div
                  className={` absolute top-0 mt-6.5 w-[368px] -ml-5 h-[500px] overflow-auto shadow-lg rounded-lg z-50 p-4 min-w-[220px] ${colors.dropdown.background} ${colors.dropdown.text} `}
                >
                  {/* In-Stock Only Toggle */}
                  <div className={`flex items-center justify-between mb-4 `}>
                    <span className={`font-medium `}>In-Stock Only</span>
                    <button
                      className={`w-10 h-5 flex items-center bg-gray-200 rounded-full p-1 duration-300 focus:outline-none ${
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
                  {filterMap.map(({ label, values, key, filterKey }) => {
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
                                    checked={selectedFilters[
                                      filterKey
                                    ]?.includes(value?._id)}
                                    onChange={() =>
                                      handleCheckboxChange(
                                        filterKey,
                                        value?._id
                                      )
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
                </div>
              )}

              {showSortingDropdown && (
                <div
                  className={` absolute top-0 mt-6.5 w-[368px] -ml-5 h-[500px] overflow-auto shadow-lg rounded-lg z-50 p-4 min-w-[220px] ${colors.dropdown.background} ${colors.dropdown.text} `}
                >
                  <div className="pl-4 mt-2 text-sm">
                    {options?.map(({ label, onClick, value }) => {
                      return (
                        <div
                          className="flex flex-row justify-between"
                          key={value}
                        >
                          <label
                            htmlFor={value._id}
                            className="text-xl cursor-pointer"
                          >
                            {label}
                          </label>

                          <input
                            id={value._id}
                            type="radio"
                            className="mr-5 rounded-sm cursor-pointer"
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

            {/* Sort By */}
            <div className="w-px h-6 bg-gray-400 mr-2"></div>
            <div
              className={`flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity ${
                selectedSort
                  ? "border-2 border-dashed border-purple-400 rounded px-2 py-1"
                  : ""
              }`}
              onClick={() => setShowSortingDropdown((prev) => !prev)}
            >
              <MdSort className="text-gray-300 text-xl" />

              <p>Sort By</p>
            </div>
          </div>

          {/* Right side - Product count */}
          <div className="text-gray-300 text-sm ">
            {currentRange.start} - {currentRange.end} products of{" "}
            {totalProducts} products
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className={`px-30 py-4 `}>
        <ImageGallery isFilterd={isFilterd} gallery={updatedImageGallary} />
      </div>

      {/* <div className={`px-46 py-8 `}>{generateRows()}</div> */}

      {/* Load More Button */}
      <div className="text-center py-8 h-[100px]">
        {viewMore < products.length && (
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
