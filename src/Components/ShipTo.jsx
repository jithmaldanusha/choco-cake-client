import React,{useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from "axios";
import { useDispatch } from 'react-redux';
import { setValue } from '../Redux/Action';
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ShipTo = () => {
  // get the logged user details
  const cookieget = Cookies.get("memberToken");

  let decoded = "";

    if (cookieget) {
      
       decoded = jwtDecode(cookieget);
      console.log(decoded);
    }
  // const decoded = jwtDecode(cookieget);
  console.log(decoded.email);

  // redux get the values and store in store 
  const dispatch = useDispatch();



  // disbale of email if user exist
  const isEmailDisabled = !!decoded.email;

  //hushmitha
  const [showAlert, setShowAlert] = useState(false);


  // Formik setup for managing form state, validation, and submission
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      contactNumber: '',
      email: isEmailDisabled ? decoded.email : '',
      shippingAddress: '',
      nearestCity: '',
      district: '',
    },
    // Validation schema using Yup
    validationSchema: Yup.object({
      firstName: Yup.string().required('Required'),
      lastName: Yup.string().required('Required'),
      contactNumber: Yup.string().required('Required'),
      email: isEmailDisabled ? Yup.string() : Yup.string().email('Invalid email address').required('Required'),
      shippingAddress: Yup.string().required('Required'),
      nearestCity: Yup.string().required('Required'),
      district: Yup.string().required('Required'),
    }),
    // Function to handle form submission
    onSubmit: values => {
      console.log(JSON.stringify(values, null, 2));
      dispatch(setValue(values));

      //hushmithe
      setShowAlert(true);

      // Hide alert after 3 seconds (for demonstration purposes)        ---->hushmitha
      setTimeout(() => {
        setShowAlert(false);
      }, 9000);



      // axios
      //   .post("https://backend.spkstore.lk/order/createOrder", values)
      //   .then((response) => {
      //     console.log(response.data);
      //   });
    },
  });



   // List of districts
   const districts = [
     "Colombo", "Gampaha", "Kalutara", "Kandy", "Matale", "Nuwara Eliya",
     "Galle", "Matara", "Hambantota", "Jaffna", "Kilinochchi", "Mannar",
     "Vavuniya", "Mullaitivu", "Batticaloa", "Ampara", "Trincomalee",
     "Kurunegala", "Puttalam", "Anuradhapura", "Polonnaruwa", "Badulla",
     "Monaragala", "Ratnapura", "Kegalle"
   ];


  return (
    <div className="max-w-2xl mx-auto p-4 ">
      {/* Form heading */}
      <h2 className="text-2xl font-bold mb-4">Ship to</h2>

      {/* Form starts */}
      <form onSubmit={formik.handleSubmit} className="space-y-4">

        {/* Grid layout for first name and last name fields */}
        <div className="grid grid-cols-2 gap-4">

          {/* First Name field */}
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className="mt-1 p-2 block w-full border border-[#FF7E00] rounded-md bg-transparent"
            />
            {/* Error message for first name */}
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="text-red-600 text-sm">{formik.errors.firstName}</div>
            ) : null}
          </div>

          {/* Last Name field */}
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className="mt-1 p-2 block w-full border border-[#FF7E00] rounded-md bg-transparent"
            />
            {/* Error message for last name */}
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="text-red-600 text-sm">{formik.errors.lastName}</div>
            ) : null}
          </div>

        </div>

        {/* Grid layout for contact number and email fields */}
        <div className="grid grid-cols-2 gap-4">

          {/* Contact Number field */}
          <div>
            <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700">
              Contact Number
            </label>
            <input
              id="contactNumber"
              name="contactNumber"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.contactNumber}
              className="mt-1 p-2 block w-full border border-[#FF7E00] rounded-md bg-transparent"
            />
            {/* Error message for contact number */}
            {formik.touched.contactNumber && formik.errors.contactNumber ? (
              <div className="text-red-600 text-sm">{formik.errors.contactNumber}</div>
            ) : null}
          </div>

          {/* Email field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            
            <input
              id="email"
              name="email"
              type="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={decoded.email ? decoded.email : formik.values.email}
              className="mt-1 p-2 block w-full border border-[#FF7E00] rounded-md bg-transparent"
              placeholder={isEmailDisabled  ? decoded.email : ""} //if decoded mail is present then show email 
              disabled={isEmailDisabled } // and disbaled the input field
            />
            {/* Error message for email */}
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-600 text-sm">{formik.errors.email}</div>
            ) : null}
          </div>

        </div>

        {/* Grid layout for shipping address and default address checkbox */}
        <div className="grid grid-cols-2 gap-4">

          {/* Shipping Address field */}
          <div>
            <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">
              Shipping Address
            </label>
            <input
              id="shippingAddress"
              name="shippingAddress"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.shippingAddress}
              className="mt-1 p-2 block w-full border border-[#FF7E00] rounded-md bg-transparent"
            />
            {/* Error message for shipping address */}
            {formik.touched.shippingAddress && formik.errors.shippingAddress ? (
              <div className="text-red-600 text-sm">{formik.errors.shippingAddress}</div>
            ) : null}
          </div>

          {/* Default Address checkbox */}
          

        </div>

        {/* Grid layout for district and nearest city fields */}
        <div className="grid grid-cols-2 gap-4">



          {/* District field */}
          {/* District field with dropdown */}
          <div>
    
           <label htmlFor="district" className="block text-sm font-medium text-gray-700">
             District
           </label>
           <select
             id="district"
             name="district"
             onChange={formik.handleChange}
             onBlur={formik.handleBlur}
             value={formik.values.district}
             className="mt-1 p-2 block w-full border border-[#FF7E00] rounded-md bg-transparent"
           >
             <option value="" label="Select a district" />
             {districts.map(district => (
               <option key={district} value={district}>
                 {district}
               </option>
             ))}
           </select>
           {/* Error message for district */}
           {formik.touched.district && formik.errors.district ? (
             <div className="text-red-600 text-sm">{formik.errors.district}</div>
           ) : null}
         </div>







          {/* Nearest City field */}
          <div>
            <label htmlFor="nearestCity" className="block text-sm font-medium text-gray-700">
              Nearest City
            </label>
            <input
              id="nearestCity"
              name="nearestCity"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.nearestCity}
              className="mt-1 p-2 block w-full border border-[#FF7E00] rounded-md bg-transparent"
            />
            {/* Error message for nearest city */}
            {formik.touched.nearestCity && formik.errors.nearestCity ? (
              <div className="text-red-600 text-sm">{formik.errors.nearestCity}</div>
            ) : null}
          </div>

        </div>

        {/* hushmithe */}
        {showAlert && (
          <div>
            <div
              class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
              role="alert"
            >
              <span class="font-medium">Success alert!</span> Shipping details
              have been saved.
            </div>
            
          </div>
        )}






        {/* Buttons for form actions */}
        <div className="flex justify-end space-x-4 mt-4">
          {/* Cancel button */}
          <button
            type="button"
            className="py-2 px-4 border border-[#FF7E00] text-[#FF7E00] rounded-md"
            onClick={() => formik.resetForm()}
          >
            CANCEL
          </button>
          {/* Save button */}
          <button
            type="submit"
            className="py-2 px-4 bg-[#FF7E00] text-white rounded-md"
          >
            SAVE
          </button>
        </div>

      </form>
    </div>
  );
};

export default ShipTo;
