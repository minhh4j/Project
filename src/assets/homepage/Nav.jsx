import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import "bootstrap/dist/css/bootstrap.min.css";

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container-fluid">
        
        {/* Logo */}
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img 
            src="https://images-platform.99static.com//N4VUoRJLktkazbY_0VENbLXlRyI=/13x0:1589x1576/fit-in/500x500/99designs-contests-attachments/98/98546/attachment_98546587" 
            alt="Pet Store Logo" 
            width="50" 
            height="50"
            className="me-2"
          />
          Pet Paradise
        </a>

        {/* Search Bar */}
        <div className="d-flex align-items-center ms-auto me-3">
          <input 
            type="text" 
            className="form-control me-2" 
            placeholder="Search item.." 
          />
          <button className="btn btn-outline-secondary">
            <IoMdSearch />
          </button>
        </div>

        {/* Icons with Labels */}
        <div className="d-flex align-items-center">
          <div className="nav-item text-center mx-3">
            <MdPets size="1.5em" />
            <br />
            <small><b>Food</b></small>
          </div>

          <div className="nav-item text-center mx-3">
            <AiOutlineUnorderedList size="1.5em" />
            <br />
            <small><b>Order</b></small>
          </div>

          <div className="nav-item text-center mx-3">
            <FaCartShopping size="1.5em" />
            <br />
            <small><b>Cart</b></small>
          </div>

          <div className="nav-item text-center mx-3">
            <RiUser3Fill size="1.5em" />
            <br />
            <small><b>Login</b></small>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;

