import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronRight, Menu, X } from 'lucide-react';
import ProductCard from '../Card/ProductCard';
import { allProductsData, productCategories } from '../../AllWebsiteData/allProducts';

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');


  const getCategoryFromUrl = (param) => {
    if (!param) return 'WHEY PROTEIN';
    const categoryMap = {
      'lean-muscle': 'LEAN MUSCLE',
      'gain-mass': 'MASS GAINER',
      'lose-weight': 'FAT BURNER',
      'strength': 'PRE-WORKOUT',
      'build-muscle': 'MUSCLE BUILDER',
      'recovery': 'RECOVERY'
    };
    return categoryMap[param] || 'WHEY PROTEIN';
  };

  const [selectedCategory, setSelectedCategory] = useState(() => getCategoryFromUrl(categoryParam));

  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showMobileFilter, setShowMobileFilter] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);

  const minLimit = 0;
  const maxLimit = 5000;

  const minPercent = ((priceRange[0] - minLimit) / (maxLimit - minLimit)) * 100;
  const maxPercent = ((priceRange[1] - minLimit) / (maxLimit - minLimit)) * 100;

  useEffect(() => {
    const newCategory = getCategoryFromUrl(categoryParam);
    setSelectedCategory(newCategory);
  }, [categoryParam]);

  const filteredProducts = useMemo(() => {
    let filtered = allProductsData.filter(product => {
      const price = parseInt(product.salePrice?.replace(/[₹,]/g, '') || 0);
      if (showAllProducts) {
        return price >= priceRange[0] && price <= priceRange[1];
      }
      return product.category === selectedCategory && price >= priceRange[0] && price <= priceRange[1];
    });

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.salePrice?.replace(/[₹,]/g, '') || 0);
          const priceB = parseInt(b.salePrice?.replace(/[₹,]/g, '') || 0);
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = parseInt(a.salePrice?.replace(/[₹,]/g, '') || 0);
          const priceB = parseInt(b.salePrice?.replace(/[₹,]/g, '') || 0);
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  }, [selectedCategory, showAllProducts, priceRange, sortBy]);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 md:px-8 lg:px-16 py-4 text-sm text-gray-600">
        <span>Home</span> / <span>Products</span>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">
          <span className="text-gray-400 uppercase">All  </span>
          <span className="text-black uppercase">Products</span>
        </h1>



        <div className="flex flex-col lg:flex-row gap-8">

          <aside className="w-full lg:w-64 shrink-0">
            <div className="bg-gray-50 rounded-2xl p-5 lg:p-6 lg:sticky lg:top-20 flex flex-col md:flex-row lg:flex-col gap-6 md:gap-8">


              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-base lg:text-lg mb-3 lg:mb-4 text-gray-800">
                  CATEGORIES
                </h3>


                <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 pb-2 md:pb-0 flex lg:flex-col gap-2.5 lg:space-y-3 whitespace-nowrap lg:whitespace-normal">
                  {productCategories.map((category) => {
                    const isActive = selectedCategory === category;
                    return (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-xl lg:rounded-lg font-semibold text-sm transition-all text-left w-auto lg:w-full ${isActive
                            ? 'bg-[#72f050] text-black shadow-sm'
                            : 'bg-white text-gray-600 hover:bg-gray-100 border lg:border-0 border-gray-200'
                          }`}
                      >
                        {category}
                      </button>
                    );
                  })}

              
<div className="flex-1 min-w-0">
  <h3 className="font-bold text-base lg:text-lg mb-4 text-gray-800">
    PRICE RANGE
  </h3>

  <div className="space-y-4">
    <div className="relative w-full h-5 flex items-center">
    
      <div className="absolute inset-x-0 h-1 bg-gray-200 rounded-full"></div>
      <div
        className="absolute h-1 bg-[#72f050] rounded-full"
        style={{
          left: `${minPercent}%`,
          right: `${100 - maxPercent}%`,
        }}
      ></div>

  <input
                  type="range"
                  min={minLimit}
                  max={maxLimit}
                  value={priceRange[0]}
                  onChange={(e) => {
                    const value = Math.min(Number(e.target.value), priceRange[1] - 1);
                    setPriceRange([value, priceRange[1]]);
                    setCurrentPage(1);
                  }}
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 focus:outline-none custom-slider"
                />

                <input
                  type="range"
                  min={minLimit}
                  max={maxLimit}
                  value={priceRange[1]}
                  onChange={(e) => {
                    const value = Math.max(Number(e.target.value), priceRange[0] + 1);
                    setPriceRange([priceRange[0], value]);
                    setCurrentPage(1);
                  }}
                  className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 focus:outline-none custom-slider"
                />
    </div>

    <div className="flex justify-between text-sm font-semibold text-gray-700">
      <span>₹{priceRange[0]}</span>
      <span>₹{priceRange[1]}</span>
    </div>
  </div>
</div>
                </div>
              </div>




            </div>
          </aside>

          <main className="flex-1">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-8">
              <p className="text-gray-600">
                Showing <span className="font-bold">{filteredProducts.length}</span> products
              </p>
              <div className="flex gap-4 items-center w-full lg:w-auto">

                <button
                  onClick={() => setShowMobileFilter(true)}
                  className="lg:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-semibold"
                >
                  <Menu size={20} />
                  Filter
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-lg px-4 py-2 text-sm flex-1 lg:flex-none"
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 lg:gap-6 mb-12">
              {filteredProducts.slice(0, 6).map((product) => (
                <div key={product.id} className="flex justify-center">
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {filteredProducts.length > 6 && !showAllProducts && (
              <div>
                <h3 className="font-bold text-lg mb-6">More Products</h3>
                <div className="overflow-x-auto -mx-4 px-4 md:-mx-8 md:px-8 lg:-mx-8 lg:px-8">
                  <div className="flex gap-3 md:gap-4 lg:gap-6 pb-4">
                    {filteredProducts.slice(6).map((product) => (
                      <div key={product.id} className="shrink-0 w-40 sm:w-48 md:w-56 lg:w-64">
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {showAllProducts && (
              <div className="grid grid-cols-2 gap-2 sm:gap-3 md:gap-4 lg:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No products found</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {showMobileFilter && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setShowMobileFilter(false)}
          />

          <div
            className="fixed left-0 top-0 h-full w-80 max-w-full bg-white z-50 lg:hidden overflow-y-auto transform transition-transform duration-300 ease-out"
            style={{ transform: showMobileFilter ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="font-bold text-lg">FILTERS</h2>
              <button onClick={() => setShowMobileFilter(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-4">CATEGORIES</h3>
                <div className="space-y-3">
                  {productCategories.map((category) => (
                    <label key={category} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category}
                        checked={selectedCategory === category}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setShowMobileFilter(false);
                        }}
                        className="w-4 h-4 accent-black"
                      />
                      <span className={`ml-3 text-sm ${selectedCategory === category ? 'font-bold text-black' : 'text-gray-600'
                        }`}>
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>


              <div>
                <h3 className="font-bold text-lg mb-4">PRICE RANGE</h3>
                <div className="space-y-4">
                  <div className="relative w-full h-5 flex items-center">
                    <div className="absolute inset-x-0 h-1 bg-gray-200 rounded-full z-0"></div>
                    <div
                      className="absolute h-1 bg-black z-10"
                      style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
                    ></div>

                    <input
                      type="range"
                      min={minLimit}
                      max={maxLimit}
                      step="100"
                      value={priceRange[0]}
                      onChange={(e) => {
                        const val = Math.min(Number(e.target.value), priceRange[1] - 100);
                        setPriceRange([val, priceRange[1]]);
                      }}
                      className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 focus:outline-none custom-slider"
                    />

                    <input
                      type="range"
                      min={minLimit}
                      max={maxLimit}
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => {
                        const val = Math.max(Number(e.target.value), priceRange[0] + 100);
                        setPriceRange([priceRange[0], val]);
                      }}
                      className="absolute w-full h-1 bg-transparent appearance-none pointer-events-none z-20 focus:outline-none custom-slider"
                    />
                  </div>
                  <div className="flex justify-between text-sm font-semibold text-gray-700">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <style>{`
        .custom-slider::-webkit-slider-thumb {
          appearance: none;
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #000000;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        .custom-slider::-moz-range-thumb {
          pointer-events: auto;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background-color: #000000;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default AllProducts;