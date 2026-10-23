import { useState } from "react";
import { Link, Links } from "react-router-dom";
import Logo from "../../assets/Img/gymecomlogo.jpg";
import {
    FiPhone, FiMail, FiMessageSquare, FiArrowUp,
    FiFacebook, FiTwitter, FiInstagram, FiYoutube
} from "react-icons/fi";
import {
    FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal
} from "react-icons/fa";

const socialIconMap = {
    facebook: FiFacebook,
    twitter: FiTwitter,
    instagram: FiInstagram,
    youtube: FiYoutube,
};


const staticFooterData = {
    contact: {
        phone: "+1 (234) 567-890",
        email: "support@nutreko.com",
        liveChat: "Live Chat Support"
    },
    socials: [
        { icon: "facebook", href: "https://facebook.com" },
        { icon: "twitter", href: "https://twitter.com" },
        { icon: "instagram", href: "https://instagram.com" },
        { icon: "youtube", href: "https://youtube.com" }
    ],
    columns: [
        {
            title: "Shop",
            links: [
                { label: "All Products", path: "/shop" },
                { label: "Whey Protein", path: "/shop" },
                { label: "Pre-Workout", path: "/shop" },
                { label: "Mass Gainers", path: "/shop" },
                { label: "BCAA & Creatine", path: "/shop" }
            ]
        },
        {
            title: "Our Company",
            links: [
                { label: "About Us", path: "/about" },
                { label: "Our Blog", path: "/Blog" },
                { label: "Careers", path: "/" },
                { label: "Press & Media", path: "/" },
                { label: "Store Locator", path: "/" }
            ]
        },
        {
            title: "Support",
            links: [
                { label: "Contact Us", path: "/contact" },

                { label: "Shipping & Returns", path: "/" },
                { label: "Track Order", path: "/" },
                { label: "Quality Guarantee", path: "/" }
            ]
        },
        {
            title: "Legal",
            links: [
                { label: "Terms of Service", path: "/" },
                { label: "Privacy Policy", path: "/" },
                { label: "Cookie Policy", path: "/" },
                { label: "Refund Policy", path: "/" }
            ]
        }
    ],
    newsletter: {
        heading: "Join Our Newsletter",
        subtext: "Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.",
        placeholder: "Enter your email address...",
        btnText: "Subscribe"
    }
};

const staticFooterConfig = {
    backgroundColor: "#111111",
    backgroundImage: "",
    overlayOpacity: "0.5"
};

export default function Footer() {
    const [email, setEmail] = useState("");
    const { contact, socials, columns, newsletter } = staticFooterData;

    return (
        <footer
            className="w-full mt-auto relative text-white"
            style={{
                backgroundImage: staticFooterConfig.backgroundImage ? `url(${staticFooterConfig.backgroundImage})` : "none",
                backgroundColor: staticFooterConfig.backgroundColor,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
            }}
        >
            {staticFooterConfig.backgroundImage && (
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundColor: `rgba(0, 0, 0, ${staticFooterConfig.overlayOpacity})`,
                    }}
                />
            )}

            <div className="relative z-10">

                <div className="border-b border-white/10 px-4 sm:px-8 lg:px-12 py-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
                        <Link to="/" className="shrink-0">
                            <img src={Logo} alt="Nutreko"
                                className="h-8 w-auto object-contain brightness-0 invert" />
                        </Link>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 text-[13px] font-medium text-white/75">
                            <Link
                                to={`tel:${contact.phone}`}
                                onClick={(e) => {
                                    window.location.href = `tel:${contact.phone}`;
                                    e.preventDefault();
                                }}
                                className="flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <span className="w-6 h-6 rounded-full border border-[#76ff58] flex items-center justify-center shrink-0">
                                    <FiPhone size={11} className="text-[#76ff58]" />
                                </span>
                                {contact.phone}
                            </Link>
                            <Link
                                to="#"
                                onClick={(e) => {
                                    window.location.href = `mailto:${contact.email}`;
                                    e.preventDefault();
                                }}
                                className="flex items-center gap-2 hover:text-white transition-colors"
                            >
                                <span className="w-6 h-6 rounded-full border border-[#76ff58] flex items-center justify-center shrink-0">
                                    <FiMail size={11} className="text-[#76ff58]" />
                                </span>
                                {contact.email}
                            </Link>
                            <button className="flex items-center gap-2 hover:text-white transition-colors">
                                <span className="w-6 h-6 rounded-full border border-[#76ff58] flex items-center justify-center shrink-0">
                                    <FiMessageSquare size={11} className="text-[#76ff58]" />
                                </span>
                                {contact.liveChat}
                            </button>
                        </div>

                        <div className="flex items-center gap-1">
                            {socials.map((s, i) => {
                                const Icon = socialIconMap[s.icon];
                                return (
                                    <span key={i} className="flex items-center">
                                        <Link
                                            to={s.href}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="w-8 h-8 flex items-center justify-center text-white/50 hover:text-white transition-colors"
                                        >
                                            {Icon && <Icon size={15} />}
                                        </Link>
                                        {i < socials.length - 1 && (
                                            <span className="text-white/20 text-[10px]">|</span>
                                        )}
                                    </span>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="px-4 sm:px-8 lg:px-12 py-12">
                    <div className="flex flex-col xl:flex-row gap-10 xl:gap-8">

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1">
                            {columns.map((col, i) => (
                                <div key={i}>
                                    <h4 className="text-white font-extrabold text-[11px] tracking-[0.15em] uppercase mb-5">
                                        {col.title}
                                    </h4>
                                    <ul className="space-y-3">
                                        {col.links.map((link, j) => (
                                            <li key={j}>

                                                <Link
                                                    to={link.path}
                                                    className="text-white/50 text-[13px] font-normal hover:text-white transition-colors leading-relaxed block"
                                                >
                                                    {link.label}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="hidden xl:block w-px bg-white/10 self-stretch mx-2" />


                        <div className="xl:w- shrink-0">
                            <h4 className="font-black uppercase text-[18px] sm:text-[20px] leading-tight mb-3"
                                style={{ color: "#76ff58" }}>
                                {newsletter.heading}
                            </h4>
                            <p className="text-white/50 text-[13px] mb-6 leading-relaxed">
                                {newsletter.subtext}
                            </p>

                            <div className="w-full max-w-[320px] mx-auto flex items-center justify-between gap-2">

                                <input
                                    type="email"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder={newsletter.placeholder}

                                    className="flex-1 border border-white/15 rounded-full
            px-4 py-2.5 text-[12px] text-white placeholder-white/35
            outline-none focus:border-white/40 transition-colors"
                                    style={{ backgroundColor: "rgba(255,255,255,0.07)" }}
                                />

                                <button
                                    onClick={() => { if (email.trim()) setEmail(""); }}

                                    className="w-auto shrink-0 bg-white text-black font-bold text-[11px] sm:text-[12px] uppercase tracking-wider
            px-4 py-2.5 rounded-full
            hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                                >
                                    {newsletter.btnText}
                                </button>

                            </div>
                        </div>
                    </div>
                </div>


                <div className="border-t border-white/10 px-4 sm:px-8 lg:px-12 py-4">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-white/40 text-[12px] order-2 sm:order-1 text-center sm:text-left">
                            Copyright © 2026{" "}
                            <strong className="text-white font-bold">Nutreko</strong>.{" "}
                            All rights reserved | Designed by{" "}
                            <Link
                                to="https://innovizetechsolution.com/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-[#76ff58] transition-colors font-semibold"
                            >
                                Innovize Tech Solution Pvt Ltd
                            </Link>
                        </p>

                        <div className="flex items-center gap-2 order-1 sm:order-2">
                            {[FaCcVisa, FaCcMastercard, FaCcAmex, FaCcDiscover, FaCcPaypal].map((Icon, i) => (
                                <div key={i}
                                    className="w-10 h-7 flex items-center justify-center
                                        bg-white/10 border border-white/15 rounded
                                        text-white/70 hover:text-white transition-colors">
                                    <Icon size={22} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full
                        bg-[#333] hover:bg-[#444] text-white
                        flex items-center justify-center
                        shadow-xl active:scale-95 transition-all duration-200"
                    aria-label="Back to top"
                >
                    <FiArrowUp size={17} className="stroke-[2.5]" />
                </button>
            </div>
        </footer>
    );
}