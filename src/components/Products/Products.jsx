import React, { useContext, useEffect, useState } from 'react';
import Style from './Products.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';
import {ClimbingBoxLoader} from 'react-spinners';
import { WishListContext } from '../../Context/WishListContext';


export default function Products(props) {

  let {addToCart} = useContext(CartContext);
  let {addToWishList} = useContext(WishListContext);
  const [isLoading,setIsLoading] = useState(false);


  async function addProduct(productId)
  {
    let response = await addToCart(productId);
    
    if(response.data.status === 'success')
      {
        // console.log('added');
        toast.success('Product added successfully to your cart',{
          duration:1500,
          position:'bottom-left'
        });
      }
      else
      {
        // console.log('error');
        toast.error('Product did not add to your cart',{
          duration:1500,
          position:'bottom-left'
        });
      }
  };
  async function addProductToWishList(productId)
  {
    let response = await addToWishList(productId);
    
    if(response.data.status === 'success')
      {
        // console.log('added');
        toast.success('Product added successfully to your wishlist',{
          duration:1500,
          position:'bottom-left'
        });
      }
      else
      {
        // console.log('error');
        toast.error('Product did not add to your wishlist',{
          duration:1500,
          position:'bottom-left'
        });
      };
  };

  const [allProducts, setAllProducts] = useState([]);
  function getAllProducts()
  {
    setIsLoading(true);
    axios.get('https://ecommerce.routemisr.com/api/v1/products')
    .then(({data})=>{
      setIsLoading(false);
     setAllProducts(data.data);
    })
    .catch((error)=>
    {
      setIsLoading(false);
      console.log(error)
    })

  }
  useEffect(()=>{
    getAllProducts();
  } , []);
    // console.log(props.children);
  return <>{isLoading?<div className='py-8 w-full flex justify-center'>
    <ClimbingBoxLoader color='green'/>
  </div>
    :<div className='row'>
      {allProducts.map((product)=> <div className='sx:w-full md:w-3/6 lg:w-1/6 px-4 py-2' key={product.id}>
        <div className="product border relative p-2">
        <button className='hover:text-red-600 absolute top-5 right-5' onClick={()=>addProductToWishList(product.id)}><i className="fa-regular fa-heart"></i></button>
        <Link to={`/productdetails/${product.id}/${product.category.name}`}>
        <img src={product.imageCover} className='w-full' alt={product.title} />
        <span className='block font-light mt-2 text-green-600'>{product.category.name}</span>
        <h3 className='text-lg font-normal text-gray-800 mb-4'>{product.title.split(' ').slice(0,2).join(' ')}</h3>
        <div className="flex justify-between items-center">
          <span>{product.price} EGP</span>
          <span>{product.ratingsQuantity} <i className='fas fa-star text-yellow-500'></i></span>
        </div>
        </Link>
        <button onClick={()=>addProduct(product.id)} className='btn'>Add to Cart</button>
        </div>
      </div>)}
      
    </div>}
  </>
}
