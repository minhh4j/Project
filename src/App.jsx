import React from "react";
import LoginForm from "./authentication/LoginForm";
import Signupdup from "./authentication/SignUpForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductProvider from "./Context/ProductContext";
import HomePage from "./homepage/HomePage";
import Cart from "./cart/Cart";
import Orders from "./cart/Orders";
import PaymentForm from "./cart/PaymentFrom";
import AdminPage from "./admin/AdminPage";
import Dashboard from "./admin/Dashboard";
import HandleProducts from "./admin/HandleProducts";
import UserDetails from "./admin/UserDetails";
import AdminProvider from "./Context/AdminContext";

function App() {
  return (
    <Router>
      <ProductProvider>
        <AdminProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="signin" element={<Signupdup />} />
            <Route path="login" element={<LoginForm />} />
            <Route path="cartlist" element={<Cart />} />
            <Route path="orders" element={<Orders />} />
            <Route path="payment" element={<PaymentForm />} />

            {/* // admmin  */}
            <Route path="adminpage" element={<AdminPage />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="handle-products" element={<HandleProducts />} />
              <Route path="user-details" element={<UserDetails />} />
            </Route>
          </Routes>
        </AdminProvider>
      </ProductProvider>
    </Router>
  );
}

export default App;
