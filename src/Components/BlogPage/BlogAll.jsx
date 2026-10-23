import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogsData, blogCategories } from '../../AllWebsiteData/allBlogs';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const navigate = useNavigate();

  const filteredBlogs = selectedCategory === 'All' 
    ? blogsData 
    : blogsData.filter(blog => blog.category === selectedCategory);

  const handleBlogClick = (slug) => {
    navigate(`/blog/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen bg-white">
   
      <section className=" mx-auto py-16 md:py-20 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12 bg-[linear-gradient(to_bottom_right,#111827,#000000)] text-white">

          <div className="mb-6">
            <nav className="flex items-center gap-2 text-sm md:text-base">
              <Link href="/" className="text-green-400 hover:text-green-300 font-bold">Home</Link>
              <span className="text-gray-400">/</span>
              <span className="text-gray-300">Blog</span>
            </nav>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-4">
            ECON GYM BLOG
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl">
            Stay updated with the latest fitness tips, nutrition advice, and training strategies from our expert coaches.
          </p>
          <div className="w-16 h-2 bg-green-500 rounded-full mt-6"></div>
        </section>

   
      <section className="container mx-auto py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50 border-b border-gray-200">

          <div className="flex flex-wrap gap-2 md:gap-3">
            <button
              onClick={() => setSelectedCategory('All')}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 ${
                selectedCategory === 'All'
                  ? 'bg-green-500 text-black shadow-lg'
                  : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              All Articles
            </button>
            {blogCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-bold text-xs md:text-sm uppercase tracking-wide transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-green-500 text-black shadow-lg'
                    : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
              >
                {category}
              </button>
            ))}
       
        </div>
      </section>

   
      <section className="container mx-auto  py-12 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
  
          {filteredBlogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredBlogs.map((blog) => (
                <article
                  key={blog.id}
                  onClick={() => handleBlogClick(blog.slug)}
                  className="group cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-500 flex flex-col h-full hover:-translate-y-2"
                >
               
                  <div className="relative overflow-hidden h-48 md:h-56 bg-gray-100">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="inline-block bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-5 md:p-6">
                    
                 
                    <div className="flex items-center justify-between mb-3 text-xs md:text-sm text-gray-500">
                      <span className="font-semibold">{blog.author}</span>
                      <span>{blog.readTime} min read</span>
                    </div>

              
                    <h3 className="text-lg md:text-xl font-black text-black mb-3 line-clamp-2 group-hover:text-green-500 transition-colors">
                      {blog.title}
                    </h3>

                 
                    <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 flex-1">
                      {blog.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <time className="text-xs md:text-sm text-gray-500">
                        {new Date(blog.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </time>
                      <button className="text-green-500 hover:text-green-600 font-bold text-sm md:text-base uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                        Read More
                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 mb-4">No articles found in this category.</p>
              <button
                onClick={() => setSelectedCategory('All')}
                className="px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-bold uppercase rounded-lg transition-colors"
              >
                View All Articles
              </button>
            </div>
          )}
  
      </section>
    </div>
  );
};

export default BlogPage;