import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import toast from 'react-hot-toast';

export const addToCartHelper = (product) => {
  const existing = JSON.parse(localStorage.getItem('guestCart') || '[]');

  const price = typeof product.salePrice === 'string'
    ? parseFloat(product.salePrice.replace(/[^\d.]/g, ''))
    : (product.salePrice || product.price || 0);

  const originalPrice = typeof product.originalPrice === 'string'
    ? parseFloat(product.originalPrice.replace(/[^\d.]/g, ''))
    : (product.originalPrice || price);

  const discount = typeof product.discount === 'string'
    ? parseInt(product.discount.replace(/[^\d.]/g, ''))
    : (product.discount || 0);

  const idx = existing.findIndex((i) => i.id === product.id);

  if (idx !== -1) {
    existing[idx].quantity += 1;
  } else {
    existing.push({
      id: product.id,
      productId: product.id,
      name: product.name,
      price,
      originalPrice,
      discount,
      quantity: 1,
      size: 'M',
      color: 'white',
      image: product.image || '',
    });
  }

  localStorage.setItem('guestCart', JSON.stringify(existing));
  window.dispatchEvent(new Event('cart-updated'));
  window.dispatchEvent(new Event('open-cart'));
  toast.success(`${product.name} added to cart! 🛒`, { duration: 2000 });
};

const HeartIcon = ({ filled = false }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" fill={filled ? 'currentColor' : 'none'} className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0113.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const CartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
  </svg>
);

const ProductCard = ({ product, onAddToCart, hideButton = false }) => {
  const navigate = useNavigate();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const inWishlist = isInWishlist(product.id);

  const handleProductClick = () => {
    navigate(`/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  const handleHeartClick = (e) => {
    e.stopPropagation();
    const isAdding = !inWishlist;
    toggleWishlist(product);
    
    if (isAdding) {
      toast.success(`${product.name} added to wishlist! `, { duration: 2000 });
    } else {
      toast.success(`${product.name} removed from wishlist!`, { duration: 2000 });
    }
    
    navigate('/wishlist');
    window.scrollTo(0, 0);
  };

  const handleEyeClick = (e) => {
    e.stopPropagation();
    navigate(`/product/${product.id}`);
    window.scrollTo(0, 0);
  };

  return (
    <div
      onClick={handleProductClick}
      className={`group shrink-0 snap-start cursor-pointer w-full bg-[#f9f9f9] border border-gray-200 rounded-2xl hover:bg-white hover:shadow-md hover:border-gray-300 hover:-translate-y-1 transition-all duration-500 ease-out relative overflow-hidden flex flex-col mx-auto ${hideButton ? 'min-h-40' : 'h-auto min-h-80 md:min-h-88'}`}
    >
      <div className={`flex-1 flex flex-col ${hideButton ? 'pt-2 px-2 pb-1.5' : 'pt-3 px-3 sm:px-6 md:px-8 pb-3'}`}>

        <div className="mb-1.5 pr-12">
          <h3 className="font-extrabold text-black group-hover:text-[#5c2a18] text-xs sm:text-sm md:text-base lg:text-lg leading-tight uppercase tracking-tight line-clamp-2 transition-colors duration-300">
            {product.name}
          </h3>
          <p className={`font-semibold text-gray-400 mt-0.5 capitalize ${hideButton ? 'text-[10px]' : 'text-[10px] sm:text-xs'}`}>
            {product.category}
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center relative mb-2 w-full overflow-hidden rounded-xl bg-white/50">
          <img
            src={product.image}
            alt={product.name}
            className={`w-full h-full object-cover md:w-auto md:max-h-80 md:object-contain pointer-events-none transition-all duration-700 ease-out group-hover:-translate-y-3 group-hover:scale-105 ${hideButton ? 'h-14 sm:h-24 md:h-32' : 'h-20 sm:h-32 md:h-36 lg:h-44'}`}
          />
          <div className="absolute right-2 top-2 flex-col gap-3 hidden sm:flex opacity-0 translate-x-8 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-400 ease-out z-20">
            {[
              {
                icon: <HeartIcon filled={inWishlist} />,
                hover: inWishlist ? 'hover:text-red-500' : 'hover:text-red-500',
                onClick: handleHeartClick,
                bgColor: inWishlist ? 'bg-red-50' : 'bg-white'
              },
              { icon: <RefreshIcon />, hover: 'hover:text-blue-500', onClick: (e) => e.stopPropagation() },
              { icon: <EyeIcon />, hover: 'hover:text-black', onClick: handleEyeClick },
            ].map((btn, i) => (
              <button
                key={i}
                onClick={btn.onClick}
                className={`w-10 h-10 ${btn.bgColor} border border-gray-200 rounded-full flex items-center justify-center text-gray-600 shadow-sm transition-all duration-300 hover:scale-110 hover:shadow-md ${btn.hover}`}
              >
                {btn.icon}
              </button>
            ))}
          </div>
        </div>
        <div className="mb-12 md:mb-0.5 lg:-mt-3 pt-0.5 sm:pt-0.5 md:pt-0 pl-0 md:pl-2 transition-transform duration-500 ease-out group-hover:-translate-y-8 lg:group-hover:-translate-y-12 group-hover:-translate-x-1">
          <span className={`font-semibold text-black tracking-tight block ${hideButton ? 'text-xs' : 'text-sm sm:text-base md:text-lg lg:text-xl'}`}>
            {product.salePrice}
          </span>
        </div>
      </div>


      <button
        onClick={(e) => {
          e.stopPropagation();

          if (onAddToCart) onAddToCart(product);
          else addToCartHelper(product);
        }}
        className={`absolute bottom-0 left-0 w-full cursor-pointer bg-[#83ff61] hover:bg-[#72f050] active:bg-[#5ed93a] text-black font-black uppercase text-xs sm:text-sm py-2.5 sm:py-3 md:py-4 px-3 sm:px-6 tracking-wider flex items-center justify-between rounded-b-2xl transition-all duration-300 sm:translate-y-full sm:group-hover:translate-y-0 translate-y-0 z-30 hover:scale-[1.01] ${hideButton ? 'hidden' : ''}`}
      >
        <span>Add To Cart</span>
        <CartIcon />
      </button>
    </div>
  );
};

export default memo(ProductCard);