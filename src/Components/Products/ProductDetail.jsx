import { useState, useEffect } from 'react';
import { Heart, Share2 } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import RelatedProducts from '../Products/RelatedProducts';
import YouMayAlsoLike from '../Products/YouMayAlsoLike';
import { allProductsData } from '../../AllWebsiteData/allProducts';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';
import { addToCartApi } from '../../API/cartApi';
import { ShoppingCart } from "lucide-react";

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('300g');
  const [selectedFlavor, setSelectedFlavor] = useState('Watermelon');
  const [activeTab, setActiveTab] = useState('description');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { user } = useAuth();

  
  const product = allProductsData.find(p => p.id === parseInt(id)) || allProductsData[0];


  const productImages = product.images || [product.image, product.image, product.image];

 
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      if (product.sizes && product.sizes.length > 0) {
        setSelectedSize(product.sizes[0]);
      }
      if (product.flavors && product.flavors.length > 0) {
        setSelectedFlavor(product.flavors[0]);
      }
    }
  }, [product]);

  useEffect(() => {
    const checkCart = () => {
      const localCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
      const exists = localCart.some(item => item.productId === product.id && item.size === selectedSize && item.flavor === selectedFlavor);
      setAddedToCart(exists);
    };
    checkCart();
    window.addEventListener('cart-updated', checkCart);
    return () => window.removeEventListener('cart-updated', checkCart);
  }, [product.id, selectedSize, selectedFlavor, user]);

  const handleAddToCart = async () => {
    try {
      setIsAdding(true);
      const priceVal = parseFloat(product.salePrice.replace(/[^\d.]/g, '')) || 0;
      const originalPriceVal = parseFloat(product.originalPrice.replace(/[^\d.]/g, '')) || 0;
      const discountVal = parseInt(product.discount.replace(/[^\d.]/g, '')) || 0;

      const payload = {
        color: "white",
        size: selectedSize || "",
        quantity: quantity,
        flavor: selectedFlavor || ""
      };

      if (!user) {
        const localCart = JSON.parse(localStorage.getItem('guestCart') || '[]');
        const existingIdx = localCart.findIndex(i => i.productId === product.id && i.size === payload.size && i.flavor === payload.flavor);
        
        if (existingIdx >= 0) {
           localCart[existingIdx].quantity += quantity;
        } else {
           localCart.push({
             id: Math.random().toString(36).substr(2, 9),
             productId: product.id,
             name: product.name,
             price: priceVal,
             originalPrice: originalPriceVal,
             discount: discountVal,
             quantity: quantity,
             size: payload.size,
             color: payload.color,
             flavor: payload.flavor,
             image: product.image || (product.images && product.images[0]) || "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633"
           });
        }
        localStorage.setItem('guestCart', JSON.stringify(localCart));
        window.dispatchEvent(new Event('cart-updated'));
        toast.success("Product added to cart!");
        setAddedToCart(true);
        return;
      }

      await addToCartApi(product.id, {
        color: payload.flavor,
        size: payload.size,
        quantity: payload.quantity
      });
      window.dispatchEvent(new Event('cart-updated'));
      toast.success("Product added to cart!");
      setAddedToCart(true);
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error(error?.response?.data?.message || "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="min-h-screen st bg-white">

      <div className="px-4 md:px-6 lg:px-16 py-3 md:py-4 text-xs sm:text-sm text-gray-600 overflow-x-auto">
        <button onClick={() => navigate('/')} className="hover:text-gray-800 transition cursor-pointer whitespace-nowrap">Home</button>
        <span className="mx-1 md:mx-2"> / </span>
        <button onClick={() => navigate('/shop')} className="hover:text-gray-800 transition cursor-pointer whitespace-nowrap">Products</button>
        <span className="mx-1 md:mx-2"> / </span>
        <span className="text-black truncate whitespace-nowrap">{product.name}</span>
      </div>


      <div className="px-4 sm:px-6 md:px-8 lg:px-16 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 mb-12 md:mb-16">
 
          <div className="order-first md:order-1">
            <div 
              className="bg-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 mb-3 sm:mb-4 aspect-square flex items-center justify-center w-full max-w-sm mx-auto md:max-none"
            >
              <img 
                src={productImages[currentImageIndex]} 
                alt={product.name}
                className="w-full h-full object-contain sticky"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((img, idx) => (
                <div 
                  key={idx} 
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`bg-gray-100 rounded-lg p-1 sm:p-2 cursor-pointer hover:bg-gray-200 transition border-2 aspect-square flex items-center justify-center ${
                    currentImageIndex === idx ? 'border-black' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </div>
              ))}
            </div>
          </div>

          <div className="order-last md:order-2">
       
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className={`w-3 h-3 sm:w-4 sm:h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs sm:text-sm text-gray-600">{product.reviews} reviews</span>
            </div>

          
            <p className="text-xs sm:text-sm text-gray-500 mb-2 md:mb-3">Brand: <span className="text-gray-700 font-semibold">{product.category}</span></p>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 leading-tight">{product.name}</h1>

      
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4 mb-5 md:mb-6">
              <span className="text-2xl sm:text-3xl md:text-4xl font-bold">{product.salePrice}</span>
              <span className="text-base sm:text-lg text-gray-500 line-through">{product.originalPrice}</span>
              <span className="bg-red-100 text-red-600 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">{product.discount}</span>
            </div>

          
            <div className="mb-4 md:mb-6">
              <label className="block text-xs sm:text-sm font-semibold mb-2 md:mb-3">Size:</label>
              <div className="flex flex-wrap gap-2">
                {(product.sizes || ['300g', '500g']).map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-3 sm:px-4 py-2 rounded-lg border-2 transition text-xs sm:text-sm font-medium ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4 md:mb-6">
              <label className="block text-xs sm:text-sm font-semibold mb-2 md:mb-3">Flavor:</label>
              <div className="flex flex-wrap gap-2">
                {(product.flavors || ['Flavor 1', 'Flavor 2']).map(flavor => (
                  <button
                    key={flavor}
                    onClick={() => setSelectedFlavor(flavor)}
                    className={`px-3 sm:px-4 py-2 rounded-lg border-2 transition text-xs sm:text-sm font-medium ${
                      selectedFlavor === flavor
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {flavor}
                  </button>
                ))}
              </div>
            </div>

        
            <div className="mb-4 md:mb-6">
              <label className="block text-xs sm:text-sm font-semibold mb-2 md:mb-3">Quantity:</label>
              <div className="flex items-center gap-3 w-fit">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-lg hover:bg-gray-100 text-lg sm:text-xl font-bold"
                >
                  −
                </button>
                <span className="text-lg sm:text-xl font-semibold w-6 sm:w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 sm:w-10 sm:h-10 border border-gray-300 rounded-lg hover:bg-gray-100 text-lg sm:text-xl font-bold"
                >
                  +
                </button>
              </div>
            </div>

            {addedToCart ? (
              <button
                onClick={() => window.dispatchEvent(new Event('open-cart'))}
                className="w-full bg-[#72f050] text-white py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg mb-3 md:mb-4 hover:bg-green-700 transition active:scale-[0.98] shadow-lg shadow-green-600/20 flex items-center justify-center cursor-pointer"
              >
                GO TO CART
              </button>
            ) : (
             <button
  onClick={handleAddToCart}
  disabled={isAdding}
  className="w-full bg-black text-white py-3 sm:py-4 rounded-lg font-bold text-sm sm:text-base md:text-lg mb-3 md:mb-4 hover:bg-gray-900 transition active:scale-[0.98] shadow-lg shadow-black/20 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
>
  {isAdding ? (
    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
  ) : (
    <>
      <ShoppingCart className="w-5 h-5" />
      <span>ADD TO CART</span>
    </>
  )}
</button>
            )}

      
            <div className="flex gap-2 sm:gap-3 md:gap-4 mb-4 md:mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 sm:py-3 rounded-lg hover:bg-gray-50 text-xs sm:text-sm">
                <Heart size={18} />
                <span className="hidden sm:inline">WISHLIST</span>
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-300 py-2 sm:py-3 rounded-lg hover:bg-gray-50 text-xs sm:text-sm">
                <Share2 size={18} />
                <span className="hidden sm:inline">SHARE</span>
              </button>
            </div>

    
            <div className="space-y-2 md:space-y-3 pt-4 md:pt-6 border-t border-gray-200">
              {(product.benefits || ['Shipping & Returns', 'Warranty', 'Secure Payment']).map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-2 md:gap-3 text-xs sm:text-sm">
                  <svg className="w-4 h-4 md:w-5 md:h-5 text-green-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 md:mt-6 pt-4 md:pt-6 border-t border-gray-200 text-xs sm:text-sm space-y-2">
              <p className="text-gray-600">SKU: <span className="text-black font-semibold">PRD-{product.id}</span></p>
              <p className="text-gray-600">Category: <span className="text-black font-semibold">{product.category}</span></p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 md:pt-8">
          <div className="flex gap-2 sm:gap-4 mb-6 md:mb-8 border-b border-gray-200 overflow-x-auto">
            {['description', 'additional', 'reviews'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 sm:px-6 py-2 md:py-3 font-semibold transition text-xs sm:text-sm md:text-base whitespace-nowrap ${
                  activeTab === tab
                    ? 'border-b-4 border-orange-500 text-black'
                    : 'text-gray-600 hover:text-black'
                }`}
              >
                {tab === 'description' && 'Description'}
                {tab === 'additional' && 'Additional Info'}
                {tab === 'reviews' && 'Reviews'}
              </button>
            ))}
          </div>

          <div className="max-w-4xl">
            {activeTab === 'description' && (
              <div>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-4">{product.description || 'This is a premium quality product designed for optimal performance and results.'}</p>
              </div>
            )}

            {activeTab === 'additional' && (
              <div>
                <p className="text-sm sm:text-base text-gray-700 whitespace-pre-line leading-relaxed">{product.additionalInfo || '- High quality ingredients\n- Tested for purity\n- Best results with regular use'}</p>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <p className="text-sm sm:text-base text-gray-500">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <RelatedProducts />

  
      <YouMayAlsoLike />
    </div>
  );
};

export default ProductDetail;
