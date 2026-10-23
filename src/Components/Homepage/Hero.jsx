import { useEffect, useState } from "react";
import { heroData } from "../../AllWebsiteData/allData";
import { Link } from "react-router-dom";

const { main, promos } = heroData;

export default function Hero() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setMounted(true), 80);
        return () => clearTimeout(t);
    }, []);

    return (
        <section className="w-full px-2 py-0 flex flex-col gap-4">

            <div className="relative w-full rounded-2xl overflow-hidden
               min-h-75 sm:min-h-105 md:min-h-125 lg:min-h-145 xl:min-h-160">


                <img src={main.bgImage} alt="Hero"
                    className="absolute inset-0 w-full h-full object-cover object-center" />


                <div className="absolute inset-0background-image: linear-gradient(
  to right,
  rgb(0 0 0 / 0.85),
  rgb(0 0 0 / 0.55),
  rgb(0 0 0 / 0.20)
);" />
                <div className="absolute bottom-0 inset-x-0 h-32 background-image: linear-gradient(
  to top,
  rgb(0 0 0 / 0.7),
  transparent
);" />

                <div
                    className="
                        absolute bottom-0 left-0 right-0 z-20
                        flex flex-col items-center text-center
                        sm:items-start sm:text-left sm:right-auto
                        px-4 sm:px-10 md:px-14 lg:px-16
                        pb-8 sm:pb-16 md:pb-20 lg:pb-36 xl:pb-44
                        transition-all duration-1000 ease-out"
                    style={{
                        opacity: mounted ? 1 : 0,
                        transform: mounted
                            ? "translateX(0)"
                            : "translateX(40px)",
                    }}
                >

                    <p className="text-white/90 text-[10px] sm:text-[12px] font-bold tracking-[0.22em] uppercase mb-2">
                        {main.badge}
                    </p>


                    <h1 className="font-black leading-[0.9] uppercase tracking-tight mb-3 sm:mb-4">
                        <span
                            className="block text-[38px] sm:text-[52px] md:text-[64px] lg:text-[78px] xl:text-[88px]"
                            style={{ color: main.titleColor }}>
                            {main.titleLine1}
                        </span>
                        <span className="block text-white text-[38px] sm:text-[52px] md:text-[64px] lg:text-[78px] xl:text-[88px]">
                            {main.titleLine2}
                        </span>
                    </h1>

                    <p className="text-white/85 font-semibold text-[12px] sm:text-[14px] md:text-[15px] mb-5 max-w-65 sm:max-w-sm leading-relaxed">
                        {main.description}
                    </p>

                    <Link
                        to={main.btnLink}
                        className="inline-flex items-center justify-center bg-white text-black font-bold text-[13px] sm:text-[14px] px-8 sm:px-10 py-3 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-200 shadow-xl min-w-32 sm:min-w-40"
                    >
                        {main.btnText}
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {promos.map((promo, idx) => (
                    <div key={idx}
                        className="relative rounded-2xl overflow-hidden
                           min-h-64 sm:min-h-72 md:min-h-80 lg:min-h-96">


                        <img src={promo.bgImage} alt={promo.title}
                            className="absolute inset-0 w-full h-full object-cover object-center" />


                        <div className="absolute inset-0 bg-black/55" />

                        <div
                            className="absolute inset-0 z-20 flex flex-col
                                p-5 sm:p-6 md:p-8
                                transition-all ease-out"
                            style={{
                                opacity: mounted ? 1 : 0,
                                transform: mounted ? "translateY(0)" : "translateY(35px)",
                                transitionDuration: "800ms",
                                transitionDelay: mounted ? `${180 + idx * 140}ms` : "0ms",
                            }}
                        >
                            <span
                                className="inline-block text-white text-[10px] sm:text-[11px] font-bold
                                    tracking-wider uppercase px-3 py-1.5 rounded-full w-fit mb-3"
                                style={{ backgroundColor: promo.badgeBg }}>
                                {promo.badge}
                            </span>


                            <h2 className="text-white font-black uppercase leading-[0.88] tracking-tight mb-2
                                text-[32px] sm:text-[38px] md:text-[46px] lg:text-[54px]">
                                {promo.title.split("\n").map((line, i) => (
                                    <span key={i} className="block">{line}</span>
                                ))}
                            </h2>

                            <p className="text-white font-extrabold uppercase
                                text-[11px] sm:text-[12px] md:text-[13px] tracking-wider">
                                {promo.subtitle}
                            </p>
                            <Link href={promo.btnLink}
                                className="mt-auto inline-flex items-center justify-center
                                    border-2 border-white text-white font-bold
                                    text-[12px] sm:text-[13px]
                                    px-6 sm:px-8 md:px-10 py-2.5 rounded-full
                                    w-fit min-w-32 sm:min-w-36
                                    hover:bg-white hover:text-black active:scale-95 transition-all duration-200">
                                {promo.btnText}
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

        </section>
    );
}
