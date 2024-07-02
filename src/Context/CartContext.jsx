import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

export default function cartContextProvider(props)
{
    let[cart,setCart] = useState(null);
    let headers = {
        token:localStorage.getItem('userToken')
    }
    function removeItem(productId)
    {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{headers})
        .then((response)=> response)
        .catch((error)=> error)
    };

    function updateItem(productId , count)
    {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },{headers})
        .then((response)=> response)
        .catch((error)=> error)
    };

    function getCartItems()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{headers})
        .then((response)=> response)
        .catch((error)=> error)
    };
    
    function addToCart(productId)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{productId},
            {headers

            }).then((response)=> response)
            .catch((error)=> error)
    };

    function chechOut(cartId,url,formValues)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:formValues},
            {headers})
            .then((response)=> response)
            .catch((error)=> error)
    };
    async function getCart()
    {
        let response = await getCartItems();
        setCart(response?.data);
    }
    useEffect(()=>{
        getCart();
    },[])

    return<>
    <CartContext.Provider value={{cart,setCart,chechOut,addToCart , getCartItems , removeItem , updateItem}}>
    {props.children}
    </CartContext.Provider>
    </>
}