import React from "react";
import ProductCard from "../Components/ProductCard";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Components/Navbar";
import HomepagePopular from "../Components/HomepagePopular";

const OrderSuccess = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;
  console.log(data);

  const totalAmount = data.orderTotal + data.deliveryCost;

  // get the logged user details
  const cookieget = Cookies.get("memberToken");

  let decoded = "";

  if (cookieget) {
    decoded = jwtDecode(cookieget);
    console.log(decoded);
  }

  let username = "";

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    username = decoded.username || "";
  }

  const handleTrack = () => {
    if (decoded) {
      navigate("/track");
    } else {
      navigate("https://www.google.com/");
    }
  };

  return (
    <div>
      <Navbar data={username} />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="text-center">
          <div className="flex justify-start items-center text-[#F66A74] text-3xl font-semibold space-x-2 mx-4 sm:mx-6 lg:mx-0">
            <h1 className="flex items-center flex-wrap text-center">
              {/* Circle with tick mark */}
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  color: "#F66A74", // Set tick mark color
                  fontSize: "24px",
                  marginRight: "10px",
                  border: "2px solid #F66A74", // Border with the same color
                }}
              >
                ✓
              </div>
              <span className="text-base sm:text-xl md:text-2xl">
                YOUR ORDER WAS PLACED SUCCESSFULLY
              </span>
            </h1>
          </div>

          <p className="mt-0 text-sm md:text-base lg:text-md font-semibold text-[#757575] mx-4 md:mx-6 lg:mx-0 text-left">
            Check your email for your order confirmation.
          </p>
          <p
            className="mt-0 text-md font-semibold float-left"
            style={{ color: "#757575" }}
          >
            <button onClick={handleTrack}>Track your order</button>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h2 className="text-2xl font-bold">Confirmation</h2>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Order information</h3>

              <div className="flex items-center space-x-2">
                <div style={{ paddingLeft: "350px", marginTop: "-40px" }}>
                  {" "}
                  {/* Adjust the margin value as needed */}
                  <p style={{ color: "#707070" }}>
                    <strong>Time placed:</strong>{" "}
                    <span style={{ marginLeft: "33px" }}>{}</span>
                  </p>
                  <p style={{ color: "#707070" }}>
                    <strong>Order number:</strong>{" "}
                    <span style={{ marginLeft: "16px" }}>{data.orderNo}</span>
                  </p>
                  <p style={{ color: "#707070" }}>
                    <strong>Total:</strong>{" "}
                    <span style={{ marginLeft: "86px" }}>
                      LKR {data.orderTotal}.00
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold">Shipping details</h3>

              <div style={{ marginBottom: "3px" }}>
                {" "}
                {/* Adjust the negative margin as needed */}
                <p>{data.firstName}</p>
                <p>
                  {data.nearestCity}, {data.district}
                </p>
                <p>{data.shippingAddress}, Sri Lanka</p>
                <p>{data.contactNumber}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4" style={{ marginTop: "60px" }}>
            <h3 className="text-xl font-bold">Payment information</h3>

            <div className="mt-2 mr-3">
              {/* Item cost */}
              <div className="flex justify-between">
                <span>
                  Items{" "}
                  {data.products && data.products.length > 0 ? (
                    data.products
                      .filter((prod) => prod && prod.productId)
                      .map((prod, index, array) => (
                        <span key={index} className="mr-2">
                          {prod.itemName} ({prod.quantity})
                          {index < array.length - 1 && ", "}
                        </span>
                      ))
                  ) : (
                    <span>No items available</span>
                  )}
                </span>

                <span className="font-semibold">LKR {data.orderTotal}.00</span>
              </div>

              {/* Shipping fee */}
              <div className="flex justify-between mt-1">
                <span>Shipping Fee</span>
                <span className="font-semibold">
                  LKR {data.deliveryCost}.00
                </span>
              </div>
              {/* Saved amount */}
              {/* <div className="flex justify-between mt-1">
                <span>Saved</span>
                <span className="font-semibold text-red-500">-LKR 700</span>
              </div> */}
              {/* Order total */}
              <div className="flex justify-between mt-1 border-t pt-4">
                <span>Order Total</span>
                <span className="font-semibold">LKR {totalAmount}.00</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Related Products</h2>
          <div className="w-full">
            <HomepagePopular />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderSuccess;
