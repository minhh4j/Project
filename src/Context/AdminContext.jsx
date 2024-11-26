import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AdminContext =  createContext()

function AdminProvider({children}) {

    const [product , setProduct] = useState([])

    useEffect(() => {
        const FetchData = async () => {
            try{
                const response = await axios.get("http://localhost:3008/products")
                setProduct(response.data)
            }
            catch(error){
                console.error(error)
            }
        }
        FetchData()
    },[])

  return (
    <AdminContext.Provider value={{product}}>
        {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider