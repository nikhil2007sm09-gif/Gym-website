import React, { useState, useEffect, useRef } from 'react';
import { customerTestimonialsData } from '../../AllWebsiteData/allData';

const StarIcon = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const CustomerLoveUs = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const [itemsPerSlide, setItemsPerSlide] = useState(() => {
    const w = window.innerWidth;
    if (w < 640) return 1;
    if (w < 1024) return 2;
    return 4;
  });
  const touchStartX = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setItemsPerSlide(1);
      else if (w < 1024) setItemsPerSlide(2);
      else setItemsPerSlide(4);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalSlides = Math.ceil(customerTestimonialsData.length / itemsPerSlide);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, totalSlides - 1));
  }, [totalSlides]);

  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(timer);
  }, [totalSlides]);

  const next = () => setCurrentIndex((p) => (p + 1) % totalSlides);
  const prev = () => setCurrentIndex((p) => (p - 1 + totalSlides) % totalSlides);

  const onTouchStart = (e) => { touchStartX.current = e.changedTouches[0].clientX; };
  const onTouchEnd = (e) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  };

  const cardWidth = 100 / itemsPerSlide;

  const translateX = currentIndex * 100;

  return (
    <section className="w-full py-10 sm:py-14 lg:py-20 bg-gray-900 relative overflow-hidden">
  
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at top left, rgba(20,83,45,0.12) 0%, transparent 60%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">

        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">
            <span className="text-white">CUSTOMER </span>
            <span className="text-gray-400">LOVE US</span>
          </h2>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <p className="text-gray-400 text-sm">Excellent</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-400 text-sm">2000+ customers</p>
          </div>
        </div>

        <div className="relative">

          {totalSlides > 1 && (
            <button
              onClick={prev}
              aria-label="Previous"
              className="absolute -left-2 sm:-left-4 lg:-left-6 top-1/2 -translate-y-1/2 z-20
                         w-8 h-8 sm:w-10 sm:h-10
                         bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-xl
                         flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          <div
            className="overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >

            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${translateX}%)` }}
            >
              {customerTestimonialsData.map((t) => (
                <div
                  key={t.id}
               
                  style={{ width: `${cardWidth}%`, flexShrink: 0 }}
                  className="px-2 py-1"
                >
                  <div
                    className="bg-gray-800 border border-gray-700 rounded-xl sm:rounded-2xl
                               p-4 sm:p-5
                               flex flex-col justify-between h-full min-h-50 sm:min-h-50
                               hover:border-gray-500 hover:shadow-lg hover:shadow-black/30
                               transition-all duration-300"
                  >
               
                    <div>
                      <div className="flex gap-1 mb-2">
                        {[...Array(t.rating)].map((_, i) => (
                          <StarIcon key={i} className="w-4 h-4 text-orange-400" />
                        ))}
                      </div>
                      <h3 className="text-sm sm:text-base font-semibold text-white mb-1 line-clamp-1">
                        {t.title}
                      </h3>
                      <p className="text-gray-300 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                        {t.review}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-gray-700 mt-3">
                      <div>
                        <p className="text-white font-medium text-xs sm:text-sm">{t.name}</p>
                        <p className="text-gray-500 text-xs">{t.date}</p>
                      </div>
                      {t.verified && (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {totalSlides > 1 && (
            <button
              onClick={next}
              aria-label="Next"
              className="absolute -right-2 sm:-right-4 lg:-right-6 top-1/2 -translate-y-1/2 z-20
                         w-8 h-8 sm:w-10 sm:h-10
                         bg-white hover:bg-gray-100 text-gray-800 rounded-full shadow-xl
                         flex items-center justify-center transition-all duration-200 hover:scale-110"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}
        </div>

        {totalSlides > 1 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalSlides }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? 'bg-white w-6'
                    : 'bg-gray-600 w-2 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerLoveUs;