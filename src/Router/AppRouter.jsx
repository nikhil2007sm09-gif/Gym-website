import { Routes, Route } from 'react-router-dom';
import Home from '../Pages/Homepage';

import ProductDetail from '../Components/Products/ProductDetail';
import About from '../Pages/AboutPage';
import ContactPage from '../Pages/ContactPage';
import LoginPage from '../Pages/LoginPage';

import BlogDetailPage from '../Components/BlogPage/BlogDetailpage';
import Blog from '../Pages/BlogPages';
import RegisterPage from '../Pages/RegisterPage';
import WishlistPage from '../Pages/Wishlist';
import AllProducts from '../Components/Products/AllProducts';




const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/allproducts" element={<AllProducts />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={< ContactPage />} />
      <Route path="/login" element={<LoginPage />} />
       <Route path="/register" element={<RegisterPage />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogDetailPage/>} />
        <Route path="/wishlist" element={<WishlistPage/>} />
    </Routes>
  )
};

export default AppRouter
