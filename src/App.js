import React, { createContext, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Home from './Components/Home/Home';
import ProductDetails from './Components/Product-Details/Product-Details';

import './App.css';
import Wishlist from './Components/Wishlist/Wishlist';

export const CategoryContext = createContext();
export const ProductIdContext = createContext();

function App() {
  const [category, setCategory] = useState("mens");
  const [productId, setProductId] = useState(84);
  return (
    <CategoryContext.Provider value={{category, setCategory}}>
      <ProductIdContext.Provider value={{productId, setProductId}}>
          <div className='App'>
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/product-details' element={<ProductDetails />}></Route>
              <Route path='/men'></Route>
            </Routes>
          </div>
      </ProductIdContext.Provider>
    </CategoryContext.Provider>
  );
}

export default App;
