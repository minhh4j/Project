import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const ProductContext = createContext();


// login 
function ProductProvider({ children }) {
  const [product , setProduct] = useState([])
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (username) => {
    setLoggedIn(true);
    localStorage.setItem("username", username);
  };

  //fetch products in home page
  useEffect(() => {
    const fetchProduct = async () => {
      try{
        const response = await axios.get("http://localhost:3008/products")
        setProduct(response.data)
      }
      catch(error){
        console.error("error fetching products" , error)
      }
    }
    fetchProduct();
  },[])


  return (
    <ProductContext.Provider value={{ login, loggedIn , product }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
