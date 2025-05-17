import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import RatingComponent from "./Rating";
import { useNavigate } from "react-router";

function HomePageHotDeals() {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  // axios.defaults.withCredentials = true; // Ensure cookies are sent with requests

  const [cards, setCards] = useState([]); // State to store card data
  const scrollRef = useRef(null);
  // const scrollStep = 2; // Amount to scroll each interval
  // const scrollDelay = 20; // Delay between scroll steps in milliseconds
  const scrollAmount = 300; // Adjust this value as needed for smooth scrolling
  const [selectedItems, setSelectedItems] = useState([]); // State to store selected items
  // Check if the token is present in cookies

  // Fetch card data from backend
  useEffect(() => {
    const fetchCards = () => {
      try {
        axios
          .get(`${process.env.REACT_APP_SERVER_URL}/product/getProducts`)
          .then((response) => {
            setCards(response.data.data);
          }); // Adjust the URL as needed
        // const data =  response.json();
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };

    fetchCards();
  }, []); // Empty dependency array means this runs once on component mount

  // Smoothly scroll left
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  //navigate to the drones page
  const handleRedirect = () => {
    window.scrollTo(0, 0);
    navigate('/drones');
  };

  // Smoothly scroll right
  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Send request with selected items
  const sendRequest = async (items) => {
    const token = Cookies.get("memberToken"); // Check for token from cookies

    console.log(items);

    if (token) {
      try {
        const decoded = jwtDecode(token);

        // send data with items and user
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}/cart/addToCart`,
          { items, user: decoded }
        );

        console.log(response);
      } catch (error) {
        console.error("Error adding to cart:", error);
      }
    } else {
      // Token does not exist, handle the case (e.g., show a message)
      console.log("User not authenticated");
    }
  };

  // Effect to send request when selectedItems changes
  useEffect(() => {
    if (selectedItems.length > 0) {
      sendRequest(selectedItems);
    }
  }, [selectedItems]); // This will run whenever selectedItems changes

  // Handle card click
  const handleCardClick = async (item) => {
    try {
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
        // Update count or other state changes
        setCount((prevCount) => prevCount + 1);
        console.log(count)

        return updatedItems;
      });
    } catch (error) {
      console.error("Error handling card click:", error);
    }
  };

  // sendRequest(selectedItems);

  const filteredCards = cards.filter((card) => card.offers === "Yes");

  return (
    <div>
      <div className="flex align-middle items-center justify-between rounded-md mt-12 ">
        <div className="w-2/5 m-2 relative overflow-hidden rounded-md">
          <img
            alt="Your Company"
            src="images/hotdealsHome.png"
            className="mx-auto h-96 rounded-md relative hover:scale-x-110 hover:scale-y-110 hover:transition duration-500 ease-in-out"
          // width={550}
          // height={}
          />
          <button
            className="absolute bottom-20 left-44 text-center px-5 py-1.5 p-2 rounded-lg text-sm font-semibold"
            style={{ backgroundColor: "#FF5733", color: "white" }}
            onClick={handleRedirect}
          >
            SHOP NOW
          </button>

        </div>

        <div className="flex items-center w-3/5">
          {/* left side scroll */}
          <button
            onClick={scrollLeft}
            className="relative top-1/2 left-0 transform -translate-y-1/2 p-2 rounded-full shadow-md z-10 "
            style={{ background: "#FF7E00" }}
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          {/* content of scroll */}
          <div
            className=" flex overflow-hidden rounded-xl whitespace-nowrap relative gap-4"
            ref={scrollRef}
          >
            {filteredCards.map((event) => {

              return (
                <div
                  key={event.id}
                  className="flex-none mx-2 h-96 w-72 relative group "
                >
                  <div className="flex flex-col text-center font-semibold text-sm m-2 rounded-xl h-full w-full" style={{ background: "#F4DFC8" }}>
                    <div className="flex flex-col p-4 flex-grow">
                      <img
                        alt="Your Company"
                        src={event.itemDescription}
                        className="mx-auto w-full h-52 object-cover rounded-xl transition-transform duration-500 ease-in-out transform hover:scale-105"
                      // width={200}
                      />
                    </div>
                    <div className="flex justify-end mb-2 mr-4">
                      <button
                        className="rounded-full bg-white p-2 shadow-md transition-transform transform hover:scale-110"
                        onClick={() => handleCardClick(event)}
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
                      </button>
                    </div>
                    <div className="m-2 relative w-64 h-40  rounded-lg overflow-hidden group">
                      <div className="flex flex-col text-left items-start ml-1">
                        <p className="font-semibold text-xl truncate w-full">
                          {event.itemName}
                        </p>
                      </div>
                      <div className="flex items-center justify-between mb-3">
                        <p className="mt-2 ml-2 text-base">
                          LKR {event.priceAfterDiscount}
                        </p>
                        <p className="mt-2 mr-2">
                          <RatingComponent />
                        </p>
                      </div>
                      <div className="absolute bottom-10 flex items-end justify-center w-72 h-16">
                        <button
                          className="text-black mt-10 mr-3 w-3/4 py-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform scale-100 group-hover:scale-105 shadow-lg"
                          style={{
                            backgroundColor: "#FF7E00",
                          }}
                          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e56f00")}
                          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF7E00")}
                          onClick={() => navigate("/details", { state: event })}
                        >
                          Buy now
                        </button>

                      </div>
                    </div>
                  </div>


                </div>
              );
            })}
            {/* card for slide */}
          </div>

          <button
            onClick={scrollRight}
            className="relative top-1/2 right-0 transform -translate-y-1/2 p-2 rounded-full shadow-md z-10 ml-2"
            style={{ background: "#FF7E00" }}
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePageHotDeals;
