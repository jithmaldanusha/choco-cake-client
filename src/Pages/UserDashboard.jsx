import React, { useEffect, useState } from "react";
import UserDashboardNav from "../Components/UserDashboardNav";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useFormik } from "formik";
import * as Yup from "yup";

const UserDashboard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // password change states
  const [field1, setField1] = useState('');
  const [field2, setField2] = useState('');
  const [field3, setField3] = useState('');

  // errors state for password change
  const [error, setError] = useState('');
  const [error1, setError1] = useState('');


  const [user, setUser] = useState({});

  const cookieget = Cookies.get("memberToken");

  let email = "";
  let username = '';

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    if (decoded.given_name) {
       username = decoded.given_name
      email = decoded.email || "";

    }else{

      email = decoded.email || "";
    username = decoded.username || '';
    }
  
}

  // if (cookieget) {
  //   const decoded = jwtDecode(cookieget);
  //   console.log(decoded);

  //   email = decoded.email || "";
  //   username = decoded.username || '';

  // }

  useEffect(() => {
    axios
      .get(`https://backend.spkstore.lk/member/getmember/${email}`)
      .then((Response) => {
        console.log(Response.data.data);
        setUser(Response.data.data);
      });
  }, []);

  console.log(user);

  // initial values
  const initialValues = {
    firstname: "",
    lastname: "",
    contactnumber: "",
    shippingaddress: "",
    dateOfBirth:""
  };

  //validations
  const validationSchema = Yup.object().shape({
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("lastname is required"),
    contactnumber: Yup.string().required("contactnumber is required"),
  });


  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      // let formData = new FormData();
    
      axios
        .patch(`https://backend.spkstore.lk/member/updateMember/${email}`, values)
        .then((response) => {
          console.log(response.data);
        });
    },
  });

  // Convert dateOfBirth from ISO string to Date object
  const dateOfBirth = new Date(user.dateOfBirth);
  const year = dateOfBirth.getFullYear();
  const month = String(dateOfBirth.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(dateOfBirth.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;



  // user password change request
  const handleSubmit = async (event) => {
    event.preventDefault();

    // user.password
    // field1
    if (user.password !== field1) {
      setError1("incorrect password")
    }

   if (field2 === field3) {
    try {
      const response = await axios.patch(`https://backend.spkstore.lk/member/updatePassword/${email}`, {
        field1,
        field2,
        field3
      });
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  }else{
    setError("new password and confirm password should be match")
    return;  

  }
  
  };

  return (
    <div className="">
      <Navbar data={username}/>

      <div className="min-h-screen flex">
        {/* Sidebar */}

        <UserDashboardNav />

        {/* Main Content */}
        <div className="w-3/4 p-8 mt-10">
          <div
            className="bg-white p-6 shadow-lg border border-black rounded-lg"
            
          >
            {/* General Overview title */}
            <h2 className="text-2xl font-bold text-red-500">
              General Overview
            </h2>

            <h2 className="text-xl font-bold text-black-500 mt-6">
              Personal Information
            </h2>

            {/* Starts the form */}
            <form className="space-y-4 mt-7 " onSubmit={formik.handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* First name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder={user.firstname}
                    value={formik.values.firstname}
                      onChange={formik.handleChange("firstname")}
                  />
                  {formik.touched.firstname && formik.errors.firstname ? (
                      <div className="text-red-500">
                        {formik.errors.firstname}
                      </div>
                    ) : null}
                </div>

                {/* Last Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder={user.lastname}
                    value={formik.values.lastname}
                      onChange={formik.handleChange("lastname")}
                  />
                  {formik.touched.lastname && formik.errors.lastname ? (
                      <div className="text-red-500">
                        {formik.errors.lastname}
                      </div>
                    ) : null}
                </div>

                {/* Contact Number   */}
                <div>
                  {/* COntact number label */}
                  <label className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>

                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      className="block w-full border-gray-300 rounded-md shadow-sm "
                      placeholder={user.contactnumber}
                      value={formik.values.contactnumber}
                      onChange={formik.handleChange("contactnumber")}
                    />
                     {formik.touched.contactnumber && formik.errors.contactnumber ? (
                      <div className="text-red-500">
                        {formik.errors.contactnumber}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    defaultValue={user.email}
                    disabled={true}
                  />
                </div>

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    // defaultValue={formattedDate}
                    value={formattedDate}
                    onChange={formik.handleChange("dateOfBirth")}
                  />
                </div>

                {/* Shipping Address */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    placeholder={user.shippingaddress}
                    value={formik.values.shippingaddress}
                    onChange={formik.handleChange("shippingaddress")}
                  />
                  {formik.touched.shippingaddress && formik.errors.shippingaddress ? (
                      <div className="text-red-500">
                        {formik.errors.shippingaddress}
                      </div>
                    ) : null}
                  
                </div>

                
              </div>

              {/* Button Div */}
              <div className="flex flex-col sm:flex-row sm:space-x-4 mt-3 justify-end">
                {/* Cancel button */}
                <button
                  type="button"
                  className="py-2 rounded-md bg-white text-[#F96969] border-2 border-[#F96969] hover:bg-[#F96969] hover:text-white"
                  style={{ width: "160px" }}
                >
                  CANCEL
                </button>

                {/* Save button  */}
                <button
                  type="submit"
                  className="py-2 px-4 bg-red-500 text-white border-2 border-transparent rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 mt-3 sm:mt-0"
                  style={{ width: "160px" }}
                >
                  SAVE
                </button>
              </div>
            </form>
            {/* form ends */}
          </div>


          {/* ============================================= */}
          {/* Change password section */}
          <div
            className="bg-white p-6 rounded-lg shadow-lg mt-8"
            style={{ border: "1px solid black", borderRadius: "8px" }}
          >
            {/* Change password label */}
            <h2 className="text-xl font-bold text-black-500 mt-6">
              Change Password
            </h2>

            {/* form starts */}
            <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-4">
                {/* old password section */}
                <div className="relative">
                  {/* Old password label and input field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Old Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      value={field1}
                      onChange={(e) => setField1(e.target.value)}
                    />
                  </div>

                  {/* Toggle visibility icon */}
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 mt-5"
                  >
                    👀
                  </button>
                {error1 && <p style={{ color: 'red' }}>{error1}</p>}

                </div>


                {/* New password section */}
                <div className="relative">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      value={field2}
                      onChange={(e) => setField2(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 mt-5"
                  >
                    👀
                  </button>
                </div>

                {/* Confirm password section */}
                <div className="relative">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                      value={field3}
                      onChange={(e) => setField3(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 mt-5"
                  >
                    👀
                  </button>
                </div>
              </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}

              <div className="flex flex-col sm:flex-row sm:space-x-4 mt-3 justify-end">
                {/* Cancel button */}
                <button
                  type="button"
                  className="py-2 rounded-md bg-white text-[#F96969] border-2 border-[#F96969] hover:bg-[#F96969] hover:text-white"
                  style={{ width: "160px" }}
                >
                  CANCEL
                </button>

                {/* Save button  */}
                <button
                  type="submit"
                  className="py-2 px-4 bg-red-500 text-white border-2 border-transparent rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 mt-3 sm:mt-0"
                  style={{ width: "160px" }}
                >
                  SAVE
                </button>
              </div>
            </form>
            {/* form ends */}
          </div>
          {/* Change password section ends  */}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
