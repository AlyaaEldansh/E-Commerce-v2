import React, { useContext, useEffect, useState } from 'react';
import Style from './Navbar.module.css';
import logo from '../../assets/images/logo.svg'
import { NavLink, useNavigate } from 'react-router-dom';
// import { CounterContext } from '../../Context/CounterContext';
import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';

export default function Navbar() {
    // const [counter, setCounter] = useState(0);
    let navigate = useNavigate();
    function loguot()
    {
      localStorage.removeItem('userToken');
      setUserLogin(null);
      navigate('/login');
    };
    // let {counter} = useContext(CounterContext);
    let {userLogin , setUserLogin} = useContext(UserContext);
    let {cart} = useContext(CartContext);
    // console.log(cart?.numOfCartItems);
  return <>
  <nav className='bg-gray-100 text-center lg:fixed top-0 left-0 right-0 py-2 z-50 px-2'>
    <div className="container flex flex-col lg:flex-row justify-between mx-auto items-center">
    <div className='flex flex-col lg:flex-row items-center'>
        <img src={logo} width={110} alt="fresh cart logo " />
        <ul className='flex flex-col lg:flex-row'>
          {userLogin !== null?<><li className='text-lg mx-2 py-2 text-slate-900 font-light '><NavLink to={'/'}> Home </NavLink></li>
          {/* <li className='text-lg mx-2 py-2 text-slate-900 font-light '><NavLink to={'/cart'}> Cart </NavLink></li> */}
          <li className='text-lg mx-2 py-2 text-slate-900 font-light '><NavLink to={'/products'}> Products </NavLink></li>
          <li className='text-lg mx-2 py-2 text-slate-900 font-light '><NavLink to={'/categories'}> Categories </NavLink></li>
          {/* <li className='text-lg mx-2 py-2 text-slate-900 font-light '><NavLink to={'/brands'}> Brands </NavLink></li> */}
          </>:null}
          
        </ul>
      </div>
      <div>
      <ul className='flex flex-col lg:flex-row items-center'>
        {userLogin === null?<><li className='text-lg mx-4 py-2 text-slate-900 font-light '><NavLink to={'/login'}> Login </NavLink></li>
          <li className='text-lg mx-4 py-2 text-slate-900 font-light '><NavLink to={'/register'}> Register </NavLink></li>
        </>:<div className='flex px-2 items-center'>
          <li className='px-3'>
            <NavLink to={'/cart'} className='mx-2 py-4 text-lg text-slate-900 font-light cursor-pointer'>
              < i className='fa-solid fa-cart-shopping'></i>
              <span className='bg-green-600 text-white  px-1 text-sm absolute lg:top-3 right-[-6] rounded-xl'>{cart?.numOfCartItems}</span>
            </NavLink>
          </li>
          <li className='text-lg py-2 text-slate-900 font-light'><NavLink to={'/wishlist'}> <span>Wishlist <i className='fa-regular fa-heart'></i></span> </NavLink></li>
          <li onClick={loguot} className='text-lg mx-4 py-2 text-slate-900 font-light cursor-pointer'><span> Logout </span></li>
       
        </div>}
        </ul>
        </div>
    </div>


  </nav>
 </>
}
