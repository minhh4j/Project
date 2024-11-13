import React, { useContext } from 'react';
import { ProductContext } from '../Context/ProductContext';

function Center() {
  const { product } = useContext(ProductContext);

  return (
    <div className="container py-4">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {product.map((item) => (
          <div className="flex justify-center" key={item.id}>
            <div
              className="h-full overflow-hidden transition-all duration-300 transform bg-white rounded-lg shadow-md card w-52 hover:scale-105 hover:shadow-xl"
            >
              <img
                src={item.image}
                className="object-cover w-full h-32"
                alt={item.name}
              />
              <div className="p-3 text-center">
                <h6 className="text-sm font-semibold">{item.name}</h6>
                <p className="mb-1 text-sm text-primary">${item.price}</p>
                {item.oldPrice && (
                  <p className="text-xs text-gray-500 line-through">${item.oldPrice}</p>
                )}
                <button className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Center;

