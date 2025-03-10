import React, {useState, useEffect} from 'react'
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import UserDashboardNav from "../Components/UserDashboardNav";


function OrdersforTracking() {
    const navigate = useNavigate();

  // useState for keep the values of status
  const [orders, setOrders] = useState([]);
  // const [products, setProducts] = useState([]);

  // getting user from cookies
  const cookieget = Cookies.get("memberToken");

  const decoded = jwtDecode(cookieget);
  console.log(decoded);

  const Email = decoded.email;
  console.log(Email);

  let username = "";

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    if (decoded.given_name) {
       username = decoded.given_name
    }else{

      username = decoded.username || '';
    }
  
}

  useEffect(() => {
    axios
      .get(`https://backend.spkstore.lk/order/getOrder/${Email}`)
      .then((Response) => {
        console.log(Response.data.data);
        setOrders(Response.data.data);
      });
  }, []);
  return (
    <div>
        <Navbar data={username}/>
        <div>
        <div className="min-h-screen bg-white-100 flex">
        {/* Sidebar */}

        <UserDashboardNav />

        {/* Main Content */}
        <div className="w-3/4 p-8 mt-10">
          <div
            className="bg-white p-6 rounded-lg shadow-lg "
            style={{ border: "1px solid black", borderRadius: "8px" }}
          >
            <h2 className="text-2xl font-bold text-red-500">My Orders</h2>

            {/* Order List */}
            {/* Order card 1 */}
            <div className="mt-6 max-h-[400px] overflow-y-auto space-y-4 ">
              {/* <UserMyOrderCard /> */}



              {orders.slice().reverse().map((order) => (
              <button className="w-full" onClick={() => {
                  navigate("/track", {state:order});

              }}>
                <div className="p-4 rounded-lg flex justify-between items-center bg-[#F3F3F3] h-[150px] m-2 shadow-md">
                  <div className="relative flex items-center space-x-4 w-full  m-2">
                    <p className="absolute top-[-12px] left-0 text-gray-900 text-md font-medium max-w-2xl">
                      Order No - {order.orderNo}
                    </p>
                    <p className="absolute mt-10 left-0 text-gray-900 text-sm font-medium max-w-2xl"  style={{ color: "#F66A74" }}>
                      Payment Method - {order.paymentMethod}
                    </p>

                    {/* <img
                      src="images/Order1.png"
                      alt="Product"
                      className="w-17 h-17 mt-6"
                    /> */}

                    {/* {order.products.map((prod) => {
                      return (
                        <div className="border border-red-500">
                          <p className="text-xl font-semibold ">
                            {prod.productId}
                          </p>
                          <p className="text-gray-600">
                            LKR {prod.price}.00{" "}
                            <span className="text-black">(x1)</span>
                          </p>
                        </div>
                      );
                    })} */}
                  </div>

                 
                    <div className="flex items-center space-x-2 mb-3">
                     
                     {/* product quantity */}
                      {/* <p
                        className="text-black font-semibold flex"
                        style={{ marginTop: "100px" }}
                      >
                        <p className='mr-2'>Qty </p>
                        {order.products.length}
                      </p> */}

                      <p
                        className="text-lg font-semibold"
                        style={{ marginTop: "100px", marginLeft: "42px" }}
                      >
                        Total LKR {order.orderTotal}.00
                      </p>
                    </div>
                  
                </div>
              </button>
            ))}


            </div>
          </div>
        </div>
      </div>
        </div>
        <Footer/>
    </div>
  )
}

export default OrdersforTracking