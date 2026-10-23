import React from 'react';

export default function UltimateExperience() {
    return (
        <section className="w-full bg-white py-10 px-4 sm:px-8 md:px-12 lg:px-16 mx-auto font-sans">
          
            <div className="text-center mb-6">
            <h2 className="text-[34px] md:text-[64px] font-900 font-bold tracking-tighter text-black uppercase leading-[1.1] max-w-xl md:max-w-3xl mx-auto">
    THE ULTIMATE TEA <br /> EXPERIENCE
</h2>
            </div>

           
            <div className="w-full relative aspect-video md:aspect-video lg:aspect-video rounded-3xl overflow-hidden shadow-md bg-gray-900 group">
               
                <img 
                    src="https://ap-nutreko.myshopify.com/cdn/shop/files/Mask_group_11.png?v=1727949083&width=1400" 
                    alt="The Ultimate Experience Banner" 
                    className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                    loading="lazy"
                />

           
                <div className="absolute inset-0 background-image: linear-gradient(
  to top,
  rgb(0 0 0 / 0.2),
  rgb(0 0 0 / 0.1),
  rgb(0 0 0 / 0.2)
); pointer-events-none" />
                <div className="absolute inset-0 bg-black/5 pointer-events-none" />

            </div>
        </section>
    );
}