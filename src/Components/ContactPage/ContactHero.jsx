import React from 'react';
import { Link } from 'react-router-dom';

const ContactHero = () => {
  return (
    <section className="relative w-full h-[50vh] md:h-[60vh] flex items-center justify-center bg-gray-950 overflow-hidden">
    
      <div className="absolute inset-0 background: linear-gradient(
  to right,
  rgba(0, 0, 0, 0.8),
  rgba(0, 0, 0, 0.6),
  rgba(0, 0, 0, 0.8)
);" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-wider uppercase drop-shadow-lg select-none">
          CONTACT US
        </h1>

        <nav className="flex items-center gap-2 mt-4 text-xs sm:text-sm font-medium tracking-wide bg-black/30 backdrop-blur-sm px-4 py-1.5 rounded-full border border-gray-800/50">
<Link
  to="/" 
  onClick={() => window.scrollTo(0, 0)} 
  className="text-gray-400 hover:text-white flex items-center gap-1 transition-colors duration-200"
>
  <svg 
    className="w-3.5 h-3.5 mb-0.5" 
    fill="none" 
    stroke="currentColor" 
    viewBox="0 0 24 24"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
    />
  </svg>
  Home
</Link>

          <span className="text-gray-600">/</span>

          <span className="text-gray-300 select-none">
            Contact Us
          </span>
        </nav>
      </div>

     
      <div className="absolute bottom-0 left-0 w-full h-4px background: linear-gradient(
  to right,
  transparent,
  #22c55e4d,
  transparent
);" />
    </section>
  );
};

export default ContactHero;
