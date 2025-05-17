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
        .post(`${process.env.REACT_APP_SERVER_URL}/member/addmembers`, values)
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
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl rounded-3xl border border-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
            <img
              alt="Your Company"
              src="images/CompanyLogo.png"
              className="mx-auto"
              width={75}
            // height={30}
            />
            <h2 className="mt-2 text-center text-3xl font-bold leading-9 tracking-wider" style={{ color: '#FF7E00' }}>
              Welcome
            </h2>
            <p className="mt-3 text-center text-white text-sm">
              Create your account to unlock personalized recommendations,
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
                className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"
              />

              {/* Firstname input field */}
              <input
                id="firstname"
                name="firstname"
                type="text"
                placeholder="Firstname"
                value={formik.values.firstname}
                onChange={formik.handleChange("firstname")}
                className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"              />
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
                className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"              />
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
                className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"              />
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
                className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"              />
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
                className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"              />
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
                className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"              />
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
                  className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"                />
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
                  className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"                />
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
                  className="flex w-full justify-center rounded-md bg-[#FF7E00] px-3 py-3.5 text-base font-bold leading-6 text-white shadow-sm hover:bg-[#e66e00] active:bg-[#cc6100] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7E00]"
                  >
                  Sign Up
                </button>
              </div>
            </form>

            <div className="flex justify-center items-center font-medium text-white text-xs mt-2 mb-3">
              <p>Already have an account?</p>
              <a href="/login" className="ml-1 text-red-400">
                Sign In
              </a>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
