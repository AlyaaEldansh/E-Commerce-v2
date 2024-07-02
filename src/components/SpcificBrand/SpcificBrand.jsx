import React, { useEffect, useState } from 'react';
import Style from './SpcificBrand.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SpcificBrand() {
  let {id} = useParams();
  const [specificBrand, setSpecificBrand] = useState(null);

  function getSpecificBrand(id)
  {
    axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
    .then(({data})=>{
     setSpecificBrand(data.data);
    })
    .catch((error)=>
    {
      console.log(error)
    })

  }
  useEffect(()=>{
    getSpecificBrand(id);
  } , []);
  return <>
    <div className='row'>
      <div className='px-4 py-2 w-[40%] mx-auto' key={specificBrand?._id}>
        <div className="product shadow-sm rounded-lg border">
        <img src={specificBrand?.image} className='w-full h-[300px]' alt={specificBrand?.name} />
        {/* <button className='btn'>Add to Cart</button> */}
        </div>
      </div>
    </div>
  </>
}
