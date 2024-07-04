import React, { useContext, useEffect, useState } from 'react';
import Style from './Register.module.css';
import {useFormik} from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';

export default function Register() {
    
    // function myValidation(values)
    // {
    //   let errors = {};
    //   if(!values.name)
    //     {
    //       errors.name = 'Name is Required'
    //     }
    //     else if(!/^[A-Z][a-z]{3,5}$/.test(values.name))
    //       {
    //         errors.name = 'Name must start with uppercase and maximum width is 5'
    //       }
    //       if(!values.email)
    //         {
    //           errors.email = 'Email is Required'
    //         }
    //         else if(!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(values.email))
    //           {
    //             errors.email = 'Email invalid'
    //           }
    //           if(!values.phone)
    //             {
    //               errors.phone = 'Phone Number is Required'
    //             }
    //             else if(!/^01[0125][0-9]{8}$/.test(values.phone))
    //               {
    //                 errors.phone = 'Phone Number must be an Egyption Number '
    //               }
    //               if(!values.password)
    //                 {
    //                   errors.password = 'Password is Required'
    //                 }
    //                 else if(!/^[A-Z][0-9 a-z]{7}$/.test(values.password))
    //                   {
    //                     errors.password = 'Password must start with uppercase and contain a number and maximum width is eight '
    //                   }
    //           return errors;

    // }
    let {setUserLogin} = useContext(UserContext)
    let navigate = useNavigate();
    const [apiError,setApiError] = useState('');
    const [isLoading,setIsLoading] = useState(false);

    function handleRegister(formValues)
    {
      setIsLoading(true);
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', formValues)
      .then((response)=>{
        if(response.data.message === 'success')
          {
            setIsLoading(false);
            localStorage.setItem('userToken' , response?.data?.token);
            setUserLogin(response.data.token);
            navigate('/');
          }
        
        // console.log(response?.data?.message);

      })
      .catch((response)=>{
        setIsLoading(false);
        setApiError(response?.data?.message);
        // console.log(response?.data?.message);
      });
      
    };

    let validationSchema = Yup.object().shape({
      name:Yup.string().min(3,'Name must be at least 3 characters long').max(10,'Name must be at most 10 characters long').required('Name is required'),
      email:Yup.string().email('Email is invalid').required('Email is required'),
      phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'Phone must be a valid Egyptian number').required('Phone is required'),
      password:Yup.string().matches(/^[A-z][a-z0-9]{5,10}$/,'Password must start with an uppercase letter and be between 6 to 11 characters long').required('Password is required'),
      rePassword:Yup.string().oneOf([Yup.ref('password')],'Password and Repassword must be the same').required('Repassword is required')
    });
    
    
    let formik = useFormik({
      initialValues:{
        name:'',
        phone:'',
        email:'',
        password:'',
        rePassword:''
      },
      validationSchema,
      onSubmit:handleRegister
    });

  return <>
    <div className='max-w-xl mx-auto px-6 py-6'>
    {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
        </div>:null}
      <h1 className='text-3xl font-bold text-green-600 mb-6'>Register Now</h1>
    <form onSubmit={formik.handleSubmit}>
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="name" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Name :</label>
        </div>
        {formik.errors.name && formik.touched.name? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.name}
        </div>:null}
        
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address :</label>
        </div>
        {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}
        </div>:null}

        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" id="phone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Phone Number :</label>
        </div>
        {formik.errors.phone && formik.touched.phone? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.phone}
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
        </div>
        {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.password}
        </div>:null}
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="rePassword" id="repassword" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="repassword" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Repassword :</label>
        </div>
        {formik.errors.rePassword && formik.touched.rePassword? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.rePassword}
        </div>:null}
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading? <i className='fas fa-spinner fa-spin'></i>:'Submit'}
          </button>
    </form>
    </div>
  </>
}
