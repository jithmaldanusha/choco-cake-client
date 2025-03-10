import React, { useState } from 'react';

// Star component
const Star = ({ index, rating, onClick }) => (
  <svg
    onClick={() => onClick(index)}
    xmlns="http://www.w3.org/2000/svg"
    fill={index <= rating ? "orange" : "none"}
    viewBox="0 0 24 24"
    stroke-width="1.5"
    stroke="currentColor"
    className="w-6 h-6 cursor-pointer"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M12 3.75l1.82 5.563h5.875l-4.727 3.453 1.8 5.637-4.767-3.55-4.767 3.55 1.8-5.637-4.727-3.453h5.875L12 3.75z"
    />
  </svg>
);

const RatingComponent = () => {
  const [rating, setRating] = useState(0);

  const handleClick = (newRating) => {
    setRating(newRating);
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => (
        <Star
          key={index}
          index={index + 1}
          rating={rating}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default RatingComponent;
