import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function SignIn() {
  const navigate = useNavigate();

  const initialValues = {
    Memberemail: "",
    MemberPassword: "",
  };

  const LoginSchema = Yup.object().shape({
    Memberemail: Yup.string().required("Username is required"),
    MemberPassword: Yup.string().required("Password is required"),
    // .min(8, "Not less than 8")
    // .matches(/(?=.*[a-z])(?=.*[A-Z])\w+/, "contain 1 upper and lower ")
    // .matches(/\d/, "contain 1 number")
    // .matches(
    //   /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/,
    //   "contain 1 special charactor"
    // ),
  });

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      console.log(values);

      // let formData = new FormData();

      // for (let value in values) {
      //   formData.append(value, values[value]);
      // }
      // formData.append('photo', values.photo);

      // for (let [key, val] of formData.entries()) {
      //   console.log(key, val);
      // }

      axios
        .post("https://backend.spkstore.lk/jAuth/memberlogin", values)
        .then((Response) => {
          console.log(Response.data);
          const token = Response.data.token;
          if (!token) {
            console.log("no token");
          } else {
            Cookies.set("memberToken", token, { expires: 1 });
            const cookieget = Cookies.get("memberToken");
            console.log(cookieget);
            navigate("/auth");
          }
          // setAlertMsg(true);
          // again after expire on token
          // nedd to call refresh token to get new token
        });
    },
  });

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-xl bg-gray-100 rounded-3xl">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm  mt-5">
            <img
              alt="Your Company"
              src="images/CompanyLogo.png"
              className="mx-auto"
              width={75}
              // height={30}
            />
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-wider text-gray-900">
              WELCOME BACK
            </h2>
            <p className="mt-2 font-light text-sm">
            Sign in to access your account and continue exploring our latest products
            </p>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
            <form onSubmit={formik.handleSubmit}>
              <div className="">
                <input
                  id="Memberemail"
                  name="Memberemail"
                  type="text"
                  autoComplete="username"
                  placeholder="E-mail"
                  value={formik.values.Memberemail}
                  onChange={formik.handleChange("Memberemail")}
                  className="block w-full mb-4 rounded-md border-0 py-2.0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-md"
                />
                {formik.errors.Memberemail ? (
                  <div className="text-red-500 ">
                    {formik.errors.Memberemail}
                  </div>
                ) : null}

                <input
                  id="MemberPassword"
                  name="MemberPassword"
                  type="password"
                  autoComplete="current-password"
                  placeholder="Password"
                  value={formik.values.MemberPassword}
                  onChange={formik.handleChange("MemberPassword")}
                  className="block w-full mb-4 rounded-md border-0 py-2.0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-500 font-semibold focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 sm:max-w-md"
                />
                {formik.errors.MemberPassword ? (
                  <div className="text-red-500">
                    {formik.errors.MemberPassword}
                  </div>
                ) : null}

              

                <div className="">
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-red-400 px-3 py-3.5 text-base font-bold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center font-medium text-xs mt-2 mb-3">
                <p>Don't have and account?</p>
                <a href="/signup" className="ml-1 text-red-400">
                  Sign Up
                </a>
              </div>
            </form>

            <div className="flex items-center justify-center ">
              <hr className="border border-gray-300 mt-1 w-full"></hr>
              <p className="ml-3 mr-3 text-gray-400 text-sm">or</p>
              <hr className="border border-gray-300 mt-1 w-full"></hr>
            </div>

            <div className="flex w-full mb-4 items-end align-middle justify-center mt-5">
              <div className=" border"></div>
              <div className="pl-5 pr-5">
                <GoogleLogin
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    const dec = jwtDecode(credentialResponse?.credential);
                    console.log(dec);
                    try {
                      const username = dec.name;
                      const email = dec.email;
                      const lastname = dec.family_name;
                      const firstname = dec.given_name;

                      axios
                        .post("https://backend.spkstore.lk/member/addmembers", {
                          username,
                          email,
                          lastname,
                          firstname,
                        })
                        .then((Response) => {
                          console.log(Response.data);
                          Cookies.set(
                            "memberToken",
                            credentialResponse.credential,
                            { expires: 1 }
                          );
                          const cookieget = Cookies.get("memberToken");
                          console.log(cookieget);
                          navigate("/auth");
                        });
                    } catch (error) {
                      console.log(error);
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

          {/* div here */}
        </div>
      </div>
    </div>
  );
}

export default SignIn;
