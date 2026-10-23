import React from "react";

export default function AnnouncementBar() {
  const items = [
    "CLICK & COLLECT",
    "2M+ HAPPY CUSTOMERS",
    "FAST DELIVERY",
    "FREE GIFT WITH ORDER $150+",
  ];

  const marqueeItems = [...items, ...items, ...items, ...items];

  return (
    <>
      <style>
        {`
          .marquee-container {
            overflow: hidden;
            width: 100%;
          }

          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 40s linear infinite;
          }

          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

      <div className="w-full bg-[#8CFF64]">
        <div className="marquee-container">
          <div className="marquee-track">
            {[...Array(2)].map((_, idx) => (
              <div key={idx} className="flex shrink-0">
                {marqueeItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center px-6 py-3 whitespace-nowrap"
                  >
                    <span className="font-black uppercase text-black text-sm">
                      {item}
                    </span>
                    <span className="ml-6 text-black font-black">•</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}