import React from 'react';

const Categories = ({ selectedCategory, onSelectCategory }) => {
  const categories = [
    { name: 'all' },
    { name: 'explore' },
    { name: 'motorcycle' },
    { name: 'watches' },
    { name: "men's shoes" },
    { name: 'shirts' },
    { name: 'phone accessories' },
    { name: 'tshirts' }
  ];

  return (
    <div className="w-full overflow-x-auto whitespace-nowrap">
      <div className="flex space-x-4 p-4">
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => onSelectCategory(category.name)}
            className={`px-4 py-2 rounded-full border transition ${
              selectedCategory === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories;
