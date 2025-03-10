import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import Pagination from "../Components/Pagination";
import Records from "../Components/Records";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

function SmartPhonePage() {

  const cookieget = Cookies.get("memberToken");

  let username = '';

  if (cookieget) {
    const decoded = jwtDecode(cookieget);
    if (decoded.given_name) {
       username = decoded.given_name
    }else{

      username = decoded.username || '';
    }
  
}

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(9);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;
    setSelectedOptions(prevState =>
      checked
        ? [...prevState, { field: name, value }]
        : prevState.filter(option => option.field !== name || option.value !== value)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = selectedOptions.length > 0
          ? await axios.post('https://backend.spkstore.lk/product/getProductsFilter', { checkboxes: selectedOptions })
          : await axios.get('https://backend.spkstore.lk/product/getProducts');
        
        const filteredData = response.data.data.filter(product => product.itemType === "SmartWatch");
        setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [selectedOptions]);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  // const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);


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
  // const nPages = Math.ceil(data.length / recordsPerPage);

  return (
    <div>
      <Navbar data={username} />

      <div className="2xl:flex overflow-hidden relative flex-col justify-center items-start min-h-[420px] max-md:pr-5">
        <img
          loading="lazy"
          src="images/smartwatch.jpg"
          className="object-cover absolute inset-0 size-full"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9960fc1df6c020e8e19f8eb538773352dab936d80fb9432ce1c852a919c8ee4?"
          className=" absolute max-w-full aspect-[1.85] fill-orange-800 bg-opacity-80 w-[820px] "
        />
        <p className="absolute ml-28 text-8xl text-white font-bold tracking-wide">
          SmartWatches
        </p>
      </div>

      <div className="flex ">
        <div className="max-w-md border-r-2 pl-20 pr-3">
          <div className="flex mt-10 mb-5">
          <h1 className="text-2xl font-semibold">Results</h1>
          <a href="" className="ml-32 text-sm text-red-400 border mr-2">
              Clear all
            </a>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold">Brands</h3>
            {/* Add brand checkboxes here */}
           
           
            {/* ZeBlaze checkbox */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="ZeBlaze"
                name="selectedBrand"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'selectedBrand' && option.value === 'ZeBlaze')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>ZeBlaze</p>
            </div>




             {/* CMF checkbox */}
             <div className="flex items-center align-middle ">
              <input
                value="CMF"
                name="selectedBrand"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'selectedBrand' && option.value === 'CMF')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>CMF</p>
            </div>



             {/* Redmi checkbox */}
             <div className="flex items-center align-middle ">
              <input
                value="Redmi"
                name="selectedBrand"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'selectedBrand' && option.value === 'Redmi')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Redmi</p>
            </div>


              {/* Haylou checkbox */}
              <div className="flex items-center align-middle ">
              <input
                value="Haylou"
                name="selectedBrand"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'selectedBrand' && option.value === 'Haylou')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Haylou</p>
            </div>




            {/* Add more brand checkboxes as needed */}
          </div>

{/* 
          <div className="mt-4 ">
            <h3 className="text-lg font-semibold">Availability</h3>
            <div className="flex items-center align-middle mt-4">
              <input
                value="In stock"
                name="availability"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'availability' && option.value === 'In stock')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>In Stock</p>
            </div>
            <div className="flex items-center align-middle">
              <input
                value="Pre Order"
                name="availability"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'availability' && option.value === 'Pre Order')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Pre Order</p>
            </div>
          </div> */}


           
          <div className="mt-4 mb-72">
            <h3 className="text-lg font-semibold">Offers</h3>
            <div className="flex items-center align-middle mt-4">
              <input
                value="Yes"
                name="Offers"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'Offers' && option.value === 'Yes')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Hot Deals</p>
            </div>
          </div>
        </div>

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
      </div>
      <Footer />
    </div>
  );
}

export default SmartPhonePage;
