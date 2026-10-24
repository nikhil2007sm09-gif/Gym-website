import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import AppRouter from './Router/AppRouter';
import Navbar from './Components/Comman/Navbar';

import ScrollToTop from './Components/Comman/ScrollToTop';
import { WishlistProvider } from './context/WishlistContext';
import { useAuth } from "./context/AuthContext";
import { Cart } from "./Components/Cart/Cart";
import { getCartApi, removeCartItemApi } from "./API/cartApi";
import Footer from "./components/Comman/Footer";






function App() {
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const handleOpenCart = () => setIsCartOpen(true);
    window.addEventListener("open-cart", handleOpenCart);
    return () => window.removeEventListener("open-cart", handleOpenCart);
  }, []);

  const fetchCart = async () => {
    if (!user) {
      const localCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      setCartItems(localCart);
      return;
    }
    try {
      const data = await getCartApi();
      let rawItems = [];

      if (Array.isArray(data?.cart?.products)) {
        rawItems = data.cart.products;
      } else if (Array.isArray(data?.cart?.items)) {
        rawItems = data.cart.items;
      } else if (Array.isArray(data?.items)) {
        rawItems = data.items;
      } else if (Array.isArray(data?.cart)) {
        rawItems = data.cart;
      } else if (Array.isArray(data?.data)) {
        rawItems = data.data;
      } else if (Array.isArray(data)) {
        rawItems = data;
      }

      const formatted = rawItems.map(item => {
        const prod = item.productId || item.product || item;
        return {
          id: item._id || item.id || prod._id,
          productId: prod._id || prod.id,
          name: prod.productName || prod.name || "Product",
          price: typeof prod.price === 'string' ? parseFloat(prod.price.replace(/[^\d.]/g, '')) : (prod.price || item.price || 0),
          originalPrice: typeof prod.originalPrice === 'string' ? parseFloat(prod.originalPrice.replace(/[^\d.]/g, '')) : (prod.originalPrice || prod.price || item.price || 0),
          discount: typeof prod.discount === 'string' ? parseInt(prod.discount.replace(/[^\d.]/g, '')) : (prod.discount || item.discount || 0),
          quantity: item.quantity || 1,
          size: item.size || 'M',
          color: item.color || prod.color || 'white',
          image: prod.mainImage?.url || prod.image || 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=600',
        };
      });

      setCartItems(formatted);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    }
  };

  useEffect(() => {
    fetchCart();
    window.addEventListener("cart-updated", fetchCart);
    return () => window.removeEventListener("cart-updated", fetchCart);
  }, [user]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => {
      const updated = items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      if (!user) localStorage.setItem('guestCart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cart-updated'));
      return updated;
    });
  };

  const handleRemoveItem = async (itemId) => {
    if (!user) {
      setCartItems(items => {
        const filtered = items.filter(item => item.id !== itemId);
        localStorage.setItem('guestCart', JSON.stringify(filtered));
        window.dispatchEvent(new Event('cart-updated'));
        return filtered;
      });
      toast.success("Item removed from cart");
      return;
    }

    try {
      const itemToRemove = cartItems.find(i => i.id === itemId);
      const idToSend = itemToRemove?.productId || itemId;

      await removeCartItemApi(
        idToSend,
        itemToRemove?.color,
        itemToRemove?.size,
        itemToRemove?.quantity
      );

      setCartItems(items => items.filter(item => item.id !== itemId));
      window.dispatchEvent(new Event('cart-updated'));
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error(error?.response?.data?.message || "Failed to remove item");
    }
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <WishlistProvider>
      <div className="min-h-screen flex flex-col">
        <ScrollToTop />
        <Navbar onCartClick={() => setIsCartOpen(true)} cartItemCount={totalItems} />
        <AppRouter />
        <Cart
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
        />
        <Footer />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </WishlistProvider>
  );
}

export default App;