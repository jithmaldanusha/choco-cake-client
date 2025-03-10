// components/CategoryCard.js
import React from 'react';

const CategoryCard = ({ imageSrc, title }) => {
  return (
    <div className="category-card shadow-lg rounded-lg overflow-hidden" style={{background: "#F4DFC8"}}>
      <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold text-center" style={{color: "#FF7E00"}}>{title}</h2>
      </div>
    </div>
  );
};

export default CategoryCard;
