

import React from "react";

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-700 bg-opacity-60">
      <div className="relative w-full max-w-3xl p-12 text-center text-white bg-gray-800 rounded-lg shadow-lg">
        <span onClick={onClose} className="cursor-pointer text-2xl absolute top-2.5 right-4">&times;</span>
        
        <div className="flex gap-16">
          <div className="w-64 overflow-hidden rounded-lg h-52">
            <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
          </div>
          
          <div className="flex flex-col gap-4 text-left">
            <h2 className="my-2 text-xl text-white">{product.name}</h2>
            <p className="mb-2 text-base text-white">
              <strong>Description: </strong>{product.description || "No description available"}
            </p>
            <div className="my-2">
              <p className="text-lg font-semibold text-white">₹{product.price ? product.price.toFixed(2) : "N/A"}</p>
              {product.oldPrice && (
                <p className="text-sm text-white line-through">₹{product.oldPrice.toFixed(2)}</p>
              )}
            </div>
            <p className="text-sm text-white">
              <strong>Ingredients:</strong> {product.ingredients ? product.ingredients.join(", ") : "N/A"}
            </p>
            <div className="flex flex-col gap-2 pl-8 text-left border-l border-white">
              <p><strong>Seller:</strong> {product.seller || "Unknown"}</p>
              <p><strong>Item Left:</strong> {product.stock !== undefined ? `${product.stock} Nos` : "Out of stock"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
