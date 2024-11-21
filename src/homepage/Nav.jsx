// import React, { useContext, useEffect, useRef, useState } from "react";
// import { AiOutlineUnorderedList } from "react-icons/ai";
// import { MdPets } from "react-icons/md";
// import { FaCartShopping } from "react-icons/fa6";
// import { RiUser3Fill } from "react-icons/ri";
// import { IoMdSearch } from "react-icons/io";
// import "tailwindcss/tailwind.css"; // Import tailwind styles
// import { ProductContext } from "../Context/ProductContext";
// import { useNavigate } from "react-router-dom";
// import { MdOutlineFavoriteBorder } from "react-icons/md";
// import { TbTruckDelivery } from "react-icons/tb";

// function Nav() {
//   const {
//     setSerchTream,
//     product,
//     cart,
//     loggedIn,
//     curretUser,
//     toastMessage,
//     setToastMessage,
//     handleLogout,
//     setCategory,
//   } = useContext(ProductContext);

//   const navigate = useNavigate();
//   const [suggestions, setSuggestions] = useState([]); //for using the search suggestion
//   const [dropdownOpen, setDropdownOpen] = useState(false); // for dropdown button in profile for logout and orders
//   const ref = useRef(null);

//   const toggleDropdown = () => {
//     // for toggle conditon to active the dropdown only when user is logined.
//     setDropdownOpen(!dropdownOpen);
//   };

//   // const handleCart = () => {
//   //   //access entry to cart only when the user is loged.
//   //   if (!loggedIn) {
//   //     setToastMessage("Please Login to Access Your Cart.");
//   //   } else {
//   //     navigate("/cartlist");
//   //     setSerchTream("");
//   //   }
//   // };

//   const handleProfile = () => {
//     if (!loggedIn) {
//       navigate("/login");
//     } else {
//       toggleDropdown();
//     }
//   };

//   // // open orders page
//   // const handleOrderAccess = () => {
//   //   if (!loggedIn) {
//   //     setToastMessage("Please Login to Access Your Cart Orders.");
//   //   } else {
//   //     navigate("/orders");
//   //   }
//   // };

//   const handleSearch = (e) => {
//     const searchvalue = e.target.value.toLowerCase();
//     setSerchTream(searchvalue);

//     if (searchvalue.length > 0) {
//       const filtered = product.filter(
//         (product) =>
//           product.name.toLowerCase().includes(searchvalue) ||
//           product.category.toLowerCase().includes(searchvalue) // seach cheyubo metch ayth varaan
//       );
//       setSuggestions(filtered);
//     } else {
//       setSuggestions([]);
//     }
//   };

//   const handleBlur = () => {
//     // suggestions close when searchbar out of focus
//     setSuggestions([]);
//   };

//   const handleSuggestionClick = (suggestion) => {
//     //for clicking the searched product from the suggestion list
//     setSerchTream(suggestion.name.toLowerCase());
//     setSuggestions([]); // used to remove suggestion list, once a product is cliciked
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (ref.current && !ref.current.contains(event.target)) {
//         setDropdownOpen(false); // Close dropdown if clicked outside
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [ref]);

//   const refresh = () => {
//     //refresh when logo clicks
//     window.location.reload();
//   };

//   return (
//     <nav className="sticky top-0 z-10 w-full shadow-sm bg-light">
//       <div className="container flex items-center justify-between px-4 py-2 mx-1auto">
//         {/* Logo */}
//         <div
//           onClick={refresh}
//           className="flex items-center text-xl font-semibold"
//           href="#"
//         >
//           <img
//             src="https://images-platform.99static.com//N4VUoRJLktkazbY_0VENbLXlRyI=/13x0:1589x1576/fit-in/500x500/99designs-contests-attachments/98/98546/attachment_98546587"
//             alt="Pet Store Logo"
//             width="50"
//             height="45"
//             className="mr-2"
//           />
//           Pet Paradise
//         </div>
//         {toastMessage && <div className="toast">{toastMessage}</div>}
//         {/* Search Bar and Button */}
//         <div className="flex items-center space-x-2">
//           <input
//             type="text"
//             onBlur={handleBlur}
//             placeholder="Search for products..."
//             onChange={handleSearch}
//           />
//           <button className="p-2 rounded-full bg-slate-300 hover:bg-sky-200">
//             <IoMdSearch className="text-xl" />
//           </button>
//         </div>

//         {/* Nav All Icons with Labels */}
//         <div className="flex items-center space-x-6">
//           <div
//             className="text-center"
//             onClick={() => {
//               navigate("/orders");
//             }}
//           >
//             <AiOutlineUnorderedList size="1.5em" />
//             <small>
//               <b>Order</b>
//             </small>
//           </div>

//           <div
//             className="text-center"
//             onClick={() => {
//               navigate("/cartlist");
//             }}
//           >
//             <FaCartShopping size="1.5em" />
//             <small>
//               <b>Cart</b>
//             </small>
//           </div>

//           <div onClick={handleProfile} className="text-center" ref={ref}>
//             <RiUser3Fill size="1.5em" />
//             <i></i>
//             <small>
//               <b> {loggedIn ? curretUser.username : "Login"}</b>
//             </small>
//             {dropdownOpen && loggedIn && (
//               <div className="absolute p-2 mt-2 bg-white border rounded shadow-lg">
//                 <button
//                   onClick={handleLogout}
//                   className="block w-full px-4 py-2 text-left hover:bg-gray-200"
//                 >
//                   Logout
//                 </button>
//                 <button
//                   onClick={() => navigate("/wishlist")}
//                   className="block w-full px-4 py-2 text-left hover:bg-gray-200"
//                 >
//                   <MdOutlineFavoriteBorder className="inline-block mr-2" />
//                   Wishlist
//                 </button>
//                 <button
//                   onClick={() => navigate("/orders")}
//                   className="block w-full px-4 py-2 text-left hover:bg-gray-200"
//                 >
//                   <TbTruckDelivery className="inline-block mr-2" />
//                   Orders
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div>
//           <ul className="absolute overflow-y-auto bg-white border rounded shadow-lg max-h-40">
//             {suggestions.map((suggestion) => (
//               <li
//                 key={suggestion.id}
//                 onClick={() => handleSuggestionClick(suggestion)}
//                 className="px-4 py-2 cursor-pointer hover:bg-gray-200"
//               >
//                 {suggestion.name}
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Nav;
import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineUnorderedList } from "react-icons/ai";
import { MdPets } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { RiUser3Fill } from "react-icons/ri";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineFavoriteBorder } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { ProductContext } from "../Context/ProductContext";
import { useNavigate } from "react-router-dom";

function Nav() {
  const {
    setSerchTream,
    product,
    cart,
    loggedIn,
    curretUser,
    setToastMessage,
    handleLogout,
    
  } = useContext(ProductContext);

  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const ref = useRef(null);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    setSerchTream(searchValue);

    if (searchValue.length > 0) {
      const filtered = product.filter(
        (product) =>
          product.name.toLowerCase().includes(searchValue) ||
          product.category.toLowerCase().includes(searchValue)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleBlur = () => {
    setSuggestions([]);
  };

  const handleSuggestionClick = (suggestion) => {
    setSerchTream(suggestion.name.toLowerCase());
    setSuggestions([]);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const refresh = () => {
    window.location.reload();
  };

  return (
    <nav className="sticky top-0 z-10 w-full bg-white shadow-md">
      <div className="container flex flex-wrap items-center justify-between px-4 py-3 mx-auto md:flex-nowrap">
        {/* Logo */}
        <div
          onClick={refresh}
          className="flex items-center text-xl font-semibold cursor-pointer"
        >
          <img
            src="https://images-platform.99static.com//N4VUoRJLktkazbY_0VENbLXlRyI=/13x0:1589x1576/fit-in/500x500/99designs-contests-attachments/98/98546/attachment_98546587"
            alt="Pet Store Logo"
            width="40"
            height="40"
            className="mr-2"
          />
          <span>Pet <span className="text-blue-500">Paradise</span></span>
        </div>

        {/* Search Bar */}
        <div className="relative flex items-center flex-grow max-w-md mx-4 md:mx-8">
          <input
            type="text"
            onBlur={handleBlur}
            placeholder="Search for products..."
            onChange={handleSearch}
            className="w-full px-4 py-2 border rounded-l-md focus:ring focus:outline-none"
          />
          <button className="p-2 text-white bg-blue-500 rounded-r-md hover:bg-blue-600">
            <IoMdSearch className="text-xl" />
          </button>
          {suggestions.length > 0 && (
            <ul className="absolute left-0 z-10 w-full mt-1 overflow-y-auto bg-white border rounded shadow-lg max-h-40">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-200"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Navigation Icons */}
        <div className="flex items-center space-x-6">
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/orders")}
          >
            <AiOutlineUnorderedList size="1.5em" />
            <span className="text-xs font-medium text-blue-500">Orders</span>
          </div>
          <div
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate("/cartlist")}
          >
            <FaCartShopping size="1.5em" />
            <span className="text-xs font-medium text-blue-500">Cart</span>
          </div>
          <div
            className="relative flex flex-col items-center cursor-pointer"
            onClick={loggedIn ? toggleDropdown : () => navigate("/login")}
            ref={ref}
          >
            <RiUser3Fill size="1.5em" />
            <span className="text-xs font-medium text-blue-500">
              {loggedIn ? curretUser.username : "Login"}
            </span>
            {dropdownOpen && loggedIn && (
              <div className="absolute right-0 z-20 mt-2 bg-white border rounded shadow-lg">
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  Logout
                </button>
                <button
                  onClick={() => navigate("/wishlist")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  <MdOutlineFavoriteBorder className="inline-block mr-2" />
                  Wishlist
                </button>
                <button
                  onClick={() => navigate("/orders")}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                >
                  <TbTruckDelivery className="inline-block mr-2" />
                  Orders
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
