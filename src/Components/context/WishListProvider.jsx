

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getWishlistService, addToWishlistService, removeFromWishlistService } from "../redux/service/WishlistService";
import { addToCartService } from "../redux/service/CartService";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchWishlist = useCallback(async () => {
    try {
      const token = localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt');
      if (!token) { setWishlist([]); setWishlistCount(0); return; }
      const res = await getWishlistService();
      const items = res?.Data?.items || [];
      setWishlist(items);
      setWishlistCount(res?.Data?.itemCount || items.length);
      try { window.dispatchEvent(new CustomEvent('wishlist-updated')); } catch {}
    } catch (e) {
      setWishlist([]); setWishlistCount(0);
    }
  }, []);

  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);

  const addToWishlist = async ({ productId, metalId, colorId, diamondId, sizeId }) => {
    await addToWishlistService({ productId, metalId, colorId, diamondId, sizeId });
    await fetchWishlist();
  };

  const removeFromWishlist = async (wishlistItemId) => {
    await removeFromWishlistService(wishlistItemId);
    await fetchWishlist();
  };

  const moveWishlistItemToCart = async (wishlistItem) => {
    const p = wishlistItem?.productId || {};
    await addToCartService({
      productId: p?._id,
      metalId: wishlistItem?.metalId?._id || null,
      colorId: wishlistItem?.colorId?._id || null,
      diamondId: wishlistItem?.diamondId?._id || null,
      sizeId: wishlistItem?.sizeId?._id || null,
    });
    try { window.dispatchEvent(new CustomEvent('open-cart-popup')); } catch {}
  };

  return (
    <WishlistContext.Provider value={{ wishlist, wishlistCount, fetchWishlist, addToWishlist, removeFromWishlist, moveWishlistItemToCart }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);

