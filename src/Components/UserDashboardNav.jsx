import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function UserDashboardNav() {
  const navigate = useNavigate();

  const handlePrivacyPolicyClick = () => {
    navigate('/privacy');
  };

  const handleGeneralOverviewClick = () => {
    navigate('/userdash');
  };

  const handleMyOrdersClick = () => {
    navigate('/UserMyOrder');
  };

  const handleOrderTrackingClick = () => {
    navigate('/ordersforTrack');
  };

  const handlePaymentMethodsClick = () => {
    navigate('/Checkout');
  };

  const handleSignOutClick = () => {
    // Handle sign-out logic here
    console.log('Sign Out clicked');
  };

  const [user, setUser] = useState({})


  const cookieget = Cookies.get("memberToken");

  let email = '';

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    console.log(decoded);

    email = decoded.email || '';

  }

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/member/getmember/${email}`)
      .then((Response) => {
        console.log(Response.data.data);
        setUser(Response.data.data)
      })
  }, [])

  console.log(user);

  return (
    <div className="w-1/4 bg-white p-4" style={{ background: "#F4DFC8" }}>
      {/* User image with profile name */}
      <div className="flex items-center space-x-4 p-4 mb-6 mt-10" style={{ border: '1px solid black', borderRadius: '8px' }}>
        {/* User Image */}
        <img src="images/userimage.png" alt="User" className="w-16 h-16 rounded-full" />

        {/* Hello Nirmal section */}
        <div>
          <p className="text-lg font-semibold">Hello,</p>
          <p className="text-xl font-bold">{user.firstname} {user.lastname}</p>
        </div>
      </div>

      {/* Buttons */}
      <ul className="space-y-2">
        <li>
          {/* General Overview button */}
          <button
            className="w-full p-2 border border-black rounded-lg flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:scale-105"
            style={{ border: '1px solid black' }}
            onClick={handleGeneralOverviewClick}
          >
            <span>
              <img src="images/general.png" alt="GeneralOverview" className="w-5 h-5" />
            </span>
            <span>General Overview</span>
          </button>
        </li>
        <li>
          {/* My Order button */}
          <button
            className="w-full p-2 border border-black rounded-lg flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:scale-105"
            style={{ border: '1px solid black' }}
            onClick={handleMyOrdersClick}
          >
            <span>
              <img src="images/myorder.png" alt="MyOrders" className="w-5 h-5" />
            </span>
            <span>My orders</span>
          </button>
        </li>
        <li>
          {/* Orders Tracking button */}
          <button
            className="w-full p-2 border border-black rounded-lg flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:scale-105"
            style={{ border: '1px solid black' }}
            onClick={handleOrderTrackingClick}
          >
            <span>
              <img src="images/ordertrack.png" alt="OrderTracking" className="w-5 h-5" />
            </span>
            <span>Orders Tracking</span>
          </button>
        </li>
        {/* <li> */}
        {/* Payment Methods button */}
        {/* <button 
            className="w-full p-2 hover:bg-gray-200 rounded-lg flex items-center space-x-2" 
            style={{ border: '1px solid black' }} 
            onClick={handlePaymentMethodsClick}
          >
            <span><img src="images/PaymentMethods.png" alt="PaymentMethods" className="w-5 h-5" /></span>
            <span>Payment Methods</span>
          </button> */}
        {/* </li> */}

        <li>
          {/* Privacy Policy button */}
          <button
            className="w-full p-2 border border-black  rounded-lg flex items-center space-x-2 transition-transform duration-300 ease-in-out hover:bg-red-500 hover:text-white hover:scale-105"
            style={{ border: '1px solid black' }}
            onClick={handlePrivacyPolicyClick}
          >
            <span>
              <img src="images/privacypolicy.png" alt="PrivacyPolicy" className="w-5 h-5" />
            </span>
            <span>Privacy Policy</span>
          </button>
        </li>
      </ul>


    </div>
  );
}

export default UserDashboardNav;
