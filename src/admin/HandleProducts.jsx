import React, { useContext } from 'react';
import { AdminContext } from '../Context/AdminContext';

function HandleProducts() {
  const { product } = useContext(AdminContext);

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Products List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="text-white bg-gray-800">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Old Price</th>
              <th className="px-4 py-2 text-left">Image</th>
              <th className="px-4 py-2 text-left">Category</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-gray-100'
                } hover:bg-gray-200`}
              >
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.price}</td>
                <td className="px-4 py-2">{item.oldPrice}</td>
                <td className="px-4 py-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-md"
                  />
                </td>
                <td className="px-4 py-2">{item.category}</td>
                <td className="px-4 py-2">{item.stock}</td>
                <td className="px-4 py-2">
                  <button className="px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700">
                    Edit
                  </button>
                  <button className="px-4 py-2 ml-2 font-semibold text-white bg-red-600 rounded-md hover:bg-red-700">
                    Delete
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

export default HandleProducts;
