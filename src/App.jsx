import React from "react";
import LoginForm from "./authentication/LoginForm";
import Signupdup from "./authentication/SignUpForm";
import Product from "./authentication/Context/ProductContext";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Nav from "./assets/homepage/nav";
import Center from "./assets/homepage/Center";

function App() {
  return (
    // <Router>
      <Product>
        {/* <Routes> */}
          <Nav />
          {/* <Center/> */}
        {/* </Routes> */}
      </Product>
    // </Router>
  );
}

export default App;
