import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Brands() {
  const [allBrands, setAllBrands] = useState([]);
  
  function getAllBrands()
  {
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    .then(({data})=>{
     setAllBrands(data.data);
    })
    .catch((error)=>
    {
      console.log(error)
    })

  }
  useEffect(()=>{
    getAllBrands();
  } , []);
  return <>
    <div className='row'>
      {allBrands.map((brand)=> <div className='px-4 py-2 w-1/6' key={brand._id}>
        <div className="product shadow-sm rounded-lg border">
        <Link to={`/specificbrand/${brand._id}`}>
        <img src={brand.image} className='w-full h-[200px]' alt={brand.name} />
        {/* <button className='btn'>Add to Cart</button> */}
        </Link>
        </div>
        
      </div>
      )}
      
    </div>
  </>
}
