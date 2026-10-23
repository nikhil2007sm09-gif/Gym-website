import React, { useState } from "react";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";

export default function RegisterDrawer({ isOpen, onClose }) {
 
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

   
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        console.log("Registering with:", formData);
    };

    return (
        <>
            
            <div 
                className={`fixed inset-0 bg-black/50 z-500 transition-opacity duration-500 ease-out ${
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
                    <h2 className="text-[22px] font-bold text-[#1c1c1c]">Register</h2>
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
                                Full Name <span className="text-[#e25c5c]">*</span>
                            </label>
                            <input 
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                                required
                                placeholder="John Doe"
                                className="w-full px-5 py-3.5 border border-gray-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300 text-[15px]"
                            />
                        </div>

                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Email address <span className="text-[#e25c5c]">*</span>
                            </label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                required
                                placeholder="example@mail.com"
                                className="w-full px-5 py-3.5 border border-gray-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300 text-[15px]"
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
                                    className="w-full px-5 py-3.5 border border-gray-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300 pr-12 text-[15px]"
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

                    
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                Confirm Password <span className="text-[#e25c5c]">*</span>
                            </label>
                            <div className="relative">
                                <input 
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleInputChange}
                                    required
                                    className="w-full px-5 py-3.5 border border-gray-200 rounded-full focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-all duration-300 pr-12 text-[15px]"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                                >
                                    {showConfirmPassword ? <FiEyeOff size={19} /> : <FiEye size={19} />}
                                </button>
                            </div>
                        </div>

                        <div className="pt-4">
                            <button 
                                type="submit"
                                className="w-full bg-[#00aa44] hover:bg-[#00943b] text-white font-bold py-4 px-4 rounded-full transition-all duration-300 transform active:scale-[0.98] text-[16px] shadow-[0_4px_12px_rgba(0,170,68,0.35)] tracking-wide"
                            >
                                Create Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}