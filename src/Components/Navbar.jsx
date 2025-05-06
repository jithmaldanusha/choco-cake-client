import React, { useState, useEffect } from "react";
import { Link, Navigate, redirect } from "react-router-dom";
import CartSideBar from "./CartSideBar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import axios from "axios";

// import { useSelector } from "react-redux";

function Navbar({ data }) {
  const navigate = useNavigate();
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // this function will make the side cart visible
  const toggleCart = () => {
    if (data) {
      setIsCartVisible(!isCartVisible);
    } else {
      navigate("/login");
    }
  };

  const [latestRecord, setLatestRecord] = useState([]);
  const [count, setCount] = useState();

  const cookieget = Cookies.get("memberToken");

  useEffect(() => {
    if (cookieget) {
      const decoded = jwtDecode(cookieget);
      // console.log(decoded);

      const userEmail = decoded.email;
      // console.log(userEmail);

      if (userEmail) {
        // Fetch the latest record from the backend
        axios
          .get(`https://backend.spkstore.lk/cart/getCartItems/${userEmail}`)
          .then((response) => {
            setLatestRecord(response.data.data.items);
            // console.log(response.data.data.items);
            console.log(response.data.data.items.length);
            setCount(response.data.data.items.length);

            // dispatch(setCart(response.data.data.items.length));
            // setError(null);
          })
          .catch((error) => {
            // setError('Failed to fetch record');
            setLatestRecord(null);
          });
      }
    }
  }, []);

  console.log(count);

  // const totalItem = useSelector((state) => state.myReducerCart.value); //shipto values comes here
  // console.log(totalItem);

  const userEvents = () => {
    // navigate to see order of user
    if (cookieget) {

      navigate("/userdash");
    } else {
      navigate("/guestPrivacy")
    }
  };

  const handleLogout = () => {
    // Remove the token cookie
    Cookies.remove("memberToken");
    // Redirect or update UI as needed
    navigate("/");
  };

  // Define the target URL based on the presence of the `data` prop
  const targetUrl = "/";

  return (
    <nav className="shadow-md" style={{ background: '#FF7E00' }}>
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        {/* SPK Logo image */}
        <div className="flex items-center ml-9">
          <img
            src="/images/CompanyLogo.png"
            alt="SPK Store Logo"
            className="h-14"
          />
        </div>

        {/* responsive */}
        {/* Mobile menu button */}
        <button
          className="block md:hidden px-2 py-1 text-black hover:text-red-500"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            ></path>
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`md:flex space-x-8 text-sm font-medium ${isMenuOpen ? "block" : "hidden"
            } md:block`}
        >
          {/* Dropdown for mobile menu */}
          <div
            className={`md:hidden ${isMenuOpen ? "block" : "hidden"
              } absolute top-20 left-1/2 transform -translate-x-1/2 w-1/4 bg-white shadow-lg z-10`}
          >
            <Link
              to={targetUrl}
              className="block px-4 py-2 text-black hover:text-red-500 font-bold"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-2 text-black hover:text-red-500 font-bold"
            >
              Products
            </Link>
            <Link
              to="/guestPrivacy"
              className="block px-4 py-2 text-black hover:text-red-500 font-bold"
            >
              About
            </Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex space-x-8 text-sm font-medium">
            <Link
              to={targetUrl}
              className="text-black hover:text-red-500 relative font-bold"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-black hover:text-red-500 font-bold"
            >
              Products
            </Link>
            <Link
              to="/guestPrivacy"
              className="text-black hover:text-red-500 font-bold"
            >
              About
            </Link>
          </div>
        </div>

        {/* User & Cart */}
        <div className="flex items-center space-x-6">
          {/* User Info */}
          <div className="flex items-center space-x-2">
            <button onClick={userEvents}>
              <img
                className="w-10 h-10"
                src="/images/person.png"
                alt="Person Icon"
              />
            </button>

            <div className="text-sm ml-2 hidden md:block">
              <p style={{ color: "#F4DFC8"}}>Welcome {data ? data : "Guest"}</p>
              <div>
                {data ? (
                  <>
                    <button onClick={handleLogout}>logout /</button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="text-black hover:text-red-500 mr-2"
                  >
                    LogIn /
                  </Link>
                )}

                <Link to="/signup" className="text-black hover:text-red-500">
                  Sign Up
                </Link>
              </div>
            </div>
          </div>

          {/* Cart Icon */}
          <div className="relative">
            {/* Cart button */}
            <button onClick={toggleCart}>
              <img
                className="w-8 h-8 mr-2"
                src="/images/onlinecart.png"
                alt="Shopping Cart Icon"
              />

              {count > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-700 rounded-full">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>

        {isCartVisible && <CartSideBar />}
      </div>
    </nav>
  );
}

export default Navbar;
