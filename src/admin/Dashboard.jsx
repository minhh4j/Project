
import React, { useContext, useState } from "react";
import { AdminContext } from "../Context/AdminContext";

function Dashboard() {
  const { products, users  , totalRevenue} = useContext(AdminContext);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  // Filter products by selected category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  // Blocked users
  const blockedUsers = users.filter((user) => user.status === false);
  const blockCount = blockedUsers.length;

  // Empty stock products
  const emptyProducts = products.filter((product) => product.stock === 0);

  const categoryCounts = products.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = 1;
    } else {
      acc[product.category]++;
    }
    return acc;
  }, {});

  categoryCounts["All"] = products.length;

  return (
    <div className="p-6 bg-gray-50">
      <h2 className="mb-6 text-3xl font-bold text-gray-800">Admin Dashboard</h2>

      {/* Statistics Summary */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-700">Blocked Users</h3>
          <p className="text-3xl font-extrabold text-red-500">{blockCount}</p>
        </div>
        <div className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-700">Empty Stock Products</h3>
          <p className="text-3xl font-extrabold text-yellow-500">{emptyProducts.length}</p>
        </div>
        <div className="col-span-1 p-6 transition-transform transform bg-white rounded-lg shadow-lg md:col-span-3 hover:scale-105 hover:shadow-2xl">
          <h3 className="text-xl font-semibold text-gray-700">Total Sales</h3>
          <p className="text-3xl font-extrabold text-green-500">₹{totalRevenue}</p>
        </div>
      </div>

      {/* Category Counts */}
      <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-3">
        {Object.keys(categoryCounts).map((category) => (
          <div
            key={category}
            className="p-6 transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105 hover:shadow-2xl"
          >
            <h2 className="text-xl font-semibold text-gray-700 capitalize">{category}</h2>
            <p className="text-3xl font-extrabold text-blue-500">{categoryCounts[category]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
