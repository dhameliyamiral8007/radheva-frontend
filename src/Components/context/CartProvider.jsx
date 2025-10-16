import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fetchCartService, removeFromCartService, updateCartQuantityService, incrementCartItemService, decrementCartItemService } from "../redux/service/CartService";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Fetch cart from server when component mounts or user logs in
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('uuid') || localStorage.getItem('token') || localStorage.getItem('jwt');
    if (!token) {
      setCartItems([]);
      setCartCount(0);
      return;
    }

    try {
      setLoading(true);
      const response = await fetchCartService();
      if (response.IsSuccess && response.Data) {
        setCartItems(response.Data.items || []);
        setCartCount(response.Data.itemCount || 0);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      setCartItems([]);
      setCartCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = async (cartItemId) => {
    try {
      await removeFromCartService(cartItemId);
      // Refresh cart from server after removal
      await fetchCart();
    } catch (error) {
      console.error('Failed to remove item from cart:', error);
    }
  };

  const updateQuantity = async (cartItemId, newQuantity) => {
    try {
      await updateCartQuantityService(cartItemId, newQuantity);
      // Refresh cart from server after update
      await fetchCart();
    } catch (error) {
      console.error('Failed to update cart quantity:', error);
    }
  };

  const incrementQuantity = async (cartItemId) => {
    try {
      await incrementCartItemService(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to increment cart item:', error);
    }
  };

  const decrementQuantity = async (cartItemId) => {
    try {
      await decrementCartItemService(cartItemId);
      await fetchCart();
    } catch (error) {
      console.error('Failed to decrement cart item:', error);
    }
  };

  const openCart = () => setIsCartOpen(true);
  const closeCart = () => setIsCartOpen(false);

  return (
    <CartContext.Provider value={{ 
      cartItems, 
      cartCount, 
      loading, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      incrementQuantity,
      decrementQuantity,
      isCartOpen,
      openCart,
      closeCart,
      fetchCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
