import React from "react";
import LoginForm from "./authentication/LoginForm";
import Signupdup from "./authentication/SignUpForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductProvider from "./Context/ProductContext";
import HomePage from "./homepage/HomePage";
import Cart from "./cart/cart";
// import Wishlist from "./cart/WishList";
import Orders from "./cart/Orders";
import PaymentForm from "./cart/PaymentFrom";

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
           <Route path="/" element={<HomePage/>}/>
           <Route path="signin" element={<Signupdup/>}/>
           <Route path="login" element={<LoginForm/>}/>
           <Route path="cartlist" element={<Cart/>}/>

           <Route path="orders" element={<Orders/>}/>
           <Route path="payment" element={<PaymentForm/>}/>
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
