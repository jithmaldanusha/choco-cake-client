import React, { useState } from 'react';

function ProductCard ()  {
  const [isHeartClicked, setIsHeartClicked] = useState(false);
  const [isCartClicked, setIsCartClicked] = useState(false);
 
  return (
    <div className="max-w-xs rounded-lg shadow-md overflow-hidden h-82 ml-9 mt-9" style={{ backgroundColor: '#F3F3F3' }}>

      <div>
        <div className="relative">
         
          <img
            className="w-full mt-5"
            src="/images/DJI.png"
            alt="DJI Mavic Pro Drone"
          />
         
        
          {/* cart button  */}
          <button className={`absolute top-18  right-3  rounded-full p-1.5 shadow-md ${isCartClicked ? 'bg-[#F66A74CC]' : 'bg-white'} hover:bg-pink-200`}
            onClick={() => setIsCartClicked(!isCartClicked)} 
          >
            <img
              className="w-5 h-5"
              src="/images/cart.png"
              alt="Cart Icon"
            />
          </button>
        </div>
        
        <div className="p-4 mt-14">

          
          <h2 className="text-lg font-semibold">DJI Mavic Pro Drone with 3 Battery</h2>
          
          <div className="mt-1">
            <span className="text-2xl font-bold text-gray-900 " style={{ color: '#757575' }} >Rs 379,500.00</span>
            <span className="text-sm line-through text-gray-500 ml-2" style={{ color: '#757575' }}>Rs 399,500.00</span>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
