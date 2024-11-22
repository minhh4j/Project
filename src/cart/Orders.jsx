// import React, { useContext, useState } from "react";

// import { useNavigate } from "react-router-dom";

// const Orders = () => {
//   const navigate = useNavigate();
  


//   return (
//     <div className="container p-4 mx-auto">
//       <h2 className="mb-4 text-2xl font-bold text-center">Order History</h2>
//       <button
//         className="flex items-center justify-center px-4 py-2 text-white transition duration-200 bg-blue-500 rounded-md hover:bg-blue-600"
//         onClick={() => navigate("/")}
//       >
//         <i className="mr-2 bx bx-home"></i> Back to Home
//       </button>
    
        
  
//             <div
//               className="p-6 bg-white border border-gray-200 rounded-lg shadow-md"
      
//             >
//               <h3 className="mb-2 text-lg font-semibold">
//                 Order ID: <span className="text-blue-600"></span>
//               </h3>
//               <p className="mb-4 text-sm text-gray-500">
          
//               </p>
//               <div className="mb-4">
//                 <h4 className="font-medium text-gray-700">Shipping Details:</h4>
//                 <p className="text-sm text-gray-600">
//                   <strong>Full Name:</strong> 
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Address:</strong>{" "}
                
//                 </p>
//                 <p className="text-sm text-gray-600">
//                   <strong>Phone:</strong> 
//                 </p>
//               </div>
//               <div className="mb-4">
//                 <h4 className="font-medium text-gray-700">Items:</h4>
               
                 
                
                   
                      
                    
//               </div>
//               <div className="p-3 bg-gray-100 rounded-md">
//                 <h4 className="font-medium text-gray-700">Total Amount:</h4>
//                 <p className="text-xl font-bold text-blue-600">
                
//                 </p>
//               </div>
//             </div>
      
//         </div>

   
//   );
// };

// export default Orders;

import React, { useContext } from "react";
import { ProductContext } from "../Context/ProductContext";

function Orders() {
  const { orders } = useContext(ProductContext);
  console.log(orders,"order");
  

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-3xl font-bold">Your Orders</h1>

      {orders.length > 0 ? (
        orders.map((order, index) => (
    
          <div key={index} className="p-6 mb-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Order #{index + 1}</h3>
            <p className="mt-2 text-sm text-gray-500">Order Date: {order.orderDate}</p>
            <h4 className="mt-4 text-lg font-semibold">Total: ₹{order.totalAmount}</h4>
            <ul className="mt-4">
              {order.items.map((product, idx) => (
                <li key={idx} className="flex justify-between py-2 border-b border-gray-300">
                  <span>{product.name} (x{product.quantity})</span>
                  <span>₹{(product.price * product.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p className="text-xl text-center text-gray-500">You have no orders yet.</p>
      )}
    </div>
  );
}

export default Orders;
