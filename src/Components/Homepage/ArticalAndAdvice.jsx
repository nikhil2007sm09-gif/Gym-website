import { Link, useNavigate } from 'react-router-dom';
import { blogsData } from '../../AllWebsiteData/allBlogs';

const LatestArticles = () => {
  const navigate = useNavigate();


  const latestArticles = blogsData.slice(0, 4);

  const handleReadMore = (slug) => {
    navigate(`/blog/${slug}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="container mx-auto py-10  px-2 md:px-0 bg-white">
      <div className="">


        <div className="mb-8 md:mb-12">
          <h2 className="font-sans text-[32px] sm:text-[45px] md:text-[60px] lg:text-[72px] font-black tracking-wide uppercase select-none ">

            <span className="text-gray-400">Articles </span>

            <span className="text-gray-500 font-normal">& </span>

            <span className="text-[#1A1A1A]">Advice</span>
          </h2>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-4 gap-6 md:gap-8 mb-10 md:mb-12">
          {latestArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => handleReadMore(article.slug)}
              className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-xl hover:border-green-300 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
            >

              <div className="relative overflow-hidden h-48 md:h-56 bg-gray-100">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="inline-block bg-green-500 text-black px-3 py-1 rounded-full text-xs font-bold uppercase">
                    {article.category}
                  </span>
                </div>
              </div>


              <div className="flex flex-col flex-1 p-5 md:p-6">


                <div className="flex items-center justify-between mb-3 text-xs md:text-sm text-gray-500">
                  <span className="font-semibold">{article.author}</span>
                  <span>{article.readTime} min</span>
                </div>


                <h3 className="text-lg md:text-xl font-black text-black mb-3 line-clamp-2 group-hover:text-green-500 transition-colors">
                  {article.title}
                </h3>


                <p className="text-gray-600 text-sm md:text-base mb-4 line-clamp-2 flex-1">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 mt-auto">
                  <time className="text-xs md:text-sm text-gray-500">
                    {new Date(article.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </time>
                  <button
                    onClick={() => handleReadMore(article.slug)}
                    className="text-green-500 hover:text-green-600 font-bold text-sm md:text-base uppercase flex items-center gap-2 group-hover:gap-3 transition-all"
                  >
                    Read
                    <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="flex justify-center">
       <Link
  to="/blog"
  onClick={() => window.scrollTo(0, 0)}
  className="px-6 md:px-8 py-2.5 md:py-3 bg-white hover:bg-[#76FF58] text-black hover:text-black font-bold text-xs md:text-sm uppercase tracking-wide rounded-full border border-gray-300 transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-xl inline-block text-center"
>
  View All Blog
</Link>
        </div>

      </div>
    </section>
  );
};

export default LatestArticles;
