import React from 'react';
import { FiInstagram } from 'react-icons/fi';

const InstagramFollow = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop",
      alt: "Instagram Post 1"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1517836357463-d25ddfcbf042?w=300&h=300&fit=crop",
      alt: "Instagram Post 2"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1518611505867-48a109bd76f5?w=300&h=300&fit=crop",
      alt: "Instagram Post 3"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
      alt: "Instagram Post 4"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=300&fit=crop",
      alt: "Instagram Post 5"
    }
  ];

  return (
    <>
      <section className="py-16 lg:py-24 px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="hidden lg:block max-w-7xl mx-auto">
          <div className="flex items-center gap-10">

            <div className="shrink-0 w-64">
              <h3 className="text-3xl lg:text-4xl font-black uppercase text-black mb-6 leading-tight">
                FOLLOW ALONG ON OUR JOURNEY
              </h3>

              <div className="flex flex-col items-start gap-4">
                <FiInstagram size={70} strokeWidth={1} />

                <p className="text-xl font-black text-black tracking-wide">
                  @NUTREKO
                </p>
              </div>
            </div>
            <div className="flex-1 overflow-x-auto scrollbar-hide">
              <div className="flex gap-5 pb-3">
                {instagramPosts.map((post) => (
                  <div
                    key={post.id}
                    className="shrink-0 w-56 h-56 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  >
                    <img
                      src={post.image}
                      alt={post.alt}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="lg:hidden max-w-4xl mx-auto">
          <div className="flex flex-col items-center justify-center py-10 text-center">

            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase mb-8">
              FOLLOW ALONG ON<br />OUR JOURNEY
            </h2>
            <FiInstagram size={90} className="mb-8" />

            <p className="text-2xl md:text-3xl font-black">
              @NUTREKO
            </p>

          </div>
        </div>
              </section>
    </>
  );
};

export default InstagramFollow;