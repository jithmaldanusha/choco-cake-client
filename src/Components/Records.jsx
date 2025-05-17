import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

const Records = ({ data }) => {
  const navigate = useNavigate();
  console.log(data);

  const [selectedItems, setSelectedItems] = useState([]);

  // count for add badge

  // Send request with selected items
  const sendRequest = async (items) => {
    const token = Cookies.get("memberToken"); // Check for token from cookies
    console.log(items);

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log(decoded);

        // send data with items and user
        await axios.post(`${process.env.REACT_APP_SERVER_URL}/cart/addToCart`,
          { items, user: decoded },
        );
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      // Token does not exist, handle the case (e.g., show a message)
      console.log("User not authenticated");
    }
  };

  // Handle card click
  const handleCardClick = async (item) => {
    // Check if the item is out of stock
    if (item.quantity <= 0) {
      console.warn("Item is out of stock and cannot be selected.");
      return; // Exit if the item is not available
    }
    // Out of stock

    // Update local state to track selected items
    setSelectedItems((prevSelected) => {
      const isSelected = prevSelected.some(
        (selectedItem) => selectedItem._id === item._id
      );
      const updatedItems = isSelected
        ? prevSelected.filter((selectedItem) => selectedItem._id !== item._id)
        : [...prevSelected, item];

      // Send request with the updated selection
      // if (!isSelected) {
      //   sendRequest(updatedItems);
      // }

      return updatedItems;
    });

    // Send request after updating state
    const updatedSelectedItems = selectedItems.includes(item)
      ? selectedItems.filter((selectedItem) => selectedItem._id !== item._id)
      : [...selectedItems, item];

    // Only send request if item is being added
    if (!selectedItems.includes(item)) {
      await sendRequest(updatedSelectedItems);
    }
  };

  return (
    <>
      <div className="flex flex-wrap max-w-7xl gap-5 " style={{ color: "black" }} >
        {data.map((item) => {
          const isSelected = selectedItems.some(
            (selectedItem) => selectedItem._id === item._id
          );
          return (
            <div
              key={item._id}
              className="flex-none mx-2 h-96 w-72 relative m-6 group"
            >
              <div className="flex flex-col text-center font-semibold text-sm m-2 bg-gray-50 rounded-xl h-full w-full" style={{ background: "#F4DFC8" }}>
                {/* <!-- Image Section --> */}
                <div className="flex flex-col p-4 flex-grow ">
                  <img
                    alt={item.itemName}
                    src={item.itemImage[0]}
                    className="mx-auto w-full h-52 object-cover rounded-xl transition-transform duration-500 ease-in-out transform hover:scale-105"
                  />
                </div>

                {/* <!-- Add to Cart Button --> */}
                <div className="flex mb-2 ml-4">

                  {/* add to cart button badge */}
                  <button
                    className={`rounded-full p-2 shadow-md transition-transform transform hover:scale-110 ${isSelected ? "bg-red-300 text-white" : "bg-gray-300"
                      }`}
                    onClick={() => handleCardClick(item)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                      />
                    </svg>
                    {/* {isSelected && (
                          <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-red-500 rounded-full">
                            {selectedItems.length}
                          </span>
                        )} */}
                  </button>
                </div>

                {/* <!-- Text and Rating Section --> */}
                <div className="m-2 relative w-64 h-40  rounded-lg overflow-hidden group">
                  <div className="flex flex-col text-left items-start ml-1">
                    <p className="mt-2 font-semibold text-xl truncate w-full">
                      {item.itemName}
                    </p>
                  </div>
                  <div className="flex items-center justify-between ">
                    <p className="mt-2 ml-2 text-base">
                      LKR {item.priceAfterDiscount}
                    </p>
                    <p className="mt-2 mr-2">
                      {/* <RatingComponent /> */}
                      {item.originalPrice}
                    </p>
                  </div>
                </div>
                <div className="absolute inset-y-80 flex items-end  justify-center  w-72 h-12">
                  <button
                    className="text-black mt-10 mr-3 w-3/4 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-100 group-hover:scale-105 shadow-lg"
                    style={{
                      backgroundColor: "#FF7E00",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e56f00")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF7E00")}
                    onClick={() => navigate("/details", { state: item })}
                  >
                    Buy now
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Records;
