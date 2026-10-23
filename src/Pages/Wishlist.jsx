import React from 'react';
import WishlistHero from '../Components/Wishlist/WishlistHero';
import WishlistItems from '../Components/Wishlist/WishlistItems';


const WishlistPage = () => {
  return (
    <div className="w-full">
      <WishlistHero />
      <WishlistItems/>
    </div>
  );
};

export default WishlistPage;
