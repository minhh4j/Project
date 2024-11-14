
import React from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import "tailwindcss/tailwind.css"; // Import tailwind styles

function Nav() {
  return (
    <nav className="sticky top-0 z-10 w-full shadow-sm bg-light">
      <div className="container flex items-center justify-between px-4 py-2 mx-1auto">
        
        {/* Logo */}
        <div className="flex items-center text-xl font-semibold" href="#">
          <img 
            src="https://images-platform.99static.com//N4VUoRJLktkazbY_0VENbLXlRyI=/13x0:1589x1576/fit-in/500x500/99designs-contests-attachments/98/98546/attachment_98546587" 
            alt="Pet Store Logo"
            width="50" 
            height="45"
            className="mr-2"
          />
          Pet Paradise
        </div>

        {/* Search Bar and Button */}
        <div className="flex items-center space-x-2">
          <input 
            type="text" 
            className="px-4 py-2 border rounded-md form-input" 
            placeholder="Search item.." 
          />
          <button className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
            <IoMdSearch className="text-xl" />
          </button>
        </div>

        {/* Nav All Icons with Labels */}
        <div className="flex items-center space-x-6">
          <div className="text-center">
            <MdPets size="1.5em" />
            <small><b>Food</b></small>
          </div>

          <div className="text-center">
            <AiOutlineUnorderedList size="1.5em" />
            <small><b>Order</b></small>
          </div>

          <div className="text-center">
            <FaCartShopping size="1.5em" />
            <small><b>Cart</b></small>
          </div>

          <div className="text-center">
            <RiUser3Fill size="1.5em" />
            <small><b>Login</b></small>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
