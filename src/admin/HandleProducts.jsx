// import React, { useContext, useEffect, useState } from "react";
// import { AdminContext } from "../Context/AdminContext";
// import { IoAddCircleOutline } from "react-icons/io5";
// import Modal from "./Modal";
// import { IoIosCloseCircleOutline } from "react-icons/io";
// import axios from "axios";

// function HandleProducts() {
//   const { products, setProducts } = useContext(AdminContext);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [productName, setProductName] = useState("");
//   const [price, setPrice] = useState(null);
//   const [oldPrice, setOldPrice] = useState(null);
//   const [category, setCategory] = useState("");
//   const [stock, setStock] = useState(null);
//   const [image, setImage] = useState("");
//   const [description, setDescription] = useState("");
//   const [seller, setSeller] = useState("");
//   const [ingredients, setIngredients] = useState([]);
//   const [editProduct,setEditProduct] = useState(null)
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => setIsModalOpen(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newProduct = {
//       name: productName,
//       price: parseFloat(price),
//       oldPrice: parseFloat(oldPrice),
//       category: category,
//       stock: parseFloat(stock),
//       image: image,
//       description: description,
//       seller: seller,
//       ingredients: [ingredients],
//     };

//     const addNewProduct = async () => {
//       try {
//         const response = await axios.post(
//           "http://localhost:3008/products",
//           newProduct
//         );
//         alert("Product added successfully!");

//         setIsModalOpen(false);
//         setProductName("");
//         setPrice(null);
//         setOldPrice(null);
//         setCategory("");
//         setStock(null);
//         setImage("");
//         setDescription("");
//         setSeller("");
//         setIngredients("");
//       } catch (error) {
//         console.error("Error adding product:", error);
//         alert("Failed to add product. Please try again.");
//       }
//     };

//     addNewProduct();
//   };

//   const handleDelete = async (productId) => {
//     try {
//       await axios.delete(`http://localhost:3008/products/${productId}`);
//       const ubdateProduct = products.filter((prt) => prt.id === productId);
//       setProducts(ubdateProduct);
//       alert(" a product delete succces fully ");
//     } catch (error) {
//       console.error(error);
//     }
//   };

//     const handleEdit = async (product) => {
//       const id = product.id
//       setEditProduct(product);
//       setProductName(product.name);
//       setPrice(product.price);
//       setOldPrice(product.oldPrice);
//       setCategory(product.category);
//       setStock(product.stock);
//       setImage(product.image);
//       setDescription(product.description);
//       setSeller(product.seller);
//       setIngredients(product.ingredients.join(", "));
//       setIsModalOpen(true);
//       try{
//         const responce =  await axios.put(`http://localhost:3008/products/${id}` , product)
//         setProducts(product.map((product) => (product.id === id ? responce.data : product)))
//       }
//       catch(error){
//         console.error(error)
//       }
//     };

//   return (
//     <div className="min-h-screen px-4 py-6 bg-gray-100">
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <select className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600">
//             <option value="">All</option>
//             <option value="dog">Dog</option>
//             <option value="cat">Cat</option>
//           </select>
//         </div>
//         <div className="flex items-center space-x-2">
//           <button
//             onClick={closeModal}
//             className="flex items-center px-4 py-2 text-white transition duration-200 bg-green-600 rounded-md shadow-md hover:bg-green-700"
//           >
//             <IoAddCircleOutline className="mr-2 text-xl" />
//             <span>Add Product</span>
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-xl">
//           <thead className="text-white bg-black">
//             <tr>
//               <th className="px-6 py-3 text-left">Name</th>
//               <th className="px-6 py-3 text-left">Price</th>
//               <th className="px-6 py-3 text-left">Old Price</th>
//               <th className="px-6 py-3 text-left">Image</th>
//               <th className="px-6 py-3 text-left">Category</th>
//               <th className="px-6 py-3 text-left">Stock</th>
//               <th className="px-6 py-3 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map((item) => (
//               <tr
//                 key={item.id}
//                 className={`${
//                   item.id % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 } hover:bg-gray-200 transition duration-300 ease-in-out shadow-sm`}
//               >
//                 <td className="px-6 py-4">{item.name}</td>
//                 <td className="px-6 py-4">{item.price}</td>
//                 <td className="px-6 py-4">{item.oldPrice}</td>
//                 <td className="px-6 py-4">
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="object-cover w-16 h-16 rounded-md shadow-md"
//                   />
//                 </td>
//                 <td className="px-6 py-4">{item.category}</td>
//                 <td className="px-6 py-4">{item.stock}</td>
//                 <td className="flex px-6 py-4 space-x-2">
//                   <button className="px-4 py-2 font-semibold text-white transition duration-200 bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
//                   onClick={() => handleEdit(item)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="px-4 py-2 font-semibold text-white transition duration-200 bg-red-600 rounded-md shadow-md hover:bg-red-700"
//                     onClick={() => handleDelete(item.id)}
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Modal Adding Product */}
//       <Modal
//         isOpen={isModalOpen}
//         closeModal={closeModal}
//         className="max-h-[80vh] overflow-y-auto"
//       >
//         <h2 className="mb-4 text-xl font-semibold">Add New Product</h2>
//         <form onSubmit={handleSubmit}>
//           <button
//           onClick={closeModal}
//           >
//             <IoIosCloseCircleOutline />
//           </button>
//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Product Name
//             </label>
//             <input
//               type="text"
//               value={productName}
//               onChange={(e) => setProductName(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter product name"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Price
//             </label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter price"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Old Price
//             </label>
//             <input
//               type="number"
//               value={oldPrice}
//               onChange={(e) => setOldPrice(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter old price"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Category
//             </label>
//             <input
//               type="text"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter category"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Stock
//             </label>
//             <input
//               type="number"
//               value={stock}
//               onChange={(e) => setStock(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter stock"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Image URL
//             </label>
//             <input
//               type="text"
//               value={image}
//               onChange={(e) => setImage(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter image URL"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Description
//             </label>
//             <input
//               type="text"
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter Description"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Seller
//             </label>
//             <input
//               type="text"
//               value={seller}
//               onChange={(e) => setSeller(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter Seller"
//               required
//             />
//           </div>

//           <div className="mb-4">
//             <label className="block mb-2 text-sm font-medium text-gray-700">
//               Ingredients
//             </label>
//             <input
//               type="text"
//               value={ingredients}
//               onChange={(e) => setIngredients(e.target.value)}
//               className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
//               placeholder="Enter Ingredients"
//               required
//             />
//           </div>

//           <div className="flex justify-end">
//             <button
//               type="submit"
//               className="px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
//             >
//               Add Product
//             </button>
//           </div>
//         </form>
//       </Modal>
//     </div>
//   );
// }

// export default HandleProducts;

import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../Context/AdminContext";
import { IoAddCircleOutline } from "react-icons/io5";
import Modal from "./Modal";
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from "axios";

function HandleProducts() {
  const { products, setProducts } = useContext(AdminContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filteredProducts, setFilteredProducts] = useState(products);

  // Form State
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [seller, setSeller] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [editProductId, setEditProductId] = useState(null);

  useEffect(() => {
    // Filter products based on selected category
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  const resetForm = () => {
    setProductName("");
    setPrice("");
    setOldPrice("");
    setCategory("");
    setStock("");
    setImage("");
    setDescription("");
    setSeller("");
    setIngredients("");
    setEditMode(false);
    setEditProductId(null);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    resetForm();
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      price: parseFloat(price),
      oldPrice: parseFloat(oldPrice),
      category: category,
      stock: parseInt(stock, 10),
      image: image,
      description: description,
      seller: seller,
      ingredients: ingredients.split(",").map((item) => item.trim()),
    };

    try {
      if (editMode) {
        // Update product
        const response = await axios.put(
          `http://localhost:3008/products/${editProductId}`,
          newProduct
        );
        setProducts(
          products.map((product) =>
            product.id === editProductId ? response.data : product
          )
        );
        alert("Product updated successfully!");
        closeModal()
      } else {
        // Add new product
        const response = await axios.post(
          "http://localhost:3008/products",
          newProduct
        );
        setProducts([...products, response.data]);
        alert("Product added successfully!");
      }

      closeModal();
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to save product. Please try again.");
    }
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:3008/products/${productId}`);
      setProducts(products.filter((product) => product.id !== productId));
      alert("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product. Please try again.");
    }
  };

  const handleEdit = (product) => {
    setEditMode(true);
    setEditProductId(product.id);
    setProductName(product.name);
    setPrice(product.price);
    setOldPrice(product.oldPrice);
    setCategory(product.category);
    setStock(product.stock);
    setImage(product.image);
    setDescription(product.description);
    setSeller(product.seller);
    setIngredients(product.ingredients.join(", "));
    openModal();
  };

  return (
    <div className="min-h-screen px-4 py-6 bg-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600"
          >
            <option value="All">All</option>
            {[...new Set(products.map((product) => product.category))].map(
              (cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              )
            )}
          </select>
        </div>
        <div>
          <button
            onClick={openModal}
            className="flex items-center px-4 py-2 text-white bg-green-600 rounded-md shadow-md hover:bg-green-700"
          >
            <IoAddCircleOutline className="mr-2 text-xl" />
            <span>Add Product</span>
          </button>
        </div>
      </div>

      {/* Product Table */}
     <div className="overflow-x-auto">
    <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
      <thead className="text-white bg-gray-800">
        <tr>
          <th className="px-6 py-3 text-left">Name</th>
          <th className="px-6 py-3 text-left">Image</th>
          <th className="px-6 py-3 text-left">Price</th>
          <th className="px-6 py-3 text-left">Category</th>
          <th className="px-6 py-3 text-left">Stock</th>
          <th className="px-6 py-3 text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        {filteredProducts.map((product) => (
          <tr key={product.id} className="transition-all hover:bg-gray-50">
            <td className="px-6 py-4">{product.name}</td>
            <td className="px-6 py-4">
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-16 h-16 rounded-md shadow-md"
              />
            </td>
            <td className="px-6 py-4">${product.price.toFixed(2)}</td>
            <td className="px-6 py-4">{product.category}</td>
            <td className="px-6 py-4">{product.stock}</td>
            <td className="px-6 py-4 space-x-2">
              <button
                className="px-4 py-2 text-white transition-all duration-200 bg-blue-600 rounded-md hover:bg-blue-700"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>
              <button
                className="px-4 py-2 text-white transition-all duration-200 bg-red-600 rounded-md hover:bg-red-700"
                onClick={() => handleDelete(product.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
      {/* Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          closeModal={closeModal}
          className="max-h-[80vh] overflow-y-auto"
        >
          <h2 className="mb-4 text-xl font-semibold">Add New Product</h2>
          <form onSubmit={handleSubmit}>
            <button onClick={closeModal}>
              <IoIosCloseCircleOutline />
            </button>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter price"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Old Price
              </label>
              <input
                type="number"
                value={oldPrice}
                onChange={(e) => setOldPrice(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter old price"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter category"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter stock"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Image URL
              </label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter image URL"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Description"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Seller
              </label>
              <input
                type="text"
                value={seller}
                onChange={(e) => setSeller(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Seller"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Ingredients
              </label>
              <input
                type="text"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600"
                placeholder="Enter Ingredients"
                required
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="px-4 py-2 text-white bg-blue-600 rounded-md shadow-md hover:bg-blue-700"
              >
                Add Product
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

export default HandleProducts;
