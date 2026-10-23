import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import LoginDrawer from "../Loginpage/login";
import SimpleRegisterDrawer from "../RegisterPage/Register";
import {
    FiPlus, FiMinus,
    FiTruck, FiGift, FiCreditCard,
    FiSearch, FiUser, FiHeart, FiShoppingBag,
    FiMenu, FiX, FiUserPlus
} from "react-icons/fi";
import Logo from "../../assets/Img/gymecomlogo.jpg";
import { useAuth } from "../../context/AuthContext";

const iconMap = { FiTruck, FiGift, FiCreditCard };

const navbarConfig = {
    topBar: {
        promotions: [
            { icon: "FiGift", text: "Free gift when you spend over $150" },
            { icon: "FiTruck", text: "Free UK standard delivery on orders over $100" },
            { icon: "FiCreditCard", text: "All payments accepted" }
        ]
    },
    menu: [
        { label: "HOME", link: "/" },
        { label: "SHOP", link: "/allproducts" },
        { label: "ABOUT US", link: "/about" },
        { label: "BLOG", link: "/Blog" },
        { label: "CONTACT US", link: "/contact" }
    ]
};

export default function Navbar({ onCartClick, cartItemCount = 0 }) {
    const { user, logoutUser } = useAuth();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [loginDrawerOpen, setLoginDrawerOpen] = useState(false);
    const [registerDrawerOpen, setRegisterDrawerOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [userMenuOpenMobile, setUserMenuOpenMobile] = useState(false);

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const searchInput = useRef(null);
    const userMenuRef = useRef(null);
    const userMenuRefMobile = useRef(null);
    const closeTimeoutRef = useRef(null);
    const closeTimeoutMobileRef = useRef(null);

    const openUserMenu = () => {
        clearTimeout(closeTimeoutRef.current);
        setUserMenuOpen(true);
    };
    const closeUserMenu = () => {
        closeTimeoutRef.current = setTimeout(() => setUserMenuOpen(false), 200);
    };

    const openUserMenuMobile = () => {
        clearTimeout(closeTimeoutMobileRef.current);
        setUserMenuOpenMobile(true);
    };
    const closeUserMenuMobile = () => {
        closeTimeoutMobileRef.current = setTimeout(() => setUserMenuOpenMobile(false), 200);
    };

    useEffect(() => {
        if (searchOpen) {
            setTimeout(() => searchInput.current?.focus(), 200);
        } else {
            setSearchQuery("");
            setFilteredResults([]);
        }
    }, [searchOpen]);

    useEffect(() => {
        document.body.style.overflow = sidebarOpen || searchOpen || loginDrawerOpen || registerDrawerOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [sidebarOpen, searchOpen, loginDrawerOpen, registerDrawerOpen]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
                setUserMenuOpen(false);
            }
            if (userMenuRefMobile.current && !userMenuRefMobile.current.contains(event.target)) {
                setUserMenuOpenMobile(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredResults([]);
            return;
        }

        const matches = navbarConfig.menu.filter(item =>
            item.label.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setFilteredResults(matches);
    }, [searchQuery]);

    const promotions = navbarConfig?.topBar?.promotions || [];

    return (
        <div className="w-full font-sans bg-[#7CFF6B]">


            <div className="w-full select-none text-black overflow-hidden py-3 text-sm md:text-[15px] font-semibold">
                <style dangerouslySetInnerHTML={{
                    __html: `
                        @keyframes endlessMarquee {
                            0% { transform: translate3d(0, 0, 0); }
                            100% { transform: translate3d(-33.33%, 0, 0); }
                        }
                        .marquee-track { 
                            display: flex; 
                            width: max-content; 
                            animation: endlessMarquee 45s linear infinite; 
                        }
                    `
                }} />
                <div className="marquee-track">
                    {[...Array(3)].map((_, trackIdx) => (
                        <div key={trackIdx} className="flex items-center whitespace-nowrap">
                            {promotions.map((item, index) => {
                                const Icon = iconMap ? iconMap[item.icon] : null;
                                return (
                                    <div key={`${trackIdx}-${index}`} className="flex items-center gap-2.5 px-8 md:px-12">
                                        {Icon && <Icon className="text-base md:text-lg shrink-0 stroke-[2.2]" />}
                                        <span className="tracking-wide">{item.text}</span>
                                        <span className="ml-8 md:ml-12 text-base md:text-lg font-black opacity-40">•</span>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
            <div className="px-0 -mt-1 relative bg-transparent">
                <div className="px-4 sm:px-6 md:px-5 pt-1 pb-4 md:pb-6 rounded-t-[2.5rem] md:rounded-t-[3.5rem] bg-white shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
                    <div className="  mx-auto block md:hidden lg:hidden">
                        <Link to="/" className="max-w-32.5 mx-auto" style={{ top: "0px" }}>
                            <img src={Logo} alt="Logo" className="h-7 w-auto object-contain block mx-auto" />
                        </Link>
                    </div>
                    <div className="flex md:hidden items-center justify-between w-full relative py-2">
                        <div className="flex items-center gap-4 z-10">
                            <button className="p-0.5" onClick={() => setSidebarOpen(true)}>
                                <FiMenu size={26} className="text-black stroke-2" />
                            </button>
                            <button className="p-0.5" onClick={() => setSearchOpen(true)}>
                                <FiSearch size={23} className="text-black stroke-2" />
                            </button>
                        </div>
                        <div className="flex items-center gap-3 z-10">
                            <div
                                className="relative p-1"
                                onMouseEnter={openUserMenuMobile}
                                onMouseLeave={closeUserMenuMobile}
                                ref={userMenuRefMobile}
                            >
                                <button
                                    className="p-0.5"
                                    onClick={() => setUserMenuOpenMobile((v) => !v)}
                                    title="Account"
                                >
                                    <FiUser size={22} className="text-black stroke-[1.8]" />
                                </button>
                                <div className={`absolute right-0 top-full mt-1 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 transition-all duration-200 ${userMenuOpenMobile ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}>
                                    <button
                                        onClick={() => { setUserMenuOpenMobile(false); setLoginDrawerOpen(true); }}
                                        className="flex cursor-pointer items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100"
                                    >
                                        <FiUser size={16} className="stroke-[1.8] text-green-500" />
                                        Login
                                    </button>
                                    <button
                                        onClick={() => { setUserMenuOpenMobile(false); setRegisterDrawerOpen(true); }}
                                        className="flex cursor-pointer items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                                    >
                                        <FiUserPlus size={16} className="stroke-[1.8] text-green-500" />
                                        Register
                                    </button>
                                </div>
                            </div>
                            <Link to="/wishlist" className="p-1">
                                <FiHeart size={23} className="text-black stroke-[1.8]" />
                            </Link>
                            <button onClick={onCartClick} className="relative p-1">
                                <div className="p-2.5 rounded-full bg-[#7CFF6B] shadow-sm flex items-center justify-center">
                                    <FiShoppingBag size={20} className="text-black stroke-2" />
                                </div>
                                <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#FF3B00] text-white text-[9px] font-black flex items-center justify-center border border-white">
                                    {cartItemCount}
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center justify-between w-full gap-6 pt-4">
                        <Link to="/" className="shrink-0">
                            <img src={Logo} alt="Logo" className="h-9 lg:h-11 w-auto object-contain" />
                        </Link>

                        <ul className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-[15px] xl:text-[16px] flex-1 justify-center text-black">
                            {navbarConfig.menu.map((item, idx) => (
                                <li key={idx} className="relative py-2">
                                    <Link to={item.link} className="flex items-center gap-1 transition-colors hover:text-green-500 text-black">
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        <div className="flex items-center gap-4 shrink-0 justify-end">
                            <button className="hidden lg:flex items-center gap-2 text-[14px] text-gray-600 hover:text-black" onClick={() => setSearchOpen(true)}>
                                <span className="text-gray-400 font-normal">Start your search here...</span>
                                <FiSearch size={20} className="stroke-[1.8]" />
                            </button>
                            <button className="md:flex lg:hidden" onClick={() => setSearchOpen(true)}>
                                <FiSearch size={22} className="text-black stroke-[1.6]" />
                            </button>
                            <div
                                className="relative"
                                onMouseEnter={openUserMenu}
                                onMouseLeave={closeUserMenu}
                                ref={userMenuRef}
                            >
                                <button className="flex items-center p-1 cursor-pointer" title="Account">
                                    <FiUser size={22} className="text-black stroke-[1.8] hover:text-green-500 transition-colors" />
                                </button>
                                <div className={`absolute right-0 top-full mt-1 cursor-pointer w-48 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50 transition-all duration-200 ${userMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                                    }`}>
                                    <button
                                        onClick={() => { setUserMenuOpen(false); setLoginDrawerOpen(true); }}
                                        className="flex cursor-pointer items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors border-b border-gray-100"
                                    >
                                        <FiUser size={16} className="stroke-[1.8] text-green-500" />
                                        Login
                                    </button>
                                    <button
                                        onClick={() => { setUserMenuOpen(false); setRegisterDrawerOpen(true); }}
                                        className="flex cursor-pointer items-center gap-2.5 w-full px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
                                    >
                                        <FiUserPlus size={16} className="stroke-[1.8] text-green-500" />
                                        Register
                                    </button>
                                </div>
                            </div>
                            <Link to="/wishlist" title="Wishlist">
                                <FiHeart size={24} className="text-black cursor-pointer stroke-[1.8] hover:text-green-500 transition-colors" />
                            </Link>
                            <button onClick={onCartClick} className="relative cursor-pointer flex items-center">
                                <div className="p-3 rounded-full bg-[#7CFF6B] shadow-sm">
                                    <FiShoppingBag size={22} className="text-black stroke-2" />
                                </div>
                                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#FF3B00] text-white text-[11px] font-black flex items-center justify-center border-2 border-white">
                                    {cartItemCount}
                                </span>
                            </button>
                        </div>

                    </div>
                </div>
            </div>


            <div className={`fixed inset-0 bg-black/40 z-300 transition-opacity duration-300 ${searchOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setSearchOpen(false)} />
            <div className={`fixed top-0 left-0 h-full w-full max-w-sm bg-white z-350 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${searchOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
                    <FiSearch size={19} className="text-black stroke-[2.5] shrink-0" />
                    <input
                        ref={searchInput}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="What are you looking for?"
                        className="flex-1 outline-none text-[15px] font-medium placeholder-gray-400 text-black bg-transparent"
                    />
                    <button onClick={() => setSearchOpen(false)} className="p-1.5 hover:bg-gray-100 rounded-full transition-colors shrink-0">
                        <FiX size={21} className="text-black stroke-[2.2]" />
                    </button>
                </div>
                <div className="p-5 flex flex-col gap-5 overflow-y-auto">
                    {searchQuery.trim() === "" ? (
                        <>
                            <p className="text-[11px] font-black tracking-widest uppercase text-gray-400">Popular Queries</p>
                            <button onClick={() => setSearchQuery("All Products")} className="text-sm font-semibold text-gray-700 hover:text-green-500 text-left block">All Products</button>
                            <button onClick={() => setSearchQuery("Whey Protein")} className="text-sm font-semibold text-gray-700 hover:text-green-500 text-left block">Whey Protein</button>
                            <button onClick={() => setSearchQuery("About Us")} className="text-sm font-semibold text-gray-700 hover:text-green-500 text-left block">About Us</button>
                        </>
                    ) : filteredResults.length > 0 ? (
                        <>
                            <p className="text-[11px] font-black tracking-widest uppercase text-gray-400">Search Results ({filteredResults.length})</p>
                            <div className="flex flex-col gap-3">
                                {filteredResults.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={item.link}
                                        onClick={() => setSearchOpen(false)}
                                        className="text-sm font-semibold text-gray-800 hover:text-green-500 py-1.5 border-b border-gray-50 block"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                        </>
                    ) : (
                        <div className="py-12 text-center flex flex-col items-center justify-center gap-2">
                            <FiSearch size={32} className="text-gray-300 stroke-[1.5]" />
                            <p className="text-sm font-bold text-gray-800 mt-2">No results found</p>
                            <p className="text-xs text-gray-400">We couldn't find anything matching "{searchQuery}"</p>
                        </div>
                    )}
                </div>
            </div>


            <div className={`fixed inset-0 bg-black/40 z-160 transition-opacity duration-300 lg:hidden ${sidebarOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`} onClick={() => setSidebarOpen(false)} />
            <div className={`fixed top-0 left-0 w-295px sm:w-[320px] h-screen bg-white z-170 shadow-2xl flex flex-col transition-transform duration-300 ease-out lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <button className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors" onClick={() => setSidebarOpen(false)}>
                    <FiX size={22} className="stroke-[2.2]" />
                </button>
                <div className="mt-12 flex-1 overflow-y-auto flex flex-col justify-between pb-8">
                    <div>
                        {navbarConfig.menu.map((item, idx) => (
                            <div key={idx} className="border-b border-gray-100">
                                <div className="flex items-center justify-between px-6 py-4 cursor-pointer" onClick={() => setSidebarOpen(false)}>
                                    <Link to={item.link} className="font-extrabold text-[14px] uppercase tracking-wide text-black w-full block">
                                        {item.label}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="px-6 flex flex-col gap-4 mt-auto pt-6 border-t border-gray-100">
                        <Link to="/wishlist" onClick={() => setSidebarOpen(false)} className="flex items-center gap-2 font-bold text-sm text-gray-800 uppercase tracking-wider">
                            <FiHeart size={18} /> Wishlist
                        </Link>

                        <button
                            onClick={() => { setSidebarOpen(false); setLoginDrawerOpen(true); }}
                            className="flex items-center gap-2 font-bold text-sm text-gray-800 uppercase tracking-wider text-left"
                        >
                            <FiUser size={18} /> Login
                        </button>

                        <button
                            onClick={() => { setSidebarOpen(false); setRegisterDrawerOpen(true); }}
                            className="flex items-center gap-2 font-bold text-sm text-gray-800 uppercase tracking-wider text-left"
                        >
                            <FiUserPlus size={18} /> Register
                        </button>
                    </div>
                </div>
            </div>


            <LoginDrawer isOpen={loginDrawerOpen} onClose={() => setLoginDrawerOpen(false)} />
            <SimpleRegisterDrawer isOpen={registerDrawerOpen} onClose={() => setRegisterDrawerOpen(false)} />
        </div>
    );
}