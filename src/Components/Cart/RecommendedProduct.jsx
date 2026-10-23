import React from "react";
const RecommendedProduct = ({ product, onAdd }) => {
  
  return (
    <div className="bg-white flex rounded-lg shadow overflow-hidden border border-gray-200">
      <div className=" bg-gray-100 flex items-center justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-30 h-30 object-contain "
        />
      </div>
      <div className="p-1">
        <h4 className="font-medium text-xs text-gray-900 mb-2 line-clamp-2 h-8">
          {product.name}
        </h4>
        <div className="flex items-center gap-2 mb-2 flex-col">
          <span className="text-gray-400 line-through text-xs">₹{product.originalPrice.toFixed(2)}</span>
          <span className="font-bold text-sm text-gray-900">₹{product.price.toFixed(2)}</span>
        </div>
        <button
          onClick={() => onAdd(product)}
          className="w-full py-1 text-sm font-medium text-gray-900 border border-gray-900 rounded-md hover:bg-gray-50 transition-colors"
        >
          + Add
        </button>
      </div>
    </div>
  );
};

export default RecommendedProduct;
