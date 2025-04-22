import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Initialize quantity to 1
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductById = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://0.0.0.0:10000/a/products/${id}`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setProduct(data);
        setSelectedImage(data.images?.[0]?.replace(/\\/g, '/') || null); // Set initial selected image
      } catch (err) {
        console.error('Failed to fetch product:', err);
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };

    fetchProductById();
  }, [id]);

  if (loading) return <p className="p-4 text-center">Loading product details...</p>;
  if (error) return <p className="p-4 text-red-500 text-center">{error}</p>;
  if (!product) return <p className="p-4 text-center">Product not found.</p>;

  const handleQuantityChange = (type) => {
    if (type === 'increment') {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrement' && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToCart = () => {
    // Implement your add to cart logic here, e.g., dispatch an action to your Redux store or update local storage.
    console.log(`Added ${quantity} of ${product.productName} to cart.`);
  };

  return (
    <div className="container mx-auto mt-8 p-6 bg-white shadow-md rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          {selectedImage && (
            <div className="mb-4 rounded-lg overflow-hidden">
              <img
                src={`http://0.0.0.0:10000/${selectedImage}`}
                alt={product.productName}
                className="w-full h-auto object-cover aspect-square"
              />
            </div>
          )}
          {product.images && product.images.length > 1 && (
            <div className="flex flex-row overflow-x-auto gap-2">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={`https://0.0.0.0:10000/${img.replace(/\\/g, '/')}`}
                  alt={`product-${i}`}
                  className={`w-20 h-20 object-cover rounded-md cursor-pointer ${
                    selectedImage === img.replace(/\\/g, '/') ? 'border-2 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedImage(img.replace(/\\/g, '/'))}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Information */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.productName}</h1>
          <p className="text-gray-600 mb-4">{product.details}</p>
          <p className="text-xl text-blue-600 font-semibold mb-2">Price: ${product.price}</p>
          {/* <p className="text-sm text-gray-500 mb-4">Category: {product.category}</p> */}

          {product.availability > 0 ? (
            <div className="flex items-center mb-4">
              <label htmlFor="quantity" className="mr-2 font-semibold">
                Quantity:
              </label>
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                <button
                  type="button"
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                  onClick={() => handleQuantityChange('decrement')}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  type="number"
                  id="quantity"
                  className="w-16 text-center border-0 focus:ring-0"
                  value={quantity}
                  readOnly
                />
                <button
                  type="button"
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 focus:outline-none"
                  onClick={() => handleQuantityChange('increment')}
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <p className="text-red-500 font-semibold mb-4">Out of Stock</p>
          )}

          {product.availability > 0 && (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="mt-8 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">Product Specifications</h3>
        <ul className="list-disc list-inside text-gray-700">
          {product.specifications && Object.entries(product.specifications).map(([key, value]) => (
            <li key={key}>
              <span className="font-semibold">{key}:</span> {value}
            </li>
          ))}
          {!product.specifications && <p className="text-gray-500">No specifications available for this product.</p>}
        </ul>
      </div>

      {/* Customer Reviews Section (Example - you'll need to implement actual review fetching) */}
      <div className="mt-8 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
        {/* Placeholder for reviews */}
        <p className="text-gray-500">No reviews yet. Be the first to write one!</p>
        {/* You would typically fetch and display reviews here */}
      </div>

      {/* Related Products Section (Example - you'll need to implement actual related product fetching) */}
      <div className="mt-8 border-t pt-8">
        <h3 className="text-xl font-semibold mb-4">Related Products</h3>
        {/* Placeholder for related products */}
        <p className="text-gray-500">No related products found.</p>
        {/* You would typically fetch and display related products here */}
      </div>
    </div>
  );
};

export default ProductDetails;
