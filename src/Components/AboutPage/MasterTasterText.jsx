import React from 'react';
import { Link } from 'react-router-dom';

const MasterTasterText = () => {
    return (
        <section className="w-full py-8 md:py-12 lg:py-16 px-4 sm:px-6 md:px-8 lg:px-12 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">


                    <div className="flex justify-center md:justify-start">
                        <div className="relative w-full">
                            <img
                                src="https://ap-nutreko.myshopify.com/cdn/shop/files/img_4.png?v=1727949436&width=1400"
                                alt="Master Tea Taster"
                                className="w-full max-w-650px md:max-w-750px lg:max-w-850px h-auto object-contain"
                            />
                        </div>
                    </div>


                    <div className="text-center md:text-left">
                        <p className="text-xs md:text-sm font-black uppercase tracking-widest text-gray-600 mb-3 md:mb-4">
                            AMAZING PEOPLE
                        </p>

                        <h2 className="text-4xl sm:text-5xl md:text-4xl lg:text-5xl font-black text-black leading-tight uppercase mb-6 md:mb-8 tracking-tight">
                            SELECTED BY A
                            <br />
                            MASTER TEA
                            <br />
                            TASTER
                        </h2>



                        <p className="text-sm md:text-base lg:text-lg text-gray-600 leading-relaxed mb-4 md:mb-5 font-medium">
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                            amet sint. Velit officia consequat duis enim velit mollit.
                            Exercitation veniam consequat sunt nostrud amet.
                        </p>

                        <p className="text-sm md:text-base lg:text-lg text-gray-500 leading-relaxed mb-8 md:mb-10 font-medium">
                            Nulla Lorem mollit cupidatat irure. Laborum magna nulla duis
                            ullamco cillum dolor. Voluptate exercitation incididunt aliquip
                            deserunt reprehenderit elit laborum.
                        </p>

                        <Link
                            to="/team"
                            className="inline-flex items-center justify-center px-12 py-4 bg-white text-black font-bold text-lg rounded-full border border-gray-200 hover:bg-[#7CFF6B] transition-all duration-300"
                        >
                            Our Team
                        </Link>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default MasterTasterText;