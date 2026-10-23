import React from 'react';
import { Link } from 'react-router-dom';

export default function GymMarqueeBanner() {

  const marqueeItems = (
   <div className="flex items-center gap-10 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight shrink-0 select-none">
  <span className="text-black">JOIN THE MOVEMENT</span>


  <span className="text-lime-400 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black shrink-0">
    ★
  </span>

  <span className="text-transparent [text-stroke:2px_#e4e4e7] [-webkit-text-stroke:2px_#e4e4e7]">
    JOIN THE MOVEMENT
  </span>


  <span className="text-zinc-200 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black shrink-0">
    ★
  </span>
</div>
  );

  return (
    <div className="relative w-full h-48 md:h-56 flex items-center justify-center overflow-hidden bg-white py-8">
   
      <style>{`
        @keyframes skewedMarquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-tilted-marquee {
          display: flex;
          gap: 4rem; /* Tailwind gap-16 */
          animation: skewedMarquee 18s linear infinite;
        }
      `}</style>

    
      <div className="absolute inset-x-0 flex whitespace-nowrap overflow-hidden -skew-y-2 md:-skew-y-1.5 scale-105 origin-center">
       
        <div className="animate-tilted-marquee">
          {marqueeItems}
          {marqueeItems}
        </div>

       
        <div className="animate-tilted-marquee" aria-hidden="true">
          {marqueeItems}
          {marqueeItems}
        </div>

      </div>

 <div className="relative z-10 px-4 justify-center hidden sm:flex">
<Link
  to="https://instagram.com/Nutreko"
  target="_blank"
  rel="noopener noreferrer"
  className="
    inline-flex items-center justify-center
    bg-white border border-black rounded-full
    px-5 py-2.5
    sm:px-6 sm:py-3
    md:px-8 md:py-3.5
    shadow-md
    hover:scale-105
    active:scale-95
    transition-transform duration-300
  "
>
  <span className="text-[11px] sm:text-xs md:text-sm font-bold text-black text-center leading-tight">
    Check Out Our Instagram{" "}
    <span className="font-black">@Nutreko</span>
  </span>
</Link>
</div>

    </div>
  );
}