import React, { useEffect, useRef } from 'react';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const WorldwideOffice = () => {
  const mapContainer = useRef(null);

  const offices = [
    {
      id: 1,
      name: "London Office",
      address: "123 Street Name, London UK",
      phone: "+44 1234 567890",
      email: "london@nutreko.com",
      icon: "🇬🇧",
      lat: 51.5074,
      lng: -0.1278
    },
    {
      id: 2,
      name: "Beijing",
      address: "456 Avenue Name, Beijing China",
      phone: "+86 10 1234 5678",
      email: "beijing@nutreko.com",
      icon: "🇨🇳",
      lat: 39.9042,
      lng: 116.4074
    },
    {
      id: 3,
      name: "Washington D.C.",
      address: "789 Boulevard Ave, DC USA",
      phone: "+1 202 555 0123",
      email: "dc@nutreko.com",
      icon: "🇺🇸",
      lat: 38.9072,
      lng: -77.0369
    },
    {
      id: 4,
      name: "New York",
      address: "101 Park Avenue, New York USA",
      phone: "+1 212 555 0456",
      email: "ny@nutreko.com",
      icon: "🇺🇸",
      lat: 40.7128,
      lng: -74.0060
    }
  ];

  useEffect(() => {

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css';
    document.head.appendChild(link);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
    script.async = true;
    script.onload = () => {
      const L = window.L;
      if (L && mapContainer.current) {

        const map = L.map(mapContainer.current).setView([20, 0], 2);

        r
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);


        offices.forEach(office => {
          const marker = L.marker([office.lat, office.lng]);
          marker.addTo(map);
          marker.bindPopup(`
            <div style="text-align: left; font-size: 12px;">
              <h4 style="margin: 0 0 8px 0; font-weight: bold; font-size: 14px;">${office.name}</h4>
              <p style="margin: 4px 0;">${office.address}</p>
              <p style="margin: 4px 0;">${office.phone}</p>
              <p style="margin: 4px 0;">${office.email}</p>
            </div>
          `);
        });
      }
    };
    document.head.appendChild(script);

    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, []);

  return (
    <section className="container mx-auto bg-white">
      <div className=" mb-12 mt-10">

        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3493.210027794234!2d76.60364647496645!3d28.89210627224677!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d85529900b3c5%3A0x9227964fe9edda4e!2sInnovize%20Tech%20Solution%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1781077580543!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Innovize Tech Solution Pvt Ltd Location"
        />
      </div>

      <div className="max-w-7xl mx-auto text-center mb-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase text-black mb-2">
          OUR WORLDWIDE OFFICE
        </h2>
        <div className="w-12 h-1.5 bg-green-500 rounded-full mx-auto"></div>
      </div>

      <div className=" mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
        {offices.map((office) => (
          <div
            key={office.id}
            className="bg-gray-50 rounded-xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-green-500"
          >

            <div className="text-4xl mb-4">{office.icon}</div>

            <h3 className="text-lg md:text-xl font-bold text-black uppercase tracking-wide mb-4">
              {office.name}
            </h3>

            <div className="space-y-3">

              <div className="flex items-start gap-3">
                <FiMapPin size={18} className="text-green-500 shrink-0 mt-1" />
                <p className="text-sm text-gray-700 font-medium">{office.address}</p>
              </div>

              <Link
                to="#"
                onClick={(e) => {
                  window.location.href = `tel:${office.phone}`;
                  e.preventDefault();
                }}
                className="flex items-center gap-3 hover:text-green-500 transition-colors"
              >
                <FiPhone size={18} className="text-green-500 shrink-0" />
                <p className="text-sm text-gray-700 font-medium">{office.phone}</p>
              </Link>


              <Link
                to="#"
                onClick={(e) => {
                  window.location.href = `mailto:${office.email}`;
                  e.preventDefault();
                }}
                className="flex items-center gap-3 hover:text-green-500 transition-colors"
              >
                <FiMail size={18} className="text-green-500 shrink-0" />
                <p className="text-sm text-gray-700 font-medium">{office.email}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WorldwideOffice;
