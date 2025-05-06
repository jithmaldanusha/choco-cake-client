import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function Cart() {
  const location = useLocation();
  const datas = location.state;
  console.log(datas);

  const navigate = useNavigate();
  const [error, setError] = useState(null); // State to manage the error message
  const [error1, setError1] = useState(null); // State to manage the error message
  const [itemErrors, setItemErrors] = useState({}); // State to manage errors for each item
  // getting user from cookies
  const cookieget = Cookies.get("memberToken");

  let username = "";

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    username = decoded.username || "";
  }

  let count = 0;
  // Initialize cart items with default quantity of 1
  const initialCartItems = datas.map((item) => ({
    ...item,
    count: parseInt(item.quantity),

    quantity: 1, // Start quantity from 1
  }));

  // Define the array of items
  // const initialCartItems = datas
  console.log(initialCartItems);

  let newQuantity = 0;
  const [cartItems, setCartItems] = useState(initialCartItems);
  //  const [quantityChanges, setQuantityChanges] = useState({}); // Separate state for quantity changes
  const shippingFee = 300;
  // Handle quantity change
  const handleQuantityChange = (id, change) => {
    console.log("Quantity change triggered", id, change); // Debugging line

    setCartItems((prevItems) => {
      return prevItems.map((item) => {
        if (item.itemID === id) {
          const newQuantity = item.quantity + change;
          console.log(newQuantity);

          // Handle increment
          if (change > 0) {
            if (newQuantity > item.count) { // Assuming you have a max quantity for each item
              setItemErrors((prev) => ({ ...prev, [id]: "Limit exceeded" }));
              return item; // Return the item unchanged
            }
          }

          // Handle decrement
          if (change < 0) {
            if (newQuantity < 1) {
              setItemErrors((prev) => ({ ...prev, [id]: "Cannot be less than 1" }));
              return item; // Return the item unchanged
            }
          }

          // Return updated item if all checks pass
          // Clear error if quantity is valid
          setItemErrors((prev) => ({ ...prev, [id]: null }));
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  // Handle item removal
  const handleRemoveItem = async (id) => {
    console.log("Remove item triggered", id); // Debugging line

    try {
      // Send request to API to remove the item
      await axios
        .delete(`https://backend.spkstore.lk/cart/deleteCartItem/${id}`)
        .then((response) => {
          console.log(response);
        }); // Update with your actual API endpoint

      // Update local state
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.itemID !== id)
      );
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  // Convert quantities to strings
  const getStringifiedCartItems = () => {
    return cartItems.map((item) => ({
      ...item,
      quantity: item.quantity.toString(),
    }));
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.priceAfterDiscount * item.quantity,
    0
  );

  return (
    <div className="bg-black">
      <Navbar data={username} />

      <div className="container mx-auto p-4 mt-10 mb-10">
        {/* Text your cart */}
        <h2 className="text-2xl text-white font-bold mb-4 ml-32">
          Your Cart ({cartItems.length} items)
        </h2>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            {cartItems.map((item) => (
              // The cards
              <div
                key={item.id}
                className="flex items-center bg-[#F4DFC8] p-5 mb-5 ml-32 rounded-md"
                style={{ width: "800px" }}
              >
                {/* Image */}
                <img
                  src={item.itemDescription[0]}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-md"
                />

                <div className="flex-1 ml-4">
                  {/* Item Name */}
                  <h3 className="text-lg font-medium">{item.itemName}</h3>

                  <div className="text-gray-500">
                    {/* The actual price */}
                    <span className="font-semibold text-black text-lg">
                      LKR {parseInt(item.priceAfterDiscount).toFixed(2)}
                    </span>

                    {/* The previous price */}
                    {item.originalPrice && (
                      <span
                        className="line-through ml-2 font-semibold text-sm"
                        style={{ color: "#757575" }}
                      >
                        LKR {parseInt(item.originalPrice).toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>

                {itemErrors[item.itemID] && (
                  <div className="text-red-500 mr-3">{itemErrors[item.itemID]}</div>
                )}
                <div className="flex flex-col items-center">
                  <div className="flex items-center border border-gray-300 rounded-md mr-4">
                    {/* Decrease button */}
                    <button
                      className="px-2 py-1"
                      onClick={() => handleQuantityChange(item.itemID, -1)}
                    >
                      -
                    </button>

                    {/* Item quantity tag */}
                    <span className="px-2">{item.quantity}</span>

                    {/* Increase button */}
                    <button
                      className="px-2 py-1"
                      onClick={() => handleQuantityChange(item.itemID, 1)}
                    >
                      +
                    </button>
                  </div>

                  {/* Remove button */}
                  <button
                    className="text-red-500 mt-2"
                    onClick={() => handleRemoveItem(item.itemID)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/3 mr-12">
            <div className="bg-[#F4DFC8] p-4 rounded-md">
              {/* Price details text */}
              <div className="flex items-center mb-9">
                <h3 className="text-lg font-bold mr-2">Price Details</h3>
                <span className="text-sm font-bold" style={{ color: "#757575" }}>
                  ({cartItems.length} items)
                </span>
              </div>

              {/* Subtotal text */}
              {/* <div className="flex justify-between text-gray-600 mb-2 mt-4">
                <span>Subtotal</span>
                <span>LKR {totalPrice.toFixed(2)}</span>
              </div> */}

              {/* Shipping fee text */}
              {/* <div className="flex justify-between text-gray-600 mb-9">
                <span>Shipping Fee</span>
                <span>LKR {shippingFee.toFixed(2)}</span>
              </div> */}

              {/* Total Div */}
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>LKR {(totalPrice).toFixed(2)}</span>
              </div>

              {/* Checkout button */}
              <button
                className="w-full mt-4 bg-[#FF7E00] text-white py-2 rounded-md"
                onClick={() => {
                  navigate("/checkout", {
                    state: {
                      totalPrice: totalPrice + shippingFee,
                      items: getStringifiedCartItems(),
                    },
                  });
                }}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
