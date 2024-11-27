import React, { useContext } from "react";
import { AdminContext } from "../Context/AdminContext";

function UserDetails() {
  const { users } = useContext(AdminContext);

  if (!users || users.length === 0) {
    return <p className="text-center text-gray-500">No users found.</p>;
  }

  const handleBlockUser = (userId) => {
    console.log(`User with ID ${userId} has been blocked.`);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-semibold text-gray-700">User Details</h1>
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
                    onClick={() => handleBlockUser(user.id)}
                    className="px-4 py-2 text-white bg-red-600 rounded-md shadow-md hover:bg-red-700"
                  >
                    Block
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
