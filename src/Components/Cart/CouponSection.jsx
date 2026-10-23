import React, { useState } from 'react';
import { Tag, ChevronRight, X, ShoppingBag } from 'lucide-react';

const coupons = [
  {
    code: 'ATC5',
    requirement: 'Add item worth ₹167.00 more to avail',
    description: 'Get 5% Off on your order.',
    conditions: [
      'Minimum Order Amount is ₹499/-',
      'Coupon code cannot combine with other offers.',
    ],
  },
  {
    code: 'TOTE899',
    requirement: 'Add item worth ₹567.00 more to avail',
    description: 'Add product worth ₹899/- and get a free Tote Bag',
    conditions: [
      'Cannot combine with any other coupon code',
      'Only one free gift applies per order.',
    ],
  },
  {
    code: 'B2GSPF',
    requirement: 'Add 1 more item to avail',
    description: 'Add 2 products and get a free SPF 60 Sunscreen (50g)',
    conditions: [
      'Cannot combine with any other coupon code',
      'Only one free gift applies per order',
    ],
  },
  {
    code: 'MOIST599',
    requirement: 'Add item worth ₹285.00 more to avail',
    description: 'Add product worth ₹599/- and get a free Moisturizer',
    conditions: [
      'Cannot combine with any other coupon code',
      'Only one free gift applies per order',
    ],
  },
];

const CouponSection = () => {
  const [showOffers, setShowOffers] = useState(false);
  const [inputCode, setInputCode] = useState('');

  return (
    <>
      <div className="bg-white rounded-xl mx-2 px-4 py-3 shadow-sm">
        <div className="relative mb-2.5">
          <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500" />
          <input
            type="text"
            placeholder="Enter Coupon Code"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value.toUpperCase())}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400 bg-gray-50"
          />
        </div>
        <div className="flex justify-end">
          <button
            onClick={() => setShowOffers(true)}
            className="text-gray-800 font-medium text-sm flex items-center gap-0.5 hover:text-gray-500 transition-colors"
          >
            View Coupons
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        onClick={() => setShowOffers(false)}
        className={`fixed inset-0 z-55 transition-all duration-300 ${
          showOffers ? 'bg-black/30 pointer-events-auto' : 'bg-transparent pointer-events-none'
        }`}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-60 flex flex-col
          transition-transform duration-300 ease-out
          ${showOffers ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 tracking-tight">
            Offers &amp; Benefits
          </h2>
          <button
            onClick={() => setShowOffers(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="px-4 pt-4 pb-2">
            <div className="relative">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-teal-500" />
              <input
                type="text"
                placeholder="Enter Coupon Code"
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 placeholder:text-gray-400"
              />
            </div>
          </div>
          <div className="px-4 pt-3 pb-1">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Unavailable Offers
            </p>
          </div>
          <div className="px-4 pb-6">
            {coupons.map((coupon, idx) => (
              <div
                key={coupon.code}
                className={`py-4 ${
                  idx < coupons.length - 1
                    ? 'border-b border-dashed border-gray-200'
                    : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center shrink-0">
                    <Tag className="w-3.5 h-3.5 text-white" />
                  </div>

                  <span className="border border-gray-300 rounded-md px-2 py-0.5 text-sm font-bold text-gray-800 font-mono tracking-wide">
                    {coupon.code}
                  </span>

                  <button className="ml-auto flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors whitespace-nowrap">
                    <ShoppingBag className="w-3 h-3" />
                    + Add Item(s)
                  </button>
                </div>

                <p className="text-xs font-medium text-red-500 mb-1.5 pl-9">
                  {coupon.requirement}
                </p>

                <p className="text-sm text-gray-800 mb-2 pl-9 leading-snug">
                  {coupon.description}
                </p>

                <ul className="pl-9 space-y-0.5">
                  {coupon.conditions.map((c, i) => (
                    <li key={i} className="text-xs text-gray-400 flex gap-1.5">
                      <span className="mt-px shrink-0">•</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponSection;
