import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import "./App.css";
import CustomerReview from "./Components/pages/Reviews/CustomerReview.jsx";
import PrivacyPolicy from "./Components/pages/footer/supportPages/PrivacyPolicy.jsx";
import ReturnPolicy from "./Components/pages/footer/supportPages/ReturnPolicy.jsx";
import ShippingPolicy from "./Components/pages/footer/supportPages/ShippingPolicy.jsx";
import OurPolicy from "./Components/pages/footer/supportPages/OurPolicy.jsx";
import TermsAndCondition from "./Components/pages/footer/supportPages/TermsAndCondition.jsx";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./Components/context/CartProvider.jsx";
import CartPage from "./Components/pages/cart/CartPage.jsx";
import PaymentFlow from "./Components/pages/payment/PaymentFlow.jsx";
import WishList from "./Components/pages/wishList/WishList.jsx";
import { WishlistProvider } from "./Components/context/WishListProvider.jsx";
import Shop from "./Components/pages/shop/Shop.jsx";

const OurStory = lazy(() => import("./Components/pages/footer/companyPages/OurStory.jsx"));
const ContactUs = lazy(() => import("./Components/pages/footer/companyPages/ContactUs.jsx"));
const HomeIndex = lazy(() => import("./Components/pages/home/Index.jsx"));
const SolitairesPage = lazy(() => import("./Components/pages/solitaires/Index.jsx"));
const RootLayout = lazy(() => import("./Components/layouts/RootLayout.jsx"));
const ProductIndex = lazy(() => import("./Components/pages/productDetail/index.jsx"));
const Loader = lazy(() => import("./Components/loader/Loader.jsx"));
const RouteChangeLoader = lazy(() => import("./Components/loader/RouteChangeLoader.jsx"));
const CustomizeIndex = lazy(() => import("./Components/pages/customize/index.jsx"));
const BlogIndex = lazy(() => import("./Components/pages/blog/index.jsx"));
const BookApoinmentIndex = lazy(() => import("./Components/pages/bookApoinment/index.jsx"));
const AboutBlog = lazy(() => import("./Components/pages/blog/AboutBlog.jsx"));

function App() {
  return (
    <WishlistProvider>
    <CartProvider>
      <BrowserRouter>
        <RouteChangeLoader />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<RootLayout />}>
              <Route path="/" element={<HomeIndex />} />
              <Route path="/solitaires" element={<SolitairesPage />} />
              <Route path="/product-detail/:id" element={<ProductIndex />} />
              <Route path="/customize" element={<CustomizeIndex />} />
              {/* <Route path="/shop" element={<Shop/>}/> */}
              <Route path="/blogs" element={<BlogIndex />} />
              <Route path="/book-apoinment" element={<BookApoinmentIndex />} />
              <Route path="/blog/:id" element={<AboutBlog />} />
              <Route path="/contactUs" element={<ContactUs />} />
              <Route path="/our-story" element={<OurStory />} />
              <Route path="/all-review" element={<CustomerReview />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/return-policy" element={<ReturnPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/our-policy" element={<OurPolicy />} />
              <Route path="/terms-condition" element={<TermsAndCondition />} />
              <Route path="/cart" element={<CartPage/>}/>
              <Route path="/wishlist" element={<WishList/>}/>
              {/* Default 404 */}
              <Route path="*" element={<h1 className="p-8">404 - Page Not Found</h1>} />
            </Route>
            <Route path="/payment-flow" element={<PaymentFlow />} />
          </Routes>
        </Suspense>

        <Toaster position="top-right" />
      </BrowserRouter>
    </CartProvider>
    </WishlistProvider>
  );
}

export default App;
