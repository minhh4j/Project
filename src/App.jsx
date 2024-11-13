import React from "react";
import LoginForm from "./authentication/LoginForm";
import Signupdup from "./authentication/SignUpForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./homepage/nav";
import Center from "./homepage/Center";
import ProductProvider from "./Context/ProductContext";
import HomePage from "./homepage/HomePage";

function App() {
  return (
    <Router>
      <ProductProvider>
        <Routes>
           <Route path="/" element={<HomePage/>}/>
        </Routes>
      </ProductProvider>
    </Router>
  );
}

export default App;
