import React, { useEffect, useState } from 'react';
import Style from './CategoriesSlider.module.css';
import axios from 'axios';
import Slider from "react-slick";

export default function CategoriesSlider() {
    const [categories, setCategories] = useState([]);
    var settings = {
      dots: false,
      infinite: true,
      speed: 1500,
      slidesToShow: 6,
      slidesToScroll: 3,
      autoplay:true
    };

    function getCategories()
    {
      axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({data})=>{
        setCategories(data.data);
      })
      .catch((error)=>{

      });
    };


    useEffect(()=>{
      getCategories()
    } , []);
  return <>
    <div className='py-2'>
      <h3 className='py-4 text-xl text-gray-800 font-medium'>Shop Popular Categories</h3>
    <Slider {...settings} className='overflow-hidden'>
      {categories.map((category)=> <div key={category._id}>
        <img className='category-img w-full' src={category.image} alt={category.title} />
        <h3 className='font-light mt-2 pl-4 text-center'>{category.name}</h3>
      </div>)}
      </Slider>
      </div>
  </>
}
