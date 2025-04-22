import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    navigate(`/product/${product._id}`);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
    >
      {/* Image Carousel */}
      <div className="relative w-full h-48 overflow-hidden bg-gray-100">
        <div
          className="flex w-full h-full transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {product.images?.map((img, index) => (
            <img
              key={index}
              src={`https://0.0.0.0/10000${img.replace(/\\/g, "/")}`}
              alt={`product-${product.productName}-${index}`}
              className="w-full h-full object-cover flex-shrink-0"
            />
          ))}
        </div>

        {/* Arrows */}
        {product.images?.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md z-10"
            >
              ◀
            </button>
            <button
              onClick={handleNext}
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-white/80 hover:bg-white p-1 rounded-full shadow-md z-10"
            >
              ▶
            </button>
          </>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h4 className="text-lg font-semibold text-gray-800 truncate">
          {product.productName}
        </h4>
        <p className="text-sm text-gray-600 line-clamp-2">{product.details}</p>
        <p className="text-blue-600 font-bold mt-2">Price: ${product.price}</p>
        {/* <p className="text-xs text-gray-500 mt-1">
          Category: {product.category}
        </p> */}
      </div>
    </div>
  );
};

export default ProductCard;
