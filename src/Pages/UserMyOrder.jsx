import React, { useEffect, useState } from "react";
// import UserMyOrderCard from './UserMyOrderCard'; // Adjust the path as needed
import UserDashboardNav from "../Components/UserDashboardNav";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

function UserMyOrder() {
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
      username = decoded.given_name;
    } else {
      username = decoded.username || "";
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

  console.log(orders);

  return (
    <div className="" >
      <Navbar data={username} />

      <div className="min-h-screen bg-white-100 flex">
        {/* Sidebar */}

        <UserDashboardNav />

        {/* Main Content */}
        <div className="w-3/4 p-8 mt-10">
          <div
            className="bg-white p-6 rounded-lg shadow-lg "
            style={{ border: "1px solid black", borderRadius: "8px", background: "" }}
          >
            <h2 className="text-2xl font-bold text-red-500">My Orders</h2>

            {/* Order List */}
            {/* Order card 1 */}
            <div className="mt-6 max-h-[400px] overflow-y-auto space-y-4 ">
              {/* <UserMyOrderCard /> */}

              {orders.reverse().map((order) =>
                order.products
                  .filter((prod) => prod && prod.itemID)
                  .map((prod) => {
                    console.log(prod);

                    return (
                      <div
                      key={`${order.id}-${prod.itemID}`} // Adding a unique key
                      className="rounded-lg flex flex-col bg-[#F3F3F3] m-2 shadow-md p-4"
                    >
                      <p className="text-gray-900 text-xs font-medium mb-2">
                        Order No {order.orderNo}
                      </p>
                    
                      <div className="flex items-start space-x-4 mt-5">
                        <img
                          src="images/order.png"
                          alt="Product"
                          className="w-20 h-20 object-cover"
                        />
                        
                        <div className="flex-1">
                          <p className="text-xl font-semibold">{prod.itemName}</p>
                          <p className="text-gray-600">
                            LKR {prod.priceAfterDiscount}.00{" "}
                            <span className="text-black">({prod.quantity})</span>
                          </p>
                        </div>
                    
                        <div className="flex flex-col justify-between items-end">
                          <p className="">
                            <span className="font-thin tracking-wider text-lg">Total :- </span>
                            <span className="font-semibold text-lg ml-2">
                            LKR  {parseInt(prod.quantity) * parseInt(prod.priceAfterDiscount)}.00/=
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                    );
                  })
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default UserMyOrder;
