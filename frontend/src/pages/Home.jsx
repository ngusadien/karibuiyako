import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Categories from '../components/Categories';
import Navbar from '../components/Navbar';
import '../index.css';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://0.0.0.0:10000/a/products'); // <- make sure this is correct
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error('Failed to fetch products:', err);
      }
    };

    fetchProducts();
  }, []);

  // filter products
  const filteredProducts =
    selectedCategory === 'all'
      ? products
      : products.filter((product) =>
          product.category.toLowerCase() === selectedCategory.toLowerCase()
        );

  return (
    <div className="p-4">
      <Navbar/>
      <h2 className="text-xl font-bold mb-4">Products</h2>

      <Categories
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for "{selectedCategory}"</p>
        )}
      </div>
    </div>
  );
};

export default Home;
