import React, { useContext, useEffect, useState } from 'react';
import Style from './Home.module.css';
// import Products from '../Products/Products';
// import Cart from '../Cart/Cart';
import RecentProduct from '../RecentProduct/RecentProduct';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider';
import MainSlider from '../MainSlider/MainSlider';
RecentProduct

export default function Home() {
    useEffect(()=>{

    } , []);
  
  return <>
  <MainSlider/>
  <CategoriesSlider/>
    <RecentProduct/>
  </>
}
