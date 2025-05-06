import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useNavigate } from "react-router";
// import { useDispatch } from "react-redux";
// import { setCart } from "../Redux/cartValueAction";

function CartSideBar() {
  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const [latestRecord, setLatestRecord] = useState([]);

  const cookieget = Cookies.get("memberToken");

  const decoded = jwtDecode(cookieget);
  // console.log(decoded);

  const userEmail = decoded.email;
  // console.log(userEmail);

  useEffect(() => {
    if (userEmail) {
      // Fetch the latest record from the backend
      axios
        .get(`https://backend.spkstore.lk/cart/getCartItems/${userEmail}`)
        .then((response) => {
          setLatestRecord(response.data.data.items);
          // console.log(response.data.data.items);
          console.log(response.data.data.items.length);

          // dispatch(setCart(response.data.data.items.length));
          // setError(null);
        })
        .catch((error) => {
          // setError('Failed to fetch record');
          setLatestRecord(null);
        });
    }
  }, [userEmail]);


  console.log(latestRecord);
  let total;
  if (latestRecord) {

    total = latestRecord.reduce((accumulator, item) => {
      return accumulator + parseInt(item.priceAfterDiscount);
    }, 0);
  }

  return (
    // the whole cart div starts here
    <div className="shadow-lg p-6 h-screen border rounded-lg absolute top-16 right-16 w-3xl z-50" style={{ background: "#FF7E00" }}>
      {/* Subtotal div starts here */}
      <div className="flex items-center mb-6">
        {/* Subtotal topic */}
        <div className="text-xl font-semibold pl-[10px] me-3">Subtotal : </div>

        {/* Total display  */}
        <div className="text-xl font-bold text-red-900">LKR {total}</div>
      </div>


      {/* Checkout button */}
      {/* <button className="w-full bg-red-500 text-white py-2 rounded-md mb-4" onClick={() => {
          navigate("/checkout", {state: total});
      }}>
        Checkout
      </button> */}

      {/* Go to cart button */}
      <button
        className="w-full border border-black  text-black font-semibold py-2 rounded-md mb-4"
        style={{ fontSize: "17px", background: "#F4DFC8" }}
        onClick={() => {
          navigate("/cart", { state: latestRecord });
        }}
      >
        Go To Cart
      </button>

      {/* console.log(latestRecord); */}

      {latestRecord && latestRecord.map((items) => {
        return (
          <div className="space-y-4 overflow-hidden mb-2">
            {/* card starrts here */}
            <div className="flex p-2 bg-gray-100 rounded-lg align-middle items-center">
              {/* checkbox  */}
              {/* <input
                type="checkbox"
                className="w-5 h-5 text-red-500 border-gray-300 rounded focus:ring-red-500 mr-4"
                readOnly
              /> */}

              {/* image  product name , price , quantity , icon start div */}
              <div className="flex p-1 align-middle items-center">
                {/* Product image  */}
                <img
                  src={items.itemDescription[0]}
                  // alt="DJI Mavic Pro Drone with 3 Battery"
                  className="w-10 h-10 object-cover ml-auto mr-3"
                />

                {/* product name */}
                <h3 className="text-sm font-bold text-black w-28 overflow-hidden ">
                  {items.itemName}
                </h3>

                {/* product price , quantity and deltete div */}
                <div className="flex items-center align-middle ">
                  {/* product price */}
                  <p
                    className="font-semibold m-3 w-20 overflow-hidden ml-2 text-right"
                    style={{ color: "#757575" }}
                  >
                    {items.priceAfterDiscount}
                  </p>




                </div>
                {/* product price , quantity and deltete div ends here*/}
              </div>
              {/* image  product name , price , quantity , icon start div */}
            </div>
            {/* card ends  */}
          </div>
        );
      })}
    </div>
    // Cart div ends here
  );
}

export default CartSideBar;
