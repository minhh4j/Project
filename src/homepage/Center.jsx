import React, { useContext, useState } from "react";
import { ProductContext } from "../Context/ProductContext";
import { toast } from "react-toastify";
// import ProductInfoModal from './ProductInfoModal';

function Center() {
  const { product, loggedIn, setToastMessage, addToCart , cart } =
    useContext(ProductContext);
  const [selectedProduct, setSelectedProduct] = useState(null);
  // const handleImageClick = (product) => {
  //   setSelectedProduct(product); // Set the clicked product to state open
  // };

  const closedModal = () => {
    setSelectedProduct(null); // this close the modal
  };

  const handleAddToCartClick = (cart) => {
    // add to cart add product
    console.log("Adding product to cart:",cart );
    if (!loggedIn) {
      setToastMessage("Please log in to add items to your cart");
    } else {
      addToCart(product);
      console.log("Updated cart:", cart);
    }
  };

  return (
    <div className="container py-4">
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
        {product.map((item) => (
          <div className="flex justify-center" key={item.id}>
            <div
              className="h-full overflow-hidden transition-all duration-300 transform shadow-md rouended-lg bg-sky-300 card w-52 hover:scale-105 hover:shadow-xl"
              // onClick={() => handleImageClick(product)}
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
                  <p className="text-xs text-gray-500 line-through">
                    ${item.oldPrice}
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
      {selectedProduct && (
        <ProductInfoModal product={selectedProduct} onClose={closedModal} />
      )}
    </div>
  );
}

export default Center;
