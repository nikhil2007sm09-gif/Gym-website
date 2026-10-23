import React from 'react';
import { useWishlist } from '../../context/WishlistContext';
import ProductCard from '../Card/ProductCard';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';

const WishlistItems = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  const handleRemove = (product) => {
    removeFromWishlist(product.id);
    toast.success(`${product.name} removed from wishlist!`, { duration: 2000 });
  };

  if (wishlist.length === 0) {
    return (
      <div className="w-full px-4 md:px-6 lg:px-8 py-16 md:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto flex flex-col items-center justify-center text-center">
          <p className="text-gray-500 text-base md:text-lg">
            Don't have product in Wishlist
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-black text-black mb-8 md:mb-12">
          My Wishlist ({wishlist.length} items)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {wishlist.map((product) => (
            <div key={product.id} className="w-full relative group">
              <button
                onClick={() => handleRemove(product)}
                className="absolute top-3 right-3 z-50 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-all duration-300 shadow-lg opacity-0 group-hover:opacity-100"
                title="Remove from wishlist"
              >
                <FiX size={20} className="stroke-2" />
              </button>
              <ProductCard product={product} hideButton={false} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistItems;
