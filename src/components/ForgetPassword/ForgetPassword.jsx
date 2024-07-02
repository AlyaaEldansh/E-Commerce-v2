import React, { useEffect, useState } from 'react';
import Style from './ForgetPassword.module.css';
import {useFormik} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import VerifyCode from '../VerifyCode/VerifyCode';

export default function ForgetPassword() {

  let navigate = useNavigate();
  const [apiResponse,setApiResponse] = useState('');
  // const [apiError,setApiError] = useState('');
  const [isLoading,setIsLoading] = useState(false);
  function handleForgetPassword(formValues)
  {
    setIsLoading(true);
    axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', formValues)
    .then((response)=>{
      setIsLoading(false);
      setApiResponse(response?.data?.message);
      navigate('/verifycode')
      console.log(response?.data?.message);

    })
    .catch((response)=>{
      setIsLoading(false);
      setApiResponse(response?.data?.message);
      console.log(response?.data?.message);
    });
  };

  let validationSchema = Yup.object().shape({
    email:Yup.string().email('Email is invalid').required('Email is required')
  });

  let formik = useFormik({
    initialValues:{
      email:''
    },
    validationSchema,
    onSubmit:handleForgetPassword
  });
    useEffect(()=>{

    } , []);
  return <>
    <div className='max-w-xl mx-auto py-6 h-[50vh]'>
    {apiResponse? <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400" role="alert">
        {apiResponse}
        </div>:null}
        {/* {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
        </div>:null} */}
      {/* <h1 className='text-3xl font-bold text-green-600 mb-6'>Login Now</h1> */}
    <form onSubmit={formik.handleSubmit}>
       
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="Email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="Email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address :</label>
        </div>
        {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}
        </div>:null}
        <button type="submit" className="text-white mx-auto block bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading? <i className='fas fa-spinner fa-spin'></i>:'Send code'}
          </button>
        </form>
        </div>
  </>
}
