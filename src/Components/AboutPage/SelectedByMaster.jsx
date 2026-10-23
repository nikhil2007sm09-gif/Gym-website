import React from 'react';

const SelectedByMaster = () => {
  const testimonials = [
    {
      id: 1,
      name: "John Mitchell",
      title: "Master Tea Taster",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop",
      subtitle: "AMAZING PEOPLE",
      heading: "SELECTED BY A MASTER TEA TASTER",
      description: "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
      additionalText: "Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis ullamco cilium dolor. Voluptate exercitation incididunt aliquo deserunt reprehenderit elit laborum.",
      ctaText: "Our Team"
    }
  ];

  const team = testimonials[0];

  return (
    <section className="w-full py-12 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
     
      <div className="max-w-7xl mx-auto">
      
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-16 items-center">
          
      
          <div className="flex justify-center md:justify-start order-2 md:order-1">
            <div className="relative w-full max-w-sm">
          
              <div className="relative">
              
                <div className="absolute inset-0 bg-[linear-gradient(to_bottom_right,#e5e7eb,#d1d5db)] rounded-full -z-10"></div>
                
               
                <img
                  src={team.image}
                  alt={team.name}
                  className="w-full aspect-square object-cover rounded-full border-8 border-white shadow-2xl"
                />
              </div>

            
              <div className="absolute -bottom-6 -right-6 flex gap-2 md:gap-3">
           
                <div className="w-20 md:w-24 h-28 md:h-32 bg-white rounded-lg shadow-xl border-4 border-gray-100 overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1585707216270-7ffeb69c6cbe?w=100&h=150&fit=crop"
                    alt="Product 1"
                    className="w-full h-full object-cover"
                  />
                </div>
                
          
                <div className="w-20 md:w-24 h-28 md:h-32 bg-white rounded-lg shadow-xl border-4 border-gray-100 overflow-hidden transform -translate-y-2">
                  <img
                    src="https://images.unsplash.com/photo-1631944949149-f84e2f0c2d0e?w=100&h=150&fit=crop"
                    alt="Product 2"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          
          <div className="order-1 md:order-2 text-center md:text-left">
        
            <p className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-600 mb-3 md:mb-4">
              {team.subtitle}
            </p>

            <h2 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-black text-black leading-tight uppercase mb-6 md:mb-8">
              {team.heading}
            </h2>

        
            <div className="w-12 h-1.5 bg-green-500 rounded-full mb-6 md:mb-8 mx-auto md:mx-0"></div>

            <p className="text-sm md:text-base text-gray-700 leading-relaxed mb-4 md:mb-5 font-medium">
              {team.description}
            </p>

          
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mb-8 md:mb-10">
              {team.additionalText}
            </p>

         
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center md:justify-start">
              <button className="px-8 md:px-10 py-3 md:py-4 bg-black hover:bg-gray-900 text-white font-black text-sm md:text-base uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                {team.ctaText}
              </button>
              
              <button className="px-8 md:px-10 py-3 md:py-4 border-2 border-black hover:bg-black/5 text-black font-black text-sm md:text-base uppercase tracking-wider rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95">
                Learn More
              </button>
            </div>

          
            <div className="mt-10 md:mt-12 pt-8 md:pt-10 border-t border-gray-300">
              <p className="text-xs md:text-sm font-bold text-gray-900 uppercase tracking-wider">
                {team.name}
              </p>
              <p className="text-xs md:text-sm text-gray-600 font-semibold mt-1">
                {team.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedByMaster;
