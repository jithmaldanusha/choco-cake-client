import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const navigate = useNavigate();
  const [showGoogleModal, setShowGoogleModal] = useState(false);

  const initialValues = {
    Memberemail: "",
    MemberPassword: "",
  };

  const LoginSchema = Yup.object().shape({
    Memberemail: Yup.string().required("Username is required"),
    MemberPassword: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/jAuth/memberlogin`, values)
        .then((Response) => {
          const token = Response.data.token;
          if (!token) {
            console.log("no token");
          } else {
            Cookies.set("memberToken", token, { expires: 1 });
            navigate("/");
          }
        });
    },
  });

  return (
    <div>
      {/* Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white text-black rounded-2xl max-w-md w-full p-6 shadow-lg text-center">
            <h2 className="text-lg font-bold mb-2">Security Notice</h2>
            <p className="mb-4">
              Your account was created with the default password <i className="text-red-600">"password"</i>. 
              For your security, please update your password to something stronger <span className="text-red-600">immediately </span> 
              using the user Dashboard.
            </p>
            <p className="mb-4 text-sm text-grey-600">
              If you're logging in again with this email, Please use the regular sign-in form instead of google login to avoid resetting your password in the future.
            </p>
            <button
              onClick={() => {
                setShowGoogleModal(false);
                navigate("/");
              }}
              className="mt-2 bg-[#FF7E00] hover:bg-[#e66e00] text-white px-4 py-2 rounded-md font-semibold"
            >
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Main Sign In Form */}
      <div className="flex h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-black">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl rounded-3xl border border-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-5">
            <img
              alt="Your Company"
              src="images/CompanyLogo.png"
              className="mx-auto"
              width={75}
            />
            <h2
              className="mt-10 text-center text-3xl font-bold leading-9 tracking-wider"
              style={{ color: "#FF7E00" }}
            >
              WELCOME BACK
            </h2>
            <p className="mt-2 text-white text-sm">
              Sign in to access your account and continue exploring our latest products
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <input
                  id="Memberemail"
                  name="Memberemail"
                  type="text"
                  autoComplete="username"
                  placeholder="E-mail"
                  value={formik.values.Memberemail}
                  onChange={formik.handleChange("Memberemail")}
                  className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"
                />
                {formik.errors.Memberemail && (
                  <div className="text-red-500 mb-3">{formik.errors.Memberemail}</div>
                )}

                <input
                  id="MemberPassword"
                  name="MemberPassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formik.values.MemberPassword}
                  onChange={formik.handleChange("MemberPassword")}
                  className="block w-full mb-2 rounded-md bg-transparent border border-white py-2 px-3 text-white placeholder-gray-400 font-semibold focus:border-[#FF7E00] focus:text-white focus:outline-none focus:ring-1 focus:ring-[#FF7E00] sm:text-sm sm:leading-6"
                />
                {formik.errors.MemberPassword && (
                  <div className="text-red-500 mb-3">{formik.errors.MemberPassword}</div>
                )}

                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-[#FF7E00] px-3 py-3.5 text-base font-bold leading-6 text-white shadow-sm hover:bg-[#e66e00] active:bg-[#cc6100] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF7E00]"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center text-white font-medium text-xs mt-2 mb-3">
                <p>Don't have an account?</p>
                <a href="/signup" className="ml-1 text-red-400">
                  Sign Up
                </a>
              </div>
            </form>

            <div className="flex items-center justify-center">
              <hr className="border border-gray-300 mt-1 w-full"></hr>
              <p className="ml-3 mr-3 text-gray-400 text-sm">or</p>
              <hr className="border border-gray-300 mt-1 w-full"></hr>
            </div>

            <div className="flex w-full mb-4 items-end align-middle justify-center mt-5">
              <div className="pl-5 pr-5">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    try {
                      const dec = jwtDecode(credentialResponse?.credential);
                      const username = dec.name;
                      const email = dec.email;
                      const lastname = dec.family_name || "lname";
                      const firstname = dec.given_name || "fname";
                      const password = "password";

                      axios
                        .post(`${process.env.REACT_APP_SERVER_URL}/member/addmembers`, {
                          username,
                          email,
                          lastname,
                          firstname,
                          password,
                        })
                        .then((Response) => {
                          Cookies.set("memberToken", credentialResponse.credential, { expires: 1 });
                          setShowGoogleModal(true); // Show modal instead of immediate navigation
                        });
                    } catch (error) {
                      console.log("Google Login Error:", error);
                    }
                  }}
                  onError={() => {
                    console.log("Login Failed");
                  }}
                  auto_select
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
