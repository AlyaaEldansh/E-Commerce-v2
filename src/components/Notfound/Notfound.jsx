import React, { useEffect, useState } from 'react';
import Style from './Notfound.module.css';
import notFound from '../../assets/images/error.svg'

export default function Notfound() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
    <img src={notFound} className='mx-auto my-4' alt='notfound page' />
  </>
}
