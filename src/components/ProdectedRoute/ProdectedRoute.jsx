import React, { useEffect, useState } from 'react';
import Style from './ProdectedRoute.module.css';
import { Navigate } from 'react-router-dom';


export default function ProdectedRoute(props) {

  // console.log(props);
  if(localStorage.getItem('userToken') !== null)
    {
      return props.children ;
    }
    else
    {
      return <Navigate to={'/login'}/> ;
    }
    
}
