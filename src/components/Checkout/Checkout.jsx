// import React, { useEffect, useState } from 'react';
import Style from './Checkout.module.css';
import React, {useContext, useState } from 'react';
import {useFormik} from 'formik';
import { CartContext } from '../../Context/CartContext';
import { useParams } from 'react-router-dom';
// import { Link, useNavigate } from 'react-router-dom';
// import * as Yup from 'yup';

export default function Checkout() {

  // let navigate = useNavigate();
  let {cartId} = useParams();
  console.log(cartId);
    const [apiError,setApiError] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    let {chechOut} = useContext(CartContext)
    let formik = useFormik({
      initialValues:{
        details:'',
        phone:'',
        city:''
      },
      onSubmit: ()=>handleCheckout(cartId,'http://localhost:5173')
    });
   async function handleCheckout(cartId,url)
    {
      setIsLoading(true);
      let {data} = await chechOut(cartId,url,formik.values);
      if(data.status === 'success')
        {
          setIsLoading(false);
          window.location.href = data.session.url;
        }
        console.log(data);
      
    };

    // let validationSchema = Yup.object().shape({
    //   email:Yup.string().email('Email is invalid').required('Email is required'),
    //   password:Yup.string().matches(/^[A-z][a-z0-9]{5,10}$/,'Password must start with an uppercase letter and be between 6 to 11 characters long').required('Password is required')
    // });

    
    return <>
    <div className='max-w-xl mx-auto py-6'>

      <h1 className='text-3xl font-bold text-green-600 mb-6'>Checkout Now</h1>
    <form onSubmit={formik.handleSubmit}>
       
        <div className="relative z-0 w-full mb-5 group">
          <input  onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" id="details" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="details" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Details :</label>
        </div>
        

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone :</label>
        </div>

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" id="city" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="city" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your City :</label>
        </div>
        
        
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading? <i className='fas fa-spinner fa-spin'></i>:'Chechout'}
          </button>
         
        
    </form>
    </div>
  </>
}
