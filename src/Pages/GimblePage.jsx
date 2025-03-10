import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import Pagination from "../Components/Pagination";
import Records from "../Components/Records";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";


function GimblePage() {


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

  // pagination test data

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

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
  


  // handle change function
  const handleChange = async (e) => {
    const { name, value, checked } = e.target;
    setSelectedOptions(prevState =>
      checked
        ? [...prevState, { field: name, value }]
        : prevState.filter(option => option.field !== name || option.value !== value)
    );
  };




  // Fetch data whenever selectedOptions change
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = selectedOptions.length > 0
          ? await axios.post('https://backend.spkstore.lk/product/getProductsFilter', { checkboxes: selectedOptions })
          : await axios.get('https://backend.spkstore.lk/product/getProducts');
          
        // Filter the products where itemType is "Gimble"
         const filteredData = response.data.data.filter(product => product.itemType === "Gimble");
         setData(response.data.data);
         setData(filteredData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
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
//  const nPages = Math.ceil(data.length / recordsPerPage) ; // Ensure at least one page if data is not empty

  return (
    <div>
      <Navbar data={username} />

      <div className="2xl:flex overflow-hidden relative flex-col justify-center items-start min-h-[420px] max-md:pr-5">
        <img
          loading="lazy"
          src="images/Gimbal.png"
          className="object-cover absolute inset-0 size-full"
        />
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d9960fc1df6c020e8e19f8eb538773352dab936d80fb9432ce1c852a919c8ee4?"
          className=" absolute max-w-full aspect-[1.85] fill-red-400 bg-opacity-80 w-[820px] "
        />
        <p className="absolute ml-52 text-8xl text-white font-bold tracking-wide ">
          Gimble
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
            {/* Brands title */}
            <h3 className="text-lg font-semibold">Brands</h3>
           

           {/* DJI Input type checkbox */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="DJI"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'selectedBrand' && option.value === 'DJI')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3"  style={{ color: '#757575' }}>DJI</p>
            </div>


            {/* Potensic Input type checkbox   */}
            <div className="flex items-center align-middle">
              <input
                value="Potensic"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'selectedBrand' && option.value === 'Potensic')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Potensic</p>
            </div>




            {/* FIMI Input type checkbox   */}
            <div className="flex items-center align-middle">
              <input
                value="FIMI"
                name="selectedBrand"
                // defaultChecked=""
                // id="flexCheckDefault"
                // name="languages"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'selectedBrand' && option.value === 'FIMI')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3"  style={{ color: '#757575' }}>FIMI</p>
            </div>

            

          </div>
          {/* End of the brand */}


{/* 
          <div className="mt-4">
            
          
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
              <p className="ml-3"  style={{ color: '#757575' }}>In Stock</p>
            </div>

           
            <div className="flex items-center align-middle">
              <input
                value="Out of stock"
                name="availability"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'availability' && option.value === 'Out of stock')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3"  style={{ color: '#757575' }}>Pre Order</p>
            </div>

          </div> */}


          <div className="mt-4">
            
            {/* Offers topic */}
            <h3 className="text-lg font-semibold">Offers</h3>
            
            {/* Hot deals check */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="Yes"                
                name="offers"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'offers' && option.value === 'Yes')}
                onChange={handleChange} 
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3"  style={{ color: '#757575' }}>Hot Deals</p>
            </div>


          </div>


          {/* Axis field starts here */}
          <div className="mt-4">
            {/* Axis check box */}
            <h3 className="text-lg font-semibold">Axis</h3>
           
            {/* 3 axis */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="3axis"
                name="axis"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'axis' && option.value === '3axis')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>3axis</p>
            </div>

             {/* 2 axis */}
             <div className="flex items-center align-middle ">
              <input
                value="2axis"
                name="axis"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'axis' && option.value === '2axis')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>2axis</p>
            </div>

              {/* 1 axis */}
              <div className="flex items-center align-middle ">
              <input
                value="1axis"
                name="axis"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'axis' && option.value === '1axis')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>1axis</p>
            </div>


  

          </div>


          {/* Devices Check box */}
          <div className="mt-4">
           
           {/* Label Range */}
            <h3 className="text-lg font-semibold">Devices</h3>
           
            {/* Mirrorless Camera checkboxes */}
            <div className="flex items-center align-middle mt-4">
              <input
               value="Mirrorless Camera"
               name="devices"
               type="checkbox"
               checked={selectedOptions.some(option => option.field === 'devices' && option.value === 'Mirrorless Camera')}
               onChange={handleChange}
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Mirrorless Camera</p>
            </div>


           
          


            {/* DSLRCamera checkboxes */}
            <div className="flex items-center align-middle ">
              <input
               value="DSLRCamera"
               name="devices"
               type="checkbox"
               checked={selectedOptions.some(option => option.field === 'devices' && option.value === 'DSLRCamera')}
               onChange={handleChange}
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>DSLRCamera</p>
            </div>



             <div className="flex items-center align-middle ">
              <input
               value="Mobile phone"
               name="devices"
               type="checkbox"
               checked={selectedOptions.some(option => option.field === 'devices' && option.value === 'Mobile phone')}
               onChange={handleChange}
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Mobile phone</p>
            </div>


              <div className="flex items-center align-middle">
              <input
               value="Action Camera"
               name="devices"
               type="checkbox"
               checked={selectedOptions.some(option => option.field === 'devices' && option.value === 'Action Camera')}
               onChange={handleChange}
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Action Camera</p>
            </div>



            <div className="flex items-center align-middle ">
              <input
               value="Digitech Camera"
               name="devices"
               type="checkbox"
               checked={selectedOptions.some(option => option.field === 'devices' && option.value === 'Digitech Camera')}
               onChange={handleChange}
               className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Digitech Camera</p>
            </div>

          </div>



          {/* Features div */}
          <div className="mt-4  mb-32">
            
            {/* Features label */}
            <h3 className="text-lg font-semibold">Features</h3>
            
            {/* AI Tracking checkbox */}
            <div className="flex items-center align-middle mt-4">
              <input
                value="AI Tracking"
                name="features"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'features' && option.value === 'AI Tracking')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>AI Tracking</p>
            </div>

              {/* Display checkbox */}
              <div className="flex items-center align-middle ">
              <input
                value="Display"
                name="features"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'features' && option.value === 'Display')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Display</p>
            </div>


              {/* Fill Light checkbox */}
              <div className="flex items-center align-middle ">
              <input
                value="Fill Light"
                name="features"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'features' && option.value === 'Fill Light')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Fill Light</p>
            </div>


              {/* Auto Tracking checkbox */}
              <div className="flex items-center align-middle ">
              <input
                value="Auto Tracking"
                name="features"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'features' && option.value === 'Auto Tracking')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Auto Tracking</p>
            </div>

              {/* Built-in extension pole checkbox */}
              <div className="flex items-center align-middle ">
              <input
                value="Built-in extension pole"
                name="features"
                type="checkbox"
                checked={selectedOptions.some(option => option.field === 'features' && option.value === 'Built-in extension pole')}
                onChange={handleChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <p className="ml-3" style={{ color: '#757575' }}>Built-in extension pole</p>
            </div>

           


            
   
          </div>
          {/* Fly time section ends */}


        </div>

        

        {/* pagination test with internet data */}

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

export default GimblePage;
