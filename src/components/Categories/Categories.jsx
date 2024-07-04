import React, {useEffect, useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import { Link} from 'react-router-dom';
import {ClimbingBoxLoader} from 'react-spinners';


export default function Categories() {

    const [allCategories, setAllCategories] = useState([]);
    const [isLoading,setIsLoading] = useState(false);

    function getAllCategories()
    {
      setIsLoading(true);
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setIsLoading(false);
        setAllCategories(data.data);
        // console.log(data.data)
      })
      .catch((error)=>{
        setIsLoading(false);
      })
    };
    useEffect(()=>{
      getAllCategories();
    } , []);

  return <>{isLoading?<div className='py-8 w-full flex justify-center'>
    <ClimbingBoxLoader color='green'/>
  </div>
    :<div className='row'>
      {allCategories.map((category)=> <div className='sx:w-full md:w-2/4 lg:w-1/4 px-4 py-2' key={category._id}>
        <div className="product p-2">
        <Link to={`/categorydetails/${category._id}`}>
        <img src={category.image} className='w-full h-[300px]  rounded-full' alt={category.name} />
        <span className='block font-light mt-2 text-green-600 text-center'>{category.name}</span>
        {/* <span className='block font-light mt-2 text-gray-900'>{category.slug}</span> */}
        </Link>
        {/* <button onClick={()=>addProduct(category._id)} className='btn'>Add to Cart</button> */}
        </div>
      </div>)}
      
    </div>}
  </>
}
