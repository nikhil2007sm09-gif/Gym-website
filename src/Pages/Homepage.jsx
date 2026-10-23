import HeroSection from '../Components/Homepage/Hero';
import ShopByGoals from '../Components/Homepage/ShopByGoals';
import BestSeller from '../Components/Homepage/BestSeller';
import Trust from '../Components/Homepage/Trust';
import TrandingNow from '../Components/Homepage/Trendingnow';
import Dependable from '../Components/Homepage/Dependable';
import CustomerLoveUs from '../Components/Homepage/CustomerLoveUs';
import BrandLogos from '../Components/Homepage/AllBrandsLogo';
import JoinMovementBanner from '../Components/Homepage/JoinMovementBanner.jsx';

import PicksForYou from '../Components/Homepage/Picksfor.jsx';
import LatestArticles from '../Components/Homepage/ArticalAndAdvice.jsx';
import CustomerGallery from '../Components/Homepage/CustomerGallery.jsx';







const Home = () => {
  return (
    <>
      <HeroSection />
      <ShopByGoals />
      <BestSeller />
      <TrandingNow />
      <Trust />
      <Dependable />
      <PicksForYou />
      <CustomerLoveUs />
      <BrandLogos />
      <JoinMovementBanner />
      <LatestArticles />
      <CustomerGallery />
    </>
  );
};

export default Home;
