import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

export default function WishListContextProvider(props)
{
    let headers = {
        token:localStorage.getItem('userToken')
    };

    function removeEishListItem(productId)
    {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{headers})
        .then((response)=> response)
        .catch((error)=> error)
    };

    function getWishListItems()
    {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
        .then((response)=> response)
        .catch((error)=> error)
    };
    
    function addToWishList(productId)
    {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},
            {headers

            }).then((response)=> response)
            .catch((error)=> error)
    };

    return<>
    <WishListContext.Provider value={{addToWishList , getWishListItems , removeEishListItem }}>
    {props.children}
    </WishListContext.Provider>
    </>
}