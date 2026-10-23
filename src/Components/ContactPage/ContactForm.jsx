import React, { useState } from 'react';
import { FiPhone, FiMail, FiMessageSquare } from 'react-icons/fi';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const contactMethods = [
    {
      id: 1,
      icon: FiPhone,
      title: "PHONE",
      details: ["+44 1234 567890", "+1 212 555 0456"]
    },
    {
      id: 2,
      icon: FiMail,
      title: "EMAIL",
      details: ["info@nutreko.com", "support@nutreko.com"]
    },
    {
      id: 3,
      icon: FiMessageSquare,
      title: "LIVE CHAT",
      details: ["Available 24/7", "Instant Support"]
    }
  ];

  return (
    <section className="container mx-auto py-20  ">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        
     
        <div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-black mb-2 uppercase">
            Get in touch and we'll help your business
          </h2>
          <div className="w-12 h-1.5 bg-green-500 rounded-full mb-8"></div>

          <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed">
            Have questions? Our team is here to help. Reach out through any of these channels and we'll get back to you as soon as possible.
          </p>

         
          <div className="space-y-6">
            {contactMethods.map((method) => {
              const Icon = method.icon;
              return (
                <div key={method.id} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                    <Icon size={24} className="text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-black uppercase tracking-wide mb-2">
                      {method.title}
                    </h3>
                    <div className="space-y-1">
                      {method.details.map((detail, idx) => (
                        <p key={idx} className="text-sm text-gray-700 font-medium">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 md:p-8 shadow-md border border-gray-100">
          <h3 className="text-2xl font-black text-black mb-6 uppercase">Need Help?</h3>

          <form onSubmit={handleSubmit} className="space-y-5">
          
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-gray-900 placeholder-gray-400"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What is this about?"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-gray-900 placeholder-gray-400"
                required
              />
            </div>

      
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wide">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your inquiry..."
                rows="6"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-green-500 transition-colors text-gray-900 placeholder-gray-400 resize-none"
                required
              ></textarea>
            </div>

          
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-black font-bold text-base uppercase tracking-wide py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
          </form>

          <p className="text-xs text-gray-500 text-center mt-4">
            We'll respond within 24 hours
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
