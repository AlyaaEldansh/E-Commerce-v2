import React, { useEffect, useState } from 'react';
import Style from './CategoryDetails.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function CategoryDetails() {
  let {id} = useParams();
  const [specificCategory, setSpecificCategory] = useState(null);

    function getCategoryDetails(id)
    {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
      .then(({data})=>{
        setSpecificCategory(data.data);
        // console.log(data.data)
      })
      .catch((error)=>{

      })
    };

    useEffect(()=>{
      getCategoryDetails(id);
    } , []);
  return <>
    
    <div className="w-[30%] mx-auto mt-4" key={specificCategory?._id}>
      <img src={specificCategory?.image} className='w-full rounded-full h-[400px]' alt={specificCategory?.name} />
      <h1 className='text-lg font-normal text-gray-950 text-center mt-2'>{specificCategory?.name}</h1>
      {/* <button className='btn mt-4'>Add to Cart</button> */}
    </div>
  </>
}
