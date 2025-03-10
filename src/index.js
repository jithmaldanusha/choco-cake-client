import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import GoogleProviderWrapper from "./Components/GoogleProviderWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="901945686765-8mf59femqu5gmc20ilf6fiiipn2nl4nf.apps.googleusercontent.com">
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))f
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
