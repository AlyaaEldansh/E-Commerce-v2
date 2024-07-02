import React, { useContext, useEffect, useState } from 'react';
import Style from './ProductDetails.module.css';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
  let {addToCart} = useContext(CartContext);

  async function addProduct(productId)
  {
    let response = await addToCart(productId);
    console.log(response)
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

  let {id , category} = useParams();
    const [productDetails, setProductDetails] = useState(null);
    const [relatedProducts, setRelatedProducts] = useState([]);
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay:true
    };

    function getProductDetails(id)
    {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({data})=>{
        setProductDetails(data.data);
      })
      .catch((error)=>{

      });
    };

    function getRelatedProduct(category)
    {
      axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({data})=>{
        let allProducts = data.data;
        // console.log(allProducts);
        let related =allProducts.filter((product)=> product.category.name == category);
        // console.log(related);
        setRelatedProducts(related);
      })
      .catch((error)=>{

      });
    };

    useEffect(()=>{
      getProductDetails(id);
      getRelatedProduct(category);
    } , [id,category]);
  return <>
   <div className="row">
    <div className="w-1/4">
    <Slider {...settings}>
      {productDetails?.images.map((src)=> <img src={src} className='w-full' key={productDetails.id} alt={productDetails?.title} />
      )}
    </Slider>
    </div>
    <div className="w-3/4 p-6">
      <h1 className='text-lg font-normal text-gray-950'>{productDetails?.title}</h1>
      <p className='text-gray-600 mt-4 font-light'>{productDetails?.description}</p>
      <div className="flex justify-between items-center mt-2">
          <span>{productDetails?.price} EGP</span>
          <span>{productDetails?.ratingsQuantity} <i className='fas fa-star text-yellow-500'></i></span>
        </div>

        <button onClick={()=>addProduct(productDetails?.id)} className='btn mt-4'>Add to Cart</button>
    </div>
   </div>
    
   <div className="row">
    {relatedProducts.map((product)=>
      <div className='w-1/6 px-4 py-2' key={product.id}>
      <div className="product border p-2">
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
    </div>
    )}
   </div>
  </>
}
