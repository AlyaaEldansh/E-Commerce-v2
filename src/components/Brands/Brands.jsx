import React, { useEffect, useState } from 'react';
import Style from './Brands.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {ClimbingBoxLoader} from 'react-spinners';


export default function Brands() {
  const [allBrands, setAllBrands] = useState([]);
  const [isLoading,setIsLoading] = useState(false);

  
  function getAllBrands()
  {
    setIsLoading(true);
    axios.get('https://ecommerce.routemisr.com/api/v1/brands')
    .then(({data})=>{
     setAllBrands(data.data);
     setIsLoading(false);
    })
    .catch((error)=>
    {
      setIsLoading(false);
      console.log(error);
    })

  }
  useEffect(()=>{
    getAllBrands();
  } , []);
  return <> {isLoading?<div className='py-8 w-full flex justify-center'>
    <ClimbingBoxLoader color='green'/>
  </div>
    :<div className='row'>
      {allBrands.map((brand)=> <div className='px-4 py-2 sx:w-full lg:w-1/6' key={brand._id}>
        <div className="product shadow-sm rounded-lg border">
        <Link to={`/specificbrand/${brand._id}`}>
        <img src={brand.image} className='w-full h-[200px]' alt={brand.name} />
        {/* <button className='btn'>Add to Cart</button> */}
        </Link>
        </div>
        
      </div>
      )}
      
    </div>}
  </>
}
