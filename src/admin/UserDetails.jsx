import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import axios from "axios";


function UserDetails() {
  const { users , setUsers } = useContext(AdminContext);
  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500">No users found.</p>;
    
  }

  
  
  const handleBlockUser = async (userId , userName , status) => {
    
    
    
 console.log(`User with name ${userName} has been blocked.`);
const toast = document.createElement('div');
toast.textContent = `User with name ${userName} has been blocked.`;
Object.assign(toast.style, {
    position: 'fixed', bottom: '20px', right: '20px',
    background: '#333', color: '#fff', padding: '10px 20px',
    borderRadius: '5px', zIndex: '1000'
});
document.body.appendChild(toast);
setTimeout(() => toast.remove(), 3000);


try{
  const response = await axios.patch(`http://localhost:3008/user/${userId}` , {status:!status})
  setUsers(users.map((userlist) => (userlist.id === userId ?{...userlist,status : !status} :{...userlist})))
}
catch(error){
  console.error(error)
}


  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-xl">
          <thead className="text-white bg-black">
            <tr>
              <th className="px-6 py-3 text-left">User Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Product Item</th>
              <th className="px-6 py-3 text-left">Block User</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className={`${
                  user.id % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-200 transition duration-300 ease-in-out`}
              >
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.productItem || "N/A"}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleBlockUser(user.id , user.username , user.status)}
                    className= {"px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-700"  }
                  >
                  {user.status ? "Block" : "Unblock"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserDetails;
