import React, { useEffect, useState } from 'react';
import Style from './Footer.module.css';
import paypal from '../../assets/images/paypal.svg';
import masterCard from '../../assets/images/mastercard.svg'
import expressCard from '../../assets/images/expresscard.svg'
import visa from '../../assets/images/visa.svg'
import googlePlay from '../../assets/images/google-play.svg'
import appStore from '../../assets/images/app-store.svg'


export default function Footer() {
    const [counter, setCounter] = useState(0);
    useEffect(()=>{

    } , []);
  return <>
  <div className='px-10 py-12 bg-gray-100 relative bottom-0 right-0 left-0'>
  <h1 className=' text-gray-900 text-2xl font-normal'>Get the FreshCart app</h1>
  <p className='text-gray-500 text-sm font-light mt-2'>We will send you a link, open it on your phone to download th app.</p>

  <div className='px-4 flex flex-wrap flex-col lg:flex-row items-center my-4'>
  <input type="email" name="email" id="email" className="block py-1 px-2 w-[250px] lg:w-5/6 text-sm text-gray-900 bg-white border-2 rounded-md border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 " placeholder=" Email .." />
  <button className='py-1 mx-auto lg:mx-0 px-4 lg:px-10 mt-2 lg:mt-0 lg:ml-2 rounded-md text-white bg-green-500'>Share App Link</button>
  </div>

  <hr className='w-full mx-auto'/>

  <div className="flex flex-wrap flex-col lg:flex-row items-center justify-between mt-6 lg:mt-0">
    <div className='flex flex-wrap items-center pl-4'>
    <h3 className='text-gray-900 font-normal '>Payment Partners</h3>
    <div className="flex flex-wrap items-center ">
    <img src={visa} className='w-8 mx-1' alt='visa icon' />
    <img src={expressCard} className='w-8 mr-1' alt='expressCard icon' />
    <img src={masterCard} className='w-8 mr-1' alt='masterCard icon' />
    <img src={paypal} className='w-10 mr-1' alt='paypal icon' />
    </div>
    </div>
    <div className='flex pt-6 lg:pt-0 flex-col lg:flex-row items-center'>
    <div className='py-2 text-slate-900 flex items-center'>
            <i className='fab fa-facebook mx-2'></i>
            <i className='fab fa-twitter mx-2'></i>
            <i className='fab fa-instagram mx-2'></i>
            <i className='fab fa-tiktok mx-2'></i>
            <i className='fab fa-youtube mx-2'></i>
          </div>
    </div>
    <div className="row flex-col lg:flex-row items-center">
    <div className='flex flex-wrap flex-row items-center'>
    <h3 className='text-gray-900 font-normal'>Get deliveries with FreshCart</h3>
    <div className="flex flex-wrap flex-row items-center">
    <img src={appStore} className='w-24 mx-1' alt='appStore icon' />
    <img src={googlePlay} className='w-24 mr-1' alt='googlePlay icon' />
    </div>
    </div>
  </div>
  </div>

  <hr className='w-full mx-auto'/>
  </div>
  </>
}
