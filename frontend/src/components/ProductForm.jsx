import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../index.css';

const ProductForm = () => {
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [details, setDetails] = useState('');
  const [category, setCategories] = useState('');
  const [images, setImages] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate(); // For redirecting

  useEffect(() => {
    const token = localStorage.getItem('jwt-token');

    if (!token) {
      // Not logged in,
      navigate('/login'); 
      return;
    }

    // Verify token with backend
    fetch('http://0.0.0.0:10000/api/verify-token/protected', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem('jwt-token');
          navigate('/login');
        }
      })
      .catch((err) => {
        console.error('Token verification failed', err);
        localStorage.removeItem('jwt-token');
        navigate('/login');
      });
  }, [navigate]);

  //handle image
  const handleImage = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const imageArray = Array.from(files);
      setImages(imageArray);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !category || !price || !details || !images.length) return;

    try {
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('price', price);
      formData.append('details', details);
      formData.append('category', category);
      images.forEach((image) => formData.append('images', image));

      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('jwt-token')}`, // Include token here
        },
        body: formData,
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      console.log('Server response:', result);

      // Clear form
      setDetails('');
      setImages([]);
      setPrice('');
      setCategories('');
      setProductName('');
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };

  if (!isAuthenticated) {
    return <p className="p-4 text-center text-red-500">Checking authorization...</p>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="flex flex-col w-full max-w-sm p-4 rounded shadow-md"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center">Upload Product</h3>
        <input
          className="mb-2 p-2 border rounded"
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Product Name"
        />
        <input
          className="mb-2 p-2 border rounded"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Product Price"
        />
        <input
          className="mb-2 p-2 border rounded"
          type="text"
          value={category}
          onChange={(e) => setCategories(e.target.value)}
          placeholder="Enter Category"
        />
        <textarea
          className="mb-2 p-2 border rounded"
          placeholder="Product Details"
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          rows={4}
        />
        <input
          className="mb-2 p-2 border rounded"
          type="file"
          accept="image/*"
          onChange={handleImage}
          multiple
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
