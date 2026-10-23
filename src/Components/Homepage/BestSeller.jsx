
import { useRef, useState } from 'react';
import ProductCard from '../Card/ProductCard';
import { allProductsData } from '../../AllWebsiteData/allProducts';
import { Link } from 'react-router-dom';


const products = allProductsData.slice(3, 8);

const BestSeller = () => {
    const sliderRef = useRef(null);
    const [isDown, setIsDown] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const onMouseDown = (e) => {
        setIsDown(true);
        setStartX(e.pageX - sliderRef.current.offsetLeft);
        setScrollLeft(sliderRef.current.scrollLeft);
    };

    const onMouseUpOrLeave = () => setIsDown(false);

    const onMouseMove = (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - sliderRef.current.offsetLeft;
        sliderRef.current.scrollLeft = scrollLeft - (x - startX) * 1.6;
    };

    return (
            <section className="container mx-auto   select-none py-10 px-2 md:px-0">
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch ">


                <div className="w-fullshrink-0">
                  
<div className="w-full lg:w-64 xl:w-72 shrink-0 ml-auto mr-0 md:-mr-4 lg:-mr-6">
  <div
    className="w-full h-56 sm:h-64 lg:h-88 
      rounded-xl overflow-hidden relative 
      flex flex-col justify-between p-4 md:p-5"
    style={{
      backgroundImage: 'url("https://static.vecteezy.com/system/resources/thumbnails/022/756/694/small_2x/handsome-strong-athletic-men-pumping-up-muscles-workout-bodybuilding-concept-background-muscular-bodybuilder-handsome-men-doing-exercises-in-gym-naked-ai-generated-artwork-photo.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}
  >
    <div className="absolute inset-0 bg-black/70" />

    <div className="relative z-10">
      <h2 className="font-black uppercase tracking-tighter text-2xl sm:text-3xl lg:text-4xl
        flex flex-row lg:flex-col gap-2 lg:gap-0 leading-none">
        <span className="text-white uppercase">
best  </span>
        <span className="text-neutral-400 uppercase">sellers</span>
      </h2>
    </div>

    <div className="relative z-10 w-full flex justify-center">
      <Link
        to="/shop"
        className="w-max bg-white text-black px-6 py-2.5 rounded-xl
          font-bold text-[11px] tracking-wider hover:bg-neutral-100
          transition-all active:scale-95 flex items-center justify-center text-center"
      >
        SHOP BEST SELLERS
      </Link>
    </div>
  </div>
</div>

                </div>


                <div
                    className={`flex-1 overflow-hidden ${isDown ? 'cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseUpOrLeave}
                    onMouseUp={onMouseUpOrLeave}
                    onMouseMove={onMouseMove}
                >
                          <div
  ref={sliderRef}
  className="flex gap-4 md:gap-6 overflow-x-auto [&::-webkit-scrollbar]:hidden"
>
  {products.map((product) => (
    <div
      key={product.id}
      className="shrink-0 w-48 sm:w-56 md:w-64 lg:w-72"
    >
      <ProductCard product={product} />
    </div>
  ))}
</div>
                </div>

            </div>
        </section>
    );
};

export default BestSeller;