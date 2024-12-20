import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import ProductModal from "./ProductInfoModal";

function Center() {
  const { product, addToCart, search } = useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all"); // "all" for showing all products

  const filterSearch = product
    .filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    )
    .filter((item) =>
      selectedCategory === "all" ? true : item.category === selectedCategory
    );

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCartClick = (item) => {
    if (!localStorage.getItem("id")) {
      console.log("Please log in to add items to your cart.");
    } else {
      addToCart(item);
      console.log(`${item.name} added to cart!`);
    }
  };

  return (
    <div className="container py-4">
      {/* Category Buttons */}
      <div className="flex justify-center mb-4">
        {/* All Button */}
        <button
          className={`px-4 py-2 mx-2 ${
            selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedCategory("all")}
        >
          All
        </button>

        {/* Cat Button */}
        <button
          className={`px-4 py-2 mx-2 flex items-center ${
            selectedCategory === "cat" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedCategory("cat")}
        >
          Cat
        </button>

        {/* Dog Button */}
        <button
          className={`px-4 py-2 mx-2 flex items-center ${
            selectedCategory === "dog" ? "bg-blue-600 text-white" : "bg-gray-300"
          }`}
          onClick={() => setSelectedCategory("dog")}
        >
          Dog
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {filterSearch.map((item) => (
          <div className="flex justify-center" key={item.id}>
            <div className="h-full overflow-hidden transition-all duration-300 transform rounded-lg shadow-md bg-sky-300 card w-52 hover:scale-105 hover:shadow-xl">
              <img
                src={item.image}
                alt={item.name}
                onClick={() => handleImageClick(item)}
                style={{objectFit:"cover"}}
              />
              <div className="p-3 text-center">
                <h6 className="text-sm font-semibold">{item.name}</h6>
                <p className="mb-1 text-sm text-primary">₹{item.price}</p>
                {item.oldPrice && (
                  <p className="text-xs text-gray-500 line-through">
                    ₹{item.oldPrice}
                  </p>
                )}
                <button
                  className="px-4 py-2 mt-2 text-xs font-semibold text-blue-600 transition border border-blue-600 rounded-full hover:bg-blue-100"
                  onClick={() => handleAddToCartClick(item)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={handleCloseModal} />
      )}
    </div>
  );
}

export default Center;