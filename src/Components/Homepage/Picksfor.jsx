import { useState, useRef } from 'react';
import ProductCard from '../Card/ProductCard';
import { allProductsData, productCategories } from '../../AllWebsiteData/allProducts';
import { Link } from 'react-router-dom';

const PicksForYou = () => {
  const [selectedCategory, setSelectedCategory] = useState(productCategories[0]);
  const sliderRef = useRef(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const categoryProducts = allProductsData
    .filter(product => product.category === selectedCategory)
    .slice(0, 8);

  const onMouseDown = (e) => {
    setIsDown(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const onMouseUpOrLeave = () => setIsDown(false);

  const onMouseMove = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    sliderRef.current.scrollLeft = scrollLeft - (x - startX) * 1.6;
  };

  return (
    <section className="container mx-auto py-10 px-2 md:px-0">
      <div className=" ">
        <div className="mb-10 select-none">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase leading-none">
            <span className="text-black">Top Picks </span>
            <span className="text-gray-400 font-bold">For You</span>
          </h2>
        </div>
        <div className="md:hidden mx-2 mb-6 overflow-x-auto px-4">
          <div className="flex gap-2 pb-3 min-w-min">
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full font-bold text-xs uppercase tracking-wide transition-all duration-300 whitespace-nowrap ${selectedCategory === category
                    ? 'bg-green-500 text-black shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>


        <div className="flex gap-4 md:gap-6 lg:gap-8">


          <div className="hidden md:flex flex-col gap-2 w-full md:w-auto shrink-0">
            {productCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`group relative px-4 md:px-6 lg:px-8 py-3 md:py-2.5 lg:py-3 rounded-full font-bold text-xs md:text-sm lg:text-base uppercase tracking-wide transition-all duration-300 whitespace-nowrap flex items-center justify-between w-full md:w-auto ${selectedCategory === category
                    ? 'bg-[#7CFF6B] text-black shadow-lg'
                    : 'bg-[#7CFF6B] text-gray-700 hover:bg-gray-200'
                  }`}
              >
                <span>{category}</span>
                {selectedCategory === category && (
                  <svg className="w-5 h-5 md:w-4 md:h-4 ml-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>

          <div className="flex-1 w-full">


            <div className="hidden md:block">
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
  {categoryProducts.map((product) => (
    <div key={product.id} className="w-full max-w-75">
      <ProductCard product={product} />
    </div>
  ))}
</div>
            </div>

            <div className="md:hidden">
              <div
                className={`overflow-hidden ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
                onMouseDown={onMouseDown}
                onMouseLeave={onMouseUpOrLeave}
                onMouseUp={onMouseUpOrLeave}
                onMouseMove={onMouseMove}
              >
                <div
                  ref={sliderRef}
                  className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden pb-2"
                >
                  {categoryProducts.map((product) => (
                    <div
                      key={product.id}
                      className="shrink-0 w-48 sm:w-56 md:w-64 lg:w-72"
                    >
                      <ProductCard product={product} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {categoryProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found in this category</p>
              </div>
            )}
          </div>

        </div>


        <div className="flex justify-center mt-10 md:mt-12">
      <Link
  to="/allproducts"
  onClick={() => window.scrollTo(0, 0)} 
  className="px-6 md:px-8 py-2.5 md:py-3 bg-white hover:bg-[#76FF58] text-black hover:text-black font-bold text-xs md:text-sm uppercase tracking-wide rounded-full border border-gray-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl inline-block text-center"
>
  View All Products
</Link>
        </div>
      </div>
    </section>
  );
};

export default PicksForYou;
