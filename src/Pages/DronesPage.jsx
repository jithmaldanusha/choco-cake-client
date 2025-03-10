import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import Pagination from "../Components/Pagination";
import Records from "../Components/Records";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function DronesPage() {
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
        .post("https://backend.spkstore.lk/product/getProductsFilter", {
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
        .get("https://backend.spkstore.lk/product/getProducts")
        .then((response) => {
          // Filter the products where itemType is "Drone"
          const filteredData = response.data.data.filter(
            (product) => product.itemType === "Drone"
          );
          setData(response.data.data);
          setData(filteredData);
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
    <div>
      <Navbar data={username} />

      <div className="2xl:flex overflow-hidden relative flex-col justify-center items-start min-h-[420px] max-md:pr-5">
        <img
          loading="lazy"
          src="images/Drone.png"
          className="object-cover absolute inset-0 size-full"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9960fc1df6c020e8e19f8eb538773352dab936d80fb9432ce1c852a919c8ee4?"
          className=" absolute max-w-full aspect-[1.85] fill-red-400 bg-opacity-80 w-[820px] "
        />
        <p className="absolute ml-52 text-8xl text-white font-bold tracking-wide ">
          Drones
        </p>
      </div>

      <div className="flex ">
        <div className="max-w-md border-r-2  pl-20 pr-3">
          <div className="flex mt-10 mb-5">
            <h1 className="text-2xl font-semibold">Results</h1>
            <a href="" className="ml-32 text-sm text-red-400 border mr-2">
              Clear all
            </a>
          </div>
          <div>
            {/* Brands labels */}
            <h3 className="text-lg font-semibold">Brands</h3>

            <div className="flex items-center align-middle mt-4">
              <input
                value="DJI"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "selectedBrand" && option.value === "DJI"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                DJI
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Potensic"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "selectedBrand" &&
                    option.value === "Potensic"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                Potensic
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="FIMI"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "selectedBrand" && option.value === "FIMI"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                FIMI
              </p>
            </div>
          </div>
         
          {/* <div className="mt-4">
         
            <h2 className="text-lg font-semibold">Availability</h2>

            <div className="flex items-center align-middle mt-4">
              <input
                value="In stock"
                name="availability"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "availability" &&
                    option.value === "In stock"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                In Stock
              </p>
            </div>

            <div className="flex items-center align-middle">
              <input
                value="Pre Order"
                name="availability"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "availability" &&
                    option.value === "Pre Order"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                Pre Order
              </p>
            </div>
          </div> */}

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
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                Hot Deals
              </p>
            </div>
          </div>

          <div className="mt-4">
            {/* Camera Label */}
            <h2 className="text-lg font-semibold">Camera</h2>

            {/* 2.7K30FPS */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="2.7K30FPS"
                name="camera"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "camera" && option.value === "2.7K30FPS"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                2.7K30FPS
              </p>
            </div>

            {/* 4K30FPS camera */}
            <div className="flex items-center align-middle">
              <input
                value="4K30FPS"
                name="camera"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "camera" && option.value === "4K30FPS"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                4K30FPS
              </p>
            </div>

            {/* 4K60FPS  camera */}
            <div className="flex items-center align-middle">
              <input
                value="4K60FPS"
                name="camera"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "camera" && option.value === "4K60FPS"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                4K60FPS
              </p>
            </div>

            {/* 8k  camera */}
            <div className="flex items-center align-middle ">
              <input
                value="8K"
                name="camera"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) => option.field === "camera" && option.value === "8K"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                8K
              </p>
            </div>
          </div>

          <div className="mt-4">
            {/* Range Checkbox set */}
            <h2 className="text-lg font-semibold">Range</h2>

            {/* 3KM checkboxes */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="3KM"
                name="range"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) => option.field === "range" && option.value === "3KM"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                3KM
              </p>
            </div>

            {/* 6KM checkboxes */}
            <div className="flex items-center align-middle ">
              <input
                value="6KM"
                name="range"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) => option.field === "range" && option.value === "6KM"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                6KM
              </p>
            </div>

            {/* 9KM checkboxes */}
            <div className="flex items-center align-middle ">
              <input
                value="9KM"
                name="range"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) => option.field === "range" && option.value === "9KM"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                9KM
              </p>
            </div>

            {/* 10KM checkboxes */}
            <div className="flex items-center align-middle ">
              <input
                value="10KM"
                name="range"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "range" && option.value === "10KM"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                10KM
              </p>
            </div>

            {/* 20KM checkboxes */}
            <div className="flex items-center align-middle ">
              <input
                value="20KM"
                name="range"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "range" && option.value === "20KM"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                20KM
              </p>
            </div>
          </div>

          <div className="mt-4 mb-32">
            {/* fly time checkbox set */}
            <h2 className="text-lg font-semibold">Fly Time</h2>

            {/* 32min checkbox */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="32min"
                name="flyTime"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "flyTime" && option.value === "32min"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                32min
              </p>
            </div>

            {/* 64min checkbox */}
            <div className="flex items-center align-middle ">
              <input
                value="64min"
                name="flyTime"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "flyTime" && option.value === "64min"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                64min
              </p>
            </div>

            {/* 96min checkbox */}
            <div className="flex items-center align-middle ">
              <input
                value="96min"
                name="flyTime"
                type="checkbox"
                checked={selectedOptions.some(
                  (option) =>
                    option.field === "flyTime" && option.value === "96min"
                )}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: "#757575" }}>
                96min
              </p>
            </div>
          </div>
        </div>

        {/* pagination test with  data */}

        <div className="container m-5">
          <div className="flex flex-col align-middle">
            <div className="h-[1350px]">
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

export default DronesPage;
