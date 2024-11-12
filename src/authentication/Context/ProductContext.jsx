import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

function ProductProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  const login = async (username) => {
    setLoggedIn(true);
    localStorage.setItem("username", username);
  };

  return (
    <ProductContext.Provider value={{ login, loggedIn }}>
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
