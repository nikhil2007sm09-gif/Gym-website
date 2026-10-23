import React, { useEffect, useRef, useState } from 'react';

const ESNHeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="container mx-auto "
    >
      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-on-scroll {
          opacity: 0;
          animation: none;
        }

        .animate-on-scroll.active {
          animation: slideInLeft 0.8s ease-out forwards;
        }

        .animate-on-scroll.active .subtitle {
          animation: fadeInUp 0.6s ease-out 0.1s forwards;
        }

        .animate-on-scroll.active .heading {
          animation: fadeInUp 0.8s ease-out 0.2s forwards;
        }

        .animate-on-scroll.active .description {
          animation: fadeInUp 0.8s ease-out 0.3s forwards;
        }

        .animate-on-scroll.active .button {
          animation: fadeInUp 0.8s ease-out 0.4s forwards;
        }

        .image-animate {
          opacity: 0;
        }

        .image-animate.active {
          animation: slideInRight 0.8s ease-out 0.2s forwards;
        }

        .subtitle {
          opacity: 0;
        }

        .heading {
          opacity: 0;
        }

        .description {
          opacity: 0;
        }

        .button {
          opacity: 0;
        }
      `}</style>

      <div className={`grid lg:grid-cols-2 gap-4 lg:gap-6 items-center animate-on-scroll ${isVisible ? 'active' : ''}`}>

        <div className="mx-auto">
        <p className="text-center md:text-left text-base sm:text-lg md:text-xl tracking-widest text-gray-500 font-medium subtitle">
  TRUSTED SINCE 1983
</p>

          <h1 className="text-xl md:text-left text-center   lg:text-6xl leading-tight font-bold text-gray-900 heading">
            <span className="text-gray-400">DEPENDABLE<br />PRODUCTS</span>
            <br />
            <span className="text-black">EXCEPTIONAL<br />SERVICE</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-lg description px-3 md:px-0">
            For 20 years, we have helped individuals like you achieve various health and fitness goals by offering top-quality dietary and nutritional supplements, coupled with unparalleled personalized attention.
          </p>

          <button
            className="bg-white text-black px-16 py-4 rounded-full font-medium hover:border-transparent active:scale-95 transition-all duration-300 button"
            onMouseEnter={e => e.currentTarget.style.backgroundColor = "#76FF58"}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}
          >
            Get Started
          </button>

        </div>
        <div className={`px-2 md:px-0 relative image-animate  ${isVisible ? 'active' : ''}`}>
          <img
            src="https://ap-nutreko.myshopify.com/cdn/shop/files/Mask_group_30.png?v=1731143276"
            alt="ESN Premium Supplements Collection"
            className="w-full h-auto rounded-3xl shadow-2xl object-cover max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto lg:mx-0 lg:ml-auto"
          />

          <div className="absolute inset-0 rounded-3xl pointer-events-none" />
        </div>

      </div>
    </div>
  );
};

export default ESNHeroSection;
