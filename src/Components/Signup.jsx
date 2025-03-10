import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SignUp() {
  //     //newly added

  //newly added
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [selectedDate, setSelectedDate] = useState(null);

  //msg
  const [message, setMessage] = useState("");

  const today = new Date();
  const minDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate()
  );

  const initialValues = {
    username: "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    contactnumber: "",
    shippingaddress: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  //   schema validations
  const SignUpSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    firstname: Yup.string().required("Firstname is required"),
    lastname: Yup.string().required("Lastname is required"),
    contactnumber: Yup.string()
      .required("Contact number is required")
      .matches(/^[0-9]+$/, "Contact number must be a valid number"),

    shippingaddress: Yup.string().required("Shipping address is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    dateOfBirth: Yup.date()
      .required("Date of Birth is required")
      .test("DOB", "You must be at least 18 years old", function (value) {
        const today = new Date();
        const birthDate = new Date(value);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        return age >= 18;
      }),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: SignUpSchema,
    onSubmit: (values) => {
      console.log(values);

      // HTTP request to pass the values
      axios
        .post("https://backend.spkstore.lk/member/addmembers", values)
        .then((response) => {
          console.log(response.data);
          // need to have rediret to homepage Auth
          // Handle successful response here (e.g., show a success message or redirect)
          setShowAlert(true);

          // Hide alert after 3 seconds (for demonstration purposes)        ---->hushmitha
          setTimeout(() => {
            setShowAlert(false);
          }, 9000);

          // Redirect to the home page
          window.location.href = "/";

          // Optionally, reset the form fields after successful signup
          formik.resetForm();
        })
        .catch((error) => {
          console.error("There was an error submitting the form!", error);
          // Handle error response here (e.g., show an error message)
        });
    },
  });

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl bg-gray-100 rounded-3xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
            <img
              alt="Your Company"
              src="images/CompanyLogo.png"
              className="mx-auto"
              width={75}
              // height={30}
            />
            <h2 className="mt-2 text-center text-3xl font-bold leading-9 tracking-wider text-gray-900">
              Welcome
            </h2>
            <p className="mt-3 font-light text-sm">
            Create your account to unlock personalized recommendations,{" "}
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            {/* form starts here */}
            <form onSubmit={formik.handleSubmit}>
              {/* username input field */}
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange("username")}
                className="block w-full mb-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />

              {/* Firstname input field */}
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                className="block w-full mb-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {formik.errors.firstname ? (
                <div className="text-red-500">{formik.errors.firstname}</div>
              ) : null}

              {/* Lastname input field */}
              <input
                id="lastname"
                name="lastname"
                type="text"
                placeholder="Lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange("lastname")}
                className="block w-full mb-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {formik.errors.lastname ? (
                <div className="text-red-500">{formik.errors.lastname}</div>
              ) : null}

              {/* Contactnumber input field */}
              <input
                id="contactnumber"
                name="contactnumber"
                type="text"
                placeholder="Contact number"
                value={formik.values.contactnumber}
                onChange={formik.handleChange("contactnumber")}
                className="block w-full mb-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {formik.errors.contactnumber ? (
                <div className="text-red-500">
                  {formik.errors.contactnumber}
                </div>
              ) : null}

              {/* Date of Birth input field */}
              <DatePicker
                id="dateOfBirth"
                name="dateOfBirth"
                selected={formik.values.dateOfBirth}
                onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select your date of birth"
                className="block w-full mb-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {formik.errors.dateOfBirth ? (
                <div className="text-red-500">{formik.errors.dateOfBirth}</div>
              ) : null}

              {/* Shipping Address input field */}
              <input
                id="shippingaddress"
                name="shippingaddress"
                type="text"
                placeholder="Shipping Address"
                value={formik.values.shippingaddress}
                onChange={formik.handleChange("shippingaddress")}
                className="block w-full mb-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {formik.errors.shippingaddress ? (
                <div className="text-red-500">
                  {formik.errors.shippingaddress}
                </div>
              ) : null}

              {/* email input field */}
              <input
                id="email"
                name="email"
                type="email"
                placeholder="E-mail"
                value={formik.values.email}
                onChange={formik.handleChange("email")}
                className="block w-full mb-4 rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
              />
              {formik.errors.email ? (
                <div className="text-red-500">{formik.errors.email}</div>
              ) : null}

              {/* Password input field */}
              <div className="relative mb-4">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-2"
                >
                  {showPassword ? (
                    <span role="img" aria-label="Hide Password">
                      👀
                    </span>
                  ) : (
                    <span role="img" aria-label="Show Password">
                      🔍
                    </span>
                  )}
                </button>
                {formik.errors.password ? (
                  <div className="text-red-500">{formik.errors.password}</div>
                ) : null}
              </div>

              <div className="relative mb-6">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange("confirmPassword")}
                  className="block w-full rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-2 top-2"
                >
                  {showConfirmPassword ? (
                    <span role="img" aria-label="Hide Password">
                      👀
                    </span>
                  ) : (
                    <span role="img" aria-label="Show Password">
                      🔍
                    </span>
                  )}
                </button>
                {formik.errors.confirmPassword ? (
                  <div className="text-red-500">
                    {formik.errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              {showAlert && (
                <div>
                  <div
                    class="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                    role="alert"
                  >
                    <span class="font-medium">Success alert!</span>user
                    has been created.
                  </div>
                  ;
                </div>
              )}

              {/* submit button */}
              <div className="">
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-red-400 px-3 py-3.5 text-base font-bold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="flex justify-center items-center font-medium text-xs mt-2 mb-3">
              <p>Already have an account?</p>
              <a href="/login" className="ml-1 text-red-400">
                Sign In
              </a>
            </div>

            {/* the horizontal line with the or */}
            {/* <div className="flex items-center justify-center ">
              <hr className="border border-gray-300 mt-1 w-full"></hr>
              <p className="ml-3 mr-3 text-gray-400 text-sm">or</p>
              <hr className="border border-gray-300 mt-1 w-full"></hr>
            </div> */}

            {/* Google button */}
            {/* <div>
              <a
                href="https://backend.spkstore.lk/gAuth/auth/google"
                className="ml-5"
              >
                <button className="flex w-full mb-5 justify-center rounded-md m-0 bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/010/353/285/non_2x/colourful-google-logo-on-white-background-free-vector.jpg"
                    alt=""
                    width={25}
                    height={50}
                    className="mr-3 "
                  />
                  <p className="tracking-wide text-base ">Google</p>
                </button>
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
