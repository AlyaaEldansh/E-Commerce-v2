import React, {useContext, useState } from 'react';
import Style from './Login.module.css';
import {useFormik} from 'formik';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { UserContext } from '../../Context/UserContext';
// import ForgetPassword from '../ForgetPassword/ForgetPassword';

export default function Login() {

  let navigate = useNavigate();
    const [apiError,setApiError] = useState('');
    const [isLoading,setIsLoading] = useState(false);
    let {setUserLogin} = useContext(UserContext)
    function handleLogin(formValues)
    {
      setIsLoading(true);
      axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', formValues)
      .then((response)=>{
        if(response.data.message === 'success')
          {
            setIsLoading(false);
            localStorage.setItem('userToken' , response?.data.token);
            setUserLogin(response?.data.token);
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
      email:Yup.string().email('Email is invalid').required('Email is required'),
      password:Yup.string().matches(/^[A-z][a-z0-9]{5,10}$/,'Password must start with an uppercase letter and be between 6 to 11 characters long').required('Password is required')
    });

    let formik = useFormik({
      initialValues:{
        email:'',
        password:''
      },
      validationSchema,
      onSubmit:handleLogin
    });
    return <>
    <div className='max-w-xl mx-auto px-6 py-6'>
    {apiError? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {apiError}
        </div>:null}
      <h1 className='text-3xl font-bold text-green-600 mb-6'>Login Now</h1>
    <form onSubmit={formik.handleSubmit}>
       
        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Email address :</label>
        </div>
        {formik.errors.email && formik.touched.email? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.email}
        </div>:null}

        <div className="relative z-0 w-full mb-5 group">
          <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Enter Your Password :</label>
        </div>
        {formik.errors.password && formik.touched.password? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
        {formik.errors.password}
        </div>:null}
        <div className='flex justify-between items-center'>
        <button type="submit" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm sx:w-6/16  sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {isLoading? <i className='fas fa-spinner fa-spin'></i>:'Login'}
          </button>
          <p><span className='font-light text-sm'><Link className='text-green-600 hover:text-green-600 hover:underline' to={'/ForgetPassword'}>Forgetten password?</Link></span></p>
         
        </div>
        <hr className='w-full mx-auto my-2'/>
        <p className='text-center'>Didn't have account yet ? <span className='font-semibold'><Link className='text-green-700 hover:text-green-700' to={'/Register'}>Register now</Link></span></p>
        
    </form>
    </div>
  </>
}
