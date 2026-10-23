import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../Card/ProductCard';
import { allProductsData } from '../../AllWebsiteData/allProducts';

const RelatedProducts = () => {
  const sectionRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(1);

  const relatedProductsData = allProductsData.slice(3, 12);

  const handleResize = () => {
    if (window.innerWidth < 768) {
      setItemsPerSlide(1); 
    } else if (window.innerWidth < 1024) {
      setItemsPerSlide(2);
    } else {
      setItemsPerSlide(4); 
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
 
  useEffect(() => {
    const totalSlides = Math.ceil(relatedProductsData.length / itemsPerSlide);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [itemsPerSlide, relatedProductsData.length]);

  const totalSlides = Math.ceil(relatedProductsData.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 lg:py-20 px-4 md:px-8 lg:px-16 bg-gray-50">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight mb-12 text-center">
        <span className="text-gray-400">RELATED </span>
        <span className="text-black">PRODUCTS</span>
      </h2>

      <div className="relative max-w-7xl mx-auto">   
        <button
          onClick={prevSlide}
          className="absolute left-0 md:-left-12 lg:-left-16 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-200 text-black rounded-full p-2 md:p-3 lg:p-4 transition-all shadow-lg"
          aria-label="Previous products"
        >
          <ChevronLeft size={24} />
        </button>
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out gap-0 sm:gap-4 md:gap-2"
            style={{
              transform: `translateX(-${currentIndex * (100 / itemsPerSlide)}%)`,
            }}
          >
            {relatedProductsData.map((product) => (
              <div
                key={product.id}
                className="shrink-0"
                style={{ width: `${100 / itemsPerSlide}%` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {totalSlides > 1 && (
          <button
            onClick={nextSlide}
            className="absolute right-0 md:-right-12 lg:-right-16 top-1/2 -translate-y-1/2 z-20 bg-white hover:bg-gray-200 text-black rounded-full p-2 md:p-3 lg:p-4 transition-all shadow-lg"
            aria-label="Next products"
          >
            <ChevronRight size={24} />
          </button>
        )}
      </div>
    </section>
  );
};

export default RelatedProducts;
