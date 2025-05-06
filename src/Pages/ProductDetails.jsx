import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useLocation } from "react-router-dom";
import HomepagePopular from "../Components/HomepagePopular";
import { Carousel } from "flowbite-react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setProd } from "../Redux/ItemDetailAction";
import { setQty } from "../Redux/QtyAction";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import "../css/homepage.css";

// here onclick of buy now button uses dispatch(setProd(data));
// to set data in redux state

function ProductDetails() {

  
  window.scrollTo(0, 0);


  const cookieget = Cookies.get("memberToken");

  let username = "";

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    username = decoded.username || "";
  }


  

  const navigate = useNavigate();

  const location = useLocation();

  const data = location.state;

  const dispatch = useDispatch();

  let numb = parseInt(data.quantity);

  const [error, setError] = useState(null); // State to manage the error message
  const [quantity, setQuantity] = useState(1); // Initialize with 0 or another default value

  // Initialize state for quantity

  //  Function to handle increment
  const handleIncrement = () => {
    if (numb > quantity) {
      setError(null); // Clear any previous error message
      setQuantity((prevQuantity) => prevQuantity + 1);
      // data.quantity = quantity +1
      numb = numb + 1;
    } else {
      setError("limit exceed");
    }
  };

  //  Function to handle decrement
  const handleDecrement = () => {
    if (quantity <= 1) {
      setError("cannot be less than 1");
    } else {
      setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 0)); // Prevent quantity from going below 0
      // data.quantity = quantity-1
      numb = numb - 1;
    }
  };

  return (
    <div className="bg-black" style={{ color: "white" }}>
      <Navbar data={username} />

      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image Gallery */}
          {/* add products item images here means data.itemImage */}
          <div className="flex items-center space-x-4 ">
            {/* Thumbnail Images */}
            <div className="flex flex-col items-center space-y-2 ml-24 mb-[-75px]">
              {/* image 1 */}
              <img
                src={[data.itemImage[3]]}
                alt="Thumbnail 1"
                style={{ width: "100px", height: "100px" }} // Custom size
                className="object-cover rounded-lg border border-gray-200"
              />

              {/* image 2 */}
              <img
                src={data.itemImage[2]}
                alt="Thumbnail 2"
                style={{ width: "100px", height: "100px" }} // Custom size
                className="object-cover rounded-lg border border-gray-200"
              />

              {/* image 3 */}
              <img
                src={data.itemImage[1]}
                alt="Thumbnail 3"
                style={{ width: "100px", height: "100px" }} // Custom size
                className="object-cover rounded-lg border border-gray-200"
              />

              {/* image 4 */}
              <img
                src={data.itemImage[0]}
                alt="Thumbnail 4"
                style={{ width: "100px", height: "100px" }} // Custom size
                className="object-cover rounded-lg border border-gray-200"
              />
            </div>

            {/* Main Image */}
            <div className="flex-grow flex justify-center ml-5">
              <img
                src={data.itemImage[0]}
                style={{ width: "500px", height: "500px" }} // Custom size in pixels
                className="object-cover rounded-lg border border-gray-200"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="mt-4">
            {/* In stock tag */}
            <span
              className={`text-lg font-semibold px-4 py-2 rounded ${
                data.quantity > 0 
                  ? "bg-[#00C06026] text-[#00C060]"
                  : "bg-[#FF000026] text-[#FF0000]"
              }`}
            >
              {data.quantity > 0 ? "Available" : "Not Available"}
            </span>

            {/* Product title */}
            <h2 className="text-2xl font-bold" style={{ marginTop: "20px" }}>
              {data.itemName}
            </h2>

            {/* Price section */}
            <div className="flex items-center space-x-4 mt-2">
              <span className="text-2xl font-semibold">
                LKR {data.priceAfterDiscount}
              </span>
              <span className="text-lg text-gray-500 line-through">
                LKR {data.originalPrice}
              </span>
            </div>

            {/* short description */}
            <div className="mt-4">
              <h3 className="text-lg font-medium">Description</h3>
              <p className="text-gray-500 mt-2">{data.shortDescription}</p>
            </div>

            {/* product additional images */}
            <div className="mt-4 flex space-x-2">
              <img
                src={data.itemsWithAccessoriesImages1}
                alt="Thumbnail 1"
                className="w-16 h-16 object-cover border border-gray-200"
              />
              <img
                src={data.itemsWithAccessoriesImages2}
                alt="Thumbnail 2"
                className="w-16 h-16 object-cover border border-gray-200"
              />
              <img
                src={data.itemsWithAccessoriesImages3}
                alt="Thumbnail 3"
                className="w-16 h-16 object-cover border border-gray-200"
              />
            </div>

            <div className="mt-10">
              <div
                className="flex flex-col items-start "
                style={{ marginLeft: "30 0px", marginTop: "-30px" }}
              >
                <div className="mb-8">
                  <label htmlFor="quantity" className="text-lg font-medium ">
                    Available Quantity
                  </label>
                  <p>{data.quantity}</p>
                </div>

                <label htmlFor="quantity" className="text-lg font-medium">
                  Quantity
                </label>
                <div className="flex items-center border border-gray-200 rounded">
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-900"
                    onClick={handleDecrement}
                  >
                    -
                  </button>
                  <input
                    id="quantity"
                    type="text"
                    value={quantity}
                    className="w-12 text-center border-none outline-none bg-black"
                  />
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-200"
                    onClick={handleIncrement}
                  >
                    +
                  </button>
                </div>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}{" "}
              {/* Display error message */}
            </div>

            {/* items details buy now button */}
            <button
              className="mt-14 w-full text-white py-2 rounded-md"
              style={{
                backgroundColor: "#FF7E00",
                width: "400px",
                marginTop: "40px",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e56f00")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FF7E00")}
              onClick={() => {
                if (data.quantity > 0) {
                  dispatch(setProd(data));
                  dispatch(setQty(quantity));
                  navigate("/checkout");
                } else {
                  // LINK TO WHATSAPP OF ADMIN
                  // navigate("/");
                  window.location.href = "https://wa.me/0760079848";
                }
              }}
            >
              {data.quantity > 0 ? "BUY NOW" : "PRE ORDER"}
            </button>
          </div>
        </div>

        <h3
          className="text-xl font-bold mb-2 ml-48"
          style={{ marginTop: "90px", marginLeft: "170px" }}
        >
          Product Specifications
        </h3>

        {/* Specifications */}
        <div className="mt-8 p-4 rounded-lg w-3/4 ml-32 translate-x-10" style={{background: "#F4DFC8", color: "#FF7E00"}}>
          {/* title */}
          <h3 className="text-xl font-bold mb-4">{data.topic1}</h3>

          {/* paragraph */}
          <p className="text-black mb-4">{data.description1}</p>

          {/* Second Title  */}
          <h4 className="text-lg font-medium mb-2">{data.topic2}</h4>

          {/* list */}
          <ul className="list-disc list-inside text-black mb-4">
            {data.description2}
          </ul>

          {/* About Item Section */}
          {/* About Item Title */}
          <h1 className="text-lg font-semibold mb-2">About Item</h1>

          <div className="flex items-center ml- mt-10">
            <div className="w-full h-96 object-cover rounded-lg border border-gray-200 mr-4">
              <Carousel slideInterval={3000} className="carousel">
                <img src={data.itemDescription[0]} alt="..." />
                <img src={data.itemDescription[1]} alt="..." />
                <img src={data.itemDescription[2]} alt="..." />
              </Carousel>
            </div>

            {/* <img
            src="/images/ProductDetail.png"
            alt="DJI MINI 2"
            className="w-full h-96 object-cover rounded-lg border border-gray-200 mr-4"
          /> */}
          </div>
        </div>

        {/* Related Products Section */}
        <div className="container mx-auto p-4 text-black">
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Related Products</h3>
            <div className="w-full gap-6">
              <HomepagePopular />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetails;
