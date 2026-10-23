import {
  FiTruck,
  FiGift,
  FiPackage,
  FiSmile,
} from "react-icons/fi";

const features = [
  {
    icon: <FiTruck size={42} strokeWidth={1.4} />, 
    title: "FAST DELIVERY",
    subtitle: "West & East coast dispatch",
  },
  {
    icon: <FiGift size={42} strokeWidth={1.4} />,
    title: "FREE GIFT WITH ORDER $150+",
    subtitle: "Multiple gift options available",
  },
  {
    icon: <FiPackage size={42} strokeWidth={1.4} />,
    title: "CLICK & COLLECT",
    subtitle: "Check your local stores now",
  },
  {
    icon: <FiSmile size={42} strokeWidth={1.4} />,
    title: "2M+ HAPPY CUSTOMERS",
    subtitle: "Here to support your journey",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-6 sm:py-8 lg:py-10 px-3 sm:px-5 lg:px-8">
      <div className=" mx-auto rounded-[22px] border border-gray-200 overflow-hidden">
        
     
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {features.map((item, index) => (
            <div
              key={index}
              className={`
                flex flex-col items-center justify-center
                text-center
                px-4 py-8 sm:p-12 lg:py-16
          
                ${index % 2 === 0 ? "border-r border-gray-200" : "lg:border-r lg:border-gray-200"}
                ${index === features.length - 1 ? "lg:border-r-0" : ""}

                ${index >= 2 ? "border-t border-gray-200 lg:border-t-0" : "lg:border-t-0"}
              `}
            >
              
              <div className="text-zinc-700 mb-4 lg:mb-6 md:scale-110">{item.icon}</div>

      
              <h3 className="font-black uppercase tracking-tight text-[13px] sm:text-[15px] md:text-[22px] leading-tight px-1">
                {item.title}
              </h3>

              <p className="mt-2 lg:mt-4 text-gray-400 font-semibold text-[11px] sm:text-[16px] md:text-[20px] leading-normal px-2">
                {item.subtitle}
              </p>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}