import React from "react";

export default function OurStory() {
  return (
    <section className="w-full bg-white py-8 md:py-12 lg:py-16 px-6 sm:px-10 md:px-16 lg:px-24 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
        
          <div className="lg:col-span-7 flex items-center justify-center relative min-h-390px sm:min-h-500px md:min-h-560px order-first lg:order-last">
       
            <div
              className="
                absolute
                right-4 sm:right-10 md:right-16
                top-1/2 -translate-y-1/2
                w-280px h-280px
                sm:w-420px sm:h-420px
                md:w-480px md:h-480px
                rounded-full
                bg-gray-100/90
                pointer-events-none
                z-0
              "
            />
            <div className="relative w-[99%] sm:w-[75%] lg:w-[82%] max-w-600px z-10">
              <img
                src="https://ap-nutreko.myshopify.com/cdn/shop/files/img_1.png?v=1727949144&width=1400"
                alt="Fitness Athletes Group"
                className="w-full h-auto object-contain drop-shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
              />
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-last lg:order-first">
            <span className="block text-[11px] tracking-[0.25em] font-black uppercase text-gray-400 mb-3">
              OUR STORY
            </span>

            <h2 className="text-[34px] md:text-[46px] font-black tracking-tight text-black uppercase leading-[1.1] mb-6">
              IT ALL BEGAN IN 1983
            </h2>

            <div className="flex flex-col gap-4 text-gray-500 text-xs sm:text-[14px] font-medium leading-relaxed tracking-wide max-w-md lg:max-w-none">
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis enim velit mollit.
                Exercitation veniam consequat sunt nostrud amet.
              </p>

              <p>
                Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                ullamco cillum dolor. Voluptate exercitation incididunt aliquip
                deserunt reprehenderit elit laborum.
              </p>
            </div>

            <div className="w-full flex justify-center lg:justify-start">
              <button className="mt-10 px-10 py-3 bg-white text-black hover:bg-[#7CFF6B] font-bold text-[15px] rounded-full transition-all duration-300 shadow-sm border border-black/10 tracking-wide uppercase">
                Contact
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}