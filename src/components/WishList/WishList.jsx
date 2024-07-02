import React, { useContext, useEffect, useState } from 'react';
import Style from './WishList.module.css';
import { WishListContext } from '../../Context/WishListContext';
import { Link } from 'react-router-dom';
Link

export default function WishList() {
  const [wishListItems, setWishListItems] = useState(null);
  let {getWishListItems , removeEishListItem} =useContext(WishListContext);

  async function getWishList()
  {
   let response = await getWishListItems();
  //  console.log(response?.data?.products?.product.imageCover);
  setWishListItems(response?.data);
  //  console.log(response.data.data);
  };
  async function removeWishListItem(productId)
  {
    let response = await removeEishListItem(productId);
    // console.log(response?.data);
    setWishListItems(response?.data);
  };

    useEffect(()=>{
      getWishList();
    } , []);

  return <><div className="relative my-5 h-[80vh] overflow-x-auto sm:rounded-lg">
  <table className="w-75 mx-auto shadow-md text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Details
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
      {wishListItems?.data.length >0?wishListItems?.data.map((product)=> <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product?.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt={product.title} />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.title}
        </td>
        <td className="px-6 py-4">
        <Link to={`/productdetails/${product._id}/${product.category.name}`}>
        <span className="font-medium cursor-pointer text-green-600 dark:text-green-500 hover:underline">Details</span>
        </Link>
      </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price} EGP
        </td>
        <td className="px-6 py-4">
          <span onClick={()=> removeWishListItem(product._id)} className="font-medium cursor-pointer text-red-600 dark:text-red-500 hover:underline">Remove</span>
        </td>
      </tr>):null}
      
    </tbody>
  </table>
</div>

  </>
  }

