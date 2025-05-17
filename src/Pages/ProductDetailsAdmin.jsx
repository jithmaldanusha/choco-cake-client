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
import AdminNavbar from "../Components/AdminNavbar";

function ProductDetailsAdmin() {


  const location = useLocation();
  const data = location.state;

  console.log(data);



  let numb = parseInt(data.quantity);


  return (
    <div className="flex max-8xl bg-red-300">
      {/* <Navbar data={username}/> */}

      <AdminNavbar />

      <main className="2xl:flex flex-col p-7 max-w-7xl bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{data.itemName}</h1>
          <div className="flex items-center space-x-3">
            <img
              src="https://s3-alpha-sig.figma.com/img/ab45/5ac8/d3acc971191752ce2c32265f2dcb34bc?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HrJQ1uVLXL1jCl9zwgjICytFB9KkVmrJpX4T3giiieEgc4wjN2eGRDzfJBAjv-oUMyAUrKjnV0p-hAQsE7nMikS74SH~Fl8YUfON~auA6aXw1V4GXBLtzSV1087-NgxiQw4fnabkicNxC1De2YYcXURE~fEKtROPbChwREfvvBmymxtsON0FZ~WdwgaHMOWgHAa~mWj1NNDaAYiSVDgxlYZsVIZoS7PObgMiwLCEmWJDIeiXN7vre7vkQadesd6EF-4Su2AQibvkcgsJuANGmoMMRGC1fcT8nlbeQVNekTQWoCi9KtbY7Rg0hHl0mpNSWX89bX9Qj2Hf92hrOVtQtw__"
              alt="notification"
              className="w-6 h-6"
            />
            <div className="flex items-center space-x-2">
              <img
                src="/images/Adminlogo.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="font-bold block">Roman Doe</span>
                <span className="text-sm text-gray-900 block">Welcome</span>
              </div>
            </div>
          </div>
        </header>

        <div className="2xl:p-5 rounded-lg shadow-md bg-gray-50 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image Gallery */}
            {/* add products item images here means data.itemImage */}
            <div className="flex items-center space-x-4 ">
              {/* Thumbnail Images */}
              <div className="flex flex-col items-center space-y-2 ml-24 mb-[-75px]">
                {/* image 1 */}
                <img
                  src={[data.itemImage[0]]}
                  alt="Thumbnail 1"
                  style={{ width: "100px", height: "100px" }} // Custom size
                  className="object-cover rounded-lg border border-gray-200"
                />

                {/* image 2 */}
                <img
                  src={data.itemImage[3]}
                  alt="Thumbnail 2"
                  style={{ width: "100px", height: "100px" }} // Custom size
                  className="object-cover rounded-lg border border-gray-200"
                />

                {/* image 3 */}
                <img
                  src={data.itemImage[2]}
                  alt="Thumbnail 3"
                  style={{ width: "100px", height: "100px" }} // Custom size
                  className="object-cover rounded-lg border border-gray-200"
                />

                {/* image 4 */}
                <img
                  src={data.itemImage[1]}
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
                  className="object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Product Details */}
            <div>
              {/* In stock tag */}
              <span
                className={`text-lg font-semibold px-4 py-2 rounded ${data.quantity > 0
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
                <h3 className="text-lg font-medium">Short Description</h3>
                <p className="text-gray-700 mt-2">{data.shortDescription}</p>
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

              <div className="mt-4">
                <div
                  className="mt-4"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    paddingLeft: "200px",
                  }}
                >
                </div>
                <div
                  className="flex items-center space-x-2"
                  style={{ marginLeft: "30 0px" }}
                >
                  <label htmlFor="quantity" className="text-lg font-medium ">
                    Quantity -
                  </label>
                  <p>{numb}</p>
                </div>
              </div>
            </div>
          </div>

          <h3
            className="text-xl font-bold mb-2 ml-48"
            style={{ marginTop: "90px", marginLeft: "170px" }}
          >
            Product Specifications
          </h3>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg w-3/4 ml-32 translate-x-10">
            {/* title */}
            <h3 className="text-xl font-bold mb-4">{data.topic1}</h3>

            {/* paragraph */}
            <p className="text-gray-700 mb-4">{data.description1}</p>

            {/* Second Title  */}
            <h4 className="text-lg font-medium mb-2">{data.topic2}</h4>

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

            </div>
          </div>

          {/* Related Products Section */}
          <div className="container mx-auto p-4">
            <div className="mt-8">
              <h3 className="text-2xl font-bold mb-4 ml-10">Related Products</h3>
              <div className="w-full gap-6">
                <HomepagePopular />
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}

export default ProductDetailsAdmin;
