import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { shopByGoalsData } from "../../AllWebsiteData/allData";

function GoalCard({ goal, onGoalClick }) {
    return (
        <div 
            className="flex flex-col group transition-transform duration-300 hover:-translate-y-2 w-full cursor-pointer"
            onClick={() => onGoalClick(goal.title)}
        >
            <div className="relative overflow-hidden rounded-2xl aspect-3/4 mb-4">
                <img
                    src={goal.image}
                    alt={goal.title}
                    draggable={false}
                    className="w-full h-full object-cover object-top
                        group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <h3 className="font-black uppercase text-black tracking-tight text-center
                text-[19px] sm:text-[15px] mb-1">
                {goal.title}
            </h3>
            <p className="text-gray-400 text-[12px] sm:text-[13px] font-medium text-center mb-4">
                {goal.subtitle}
            </p>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onGoalClick(goal.title);
                }}
                className="mx-auto w-auto inline-flex items-center justify-center
                    border border-gray-200 text-black font-medium text-[13px]
                    px-6 py-2.5 rounded-full bg-white
                    hover:border-transparent active:scale-95 transition-all duration-200"
                onMouseEnter={e => e.currentTarget.style.backgroundColor = "var(--primary)"}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = "white"}
            >
                {goal.btnText}
            </button>
        </div>
    );
}

export default function ShopByGoals() {
    const navigate = useNavigate();
    const sliderRef = useRef(null);
    const drag = useRef({ active: false, startX: 0, scrollLeft: 0 });

    const handleGoalClick = (goalTitle) => {
        const categoryUrl = goalTitle.toLowerCase().replace(/\s+/g, '-');
        navigate(`/shop?category=${categoryUrl}`);
        window.scrollTo(0, 0);
    };

    const onMouseDown = (e) => {
        drag.current = { active: true, startX: e.pageX - sliderRef.current.offsetLeft, scrollLeft: sliderRef.current.scrollLeft };
        sliderRef.current.style.cursor = "grabbing";
    };
    const onMouseUp = () => {
        drag.current.active = false;
        if (sliderRef.current) sliderRef.current.style.cursor = "grab";
    };
    const onMouseMove = (e) => {
        if (!drag.current.active) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        sliderRef.current.scrollLeft = drag.current.scrollLeft - (x - drag.current.startX) * 1.5;
    };

    return (
        <section className="container mx-auto  rounded-b-(2rem) sm:rounded-b-[2.5rem] lg:rounded-b-[3rem] bg-white px-2 md:px-0">

          
            <h2 className="text-[36px] sm:text-[44px] md:text-[52px] lg:text-[60px] xl:text-[68px]
                font-black uppercase tracking-tight mb-8 sm:mb-10">
                <span className="text-gray-400">SHOP BY </span>
                <span className="text-black">GOALS</span>
            </h2>

            <div className="lg:hidden">
                <div
                    ref={sliderRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth pb-2 cursor-grab select-none"
                    style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
                    onMouseDown={onMouseDown}
                    onMouseUp={onMouseUp}
                    onMouseLeave={onMouseUp}
                    onMouseMove={onMouseMove}
                >
                    {shopByGoalsData.map((goal) => (
                        <div key={goal.id}
                            className="shrink-0 w-[calc(100vw-32px)] sm:w-[calc(50vw-20px)]">
                            <GoalCard goal={goal} onGoalClick={handleGoalClick} />
                        </div>
                    ))}
                </div>
            </div>

            <div className="hidden lg:block mx-auto">
                <div
                    className="flex gap-5 overflow-x-auto pb-2 cursor-grab select-none"
                    style={{ scrollbarWidth: "none" }} 
                    onMouseDown={(e) => {
                        const el = e.currentTarget;
                        drag.current = { active: true, startX: e.pageX - el.offsetLeft, scrollLeft: el.scrollLeft };
                        el.style.cursor = "grabbing";
                    }}
                    onMouseUp={(e) => { drag.current.active = false; e.currentTarget.style.cursor = "grab"; }}
                    onMouseLeave={(e) => { drag.current.active = false; e.currentTarget.style.cursor = "grab"; }}
                    onMouseMove={(e) => {
                        if (!drag.current.active) return;
                        e.preventDefault();
                        const el = e.currentTarget;
                        el.scrollLeft = drag.current.scrollLeft - (e.pageX - el.offsetLeft - drag.current.startX) * 1.5;
                    }}
                >
                    {shopByGoalsData.map((goal) => (
                        <div key={goal.id} className="shrink-0" style={{ width: "calc((100% - 40px) / 3)" }}>
                            <GoalCard goal={goal} onGoalClick={handleGoalClick} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
