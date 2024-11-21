import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

// login
function ProductProvider({ children }) {
  const [product, setProduct] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [serchTream, setSerchTream] = useState("");
  const [cart, setCart] = useState([]);
  const [curretUser, setCorentuser] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  const [cetogery, setCetogery] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();
  const [filteredProduct, setFilteredProduct] = useState([]);
  console.log(cart);

  //fetch products in home page
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3008/products");
        setProduct(response.data);
      } catch (error) {
        console.error("error fetching products", error);
      }
    };
    fetchProduct();
  }, []);

  // login

  const login = async (username, email) => {
    setLoggedIn(true);
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
  };

  //logout

  const logout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    setLoggedIn(false);
    setCart([]);
    setCorentuser(null);
    navigate("/");
  };

  //logout Modal

  const handleLogout = () => {
    setShowConfirm(true);
  };

  const confirmLogout = () => {
    logout();
    setShowConfirm(false);
  };

  const cancelLogout = () => {
    setShowConfirm(false);
  };

  // search  cheyunnath varaan vendi
  useEffect(() => {
    let filterProduct = () => {
      let filtered = product;
      // serch cheythth mukalilek varaan
      if (serchTream) {
        filtered = product.filter((product) =>
          product.name.toLowerCase().includes(serchTream.toLowerCase())
        );
      }
      // filteril ollath onnum koduthittillagil
      else if (cetogery) {
        filtered = product.filter((product) => product.cetogery === cetogery);
      }
      setFilteredProduct(filtered);
    };
    filterProduct();
  }, [cetogery, serchTream, product]);

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    if (itemToRemove) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      await updateUserCartInDB(updatedCart);
      await restoreProductStock(itemToRemove.id, itemToRemove.quantity);
    }
  };

  // Update quantity of items in cart
  const updateQuantity = async (productId, quantity) => {
    const itemToUpdate = cart.find((item) => item.id === productId);
    if (itemToUpdate) {
      const product = product.find((prod) => prod.id === productId);
      if (product && quantity > product.stock) {
        // Show toast alert if stock is not available
        toast.error("Stock not available for this quantity.");
        return; // Prevent updating quantity if stock is 0
      }

      const updatedCart = cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      );

      // Update stock based on new quantity
      const quantityDifference = quantity - itemToUpdate.quantity;
      if (quantityDifference > 0) {
        await updateProductStock(productId, quantityDifference);
      } else {
        await restoreProductStock(productId, -quantityDifference);
      }

      setCart(updatedCart);
      await updateUserCartInDB(updatedCart);
    }
  };

  // wish list
  const addToWishlist = async (product) => {
    const updatedWishlist = [...wishList];
    const existingItem = updatedWishlist.find((item) => item.id === product.id);
    if (!loggedIn) {
      setToastMessage(<>Please log in to add items to your cart</>);
    } else if (!existingItem) {
      updatedWishlist.push(product);
      setWishList(updatedWishlist);
      await updateUserWishlistInDB(updatedWishlist);
      setToastMessage(
        <>
          Added to your wishlist
          <br />
          <span>Available under profile</span>
        </>
      );
    } else {
      setToastMessage(<>Item already in wishlist!!</>);
    }
  };

  // Remove items from wishlist
  const removeFromWishlist = async (productId) => {
    const updatedWishlist = wishList.filter((item) => item.id !== productId);
    setWishList(updatedWishlist);
    await updateUserWishlistInDB(updatedWishlist);
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    setWishList([]);
    await updateUserWishlistInDB([]);
  };


const addToCart = async (product) => {
  
  const updatedCart = [...cart];
  
  const existingItem = updatedCart.find((item) => item.id === product.id);

  if (existingItem) {
  
    existingItem.quantity += 1;
  } else {
    
    updatedCart.push({ ...product, quantity: 1 });
  }

  setCart(updatedCart );

  await updateUserCartInDB(updatedCart);

  console.log("Cart after adding product:", updatedCart);
};

  
    const updateUserCartInDB = async (updatedCart) => {
      if (currentUser) {
          try {
              await axios.patch(`http://localhost:3008/user/${curretUser.id}`, { cart: updatedCart });
          } catch (error) {
              console.error("Error updating cart:", error);
          }
      }
  };

  
  return (
    <ProductContext.Provider
      value={{
        login,
        loggedIn,
        product,
        cart,
        updateQuantity,
        removeFromCart,
        setToastMessage,
        addToWishlist,
        clearWishlist,
        removeFromWishlist,
        confirmLogout,
        addToCart,
        handleLogout,
        cancelLogout,
        curretUser,
        toastMessage,
        setCetogery,
        setSerchTream,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;

