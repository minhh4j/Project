import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();


function ProductProvider({ children }) {
  const [product, setProduct] = useState([]);  
  const [serchTream, setSerchTream] = useState("");
  const [cart, setCart] = useState([]);
  const [curretUser, setCorentuser] = useState(null);
  const [cetogery, setCetogery] = useState("");
  const [orders, setOrders] = useState([]);
  const [search,setSearch]=useState('')
  const id = localStorage.getItem("id")
  

  // const handleSetOrders = (order) => {
  //   setOrders((prevOrders) => [...prevOrders, order]); // Adds new order to the list
  // };

  const navigate = useNavigate();
  const [filteredProduct, setFilteredProduct] = useState([]);
  console.log(cart,"this is cart");
let x=cart.length
localStorage.setItem("cartCount",x);
console.log(cart);


  //fetch products in home page
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("http://localhost:3008/products");
        setProduct(response.data);
      } catch (error) {
        console.error("error fetching products", error);
      }
    };
    fetchProduct();
  }, []);



  const handleAddOrder = async () => {
    try {
      const order = {
        items: [...cart],
        totalAmount: totelAmount,
        orderDate: new Date().toISOString(),
      };
  
      console.log(order, "order");

      setOrders((prevOrders) => [...prevOrders, order]);
      setCart([]);
      await axios.patch(`http://localhost:3008/user/${id}`, {
        order:[...orders,order],
      });
      await axios.patch(`http://localhost:3008/user/${id}`, { cart: [] });
      alert("Your order has been placed!");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  useEffect(() => {
  const  fetChOrderDb = async () => {
    try{
    const  responce  =  await axios.get(`http://localhost:3008/user/${id}`)
      setOrders(responce.data.order)
    }
    catch(error){
      console.error(error)
    }
   }
   fetChOrderDb()
  },[id])


  // search  cheyunnath varaan vendi
  useEffect(() => {
    let filterProduct = () => {
      let filtered = product;
      // serch cheythth mukalilek varaan
      if (serchTream) {
        filtered = product.filter((product) =>
          product.name.toLowerCase().includes(serchTream.toLowerCase())
        );
      }
      // filteril ollath onnum koduthittillagil
      else if (cetogery) {
        filtered = product.filter((product) => product.cetogery === cetogery);
      }
      setFilteredProduct(filtered);
    };
    filterProduct();
  }, [cetogery, serchTream, product]);

  // Remove item from cart
  const removeFromCart = async (productId) => {
    const itemToRemove = cart.find((item) => item.id === productId);
    if (itemToRemove) {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      await axios.patch(`http://localhost:3008/user/${id}`, {cart:updatedCart}),(updatedCart);

    }
  };

  // incrementquantity of items in cart
  const incrementQuantity = async (productId, quantity) => {
    const itemToUpdate = cart.find((item) => item.id === productId);
    if (itemToUpdate) {
      const products = product.find((prod) => prod.id === productId);
      if (products && quantity > products.stock) { 
        toast.error("Stock not available for this quantity.");
        return; 
      }
      const updatedCart = cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + 1) }
          : item
      );
      setCart(updatedCart); 
      await axios.patch(`http://localhost:3008/user/${id}` , {cart:updatedCart})
    }
  };
  
  //dicrementquantity of items in cart
  const  decrementQuantity = async (productId, quantity) => {
    const itemToUpdate = cart.find((item) => item.id === productId);
    if (itemToUpdate) {
      const products = product.find((prod) => prod.id === productId);
      if (products && quantity > products.stock) { 
        toast.error("Stock not available for this quantity.");
        return; 
      }
      const updatedCart = cart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      setCart(updatedCart); 
      await axios.patch(`http://localhost:3008/user/${id}` , {cart:updatedCart})
    }
  };
  


  // wish list
  const addToWishlist = async (product) => {
    const updatedWishlist = [...wishList];
    const existingItem = updatedWishlist.find((item) => item.id === product.id);
    if (!loggedIn) {
      setToastMessage(<>Please log in to add items to your cart</>);
    } else if (!existingItem) {
      updatedWishlist.push(product);
      setWishList(updatedWishlist);
      await updateUserWishlistInDB(updatedWishlist);
      setToastMessage(
        <>
          Added to your wishlist
          <br />
          <span>Available under profile</span>
        </>
      );
    } else {
      setToastMessage(<>Item already in wishlist!!</>);
    }
  };

  // Remove items from wishlist
  const removeFromWishlist = async (productId) => {
    const updatedWishlist = wishList.filter((item) => item.id !== productId);
    setWishList(updatedWishlist);
    await updateUserWishlistInDB(updatedWishlist);
  };

  // Clear entire wishlist
  const clearWishlist = async () => {
    setWishList([]);
    await updateUserWishlistInDB([]);
  };



  const addToCart = async (product) => {

    const updatedCart = [...cart];
    const existingItem = updatedCart.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
      console.log(product,"sdf")

    }
    setCart(updatedCart);
    
   await axios.patch(`http://localhost:3008/user/${id}` , {cart:updatedCart})
    console.log("Cart after adding product:", updatedCart);

  };


  
 
  useEffect(() => {
    const fetchCartDb = async () => {
      try {
        const response = await axios.get(`http://localhost:3008/user/${id}`);
        console.log(response.data, "asdfgh");
        setCart(response.data.cart);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCartDb();
  }, [id]);
  

const totelAmount = cart.reduce((acc,val) => acc+( val.price * val.quantity) , 0).toFixed(2)


  return (
    <ProductContext.Provider
      value={{
        totelAmount,
        
        product,
        cart,
        setCart,
        incrementQuantity,
        removeFromCart,
        addToWishlist,
        clearWishlist,
        removeFromWishlist,
        addToCart,
        curretUser,
        setCetogery,
        setSerchTream,
        decrementQuantity,
        orders,
        setOrders,
        handleAddOrder,
        search,
        setSearch
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export default ProductProvider;
 