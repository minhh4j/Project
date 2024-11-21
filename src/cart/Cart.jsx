
import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";

function Cart() {
  const { cart, removeFromCart , product} = useContext(ProductContext);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Your <span className="text-blue-500">Cart</span>
        </h1>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Continue Shopping
        </button>
      </div>
      {/* Cart Content */}
      <div className="p-6 bg-white rounded-lg shadow-md">
        {cart.length > 0 ? (
          cart.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between py-4 border-b border-gray-300"
            >
              {/* Product Image */}
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-24 h-24 rounded-lg"
              />

              {/* Product Details */}
              <div className="flex-1 px-6">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="mt-2">
                  <span className="text-gray-400 line-through">
                    ₹{product.oldPrice}
                  </span>{" "}
                  <span className="text-lg font-semibold text-blue-600">
                    ₹{product.price}
                  </span>
                </p>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2">
                {/* <button
             
                  className="w-8 h-8 text-lg font-bold text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
                >
                  -
                </button> */}
                <span className="text-lg">{product.quantity}</span>
                {/* button */}
              </div>
              {/* Remove Action */}
              <button
                onClick={() => removeFromCart(product.id)}
                className="ml-4 text-red-500 hover:text-red-700"
              >
               {/* logo */}
              </button>
            </div>
          ))
        ) : (
          <p className="text-xl text-center text-gray-500">
            Your cart is empty.
          </p>
        )}
      </div>
</div>
  );
}

export default Cart;
