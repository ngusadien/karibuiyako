import React, { useState } from 'react';
import { CiShoppingCart } from "react-icons/ci";
import { FaRegUser, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import '../index.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="text-xl font-bold text-blue-600">KariBuyako</div>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Search Bar (Hidden on Small Screens) */}
        <div className="hidden md:flex flex-1 mx-6 max-w-lg">
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full">
            <input
              type="text"
              placeholder="Search products..."
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2">
              <FaSearch size={18} />
            </button>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6 text-gray-700">
        <a href="/ProductForm" className="block hover:text-blue-600">+</a>
          <a href="/Login" className="hover:text-blue-600">Sign in</a>
          <a href="/UserSignup" className="hover:text-blue-600">Register</a>
          <a href="/profile">
            <FaRegUser className="hover:text-blue-600" size={20} />
          </a>
          <a href="/cart" className="relative">
            <CiShoppingCart className="hover:text-blue-600" size={22} />
            <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center">
              3
            </span>
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-3 space-y-2 px-4 text-gray-700">
          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden w-full mb-2">
            <input
              type="text"
              placeholder="Search..."
              className="flex-1 px-4 py-2 outline-none"
            />
            <button className="bg-blue-600 text-white px-4 py-2">
              <FaSearch size={18} />
            </button>
          </div>
          <a href="/ProductForm" className="block hover:text-blue-600">+</a>
          <a href="/Login" className="block hover:text-blue-600">Sign in</a>
          <a href="/UserSignup" className="block hover:text-blue-600">Register</a>
          <a href="#" className="block hover:text-blue-600 flex items-center">
            <FaRegUser className="mr-2" /> Profile
          </a>
          <a href="#" className="block hover:text-blue-600 flex items-center">
            <CiShoppingCart className="mr-2" /> Cart
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
