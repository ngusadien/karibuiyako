import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductForm from './components/ProductForm';
import Categories from './components/Categories';
import ProductDetails from './components/ProductDetails';
import './index.css';
import Login from './components/Login';
import UserSignup from './components/UserSignup';

const App = () => {
  return (
    <div className="m-2">
      <Router>
       
        {/* <Categories/> */}
        <Routes>
          
          <Route path="/" element={<Home />} />
          <Route path="/ProductForm" element={<ProductForm />} />

          <Route path="/upload" element={<ProductForm />} />
          <Route path='/Login'element={<Login/>}/>
          <Route path='/UserSignup' element={<UserSignup/>}/>

          {/* <Route path="/categories" element={<Categories />} /> */}
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
