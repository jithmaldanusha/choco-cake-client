import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

// import AdminNavbar from './AdminNavbar';

function AdminMyOrder() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("https://backend.spkstore.lk/order/getOrders").then((Response) => {
      console.log(Response);
      // Reverse the order of the fetched data so that newest orders are at the top
      setOrders(Response.data.data.reverse());
    });
  }, []);

  // Function to handle delete with confirmation
  const handleDelete = (orderId) => {
    // Display a confirmation dialog
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    // If the user confirmed, proceed with deletion
    if (isConfirmed) {
      axios
        .delete(`https://backend.spkstore.lk/order/deleteOrder/${orderId}`)
        .then(() => {
          setOrders(orders.filter((order) => order._id !== orderId));
        })
        .catch((error) => {
          console.error("There was an error deleting the order!", error);
        });
    }
  };

  console.log(orders);

  // Toggle status function
  // const handleToggle = (id, type) => {
  //   setOrders(orders.map(order =>
  //     order.id === id ? { ...order, [type]: !order[type] } : order
  //   ));
  // };

  return (
<div className="flex bg-red-300">
{/* Sidebar */}
      <aside style={{ width: "15rem" }} className="h-screen bg-red-300">
        {/* Calling the Navbar component */}
        <aside style={{ width: "15rem" }} className="h-screen">
          <div className="p-6">
            {/* company image */}
            <div className="flex flex-col items-center space-y-2">
              <img
                src="/images/spklogo.png"
                alt="SPK Store"
                style={{ width: "8rem", height: "8rem" }}
              />
            </div>

            <nav className="mt-10 space-y-2">
              <button
                className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
                onClick={() => (window.location.href = "/dashboard")}
              >
                <img
                    src="/images/dashboardiconblack.png"
                  alt="Dashboard"
                  className="h-6 w-6"
                />
                <span className="font-semibold">Dashboard</span>
              </button>
              <button
                className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
                onClick={() => (window.location.href = "/admin")}
              >
                <img
                  src="/images/Addimage.png"
                  alt="Addimage"
                  className="h-6 w-6"
                />
                <span className="font-semibold">Add Product</span>
              </button>
              <button
                className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
                onClick={() => (window.location.href = "/adminOrder")}
              >
                <img
                  src="/images/shoppingBag.png"
                  alt="ShoppingBag"
                  className="h-6 w-6"
                />
                <span className="font-semibold">My Order</span>
              </button>
            </nav>
          </div>
        </aside>
        {/* <AdminNavbar /> */}
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 bg-white">
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-3">
            <img
              src="https://s3-alpha-sig.figma.com/img/ab45/5ac8/d3acc971191752ce2c32265f2dcb34bc?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HrJQ1uVLXL1jCl9zwgjICytFB9KkVmrJpX4T3giiieEgc4wjN2eGRDzfJBAjv-oUMyAUrKjnV0p-hAQsE7nMikS74SH~Fl8YUfON~auA6aXw1V4GXBLtzSV1087-NgxiQw4fnabkicNxC1De2YYcXURE~fEKtROPbChwREfvvBmymxtsON0FZ~WdwgaHMOWgHAa~mWj1NNDaAYiSVDgxlYZsVIZoS7PObgMiwLCEmWJDIeiXN7vre7vkQadesd6EF-4Su2AQibvkcgsJuANGmoMMRGC1fcT8nlbeQVNekTQWoCi9KtbY7Rg0hHl0mpNSWX89bX9Qj2Hf92hrOVtQtw__"
              alt="notification"
              className="w-6 h-6"
            />
          </div>
          <div className="flex items-center space-x-2">
            <img
              src="/images/Adminlogo.png"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <div>
              <span className="font-bold block">Admin</span>
              <span className="text-sm text-gray-900 block">Welcome</span>
            </div>
          </div>
        </header>

        <div
          className="p-6 rounded-md shadow-md"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2">Order Info</th>
                <th className="py-2">Order Address</th>
                <th className="py-2">Payment Method</th>
                <th className="py-2">Price</th>
                <th className="py-2">Stock</th>
                <th className="py-2">Status</th>
                <th className="py-2">View</th>
                <th className="py-2">Delete</th>
                {/* <th className="py-2">Delivered</th> */}
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr>
                  <td className="py-2">{order.orderNo}</td>
                  <td className="py-2">{order.shippingAddress}</td>
                  <td className="py-2">{order.paymentMethod}</td>
                  <td className="py-2">{order.orderTotal}</td>
                  <td className="py-2">{order.itemCount}</td>

                  {/* order status section */}
                  <td className="py-2">
                    <span
                      style={{
                        color:
                          order.status === "confirmed"
                            ? "green"
                            : order.status === "delivered"
                            ? "purple"
                            : "red",
                        fontWeight: "bold",
                      }}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="py-2 text-red-500 cursor-pointer">
                    <button
                      onClick={() => {
                        navigate("/viewAll", { state: order });
                      }}
                    >
                      View
                    </button>
                  </td>
                  <td className="py-2 text-red-500 cursor-pointer">
                    {" "}
                    <button onClick={() => handleDelete(order._id)}>
                      Delete
                    </button>
                  </td>
                  {/* <td className="py-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={order.delivered}
                        onChange={() => handleToggle(order.id, 'delivered')}
                        className="sr-only peer"
                      />
                      <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 peer-focus:ring-transparent rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                    </label>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdminMyOrder;
