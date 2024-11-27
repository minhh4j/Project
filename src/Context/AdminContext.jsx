import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const AdminContext =  createContext()

function AdminProvider({children}) {

    const [products , setProducts] = useState([])
    const [users , setUsers] = useState([])


    // fetch product 
    useEffect(() => {
        const FetchData = async () => {
            try{
                const response = await axios.get("http://localhost:3008/products")
                setProducts(response.data)
            }
            catch(error){
                console.error(error)
            }
        }
        FetchData()
    },[])
    
    // fetch user
    useEffect(() => {
        const fetchUser = async () => {
            try{
                const respoonce = await axios.get("http://localhost:3008/user")
                const data = respoonce.data
                const fltred = data.filter((item) => item.role != "admin")
                setUsers(fltred)
            }
            catch(error){
                console.error(error)
            }
        }
        fetchUser()
    })

  return (
    <AdminContext.Provider value={{products , users , setUsers}}>
        {children}
    </AdminContext.Provider>
  )
}

export default AdminProvider