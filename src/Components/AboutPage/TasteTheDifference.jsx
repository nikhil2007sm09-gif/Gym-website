import React from 'react';

const featuresConfig = [
    {
        image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=600&auto=format&fit=crop",
        title: "FOR THE ENVIRONMENT",
        description: "All of our ingredients are sourced directly from sustainable accredited gardens and all of our packaging is recyclable."
    },
    {
        image: "https://ap-nutreko.myshopify.com/cdn/shop/files/etgbw7cg_1_2.png?v=1727949017",
        title: "FOR THE PEOPLE",
        description: "We source the finest quality speciality teas, herbs, spices and flowers from around the world. Are you ready to be inspired?"
    },
    {
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=600&auto=format&fit=crop",
        title: "FOR THE TASTE",
        description: "We are passionate about fresh, small batch blends tha capture the vitality of their ingredients and are bursting with flavour and therapeutic potential."
    },
    {
        image: "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop",
        subtitle: "QUALITY",
        title: "FOR THE HEALTH",
        description: "We source the finest quality speciality teas, herbs, spices and flowers from around the world. Are you ready to be inspired?"
    }
];

export default function TasteDifference() {
    return (
        <section className="w-full bg-white py-12 px-4 sm:px-8 md:px-12 lg:px-16 mx-auto font-sans">
            <div className="text-center mb-12 lg:mb-16">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-black uppercase leading-tight">
                    TASTE THE DIFFERENCE <br /> WE ARE MAKING
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10 w-full">
                {featuresConfig.map((item, index) => (
                    <div key={index} className="flex flex-col items-center text-center group w-full">
                
                        <div className="w-full aspect-4/3 rounded-3xl overflow-hidden relative mb-6 shadow-sm bg-gray-100">
                            <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-500 ease-out" 
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/5 pointer-events-none" />
                        </div>

                        
                        <div className="w-full px-1 md:px-2">
                        
                            {item.subtitle && (
                                <span className="block text-[11px] tracking-[0.25em] font-black uppercase text-gray-400 mb-1.5">
                                    {item.subtitle}
                                </span>
                            )}
                         
                            <h3 className="text-[16px] md:text-lg font-black tracking-wide text-black uppercase mb-3.5 leading-snug">
                                {item.title}
                            </h3>
                            
                          
                            <p className="text-gray-500 text-xs md:text-[13.5px] font-medium leading-relaxed tracking-wide max-w-[95%] mx-auto">
                                {item.description}
                            </p>
                        </div>

                    </div>
                ))}
            </div>
        </section>
    );
}