import React, { useEffect, useState } from "react";
// import UserDashboardNav from './UserDashboardNav';
import UserDashboardNav from "../Components/UserDashboardNav";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useLocation } from "react-router-dom";
import classNames from "classnames";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function OrderTracking() {

  // checking logged user
  // const cookieget = Cookies.get("memberToken");

 

  const [status, setStatus] = useState();

  const location = useLocation();
  const details = location.state;
  const orderDetails = details.status;
  console.log(details);
  console.log(status);

  useEffect(() => {
    setStatus(orderDetails);
  }, []);

  // useState for keep the values of status

  // getting user from cookies
  const cookieget = Cookies.get("memberToken");

  const decoded = jwtDecode(cookieget);
  console.log(decoded);

  const Email = decoded.email;
  console.log(Email);

  let username = '';

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    if (decoded.given_name) {
       username = decoded.given_name
    }else{

      username = decoded.username || '';
    }
  
}
  const [orders, setOrders] = useState([]);

// get order
  useEffect(() => {
    axios
      .get(`https://backend.spkstore.lk/order/getOrder/${Email}`)
      .then((Response) => {
        console.log(Response.data.data);
        setOrders(Response.data.data);
      });
  }, []);

  // to change style need to get style
  const getStatusClasses = (currentStage) => {
    const stages = ["pending", "confirmed", "shipped", "delivered"];
    const currentIndex = stages.indexOf(status);
    const stageIndex = stages.indexOf(currentStage);
    const isActive = stageIndex <= currentIndex;
    return classNames({
      "bg-red-500 text-white": isActive && currentStage === "pending",
      "bg-yellow-500 text-white": isActive && currentStage === "confirmed",
      "bg-blue-500 text-white": isActive && currentStage === "shipped",
      "bg-green-500 text-white": isActive && currentStage === "delivered",
      "bg-gray-300 text-white": !isActive,
    });
  };

  // Determine the border color based on the status
  const getBorderColor = (currentStage) => {
    const stages = ["pending", "confirmed", "shipped", "delivered"];
    const currentIndex = stages.indexOf(status);
    const stageIndex = stages.indexOf(currentStage);
    const isActive = stageIndex <= currentIndex;
    return isActive ? "border-red-500" : "border-gray-300";
  };

  return (

    <div>

    <Navbar data={username}/>

    <div className="min-h-screen  flex">
      {/* Sidebar */}

      <UserDashboardNav />

      {/* Main Content */}
      <div className="w-3/4 p-8 mt-10 ">
      
        <div
          className="bg-white p-8 rounded-lg shadow-lg border border-gray-300 "
          style={{
            border: "1px solid black",
            borderRadius: "8px",
            width: "1050px",
            height: "550px",
          }}
        >
          {/* Head Title */}
          <div className="mb-6 ">
            <h2 className="text-2xl font-bold text-red-500">
              Track Your Order
            </h2>
          </div>

          {/* Combined Order, Shipping, Delivery Information */}
          <div
            className=" p-6 rounded-lg shadow-md mb-6"
            style={{ height: "400px", backgroundColor: "#F3F3F3" }}
          >
            {/* Order Information */}
            <div className="flex justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold flex items-center">
                  Order Information{" "}
                  <span className="ml-2">
                    <img src="/images/orderinfo.png" alt="icon" />
                  </span>
                </h3>

                <div className="mt-4">
                  <p
                    className="font-semibold"
                    style={{ color: "#707070", fontSize: "17px" }}
                  >
                    Order number:{" "}
                    <span
                      className="font-semibold"
                      style={{ marginLeft: "30px", color: "black" }}
                    >
                      {details.orderNo}
                    </span>
                  </p>

                  <p
                    className="font-semibold"
                    style={{ color: "#707070", fontSize: "17px" }}
                  >
                    Total:{" "}
                    <span
                      className="font-semibold"
                      style={{ marginLeft: "100px", color: "black" }}
                    >
                      LKR {details.orderTotal}.00
                    </span>
                  </p>
                </div>
              </div>

              {/* Shipping Details */}
              <div>
                <h4 className="text-lg font-bold">Shipping Details</h4>
                <div className="mt-1">
                  <p className="font-semibold">
                    {details.firstName} {details.lastName}
                  </p>
                  <p className="font-semibold">{details.shippingAddress}</p>
                  <p className="font-semibold">{details.contactNumber}</p>
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="mb-6" style={{ marginTop: "40px" }}>
              <h3 className="text-xl font-bold flex items-center">
                Deliver Information{" "}
                <span className="ml-2">
                <img src="/images/shipped.png" alt="icon" className="w-9 h-9" />
                </span>
              </h3>

              <div className="flex items-center justify-between mt-4">
                {/* {/  * processing Order section   */}
                <div className="flex flex-col items-center space-y-2">
                  <span
                    className={`p-2 text-white w-10 h-10 rounded-full flex items-center justify-center ${getStatusClasses(
                      "pending"
                    )}`}
                  >
                    ✔
                  </span>

                  <span className="font-semibold">Processing Order</span>
                </div>

                {/* processing Order Line */}
                <div
                  className={`flex-grow border-t-4 ${getBorderColor(
                    "pending"
                  )}`}
                  style={{ marginTop: "-8px", width: "16px" }}
                ></div>

                {/* confirmed section */}
                <div className="flex flex-col items-center space-y-2">
                  <span
                    className={`p-2 text-white w-10 h-10 rounded-full flex items-center justify-center ${getStatusClasses(
                      "confirmed"
                    )}`}
                  >
                    ✔
                  </span>

                  <span className="font-semibold">Confirmed</span>
                </div>

                {/* confirmed section line */}
                <div
                  className={`flex-grow border-t-4 ${getBorderColor(
                    "confirmed"
                  )}`}
                  style={{ marginTop: "-8px", width: "16px" }}
                ></div>

                {/* Out of delivery section */}
                <div className="flex flex-col items-center space-y-2">
                  <span
                    className={`p-2 text-white w-10 h-10 rounded-full flex items-center justify-center ${getStatusClasses(
                      "confirmed"
                    )}`}
                  >
                    {" "}
                    ✔
                  </span>

                  <span className="font-semibold">Shipped</span>
                </div>

                {/* Out of section line */}
                <div
                  className={`flex-grow border-t-4 ${getBorderColor(
                    "confirmed"
                  )}`}
                  style={{ marginTop: "-8px", width: "16px" }}
                ></div>

                {/* Delivered section */}
                <div className="flex flex-col items-center space-y-2">
                  <span
                    className={`p-2 text-white w-10 h-10 rounded-full flex items-center justify-center ${getStatusClasses(
                      "delivered"
                    )}`}
                  >
                    {" "}
                    ✔
                  </span>

                  <span className="font-semibold">Dellivered</span>
                </div>
              </div>
            </div>

            {/* Track Order Link */}
            <div style={{ marginTop: "50px" }}>
              <h4 className="text-lg font-bold">
                You can track Your Order Via
              </h4>
              <a href="#" className="text-blue-500 underline">
                Lorem ipsum dolor sit amet consectetur ipsum dolor sit amet
                consectetur.
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>

    </div>
  );
}

export default OrderTracking;
