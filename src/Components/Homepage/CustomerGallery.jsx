import { useState, useEffect } from 'react';
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';

export default function CustomerGallery() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const galleryImages = [
    { id: 1, url: 'https://ap-nutreko.myshopify.com/cdn/shop/files/Rectangle_27_fa310fef-e471-4a33-a5fc-333ad8497bc1.png?v=1731084039&width=2000', alt: 'Customer 1' },
    { id: 2, url: 'https://ap-nutreko.myshopify.com/cdn/shop/files/Rectangle_28_416ffc80-039d-4ded-a6a3-7e596ee4eed0.png?v=1731083989&width=2000', alt: 'Customer 2' },
    { id: 3, url: 'https://ap-nutreko.myshopify.com/cdn/shop/files/image_1_43429f56-14ca-43f8-a90c-75551dd17858.png?v=1731083996&width=2000', alt: 'Customer 3' },
    { id: 4, url: 'https://ap-nutreko.myshopify.com/cdn/shop/files/image_2_346d9aef-7321-4044-b78c-5de35c191df2.png?v=1731084028&width=2000', alt: 'Customer 4' },
    { id: 5, url: 'https://ap-nutreko.myshopify.com/cdn/shop/files/image_3_f9a7d833-1d8c-4068-9984-132f7f1e2451.png?v=1731084024&width=2000', alt: 'Customer 5' },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const openGallery = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeGallery = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 300);
  };

  const nextImage = () => setCurrentIndex((p) => (p + 1) % galleryImages.length);
  const prevImage = () => setCurrentIndex((p) => (p - 1 + galleryImages.length) % galleryImages.length);

  return (
    <section className="w-full py-10 sm:py-14 lg:py-16 px-4 sm:px-6 lg:px-10 bg-white">

      {/* <div className="text-center mb-6 sm:mb-10 lg:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-black mb-2">
          Customer Moments
        </h2>
        <p className="text-gray-500 text-sm sm:text-base">
          Check out our amazing community in action
        </p>
      </div> */}

      <div className="grid grid-cols-2 gap-3 sm:hidden">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openGallery(index)}
            className={`relative cursor-pointer overflow-hidden rounded-2xl aspect-square ${index === 4 ? 'col-span-2' : ''
              }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
              <FiImage size={28} className="text-white drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>


      <div className="hidden sm:grid md:hidden grid-cols-3 gap-4">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openGallery(index)}
            className={`relative group cursor-pointer overflow-hidden rounded-2xl aspect-square ${index === 3 ? 'col-span-2' : index === 4 ? 'col-span-1' : ''
              }`}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <FiImage size={32} className="text-white drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>


      <div className="hidden md:grid md:grid-cols-5 gap-4 lg:gap-6">
        {galleryImages.map((image, index) => (
          <div
            key={image.id}
            onClick={() => openGallery(index)}
            className="relative group cursor-pointer overflow-hidden rounded-2xl lg:rounded-3xl aspect-square"
          >
            <img
              src={image.url}
              alt={image.alt}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <FiImage size={40} className="text-white drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>


      {isOpen && (
        <div
          className={`fixed inset-0 bg-black z-[9999] flex items-center justify-center p-3 sm:p-6 ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'hidden'
          }}
        >
          <div className="w-full h-full flex flex-col items-center justify-center max-w-5xl mx-auto">

            <button
              onClick={closeGallery}
              className="absolute top-3 right-3 sm:top-6 sm:right-6 bg-white text-black rounded-full p-2 sm:p-3 hover:bg-gray-200 transition-all duration-300 shadow-lg z-50 cursor-pointer hover:scale-110 active:scale-95"
              aria-label="Close gallery"
            >
              <FiX size={20} className="sm:w-6 sm:h-6" />
            </button>

            <div className="relative w-full flex items-center justify-center flex-1 mb-4 max-h-[75vh]">
              <div className="w-full max-w-3xl relative h-full flex items-center justify-center">
                <img
                  key={currentIndex}
                  src={galleryImages[currentIndex].url}
                  alt={galleryImages[currentIndex].alt}
                  className="w-full h-auto max-h-[60vh] sm:max-h-[70vh] object-contain rounded-xl sm:rounded-2xl shadow-2xl animate-scaleIn"
                />

                <div className="absolute top-3 left-3 sm:top-5 sm:left-5 bg-[#7CFF6B] text-black px-3 py-1 rounded-full text-xs sm:text-sm font-bold shadow-lg">
                  {currentIndex + 1} / {galleryImages.length}
                </div>
              </div>

              <button
                onClick={prevImage}
                className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 sm:p-3 hover:bg-[#7CFF6B] transition-all duration-300 shadow-lg z-10 cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <FiChevronLeft size={20} className="sm:w-7 sm:h-7" />
              </button>


              <button
                onClick={nextImage}
                className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 bg-white text-black rounded-full p-2 sm:p-3 hover:bg-[#7CFF6B] transition-all duration-300 shadow-lg z-10 cursor-pointer hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <FiChevronRight size={20} className="sm:w-7 sm:h-7" />
              </button>
            </div>


            <div className="flex justify-center gap-2 sm:gap-3 px-4 py-2 w-full" style={{ overflowX: 'auto', overflowY: 'hidden' }}>
              <div className="flex gap-2 sm:gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={image.id}
                    onClick={() => setCurrentIndex(index)}
                    className={`flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 cursor-pointer ${currentIndex === index
                      ? 'border-[#7CFF6B] scale-105 shadow-lg'
                      : 'border-gray-600 hover:border-[#7CFF6B] opacity-60 hover:opacity-100'
                      }`}
                    aria-label={`Go to image ${index + 1}`}
                  >
                    <img
                      src={image.url}
                      alt={image.alt}
                      className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm mt-3 text-center">
              Click thumbnails or use arrow buttons to navigate
            </p>
          </div>

          <style jsx>{`
            @keyframes fadeIn {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
            
            @keyframes fadeOut {
              from {
                opacity: 1;
              }
              to {
                opacity: 0;
              }
            }
            
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
              }
            }
            
            .animate-fadeIn {
              animation: fadeIn 0.3s ease-out;
            }
            
            .animate-fadeOut {
              animation: fadeOut 0.3s ease-out;
            }
            
            .animate-scaleIn {
              animation: scaleIn 0.4s ease-out;
            }
          `}</style>
        </div>
      )}
    </section>
  );
}
