import {useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import Brands from './components/Brands/Brands';
import Categories from './components/Categories/Categories';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Notfound from './components/Notfound/Notfound';
// import CounterContextProvider from './Context/CounterContext';
import UserContextProvider from './Context/UserContext';
import ProdectedRoute from './components/ProdectedRoute/ProdectedRoute';
import ProductDetails from './components/ProductDetails/ProductDetails';
import CategoryDetails from './components/CategoryDetails/CategoryDetails';
import SpcificBrand from './components/SpcificBrand/SpcificBrand';
import CartContextProvider from './Context/CartContext';
import {Toaster} from 'react-hot-toast';
import WishList from './components/WishList/WishList';
import WishListContextProvider from './Context/WishListContext';
import ForgetPassword from './components/ForgetPassword/ForgetPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import Checkout from './components/Checkout/Checkout';
import Orders from './components/Orders/Orders';


let router = createBrowserRouter([
  {path:'' , element:<Layout/> ,children:[
    {index:true , element:<ProdectedRoute><Home/></ProdectedRoute>},
    {path:'products' , element:<ProdectedRoute><Products/></ProdectedRoute>},
    {path:'cart' , element:<ProdectedRoute><Cart/></ProdectedRoute>},
    // {path:'brands' , element:<ProdectedRoute><Brands/></ProdectedRoute>},
    {path:'categories' , element:<ProdectedRoute><Categories/></ProdectedRoute>},
    {path:'productdetails/:id/:category' , element:<ProdectedRoute><ProductDetails/></ProdectedRoute>},
    {path:'categorydetails/:id' , element:<ProdectedRoute><CategoryDetails/></ProdectedRoute>},
    {path:'specificbrand/:id' , element:<ProdectedRoute><SpcificBrand/></ProdectedRoute>},
    {path:'wishlist' , element:<ProdectedRoute><WishList/></ProdectedRoute>},
    {path:'checkout/:cartId' , element:<ProdectedRoute><Checkout/></ProdectedRoute>},
    // {path:'allorders' , element:<ProdectedRoute><Orders/></ProdectedRoute>},
    {path:'login' , element:<Login/>},
    {path:'register' , element:<Register/>},
    {path:'forgetpassword' , element:<ForgetPassword/>},
    {path:'verifycode' , element:<VerifyCode/>},
    {path:'resetpassword' , element:<ResetPassword/>},
    {path:'*' , element:<Notfound/>},
  ]}
]);
function App() {
  const [count, setCount] = useState(0)

return<WishListContextProvider>
<CartContextProvider>
<UserContextProvider>
    
       <RouterProvider router={router}></RouterProvider>
       <Toaster />
  </UserContextProvider>
  </CartContextProvider>
  </WishListContextProvider>
}

export default App
