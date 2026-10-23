import React from 'react';
import { FiTruck, FiGift, FiShoppingCart, FiSmile } from 'react-icons/fi';

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      icon: FiTruck,
      title: "FAST DELIVERY",
      description: "Quick dispatch",
      color: "#000000"
    },
    {
      id: 2,
      icon: FiGift,
      title: "FREE GIFT",
      description: "$150+ Orders",
      color: "#000000"
    },
    {
      id: 3,
      icon: FiShoppingCart,
      title: "CLICK & COLLECT",
      description: "Local stores",
      color: "#000000"
    },
    {
      id: 4,
      icon: FiSmile,
      title: "HAPPY CUSTOMERS",
      description: "2M+ Strong",
      color: "#000000"
    }
  ];

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
      
      <div className="max-w-7xl mx-auto">
       
        <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4 md:gap-6 lg:gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.id}
                className="flex flex-col items-center text-center group hover:bg-gray-50 p-2 sm:p-4 md:p-6 lg:p-8 rounded-lg transition-all duration-300"
              >
                
                <div className="mb-2 sm:mb-3 md:mb-4 lg:mb-6">
                  <div className="w-12 sm:w-14 md:w-16 lg:w-20 h-12 sm:h-14 md:h-16 lg:h-20 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-green-100 transition-colors duration-300">
                    <Icon
                      size={28}
                      strokeWidth={1.5}
                      className="text-black group-hover:text-green-600 transition-colors duration-300 sm:w-8 md:w-9 lg:w-9"
                    />
                  </div>
                </div>

              
                <h3 className="text-xs sm:text-sm md:text-base font-black uppercase tracking-wider text-black mb-1 group-hover:text-green-600 transition-colors duration-300">
                  {feature.title}
                </h3>

               
                <p className="text-[10px] sm:text-xs md:text-sm text-gray-500 font-medium leading-tight sm:leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs ;
