import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import Pagination from "../Components/Pagination";
import Records from "../Components/Records";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function ProductsPage() {
  const cookieget = Cookies.get("memberToken");

  let username = "";

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    if (decoded.given_name) {
      username = decoded.given_name;
    } else {
      username = decoded.username || "";
    }
  }

  // const decoded = jwtDecode(cookieget);
  // console.log(decoded);

  // const username = decoded.username;

  // pagination test data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [results, setResults] = useState([]);

  // const [events, setEvents] = useState([]);

  // useEffect(() => {
  //   axios.get("https://backend.spkstore.lk/product/getProducts").then((Response) => {
  //     console.log(Response);
  //     // setEvents(Response.data.data);
  //     setData(Response.data.data);
  // setLoading(false);
  //   });
  // }, []);

  // const [userinfo, setUserInfo] = useState({ languages: [] });

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;
    setSelectedOptions((prevState) =>
      checked
        ? [...prevState, { field: name, value }]
        : prevState.filter(
            (option) => option.field !== name || option.value !== value
          )
    );
  };

  // Fetch data whenever selectedOptions change
  useEffect(() => {
    if (selectedOptions.length > 0) {
      axios
        .post(`${process.env.REACT_APP_SERVER_URL}/product/getProductsFilter`, {
          checkboxes: selectedOptions,
        })
        .then((response) => {
          // setResults(response.data);
          setData(response.data.data);
          console.log(response.data.data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    } else {
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/product/getProducts`)
        .then((response) => {
          // Filter the products where itemType is "Drone"
            // const filteredData = response.data.data.filter(
            //   (product) => product.itemType === "Drone"
            // );
          setData(response.data.data);
          // setData(filteredData);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [selectedOptions]);

  console.log(data);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord)

  let currentRecords;
  let nPages = [];

  if (Array.isArray(data) && data.length > 0) {
    currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  } else {
    currentRecords = []; // or null, depending on your preference
  }

  // Then, you can check if currentRecords is empty and display a message
  if (currentRecords.length === 0) {
    console.log("No records found.");
    // Display a message to the user in your UI
  } else {
    // Proceed with displaying the currentRecords
    nPages = Math.ceil(data.length / recordsPerPage); // Ensure at least one page if data is not empty
  }

  // Calculate number of pages

  return (
    <div className="bg-black" style={{ color: '#FF7E00' }}>
      <Navbar data={username} />

      <div className="2xl:flex overflow-hidden relative flex-col justify-center items-start min-h-[420px] max-md:pr-5">
        <img
          loading="lazy"
          src="images/products.png"
          className="object-cover absolute inset-0 size-full"
        />
      </div>

      <div className="flex">
        <div className="max-w-md border-r-2 pl-20 pr-3">
        <div className="flex mt-10 mb-5">
            <h1 className="text-2xl font-semibold">Results</h1>
            <a href="" className="ml-32 text-sm text-red-400 border mr-2">
              Clear all
            </a>
          </div>
          <div>
            {/* labels */}
            <h3 className="text-lg font-semibold">Category</h3>

            <div className="flex items-center align-middle mt-4">
              <input
                value="Cake"
                name="itemType"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "itemType" && option.value === "Cake"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Cake
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Cupcake"
                name="itemType"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "itemType" &&
                    option.value === "Cupcake"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Cupcake
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Dessert"
                name="itemType"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "itemType" && option.value === "Dessert"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Dessert
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Other"
                name="itemType"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "itemType" && option.value === "Other"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Other
              </p>
            </div>

          </div>

          <div className="mt-4">
            {/* Brands labels */}
            <h3 className="text-lg font-semibold">Sub-category</h3>

            <div className="flex items-center align-middle mt-4">
              <input
                value="Chocolate"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "selectedBrand" && option.value === "Chocolate"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Chocolate
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Butter"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "selectedBrand" &&
                    option.value === "Butter"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Butter
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Vanilla"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "selectedBrand" && option.value === "Vanilla"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Vanilla
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Other"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "selectedBrand" && option.value === "Other"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Other
              </p>
            </div>

          </div>

          <div className="mt-4">
            <h2 className="text-lg font-semibold">Offers</h2>

            {/* Hot deals check */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="Yes"
                name="Offers"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "Offers" && option.value === "Yes"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                style={{ backgroundColor: '#FF7E00' }}
              />
              <p className="ml-3">
                Hot Deals
              </p>
            </div>
          </div>
        </div>

        {/* pagination test with  data */}

        <div className="container m-5">
          <div className="flex flex-col align-middle">
            <div className="h-[1000px]">
              {nPages > 0 ? (
                <Records data={currentRecords} />
              ) : (
                <p className="text-lg tracking-wider font-thin italic mx-auto justify-center items-center ">No records found.</p>
              )}
            </div>
            {nPages > 0 && (
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>

        {/* pagination test done  */}
      </div>
      <Footer />
    </div>
  );
}

export default ProductsPage;
