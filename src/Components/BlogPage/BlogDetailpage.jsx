import { useParams, useNavigate, Link, Links } from 'react-router-dom';
import { blogsData } from '../../AllWebsiteData/allBlogs';

const BlogDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const blog = blogsData.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-black text-black mb-4">Blog Not Found</h1>
          <p className="text-gray-600 text-lg mb-6">The article you're looking for doesn't exist.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-8 py-3 bg-green-500 hover:bg-green-600 text-black font-bold uppercase rounded-lg transition-colors"
          >
            Back to Blog
          </button>
        </div>
      </div>
    );
  }

  const relatedBlogs = blogsData
    .filter(b => b.category === blog.category && b.id !== blog.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white">

      <section className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto">


          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link to="/" className="text-green-400 hover:text-green-300 font-bold">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/blog" className="text-green-400 hover:text-green-300 font-bold">Blog</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300 truncate">{blog.title}</span>
          </nav>


          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase mb-6 leading-tight">
            {blog.title}
          </h1>


          <div className="flex flex-wrap gap-4 md:gap-6 items-center text-sm md:text-base border-t border-gray-700 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold text-black">
                {blog.author[0]}
              </div>
              <div>
                <p className="font-bold">{blog.author}</p>
                <p className="text-gray-400 text-xs">{blog.category}</p>
              </div>
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-700"></div>
            <div className="text-gray-300">
              {new Date(blog.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="hidden md:block w-px h-6 bg-gray-700"></div>
            <div className="text-gray-300">{blog.readTime} min read</div>
          </div>

        </div>
      </section>


      <section className="w-full px-4 sm:px-6 md:px-8 lg:px-12 py-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-96 md:h-500px object-cover rounded-2xl shadow-lg"
          />
        </div>
      </section>


      <section className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto">
          <article className="blog-content">
            <div
              className="text-gray-700 leading-relaxed text-base md:text-lg space-y-4 md:space-y-6"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>

          <div className="mt-12 md:mt-16 pt-8 md:pt-12 border-t-2 border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


              <div>
                <p className="text-gray-600 font-bold uppercase text-sm mb-3">Category</p>
                <div className="inline-block bg-green-500 text-black px-4 py-2 rounded-full font-bold uppercase text-sm">
                  {blog.category}
                </div>
              </div>

              <div>
                <p className="text-gray-600 font-bold uppercase text-sm mb-3">Share This Article</p>
                <div className="flex gap-3">
                  <Link
                    to={`https://www.facebook.com/sharer/sharer.php?u=https://econ-gym.com/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                    title="Share on Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.737-.981 10.125-5.945 10.125-11.854z" />
                    </svg>
                  </Link>
                  <Link
                    to={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=https://econ-gym.com/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800 transition-colors"
                    title="Share on Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 002.856-9.935c-1.474.056-2.927.056-4.35-.034a6.996 6.996 0 01-2.342.043 11.044 11.044 0 01-3.766-1.27A6.942 6.942 0 0012 0c-3.59 0-6.761 2.912-7.779 6.82-1.06.325-2.087.722-3.078 1.2a10 10 0 00-.032 14.34 10 10 0 002.858 9.935c1.474-.056 2.927-.056 4.35.034a6.996 6.996 0 012.342-.043 11.044 11.044 0 013.766 1.27A6.942 6.942 0 0012 24c3.59 0 6.761-2.912 7.779-6.82 1.06-.325 2.087-.722 3.078-1.2a10 10 0 00.032-14.34z" />
                    </svg>
                  </Link>


                  <Link
                    to={`https://www.linkedin.com/sharing/share-offsite/?url=https://econ-gym.com/blog/${blog.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.945v5.422h-3.554s.05-8.736 0-9.646h3.554v1.348c.429-.645 1.196-1.565 2.905-1.565 2.121 0 3.71 1.389 3.71 4.375v5.488zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.77-1.715 1.946-1.715 1.177 0 1.915.762 1.915 1.715 0 .953-.738 1.715-1.946 1.715zm1.595 11.597H3.762V9.571h3.17v10.881zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>


      {relatedBlogs.length > 0 && (
        <section className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-gray-50">
          <div className="max-w-7xl mx-auto">

            <h2 className="text-3xl md:text-4xl font-black uppercase text-black mb-8 md:mb-12">
              Related Articles
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {relatedBlogs.map((relatedBlog) => (
                <article
                  key={relatedBlog.id}
                  onClick={() => {
                    navigate(`/blog/${relatedBlog.slug}`);
                    window.scrollTo(0, 0);
                  }}
                  className="group cursor-pointer bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-green-300 transition-all duration-500 hover:-translate-y-2"
                >
                  <div className="relative overflow-hidden h-40 bg-gray-100">
                    <img
                      src={relatedBlog.image}
                      alt={relatedBlog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-black text-black mb-2 line-clamp-2 group-hover:text-green-500 transition-colors">
                      {relatedBlog.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    <button className="text-green-500 hover:text-green-600 font-bold text-sm uppercase flex items-center gap-2 group-hover:gap-3 transition-all">
                      Read
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </article>
              ))}
            </div>

          </div>
        </section>
      )}


      <section className="w-full py-12 md:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-[linear-gradient(to_bottom_right,#7CFE6B,#7CFE6B)]">
        <div className="max-w-4xl mx-auto text-center text-black">
          <h2 className="text-3xl md:text-4xl font-black uppercase mb-4">
            Ready to Transform Your Fitness?
          </h2>
          <p className="text-lg md:text-xl mb-6">
            Explore our premium supplements and nutrition products to support your fitness goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/shop"
              onClick={() => window.scrollTo(0, 0)}
              className="px-8 py-3 bg-black hover:bg-gray-800 text-white font-black uppercase rounded-lg transition-colors inline-block text-center"
            >
              Shop Now
            </Link>


            <Link
              to="/blog"
              onClick={() => window.scrollTo(0, 0)}
              className="px-8 py-3 bg-white hover:bg-gray-100 text-black font-black uppercase rounded-lg transition-colors inline-block text-center border border-gray-200"
            >
              More Articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
