import React, { useEffect, useState, useContext } from "react";
// import Paynow from "../Components/Paynow";
import ShipTo from "../Components/ShipTo";
import { useLocation } from "react-router-dom";
import { MyContext } from "./MyContext";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Payhere from "./Payhere";
import { v4 as uuidv4 } from "uuid";


function Checkout() {

  // checking logged user
  const cookieget = Cookies.get("memberToken");
  const [error, setError] = useState("");
  let username = "";

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    username = decoded.username || "";
  }

  // quantity values
  const qty = useSelector((state) => state.myReducerQty.value); //shipto values comes here
  console.log(qty);

  // access store values here
  const value = useSelector((state) => state.myReducer.value); //shipto values comes here
  const prods = useSelector((state) => state.product.value);
  // useState for context API to pass data to another component
  const [text, setText] = useState("");
  console.log(value);
  console.log(prods);

  // paynow component code
  // state for show payhere component
  const [showChild, setShowChild] = useState(false);

  // useState for keep payment method type
  const [payMethod, setpayMethod] = useState("");

  // State to manage the selected payment method
  const [selectedPayment, setSelectedPayment] = useState("");

  // State to show/hide the upload section
  const [uploadSectionVisible, setUploadSectionVisible] = useState(false);

  // State to handle the uploaded file preview
  const [uploadedFile, setUploadedFile] = useState(null);

  const [checkoutData, setCheckoutData] = useState({});

  // Handler to toggle the visibility of the upload section
  const handleUploadClick = () => {
    setUploadSectionVisible(true);
  };

  const [File, setFile] = useState("");

  // STATE FOR ORDE VALUE GENERATE
  // const [orderValue, setOrderValue] = useState(0);

  const formData = new FormData();
  // Handler to manage file selection and preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
    console.log(file);
  };

  // button click for payhere
  const handleButtonClick = () => {
    setShowChild(true); // Show the ChildComponent when the button is clicked
  };

  // Handler to manage payment method selection and associated UI changes
  const handlePaymentChange = (paymentType) => {
    setpayMethod(paymentType);

    if (selectedPayment === paymentType) {
      // Toggle visibility of the upload section if the same payment type is selected
      setUploadSectionVisible(!uploadSectionVisible);
      if (!uploadSectionVisible) {
        setSelectedPayment(""); // Reset selection if toggling off
      }
    } else {
      // Show the upload section for a new payment type
      setSelectedPayment(paymentType);
      setUploadSectionVisible(false);
    }
  };

  console.log(payMethod);

  // navigate
  const navigate = useNavigate();

  const location = useLocation();

  let val = 0;
  let itemsDetails = [];
  let Price = 0;
  let totalPrice = 0;
  let itemsCount = 0;
  let singledata = [];

  // location.state comes form the cart page

  if (location.state) {
    // cart values
    val = location.state.totalPrice;
    // cart values
    itemsDetails = location.state.items;

    itemsCount = itemsDetails.length;
    totalPrice = val;
    console.log(itemsDetails);
  } else {
    // one selected item details
    // got the details form redux prods variable
    console.log(prods);

    Price = prods.priceAfterDiscount;

    if (typeof Price === "string") {
      totalPrice = parseInt(Price) * qty;
    } else {
      totalPrice = Price * qty;
    }
    itemsCount = 1;
  }

  // const handleOrderNumb = () =>{
  //   // Generate the order number
  //   const orderNumber = generateOrderNumber(orderValue);
  //   // Increment the value for the next order
  //   return orderNumber;
  // }

  // Functions to generate order number and send it to backend
  function generateOrderNumber() {
    const newId = uuidv4(); // Generate a new unique ID

    const min = 1; // Set your min value
    const max = 100; // Set your max value
    const random = Math.floor(Math.random() * (max - min + 1)) + min;

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0"); // months are 0-based
    const day = String(now.getDate()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;
    return `${formattedDate}${random}${newId}`;
  }

  let orderid = generateOrderNumber();

  console.log(totalPrice);

  // const deliverCost = 3500.0;

  //hushmithe
  let deliverCost = 0;
  let techcost=0;
  //====== deliver cost logic==============
  if (payMethod === "new-card") {
    techcost=(totalPrice*3)/100;
    deliverCost = 350.0 + techcost;


  } else if (payMethod === "bank-transfer") {
    deliverCost = 350.0;
  } else if (payMethod === "cod") {
    if (totalPrice < 10000 && totalPrice > 500) {
      deliverCost = 350.0;
    } else if (totalPrice < 50000 && totalPrice > 10000) {
      deliverCost = 500.0;
    } else if (totalPrice < 100000 && totalPrice > 50000) {
      deliverCost = 850.0;
    } else if (totalPrice < 1000000 && totalPrice > 100000) {
      deliverCost = 1000.0;
    }
  }

  // const itemsCount = 3;

  // Calculate total
  const orderTotal = totalPrice + deliverCost;
  useEffect(() => {
    setText(orderTotal);
  }, []);

  //  if cart values present goes here
  if (itemsDetails) {
    const itemProd = JSON.stringify(itemsDetails);
    formData.append("products", itemProd);

    console.log(itemProd);
  }

  // if items details array 0 means no values in cart measn goes to single product
  if (itemsDetails[0] == null) {
    singledata = prods;
    console.log(singledata);

    console.log(singledata);

    singledata.quantity = qty;

    const jsonString = JSON.stringify(singledata);
    console.log(jsonString);

    formData.append("products", jsonString);
  }

  formData.append("orderNo", orderid);
  // formData.append('orderNo', "001")
  formData.append("firstName", value.firstName);

  // formData.append('products', prods)
  formData.append("lastName", value.lastName);
  formData.append("contactNumber", value.contactNumber);
  formData.append("email", value.email);
  formData.append("shippingAddress", value.shippingAddress);
  formData.append("nearestCity", value.nearestCity);
  formData.append("district", value.district);
  formData.append("paymentMethod", payMethod);
  formData.append("orderTotal", orderTotal);
  formData.append("itemCount", itemsCount);
  formData.append("deliveryCost", deliverCost);
  formData.append("paymentReceipt", File);

  // Verify formData content
  for (let [key, value] of formData.entries()) {
    console.log(`${key}: ${value}`);
  }

  const dataToOrder = {
    orderNo: orderid,
    products: [
      {
        productId: "0001",
        quantity: prods.quantity,
        price: prods.priceAfterDiscount,
      },
    ],
    // userEmail: decoded.email,
    firstName: value.firstName,
    lastName: value.lastName,
    contactNumber: value.contactNumber,
    email: value.email,
    shippingAddress: value.shippingAddress,
    nearestCity: value.nearestCity,
    district: value.district,
    paymentMethod: payMethod,
    paymentReceipt: null,
    orderTotal: totalPrice,
    itemCount: itemsCount,
    deliveryCost: deliverCost,
  };

  // console.log(dataToOrder);

  const fname = value.firstName;
  const lname = value.lastName;
  const con = value.contactNumber;
  const mypay = payMethod;

  const handleConfirmPay = () => {
    console.log(fname, lname, con, mypay);

    if (!fname || !lname || !con || !mypay) {
      setError("Please fill in all required fields before confirm the order.");
      console.error(
        "Please fill in all required fields before confirm the order."
      );
      return; // Exit the function if validation fails
    }

    // Additional check for paymentReceipt
    if ((mypay === "bank-transfer" || mypay === "cod") && !File) {
      setError("Payment receipt cannot be empty for bank transfer or COD.");
      console.error(
        "Payment receipt cannot be empty for bank transfer or COD."
      );
      return; // Exit the function if validation fails
    }

    // Clear error if validation passes
    setError("");

    axios
      .post("https://backend.spkstore.lk/order/createOrder", formData)
      .then((response) => {
        console.log(response.data.data);
        console.log(typeof response.data.data);
        // If order is successfully created
        if (response.data) {
          let jsonString = JSON.stringify(response.data.data);
          let jsonObject = JSON.parse(jsonString);
          console.log(jsonObject);

          // setCheckoutData(jsonObject);
          // Send email notification
          sendOrderNotification(jsonObject);
 
          // Navigate to the success page
          navigate("/success", { state: dataToOrder, replace: true });
        }
      })
      .catch((error) => {
        console.error("There was an error creating the order!", error);
        setError("There was an error creating the order. Please try again.");
      });
  };
  // const quant = value.quantity;
  console.log(checkoutData);

  // Function to send the order notification email
  const sendOrderNotification = (jsonObject) => {
    const emailData = {
      to: "contacspkstore@gmail.com",//admin's email
      subject: "New Order Received",
      message: `You have received a new order. Order No: ${orderid}. Total: LKR ${orderTotal}.`,
      prods: jsonObject,
    };

    axios
      .post("https://backend.spkstore.lk/notify-order", emailData)
      .then((response) => {
        console.log("Email sent successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
      });
  };

  return (
    <div>
      <Navbar data={username} />

      <div className="flex flex-col items-center align-middle max-w-full ">
        {/* main topic */}

        <div className="bg-[#F96969] py-8 px-8 mt-1 w-[110%] -ml-[10%] mx-auto">
          <h1 className="text-4xl font-semibold text-center text-white ml-20 mt-2">
            Checkout ({itemsCount} items)
            {/* Checkout */}
          </h1>
        </div>
        <div className="2xl:bg-white py-8 px-40 flex flex-col items-start">
          <div className="flex gap-x-1">
            {/* paynow section */}
            <MyContext.Provider value={{ text, setText }}>
              <div className="border-black rounded-md p-6  max-w-5xl mt-6">
                {/* <Paynow /> */}
                {/* paynow components render here */}

                <div className="p-4 mx-auto  w-[770px] -ml-[26px] rounded-md bg-gray-50">
                  {/* Title for payment options */}
                  <h2 className="text-lg font-bold mb-4">Pay with</h2>

                  {/* Horizontal line separator */}
                  <hr className="border-t border-gray-300 w-full my-2" />

                  <div className="space-y-4">
                    {/* Add new card section */}
                    <div className="flex flex-col">
                      <div className="flex items-center border-b pb-4 border-gray-300">
                        {/* Radio button for "Add new card" payment method */}
                        <input
                          type="radio"
                          name="payment"
                          id="new-card"
                          className="mr-4"
                          value="new-card"
                          style={{
                            borderColor: "#F96969",
                            accentColor: "#F96969",
                          }} // For modern browsers
                          onChange={() => handlePaymentChange("new-card")}
                        />

                        <label
                          htmlFor="new-card"
                          className="flex flex-col items-center space-y-2"
                        >
                          <span className="text-sm font-medium flex-1 text-left mr-48">
                            Add new card
                          </span>

                          <div className="flex space-x-2">
                            {/* Visa card image */}
                            <img
                              src="/images/Rectangle 887.png"
                              alt="Visa"
                              className="h-8"
                            />
                            {/* MasterCard image */}
                            <img
                              src="/images/mastercardx.png"
                              alt="MasterCard"
                              className="h-8"
                            />
                            {/* American Express image */}
                            <img
                              src="/images/american.png"
                              alt="Amex"
                              className="h-8"
                            />
                          </div>
                          
                        </label>
                        
                      </div>
                    
                  



                      {/* Section shown if "Add new card" is selected */}
                      {selectedPayment === "new-card" && (
                        <div className="p-4 mt-4 border border-gray-300 rounded-md">
                           <p className="mt-4 mb-4">
                      The <strong>total amount of the goods</strong>, <strong>delivery charges</strong>, and additionally 
                      <strong>3% of technical payment charges</strong> should be payed
                      </p>

                      <p className="mt-4 mb-4">
                      <strong>අනුමත භාණ්ඩ වල මුළු මිල,</strong> <strong>බෙදාහැරීමේ ගාස්තු,</strong> හා 
                      <strong>තවදුරටත් තාක්ෂණික ගෙවීම් ගාස්තු 3%</strong> ක් ගෙවිය යුතුය
                      </p>



                      <p className="mt-4 mb-4">
                      <strong>பொருட்களின் மொத்த தொகை,</strong> <strong>டெலிவரி கட்டணங்கள்,</strong> மற்றும் 
                      <strong>3% தொழில்நுட்ப கட்டணங்களும்</strong> செலுத்தப்பட வேண்டும்
                      </p>


                          {/* Button to trigger the upload section */}
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={handleButtonClick}
                          >
                            Pay here
                          </button>
                          {showChild && <Payhere />}{" "}
                          {/* Conditionally render ChildComponent */}
                          {/* Upload section visibility */}
                          {/* {uploadSectionVisible && (
                <div className="p-4 mt-4 border border-gray-300 rounded-md">
                  <p className="text-gray-700 mb-2">Upload Your Bank Slip here</p> */}
                          {/* <div className="flex justify-center items-center p-4 mb-4 border border-dashed border-gray-300 rounded-md"> */}
                          {/* File input for uploading the bank slip */}
                          {/* <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      onChange={handleFileChange}
                    /> */}
                          {/* Label to trigger file input click and show uploaded image */}
                          {/* <label htmlFor="file-upload" className="cursor-pointer">
                      <img
                        src={uploadedFile || "/path/to/default/image.png"} // Show default image if no file is uploaded
                        alt="Upload Slip"
                        className="h-16"
                      />
                    </label>
                  </div> */}
                          {/* Upload button to submit the file */}
                          {/* <button className="px-4 py-2 bg-red-500 text-white rounded-md">Upload</button>
                </div>
              )} */}
                        </div>
                      )}
                    </div>
                    {/* End of "Add new card" section */}

                    {/* Bank Transfer section */}
                    <div className="flex flex-col">
                      <div className="flex items-center pb-4 border-gray-300">
                        {/* Radio button for "Bank Transfer" payment method */}
                        <input
                          type="radio"
                          name="payment"
                          id="bank-transfer"
                          className="mr-4"
                          style={{
                            borderColor: "#F96969",
                            accentColor: "#F96969",
                          }} // For modern browsers
                          onChange={() => handlePaymentChange("bank-transfer")}
                        />

                        <label
                          htmlFor="bank-transfer"
                          className="flex items-center space-x-2"
                        >
                          {/* Bank Transfer image */}
                          <img
                            src="/images/bank transfer.png"
                            alt="Bank Transfer"
                            className="h-8"
                          />

                          <span className="text-sm font-medium">
                            Bank Transfer
                          </span>
                        </label>
                      </div>

                      {/* Section shown if "Bank Transfer" is selected */}
                      {selectedPayment === "bank-transfer" && (
                        <div className="p-4 mt-4 border border-gray-300 rounded-md">
                         
                          <p className="text-gray-700 mb-2">
                          The <strong>total amount of the goods</strong> you buy and the <strong>delivery charges: 350/=</strong> should be 
                            deposited into one of the following bank accounts, and the receipt should be uploaded there.  
                          We confirm the order only if it is successful after your deposit verification.
                          </p>


                          <p className="text-gray-700 mb-4 mt-3">
                            ඔබ මිලදී ගන්නා <strong>භාණ්ඩ වල මුළු මුදල</strong> සහ <strong>බෙදා හැරීමේ ගාස්තුව: රු. 350/=</strong> පහත සඳහන් බැංකු ගිණුම්වලට තැන්පත් කළ යුතුය, 
                            සහ රිසිට්පත එතැන උඩුගත කළ යුතුය. ඔබගේ තැන්පතුව සාර්ථකව තහවුරු කිරීමෙන් පසු පමණක් අපි ඇනවුම තහවුරු කරමු.
                          </p>


                          <p className="text-gray-700 mb-4 mt-3">
                            நீங்கள் வாங்கும் <strong>பொருட்களின் மொத்த தொகை</strong> மற்றும் <strong>டெலிவரி கட்டணம்: ரூ. 350/=</strong> கீழே குறிப்பிடப்பட்டுள்ள வங்கிக் கணக்குகளில் செலுத்தப்பட வேண்டும், 
                            மற்றும் ரசீது அங்கு பதிவேற்றப்பட வேண்டும். உங்கள் செலுத்துதல் வெற்றிகரமாக சரிபார்க்கப்பட்ட பிறகே நாங்கள் ஆர்டரை உறுதிப்படுத்துவோம்.
                          </p>







                          
                          <div className="mb-2">
                            {/* Display bank details */}
                            <span className="block text-gray-700">
                              Name
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "83px",
                                }}
                              >
                                : Sahan
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Account Number
                              <span className="font-semibold">
                                : 100 657 949 991
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Branch
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "77px",
                                }}
                              >
                                : Kurunagala
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Bank
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "77px",
                                }}
                              >
                                : Sampath bank
                              </span>
                            </span>
                          </div>
                          {/* Account details ends here */}


                          <div className="mb-2">
                            {/* Display bank details */}
                            <span className="block text-gray-700">
                              Name
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "83px",
                                }}
                              >
                                : M.Sahan Prbhath Karunarathna
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Account Number
                              <span className="font-semibold">
                                : 800 116 7142
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Branch
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "77px",
                                }}
                              >
                                : Narahenpita
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Bank
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "90px",
                                }}
                              >
                                : Commercial bank
                              </span>
                            </span>
                          </div>
                          

                          {/* Button to trigger the upload section */}
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={handleUploadClick}
                            style={{ marginLeft: "520px" }} // Adjusted margin for positioning
                          >
                            Upload your slip
                          </button>

                          {/* Upload section visibility */}
                          {uploadSectionVisible && (
                            <div className="p-4 mt-4 border border-gray-300 rounded-md">
                              <p className="text-gray-700 mb-2">
                                Upload Your Bank Slip here
                              </p>

                              <div className="flex justify-center items-center p-4 mb-4 border border-dashed border-gray-300 rounded-md">
                                {/* File input for uploading the bank slip */}
                                <input
                                  type="file"
                                  id="file-upload"
                                  className="hidden"
                                  onChange={handleFileChange}
                                />

                                {/* Label to trigger file input click and show uploaded image */}
                                <label
                                  htmlFor="file-upload"
                                  className="cursor-pointer"
                                >
                                  {File && (
                                    <p className="text-gray-700 mt-2">
                                      {File.name}
                                    </p>
                                  )}
                                  <img
                                    src={uploadedFile || "/images/upload.png"} // Show default image if no file is uploaded
                                    alt="Upload Slip"
                                    className="h-16"
                                  />
                                </label>
                              </div>
                              {/* Upload button to submit the file */}
                              {/* <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                style={{ marginLeft: "560px" }}
                                // onClick={handleUpload}
                              >
                                Upload
                              </button> */}
                            </div>
                          )}
                          {/* upload section ends */}
                        </div>
                      )}
                    </div>
                    {/* End of "Bank Transfer" section */}

                    <hr className="border-t border-gray-300 w-full my-2" />

                    {/* Cash on Delivery section */}
                    <div className="flex flex-col">
                      <div className="flex items-center pb-4 border-gray-300">
                        {/* Radio button for "Cash on Delivery" payment method */}
                        <input
                          type="radio"
                          name="payment"
                          id="cod"
                          className="mr-4"
                          style={{
                            borderColor: "#F96969",
                            accentColor: "#F96969",
                          }} // For modern browsers
                          onChange={() => handlePaymentChange("cod")}
                        />

                        <label
                          htmlFor="cod"
                          className="flex items-center space-x-2"
                        >
                          {/* Cash on Delivery image */}
                          <img
                            src="/images/cashondeliver.png"
                            alt="Cash on Delivery"
                            className="h-8"
                          />
                          <span className="text-sm font-medium">
                            Cash on Delivery
                          </span>
                        </label>
                      </div>

                      {/* Section shown if "Cash on Delivery" is selected */}
                      {selectedPayment === "cod" && (
                        <div className="p-4 mt-4 border border-gray-300 rounded-md">
                         
                          <p className="text-gray-700 mb-2">
                          In here <strong>ONLY THE DELIVERY CHARGES</strong> should be deposited into one of the following bank accounts,
                          and the receipt should be uploaded there. We confirm the order only if it is successful after your
                          deposit verification.
                          </p>

                          <p className="text-gray-700 mb-5 mt-5">
                            මෙහිදී <strong>බෙදා හැරීමේ ගාස්තු පමණක්</strong> පහත සඳහන් බැංකු ගිණුම්වලට තැන්පත් කළ යුතුය, 
                            සහ රිසිට්පත එතැන උඩුගත කළ යුතුය. ඔබගේ තැන්පතුව සාර්ථකව තහවුරු කිරීමෙන් පසු පමණක් අපි ඇනවුම තහවුරු කරමු.
                          </p>


 
                          <p className="text-gray-700 mb-5 mt-5">
                            இங்கே <strong>டெலிவரி கட்டணம் மட்டும்</strong> கீழே குறிப்பிடப்பட்டுள்ள வங்கிக் கணக்குகளில் செலுத்தப்பட வேண்டும், 
                            மற்றும் ரசீது அங்கு பதிவேற்றப்பட வேண்டும். உங்கள் செலுத்துதல் வெற்றிகரமாக சரிபார்க்கப்பட்ட பிறகே நாங்கள் ஆர்டரை உறுதிப்படுத்துவோம்.
                          </p>




                         

                          <div className="mb-2">
                            {/* Display bank details */}
                            <span className="block text-gray-700">
                              Name
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "83px",
                                }}
                              >
                                : M S P Karunaratna
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Account Number
                              <span className="font-semibold">
                                : 100 657 949 991
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Branch
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "77px",
                                }}
                              >
                                : Kurunagala
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Bank
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "90px",
                                }}
                              >
                                : Sampath bank
                              </span>
                            </span>
                          </div>
                          {/* account details ends here */}


                          <div className="mb-2">
                            {/* Display bank details */}
                            <span className="block text-gray-700">
                              Name
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "83px",
                                }}
                              >
                                : M.Sahan Prbhath Karunarathna
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Account Number
                              <span className="font-semibold">
                                : 800 116 7142
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Branch
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "77px",
                                }}
                              >
                                : Narahenpita
                              </span>
                            </span>

                            <span className="block text-gray-700">
                              Bank
                              <span
                                className="font-semibold"
                                style={{
                                  marginLeft: "auto",
                                  paddingLeft: "90px",
                                }}
                              >
                                : Commercial bank
                              </span>
                            </span>
                          </div>















                          {/* Button to trigger the upload section */}
                          <button
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                            onClick={handleUploadClick}
                            style={{ marginLeft: "520px" }} // Adjusted margin for positioning
                          >
                            Upload your slip
                          </button>

                          {/* Upload section visibility */}
                          {uploadSectionVisible && (
                            <div className="p-4 mt-4 border border-gray-300 rounded-md">
                              <p className="text-gray-700 mb-2">
                                Upload Your Bank Slip here
                              </p>

                              <div className="flex justify-center items-center p-4 mb-4 border border-dashed border-gray-300 rounded-md">
                                {/* File input for uploading the bank slip */}
                                <input
                                  type="file"
                                  id="file-upload"
                                  className="hidden"
                                  onChange={handleFileChange}
                                />

                                {/* Label to trigger file input click and show uploaded image */}
                                <label
                                  htmlFor="file-upload"
                                  className="cursor-pointer"
                                >
                                  {File && (
                                    <p className="text-gray-700 mt-2">
                                      {File.name}
                                    </p>
                                  )}
                                  <img
                                    src={uploadedFile || "/images/upload.png"} // Show default image if no file is uploaded
                                    alt="Upload Slip"
                                    className="h-16"
                                  />
                                </label>
                              </div>

                              {/* Upload button to submit the file */}
                              {/* <button
                                className="px-4 py-2 bg-red-500 text-white rounded-md"
                                style={{ marginLeft: "560px" }}
                              >
                                Upload
                              </button> */}
                            </div>
                          )}
                          {/* upload section ends */}
                        </div>
                      )}
                    </div>
                    {/* End of "Cash on Delivery" section */}
                  </div>
                </div>
              </div>
            </MyContext.Provider>

            {/* Order summary section */}
            <div className=" rounded-md p-6  h-[300px] w-[400px] ml-auto mt-12 bg-gray-50">
              {/* order summary first line and the second line */}
              <div className="border-b pb-4 mb-4">
                {/* order summary first line */}
                <div className="flex justify-between mb-2">
                  {/* item label */}
                  <span className="font-semibold">Items({itemsCount})</span>

                  {/* item price label */}
                  <span className="font-semibold">LKR {totalPrice}.00</span>
                </div>

                {/* order summary second line */}
                <div className="flex justify-between">
                  {/* Deliver cost label */}
                  <span className="font-semibold">Deliver Cost</span>

                  {/* deliver cost total */}
                  <span className="font-semibold">LKR {deliverCost}.00</span>
                </div>
              </div>

              <div className="flex justify-between">
                {/* order total */}
                <span className="mt-1 text-xl font-semibold">Order total</span>

                {/* order total price */}
                <span className="font-bold mt-1 text-xl">
                  LKR {orderTotal}.00
                </span>
              </div>
              {/* order summary div ends here */}

              {/* confirm and pay button */}
              <button
                onClick={handleConfirmPay}
                className="bg-red-500 text-white w-full py-2 rounded-md flex items-center justify-center mt-8"
              >
                <img src="/images/confirmpay.png" alt=" " className="mr-2 h-6" />
                Confirm and pay
              </button>
              {error && (
                <div className="p-1 rounded-md error-message mt-5 text-red-500 bg-red-200 font-semibold">
                  {error}
                </div>
              )}
            </div>
            {/* Order summary section ends */}
          </div>

          {/* ship to section starts */}
          <div className=" rounded-md p-6 mb-5 w-full mt-10  max-w-3xl bg-gray-50">
            {/* call the ShipTo component */}
            <ShipTo />
          </div>
          {/* ship to section ends */}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Checkout;
