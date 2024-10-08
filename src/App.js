import React, { createContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Home from './Components/Home/Home';
import ProductDetails from './Components/Product-Details/Product-Details';
import Wishlist from './Components/Wishlist/Wishlist';
import Checkout from "./Components/Checkout/Checkout";
import Card from "./Components/Card/Card";
import UPI from "./Components/UPI/UPI";
import ThankYou from "./Components/Thank-You/Thank-You";

import './App.css';
import Login from './Components/login/Login';
import Cart from './Components/Cart/Cart';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

import Mens from '../src/Components/Mens/Mens'; 
import Womens from './Components/Womens/Womens';
import Kids from './Components/Kids/Kids';
import Footwear from './Components/Footwear/Footwear'; 

export const CategoryContext = createContext();
export const ProductIdContext = createContext();
export const UserContext = createContext();
export const TotalAmountContext = createContext();

function App() {
  const [category, setCategory] = useState("mens");
  const [productId, setProductId] = useState(84);
  const [username, setUsername] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  return (
    <CategoryContext.Provider value={{category, setCategory}}>
      <ProductIdContext.Provider value={{productId, setProductId}}>
        <UserContext.Provider value={{username,setUsername}}>
          <TotalAmountContext.Provider value={{totalAmount,setTotalAmount}}>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/product-details' element={<ProductDetails />}></Route>
              <Route path='/wishlist' element={<Wishlist />}></Route>
              <Route path='/men' element={<Mens />}></Route>
               <Route path='/women' element={<Womens />}></Route>
              <Route path='/kids' element={<Kids />}></Route>
              <Route path='/footwear' element={<Footwear />}></Route>
              <Route path='/cart' element={<Cart /> }></Route>
              <Route path='/checkout' element={<Checkout /> }></Route>
              <Route path='/card' element={<Card /> }></Route>
              <Route path='/upi' element={<UPI /> }></Route>
              <Route path='/thankyou' element={<ThankYou /> }></Route>
              <Route path='/auth' element={<Login />}></Route>
              <Route path='/header' element={<Header />}></Route>
              <Route path='/footer' element={<Footer />}></Route>

            </Routes>
          </div>
          </TotalAmountContext.Provider>
          </UserContext.Provider>
      </ProductIdContext.Provider>
    </CategoryContext.Provider>
  );
}

export default App;
