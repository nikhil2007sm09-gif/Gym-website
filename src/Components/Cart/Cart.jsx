import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, ChevronDown, Tag, ChevronRight } from 'lucide-react';
import RecommendedProduct from './RecommendedProduct';
import CouponSection from './CouponSection';
import { useAuth } from '../../context/AuthContext';
import { getAddressApi } from '../../API/addressApi';
import { createOrderApi } from '../../API/cartApi';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const [selectedSize, setSelectedSize] = useState(item.size);

  return (
    <>
      <div className='px-2 '>
        <div className="bg-white rounded-lg mb-0 shadow">
          <div className="flex gap-2 p-3">
            <div className="w-24 h-24 bg-gray-100 rounded-md shrink-0 overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <div className='flex justify-center flex-col'>
                  <h3 className="font-medium text-gray-900 text-xs flex-1 pr-2">
                    {item.name}
                  </h3>
                  <div className='flex mt-2 gap-2'>
                    <div className="relative">
                      <select
                        value={selectedSize}
                        onChange={(e) => setSelectedSize(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 text-xs text-gray-700 cursor-pointer focus:outline-none focus:ring-1 focus:ring-gray-400"
                      >
                        <option value="50g">50g</option>
                        <option value="100g">100g</option>
                        <option value="150g">150g</option>
                        <option value="300g">300g</option>
                        <option value="500g">500g</option>
                        <option value="1kg">1kg</option>
                        <option value="2kg">2kg</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none" />
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-gray-400 line-through text-xs">
                    ₹{Number(item.originalPrice).toFixed(2)}
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    ₹{Number(item.price).toFixed(2)}
                  </div>
                  <div className="text-xs font-semibold text-green-600">
                    ({item.discount}% OFF)
                  </div>
                </div>
              </div>

              <div className=" flex justify-end gap-2 p-0">
                <div className="flex items-center gap-3 bg-gray-100 rounded-md ">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="w-6 text-center font-medium text-sm">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="w-6 h-6 flex items-center justify-center text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  className="w-5 h-5 flex items-center justify-center text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};



export const Cart = ({ isOpen, onClose, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const [couponCode, setCouponCode] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    };
  }, [isOpen]);

  const recommendedProducts = [
    {
      id: 'rec1',
      name: 'Alpha Arbutin 2% Face...',
      price: 224.00,
      originalPrice: 249.00,
      image: 'https://sfycdn.speedsize.com/56385b25-4e17-4a9a-9bec-c421c18686fb/https://cdn.shopify.com/s/files/1/0410/9608/5665/files/AlphaArNew.png?v=1721397838',
    },
    {
      id: 'rec2',
      name: 'Niacinamide 10% Face...',
      price: 199.00,
      originalPrice: 249.00,
      image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=500&q=80',
    },
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const originalTotal = cartItems.reduce((sum, item) => sum + (item.originalPrice * item.quantity), 0);
  const savings = originalTotal - subtotal;
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = async () => {
    if (!user) {
      toast.error("Please login to checkout");
      onClose();
      navigate('/login');
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setIsCheckingOut(true);
      const addressData = await getAddressApi();
      const addresses = addressData?.addresses || (Array.isArray(addressData) ? addressData : addressData?.data) || [];
      const defaultAddress = addresses.find(a => a.isDefault);

      if (!defaultAddress) {
        toast.error("Please set a default address in your profile first");
        onClose();
        navigate('/my-addresses');
        return;
      }
      const payload = {
        products: cartItems.map(item => ({
          productId: item.productId || item.id,
          quantity: item.quantity,
          color: item.color || "white",
          size: item.size || "M"
        })),
        shippingAddress: defaultAddress._id,
        billingAddress: defaultAddress._id,
        totalAmount: subtotal,
        paymentMethod: "online",
        shippingCost: subtotal > 1000 ? 0 : 50
      };

      const res = await createOrderApi(payload);
      if (res?.success) {
        toast.success("Order Placed Successfully!");
        onClose();
        navigate('/my-orders');
      } else {
        toast.error(res?.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error(error?.response?.data?.message || "Failed to process checkout");
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/40 transition-opacity duration-300 z-1000 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
        onClick={onClose}
      />
      <div
        className={`fixed rounded-l-3xl top-0 right-0 h-full w-full max-w-sm bg-[#f2f4f7] shadow-2xl z-[1001] transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="h-full flex flex-col rounded-2xl">
          <div className="">
            <div className="flex items-center justify-between p-3 ">
              <h2 className="text-xl font-bold text-gray-900">
                Your Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </h2>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <X className="w-5 h-5 text-gray-900" />
              </button>
            </div>

            <div className="bg-black px-2 py-2 text-xs font-medium text-center rounded-b-2xl
            " style={{backgroundColor:"#7CFF6B"}}>
              Earn 5% MCash with each order (1 MCash = ₹1)
            </div>
          </div>

          <div className="flex-1 mt-5 overflow-y-auto bg-gray-50 px-0 py-0 space-y-4">
            {/* Cart Items */}
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <ShoppingCart className="w-16 h-16 mb-4 text-gray-300" />
                <p className="text-lg font-semibold">Your cart is empty</p>
                <button
                  onClick={() => { onClose(); navigate('/shop'); }}
                  className="mt-4 bg-black text-white px-6 py-2 rounded-full font-bold text-sm hover:bg-gray-800 transition cursor-pointer"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onUpdateQuantity={onUpdateQuantity}
                  onRemove={onRemoveItem}
                />
              ))
            )}

           {cartItems.length > 0 && <CouponSection />}

            {savings > 0 && (
              <div className="bg-[#7CFF6B] py-2.5 mx-2 rounded-lg text-center font-semibold text-sm">
                ₹{savings.toFixed(2)} Saved so far!
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="rounded-2xl border-t border-gray-200 bg-white px-5 py-4 space-y-3">
              {/* Total */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8  bg-[#7CFF6B] rounded flex items-center justify-center">
                    <ShoppingCart className="w-4 h-4 text-white bg-[#7CFF6B] " />
                  </div>
                  <span className="font-bold text-gray-900">Estimated Total</span>
                </div>
                <div className="text-right">
                  {savings > 0 && (
                    <div className="text-gray-400 line-through text-sm">
                      ₹{originalTotal.toFixed(2)}
                    </div>
                  )}
                  <div className="text-2xl font-bold text-gray-900">
                    ₹{subtotal.toFixed(2)}
                  </div>
                  {savings > 0 && (
                    <div className="text-xs font-semibold text-green-600">
                      ({Math.round((savings / originalTotal) * 100)}% OFF)
                    </div>
                  )}
                </div>
              </div>

              <label className="flex items-start gap-2 cursor-pointer">
               <input
  type="checkbox"
  checked={agreeToTerms}
  onChange={(e) => setAgreeToTerms(e.target.checked)}
  className="mt-0.5 w-4 h-4 accent-[#7CFF6B] border-gray-300 rounded focus:ring-2 focus:ring-gray-100 cursor-pointer"
/>
                <span className="text-sm text-gray-700 select-none">
                  I agree to the{' '}
                 <Link to="/terms" className="text-blue-600 underline">T&C</Link>
{' '}&{' '}
<Link to="/privacy" className="text-blue-600 underline">Privacy Notice</Link>
                </span>
              </label>
              <button
                disabled={!agreeToTerms || isCheckingOut || cartItems.length === 0}
                onClick={handleCheckout}
                className="w-full bg-[#7CFF6B] text-black py-3.5 rounded-lg font-bold text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              >
                {isCheckingOut ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <div className="flex items-center justify-between px-3 w-full">
                    <span>Checkout</span>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1.5">
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">P</span>
                        </div>
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">t</span>
                        </div>
                        <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-orange-500">G</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default function CartItemfinal() {
  const [isCartOpen, setIsCartOpen] = useState(true);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchLocalCart = () => {
      const localCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      setCartItems(localCart);
    };
    fetchLocalCart();
    window.addEventListener('cart-updated', fetchLocalCart);
    return () => window.removeEventListener('cart-updated', fetchLocalCart);
  }, []);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items => {
      const updated = items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );
      localStorage.setItem('guestCart', JSON.stringify(updated));
      window.dispatchEvent(new Event('cart-updated'));
      return updated;
    });
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(items => {
      const filtered = items.filter(item => item.id !== itemId);
      localStorage.setItem('guestCart', JSON.stringify(filtered));
      window.dispatchEvent(new Event('cart-updated'));
      toast.success("Item removed from cart");
      return filtered;
    });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gray-100">
     
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">E-Commerce Store</h1>

           
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-black text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 flex items-center gap-2 cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

     
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}
