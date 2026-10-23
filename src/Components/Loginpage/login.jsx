import React, { useState } from "react";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function LoginDrawer({ isOpen, onClose }) {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [rememberMe, setRememberMe] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Logging in with:", formData, { rememberMe });
    };

    return (
        <>
          
            <div 
                className={`fixed inset-0 bg-black/40 z-500 transition-opacity duration-500 ease-out ${
                    isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`} 
                onClick={onClose} 
            />

            <div 
                className={`fixed top-0 right-0 h-screen w-full sm:w-110 bg-white shadow-2xl z-510 flex flex-col transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) transform ${
                    isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-95"
                }`}
            >
                
                <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                    <h2 className="text-[22px] font-bold text-[#1c1c1c]">Sign in</h2>
                    <button 
                        onClick={onClose} 
                        className="flex items-center gap-1.5 text-gray-500 hover:text-black transition-colors duration-300 font-semibold text-sm group"
                    >
                        <FiX size={20} className="stroke-[2.5] group-hover:rotate-90 transition-transform duration-300" />
                        <span>Close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 font-sans">
                    <form onSubmit={handleSubmit} className="space-y-5">
                      
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Username or email address <span className="text-[#e25c5c]">*</span>
                            </label>
                            <input 
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                required
                                className="w-full px-5 py-3.5 border border-gray-200 rounded-full focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300 text-[15px]"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Password <span className="text-[#e25c5c]">*</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-3.5 border border-gray-200 rounded-full focus:outline-none focus:border-orange-400 focus:ring-1 focus:ring-orange-400 transition-all duration-300 pr-12 text-[15px]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full bg-[#7CFE6B] hover:bg-[#7CFE6B] text-white font-bold py-3.5 px-4 rounded-full transition-all duration-300 transform active:scale-[0.98] text-[15px] mt-2 shadow-sm"
                        >
                            Log in
                        </button>

                        <div className="flex items-center justify-between pt-1 text-[14px]">
                            <label className="flex items-center gap-2 text-gray-700 font-medium cursor-pointer select-none group">
                                <input 
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-orange-500 focus:ring-orange-400 transition-all duration-200"
                                />
                                <span className="group-hover:text-black transition-colors duration-200">Remember me</span>
                            </label>
                            <Link
                                href="#lost-password" 
                                className="text-[#7CFE6B] hover:text-[#7CFE6B] hover:underline font-medium transition-colors duration-200"
                            >
                                Lost your password?
                            </Link>
                        </div>
                    </form>

                    <hr className="my-8 border-gray-100" />

                    <div className="text-center py-4 flex flex-col items-center justify-center">
                        {/* <div className="w-16 h-16 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 mb-4 bg-gray-50/50">
                            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div> */}
                        
                        {/* <h3 className="text-base font-bold text-gray-900 mb-3">No account yet?</h3>
                         */}
                        {/* <a 
                            href="register"
                            className="text-sm font-bold text-gray-800 uppercase tracking-wider border-b-2 border-gray-800 pb-0.5 hover:text-[#f49b57] hover:border-[#f49b57] transition-all duration-300"
                        >
                            Create an Account
                        </a> */}
                    </div>
                </div>
            </div>
        </>
    );
}