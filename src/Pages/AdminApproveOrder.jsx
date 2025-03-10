import React, { useEffect, useState } from "react";
// import AdminNavbar from './AdminNavbar';
import jsPDF from "jspdf";
import { useLocation } from "react-router-dom";
import axios from "axios";

function AdminApproveOrder() {
  // get values from state of navigation of pages
  const location = useLocation();

  const data = location.state;

  console.log(data);

  const imageUrl = "/images/slip.png"; // Replace with the actual image URL

  // State to track if the right button is disabled
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  //state to the approve button
  const [isApproved, setIsApproved] = useState(false);

  //state to the refuse button
  const [isRefused, setIsRefused] = useState(false);

  // State to hold order details
  const [orderDetails, setOrderDetails] = useState(null);
  const [prodDetails, setprodDetails] = useState();

  // State to hold the input value
  const [inputValue, setInputValue] = useState("");

  // State to hold the saved value when button is clicked
  const [savedValue, setSavedValue] = useState("");

  // for check the error in track id
  const [error, setError] = useState("");

  let count = 0;
  useEffect(() => {
    data.products
      .filter((prod) => prod && prod.itemID)

      .map((prod) => {
        count += 1;
      });
  });

  // trackId input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // const qts = prodDetails.length
  console.log(count);

  const downloadPDF = () => {
    const pdfDoc = new jsPDF();
  
    // Ensure data exists to avoid any undefined errors
    if (!data || !data.products || data.products.length === 0) {
      console.error("No product data available to generate PDF.");
      return;
    }
  
    // Set font size for the document
    pdfDoc.setFontSize(12);
  
    // Add Order Information
    pdfDoc.text("Order Information", 10, 10);
    pdfDoc.text(`Order ID: ${data?.orderNo || "N/A"}`, 10, 20);
    pdfDoc.text(`Total: LKR ${data?.orderTotal || "0"}.00`, 10, 30);
  
    // Add Product Details
    const productIds = data.products.map(prod => prod.itemID).join(", ") || "N/A";
    const productNames = data.products.map(prod => prod.itemName).join(", ") || "N/A";
    const stock = count || "N/A";
  
    pdfDoc.text("Product Details", 10, 50);
    pdfDoc.text(`Product ID(s): ${productIds}`, 10, 60);
    pdfDoc.text(`Stock: ${stock}`, 10, 70);
    pdfDoc.text(`Product Name(s): ${productNames}`, 10, 80);
  
    // Add Payment Details
    pdfDoc.text("Payment Details", 10, 100);
    pdfDoc.text(`Payment Method: ${data?.paymentMethod || "N/A"}`, 10, 110);
  
    // Add User Details
    pdfDoc.text("User Details", 10, 130);
    pdfDoc.text(`User Name: ${data?.firstName || "N/A"} ${data?.lastName || ""}`, 10, 140);
    pdfDoc.text(`Contact Number: ${data?.contactNumber || "N/A"}`, 10, 150);
    pdfDoc.text(`Shipping Address: ${data?.shippingAddress || "N/A"}`, 10, 160);
  
    // Save the PDF
    pdfDoc.save("order-details.pdf");
  };
  
  
  
  






  const [myqty, setMyQty] = useState([]);
  const [originalQty, setOriginalQty] = useState("");
  const [products, setProducts] = useState([]);

  const handleApproved = (value, id) => {
    if (value === "accept") {
      axios
        .patch(`https://backend.spkstore.lk/order/updateOrder/${id}`, {
          status: "confirmed",
        })
        .then((Response) => {
          console.log(Response);
        });
    } else if (value === "refused") {
      axios
        .patch(`https://backend.spkstore.lk/order/updateOrder/${id}`, {
          status: "refused",
        })
        .then((Response) => {
          console.log(Response);
        });
    } else if (value === "delivered") {
      let newval;
      // =========================================================

      axios
        .get(`https://backend.spkstore.lk/order/getOrderQty/${id}`)
        .then((Response) => {
          console.log(Response.data);
          console.log(Response.data.data.products);
          const products = Response.data.data.products;
          // setMyQty(Response.data.data.products);

          // Create an array of promises for each axios.get request
          const requests = products.filter(item => item.itemID != null).map((product) =>{

            let myid = product.itemID
            axios
              .get(
                `https://backend.spkstore.lk/product/getSingleProduct/${myid}`
              )
              .then((secondResponse) => {
                // Handle the response from the second request
                
                
                const dataFromSecond = secondResponse.data.data;
                console.log(dataFromSecond);
                // Prepare the data to update the product
                const updatedProductData = {
                  ...product,
                  // Modify this as needed
                  quantity : parseInt(dataFromSecond.quantity) - parseInt(product.quantity)
                };

                console.log(updatedProductData);
                
                // Return the axios.patch promise
                return axios.patch(
                  `https://backend.spkstore.lk/product/updateSingleProduct/${myid}`, updatedProductData)
                  .then(patchResponse => {
                    // After updating the product, update the order
                    // const orderId = product.orderId; // Assuming there's an orderId in the product
                    return axios.patch(`https://backend.spkstore.lk/order/updateOrder/${id}`, {
                      status: "delivered",
                      // updatedProductData // Send any relevant data needed for the order update
                    });
                  });
              })
            }


          );

          // Use Promise.all to wait for all requests to complete
          return Promise.all(requests);
        })
        .then((responses) => {
          // Handle all the responses from the patch requests
          responses.forEach((response) => {
            console.log("Updated product:", response);
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      // console.log(myqty);

      // =============================================

      // myqty
      //   .filter((item) => item.itemID != null)
      //   .forEach((res) => {
      //     const nid = res.itemID;
      //     axios
      //       .get(`https://backend.spkstore.lk/product/getSingleProduct/${nid}`)
      //       .then((Response) => {
      //         console.log(Response.data);
      //         setOriginalQty(Response.data.quantity);
      //       });

      //     newval = parseInt(originalQty) - parseInt(res.quantity);
      //     console.log(newval);

      //     let ids = res.itemId;

      //     axios
      //       .patch(`https://backend.spkstore.lk/product/updateSingleProduct/${ids}`, {
      //         quantity: newval,
      //       })
      //       .then((Response) => {
      //         console.log(Response);
      //       });
      //   });

      // axios
      //   .patch(`https://backend.spkstore.lk/order/updateOrder/${id}`, {
      //     status: "delivered",
      //   })
      //   .then((Response) => {
      //     console.log(Response);
      //   });
    }
  };

  useEffect(() => {
    if (data.status == "confirmed" || data.status == "delivered") {
      setIsRightButtonDisabled(true);
    }
  });

  const buttonClicked = async () => {
    const value = "accept";
    const id = data._id;

    if (inputValue.trim() === "") {
      setError("Field cannot be empty");
    } else {
      setInputValue(inputValue);
      setError("");
      // Proceed with form submission logic
      console.log("Form submitted with:", inputValue);
    }

    const vals = {
      email: data.email,
      inputValue: inputValue,
      contactNumber: data.contactNumber,
      paymentMethod: data.paymentMethod,
      email: data.email,
      deliveryCost: data.deliveryCost,
      orderTotal: data.orderTotal,
      firstName: data.firstName,
      lastName: data.lastName,
      shippingAddress: data.shippingAddress,
      status: data.status,
      products: data.products,
    };

    // const queryString = new URLSearchParams(vals).toString();

    try {
      const response = await axios.post(
        `https://backend.spkstore.lk/send-email`, vals
      );
      console.log(response.data); // Add this line
      alert(response.data.message); // Alert the response message
      setIsApproved(true); // Change button color on success
    } catch (error) {
      console.error("Error sending request:", error);
      alert("Failed to send email.");
    }
    handleApproved(value, id);
  };

  const buttonClickedRefused = async () => {
    const value = "refused";
    const id = data._id;
    const vals = {
      email: data.email,
    };

   
   
   
    try {
      const response = await axios.post("https://backend.spkstore.lk/refuse-email",vals);
      alert(response.data.message);
      setIsRefused(true);
    } catch (error) {
      console.error("Error sending refusal email:", error);
      alert("Failed to send refusal email.");
    }

    handleApproved(value, id);
  };
  const buttonClickedDelivered = () => {
    const value = "delivered";
    const id = data._id;
    handleApproved(value, id);
  };

  return (
    <div className="flex bg-red-300" >
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
            {/* <img
              src="https://s3-alpha-sig.figma.com/img/ab45/5ac8/d3acc971191752ce2c32265f2dcb34bc?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HrJQ1uVLXL1jCl9zwgjICytFB9KkVmrJpX4T3giiieEgc4wjN2eGRDzfJBAjv-oUMyAUrKjnV0p-hAQsE7nMikS74SH~Fl8YUfON~auA6aXw1V4GXBLtzSV1087-NgxiQw4fnabkicNxC1De2YYcXURE~fEKtROPbChwREfvvBmymxtsON0FZ~WdwgaHMOWgHAa~mWj1NNDaAYiSVDgxlYZsVIZoS7PObgMiwLCEmWJDIeiXN7vre7vkQadesd6EF-4Su2AQibvkcgsJuANGmoMMRGC1fcT8nlbeQVNekTQWoCi9KtbY7Rg0hHl0mpNSWX89bX9Qj2Hf92hrOVtQtw__"
              alt="notification"
              className="w-6 h-6"
            /> */}
          </div>
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
        </header>

        <div className="p-8 rounded-md shadow-lg bg-white">
          {/* Order Information */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Order Information{" "}
              <span role="img" aria-label="bag" className="ml-2">
                🛍️
              </span>
            </h2>
            <div className="flex mb-3">
              <p className="w-48 font-semibold">Order id:</p>
              <p>{data.orderNo}</p>
            </div>
            <div className="flex mb-3">
              <p className="w-48 font-semibold">Total:</p>
              <p>LKR {data.orderTotal}.00</p>
            </div>
            <div className="flex mb-3">
              <p className="w-48 font-semibold">Stock:</p>
              <p>{data.itemCount}</p>
            </div>
            <div className="space-y-4">
              <div className="flex">
                <p className="w-48 font-semibold">Product id/ids:</p>
                {data.products
                  .filter((prod) => prod && prod.itemID)
                  .map((prod, index, array) => (
                    <React.Fragment key={prod.itemID}>
                      <p style={{ display: "inline", marginRight: "0.5rem" }}>
                        {prod.itemID}
                        {index < array.length - 1 ? "," : ""}{" "}
                        {/* Add a comma after each itemID except the last one */}
                      </p>
                    </React.Fragment>
                  ))}
              </div>

              <div className="flex">
                <p className="w-48 font-semibold">Product name/names:</p>

                {data.products
                  .filter((prod) => prod && prod.itemID)
                  .map((prod, index, array) => (
                    <p key={index} className="mr-2">
                      {prod.itemName} ({prod.quantity})
                      {index < array.length - 1 && ", "}{" "}
                      {/* Add comma after all but the last item */}
                   </p>
                  ))}
              </div>
            </div>
          </section>

          {/* Payment Details */}
          <section className="mb-8">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              Payment Details
            </h3>
            <div className="space-y-4">
              <div className="flex">
                <p className="w-48 font-semibold">Payment method:</p>
                <p>{data.paymentMethod}</p>
              </div>
            </div>
          </section>

          {/* User Details */}
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              User Details
            </h2>
            <div className="space-y-4">
              <div className="flex">
                <p className="w-48 font-semibold">User name:</p>
                <p>
                  {data.firstName} {data.lastName}
                </p>
              </div>
              <div className="flex">
                <p className="w-48 font-semibold">Contact number:</p>
                <p>{data.contactNumber}</p>
              </div>
              <div className="flex">
                <p className="w-48 font-semibold">User address:</p>
                <p>{data.shippingAddress}</p>
              </div>
            </div>
          </section>
          {/* track id section */}
          <section className="mt-8">
            <h3 className="text-xl font-bold mb-4 border-b pb-2">
              Track Your Order
            </h3>
            <div className="space-y-4">
              <div className="flex">
                <label htmlFor="trackId" className="w-48 font-semibold">
                  Track ID:
                </label>
                <input
                  id="trackId"
                  type="text"
                  className="border px-3 py-2 rounded-md w-half"
                  placeholder="Enter Track ID"
                  value={inputValue}
                  onChange={handleInputChange}
                />
              </div>

              {/* track id submit button */}
              {/* <button
                    className="bg-red-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
                    onClick={() => {
                    }}
                  >
                    Submit
                  </button> */}
            </div>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </section>

           {/* confirm button */}
           {/* <button
              className={`text-black bg-pink font-semibold py-2 px-6 rounded shadow-lg transition duration-300 `}
            >
              Confirm
            </button> */}

          <div className="flex space-x-4 mt-8 justify-end">
            <button
              className={`text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300 ${
                isApproved
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-red-500 hover:bg-red-700"
              }`}
              onClick={buttonClicked}
            >
              Approve
            </button>



           




            <button
              className={`text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300 ${
                isRefused
                  ? "bg-blue-700 hover:bg-blue-800"
                  : "bg-red-500 hover:bg-red-700"
              }`}
              // className=" font-semibold py-2 px-6 rounded shadow-lg"
              onClick={buttonClickedRefused}
              disabled={isRightButtonDisabled}
            >
              Refuse
            </button>

            <button>
              <a
                href={data.paymentReceipt}
                download="slip.png"
                className="bg-red-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
              >
                Download slip
              </a>
            </button>
            <button
              onClick={downloadPDF}
              className="bg-red-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
            >
              Download PDF
            </button>

            <button
              onClick={buttonClickedDelivered}
              className="bg-red-500 hover:bg-green-700 text-white font-semibold py-2 px-6 rounded shadow-lg transition duration-300"
            >
              Delivered
            </button>
          </div>
          {/* Track Your Order section */}
        </div>
      </main>
    </div>
  );
}

export default AdminApproveOrder;
