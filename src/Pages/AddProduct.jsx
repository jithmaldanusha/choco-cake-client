import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

function AddProduct() {
  const [isDroneSelected, setIsDroneSelected] = useState(false);
  const [isGimbalSelected, setIsGimbalSelected] = useState(false);
  const [IsSmartWatchSelected, setIsSmartWatchSelected] = useState(false);
  const [IsOtherSelected, setIsOtherSelected] = useState(false);
  const [BrancdSelected, setBrancdSelected] = useState();
  const [images, setImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  // initial values
  const initialValues = {
    brand: [],
    selectedBrand: "",
    itemID: "",
    itemType: "",
    itemName: "",
    shortDescription: "",
    // availability: "",
    offers: "",
    originalPrice: "",
    priceAfterDiscount: "",
    warranty: 0,
    quantity: "",
    camera: "",
    range: "",
    // preOrderAvailability: "",
    axis: "",
    devices: "",
    features: "",
    // technicalSpecifications: "",
    itemDescription: [],
    itemsWithAccessoriesImages1: "",
    itemsWithAccessoriesImages2: "",
    itemsWithAccessoriesImages3: "",
    itemImage: [],
    topic1: "",
    description1: "",
    topic2: "",
    description2: "",
    topic3: "",
    description3: "",
  };

  //validations
  const validationSchema = Yup.object().shape({
    itemName: Yup.string().required("Item Name is required"),
  });

  // Handle brand options based on item type
  const handleItemTypeChange = (event) => {
    const selectedItemType = event.target.value;
    formik.setFieldValue("itemType", selectedItemType);

    // Update the boolean state to diable the
    setIsDroneSelected(selectedItemType === "Cake");
    setIsGimbalSelected(selectedItemType === "Cupcake");
    setIsSmartWatchSelected(selectedItemType === "Dessert");
    setIsOtherSelected(selectedItemType === "Other");

    let brands = [];
    switch (selectedItemType) {
      case "Cake":
        brands = ["Chocolate", "Butter", "Ghetto", "Spocge", "Cofee"];
        break;
      case "Cupcake":
        brands = ["Vanilla", "Chocolate", "Red-Velvet", "Other"];
        break;
      case "Dessert":
        brands = ["Pudding", "Jelly", "Brownies"];
        break;
      case "Other":
        brands = [
          "IceCream",
        ];
        break;
      default:
        brands = [];
    }
    formik.setFieldValue("brand", brands);
    console.log(brands);

    // formik.setFieldValue("brand", ""); // Reset the brand field
  };
  // image upload
  const handleImageUpload = (event) => {
    const uploadedImages = Array.from(event.target.files);
    setImages([...images, ...uploadedImages]);
    formik.setFieldValue("itemImage", [...images, ...uploadedImages]);
  };

  // set state of selected brand
  const handleSelectedBrandChange = (event) => {
    //  {formik.handleChange("shortDescription")}
    const selectedBrandChange = event.target.value;
    setBrancdSelected(selectedBrandChange);
    formik.handleChange("brand");
    console.log(selectedBrandChange);
    formik.setFieldValue("selectedBrand", selectedBrandChange);
  };

  const handleMultipledisabledSection = (event) => {
    //  {formik.handleChange("shortDescription")}
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
      let formData = new FormData();
      // Object.keys(values).forEach((key) => {
      //   formData.append(key, values[key]);
      // });
      // productImages.forEach((image, index) => {
      //   formData.append(`productImage_${index}`, image);
      // });

      for (let value in values) {
        formData.append(value, values[value]);
      }

      for (const image of values.itemImage) {
        formData.append("itemImage", image);
      }

      for (const image1 of values.itemDescription) {
        formData.append("itemDescription", image1);
      }

      axios
        .post("https://backend.spkstore.lk/product/addProduct", formData)
        .then((response) => {
          console.log(response.data);
          setShowAlert(true);


        });

      setTimeout(() => {
        setShowAlert(false);
      }, 9000);
    },
  });

  return (
    <div className="flex bg-red-300 ">
      <aside style={{ width: "15rem" }} className="h-screen bg-[#6C070E]">
        <div className="p-6">
          {/* company image */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src="/images/CompanyLogo.png"
              alt="choco"
              style={{ width: "8rem", height: "8rem" }}
            />
          </div>

          <nav className="mt-10 space-y-2">
            <button
              className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
              onClick={() => (window.location.href = "/admin")}
            >
              <img
                src="/images/dashboardiconblack.png"
                alt="Dashboard"
                className="h-6 w-6"
              />
              <span className="font-semibold text-[#FF7E00]">Dashboard</span>
            </button>
            <button
              className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
              onClick={() => (window.location.href = "/addproduct")}
            >
              <img
                src="/images/Addimage.png"
                alt="Addimage"
                className="h-6 w-6"
              />
              <span className="font-semibold text-[#FF7E00]">Add Product</span>
            </button>
            <button
              className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
              onClick={() => (window.location.href = "/myproducts")}
            >
              <img
                src="/images/Addimage.png"
                alt="My Products"
                className="h-6 w-6"
              />
              <span className="font-semibold text-[#FF7E00]">MY Products</span>
            </button>
            <button
              className="flex items-center space-x-3 text-gray-700 p-3 rounded-md hover:bg-white focus:outline-none w-48"
              onClick={() => (window.location.href = "/adminOrder")}
            >
              <img
                src="/images/shoppingBag.png"
                alt="ShoppingBag"
                className="h-6 w-6"
              />
              <span className="font-semibold text-[#FF7E00]">My Order</span>
            </button>
          </nav>
        </div>
      </aside>

      <main className="2xl:flex flex-col w-full p-6 bg-gray-50">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Add New Product</h1>
          <div className="flex items-center space-x-3">
            <img
              src="https://s3-alpha-sig.figma.com/img/ab45/5ac8/d3acc971191752ce2c32265f2dcb34bc?Expires=1722211200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=HrJQ1uVLXL1jCl9zwgjICytFB9KkVmrJpX4T3giiieEgc4wjN2eGRDzfJBAjv-oUMyAUrKjnV0p-hAQsE7nMikS74SH~Fl8YUfON~auA6aXw1V4GXBLtzSV1087-NgxiQw4fnabkicNxC1De2YYcXURE~fEKtROPbChwREfvvBmymxtsON0FZ~WdwgaHMOWgHAa~mWj1NNDaAYiSVDgxlYZsVIZoS7PObgMiwLCEmWJDIeiXN7vre7vkQadesd6EF-4Su2AQibvkcgsJuANGmoMMRGC1fcT8nlbeQVNekTQWoCi9KtbY7Rg0hHl0mpNSWX89bX9Qj2Hf92hrOVtQtw__"
              alt="notification"
              className="w-6 h-6"
            />
            <div className="flex items-center space-x-2">
              <img
                src="/images/Adminlogo.png"
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <span className="font-bold block">Admin</span>
                <span className="text-sm text-gray-900 block">Welcome</span>
              </div>
            </div>
          </div>
        </header>

        <div className="2xl:p-4 rounded-md shadow-md bg-gray-100">
          <form onSubmit={formik.handleSubmit}>
            <div className=" grid grid-cols-2 grid-flow-row">
              {/* left side */}
              <div className="p-3">
                <div className="flex gap-6 w-full border mb-5">
                  <div className="w-full">
                    <input
                      // id="itemName"
                      name="itemName"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded placeholder-black"
                      value={formik.values.itemName}
                      onChange={formik.handleChange("itemName")}
                      // onBlur={formik.handleBlur}
                      placeholder="Item Name"
                    />

                    {formik.touched.itemName && formik.errors.itemName ? (
                      <div className="text-red-500">
                        {formik.errors.itemName}
                      </div>
                    ) : null}
                  </div>

                  <div className="w-full">
                    <select
                      name="itemType"
                      value={formik.values.itemType}
                      onChange={handleItemTypeChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Iten TYpe"
                    >
                      <option>Select item type</option>
                      <option>Cake</option>
                      <option>Cupcake</option>
                      <option>Dessert</option>
                      <option>Other</option>
                    </select>
                    {formik.touched.itemType && formik.errors.itemType ? (
                      <div className="text-red-500">
                        {formik.errors.itemType}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-5">
                  <select
                    // id="brand"
                    name="brand"
                    className="w-full p-2 border border-gray-300 rounded"
                    value={formik.values.brand}
                    onChange={handleSelectedBrandChange}
                    // onBlur={formik.handleBlur}

                    disabled={!formik.values.itemType} // Disable if item type is not selected
                  >
                    <option>Select Sub-Category</option>
                    {formik.values.brand.map((brand, index) => (
                      // <option key={index} value={brand} label={brand} />
                      <option key={index}>{brand}</option>
                    ))}
                  </select>
                  <div className="mt-1 font-semibold ml-3">
                    {BrancdSelected}
                  </div>
                  {formik.touched.brand && formik.errors.brand ? (
                    <div className="text-red-500">{formik.errors.brand}</div>
                  ) : null}
                </div>

                <div className="mb-5">
                  <input
                    // id="itemName"
                    name="shortDescription"
                    type="text"
                    className="w-full p-2 h-40 border border-gray-300 rounded placeholder-black"
                    value={formik.values.shortDescription}
                    onChange={formik.handleChange("shortDescription")}
                    // onBlur={formik.handleBlur}
                    placeholder="Short Description"
                  />
                  {formik.touched.shortDescription &&
                    formik.errors.shortDescription ? (
                    <div className="text-red-500">
                      {formik.errors.shortDescription}
                    </div>
                  ) : null}
                </div>

                <div className="flex gap-6">
                  {/* <div className="w-full">
                    <select
                      name="availability"
                      value={formik.values.availability}
                      onChange={formik.handleChange("availability")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Availability"
                    >
                      <option>Select availability</option>
                      <option>In stock</option>
                      <option>Out of stock</option>
                    </select>
                    {formik.touched.availability &&
                    formik.errors.availability ? (
                      <div className="text-red-500">
                        {formik.errors.availability}
                      </div>
                    ) : null}
                  </div> */}
                  <div className="w-full mb-5">
                    <select
                      name="offers"
                      value={formik.values.offers}
                      onChange={formik.handleChange("offers")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Offers"
                    >
                      <option>Offers</option>
                      <option>Yes</option>
                      <option>No</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-6 mb-5">
                  <div className="w-full">
                    <input
                      // id="itemName"
                      name="originalPrice"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded placeholder-black"
                      value={formik.values.originalPrice}
                      onChange={formik.handleChange("originalPrice")}
                      // onBlur={formik.handleBlur}
                      placeholder="Original price"
                    />
                    {formik.touched.originalPrice &&
                      formik.errors.originalPrice ? (
                      <div className="text-red-500">
                        {formik.errors.originalPrice}
                      </div>
                    ) : null}
                  </div>

                  <div className="w-full ">
                    <input
                      // id="itemName"
                      name="priceAfterDiscount"
                      type="text"
                      className="w-full p-2 border  border-gray-300 rounded placeholder-black"
                      value={formik.values.priceAfterDiscount}
                      onChange={formik.handleChange("priceAfterDiscount")}
                      // onBlur={formik.handleBlur}
                      placeholder="Price after discount"
                    />
                    {formik.touched.priceAfterDiscount &&
                      formik.errors.priceAfterDiscount ? (
                      <div className="text-red-500">
                        {formik.errors.priceAfterDiscount}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="flex gap-6 mb-5">
                  <div className="w-full">
                    <input
                      // id="itemName"
                      name="quantity"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded placeholder-black"
                      value={formik.values.quantity}
                      onChange={formik.handleChange("quantity")}
                      // onBlur={formik.handleBlur}
                      placeholder="quantity"
                    />
                    {formik.touched.quantity && formik.errors.quantity ? (
                      <div className="text-red-500">
                        {formik.errors.quantity}
                      </div>
                    ) : null}
                  </div>

                  {/* <div className="w-full ">
                    <input
                      // id="itemName"
                      name="warranty"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded placeholder-black"
                      value={formik.values.warranty}
                      onChange={formik.handleChange("warranty")}
                      // onBlur={formik.handleBlur}
                      placeholder="warranty"
                    />
                    {formik.touched.warranty && formik.errors.warranty ? (
                      <div className="text-red-500">
                        {formik.errors.warranty}
                      </div>
                    ) : null}
                  </div> */}
                </div>

                {/* <div className="flex gap-6 mb-5">
                  <div className="w-full">
                    <select
                      name="camera"
                      value={formik.values.camera}
                      onChange={formik.handleChange("camera")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="camera"
                      disabled={
                        isGimbalSelected ||
                        IsSmartWatchSelected ||
                        IsOtherSelected
                      }
                    >
                      <option>Select camera option</option>
                      <option>2.7K30FPS</option>
                      <option>4K30FPS</option>
                      <option>4K60FPS</option>
                      <option>8K</option>
                    </select>
                    {formik.touched.camera && formik.errors.camera ? (
                      <div className="text-red-500">{formik.errors.camera}</div>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <select
                      name="range"
                      value={formik.values.range}
                      onChange={formik.handleChange("range")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="range"
                      disabled={
                        isGimbalSelected ||
                        IsSmartWatchSelected ||
                        IsOtherSelected
                      }
                    >
                      <option>Select range option</option>
                      <option>3 KM</option>
                      <option>6 KM</option>
                      <option>9 KM</option>
                      <option>10 KM</option>
                      <option>20 KM</option>
                    </select>
                    {formik.touched.range && formik.errors.range ? (
                      <div className="text-red-500">{formik.errors.range}</div>
                    ) : null}
                  </div>
                </div> */}

                <div className="flex mb-5">
                  {/* <div>
                    <select
                      name="flyTime"
                      value={formik.values.flyTime}
                      onChange={formik.handleChange("flyTime")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="flyTime"
                    >
                      <option>Select fly time option</option>
                      <option>32 min</option>
                      <option>64 min</option>
                      <option>96 min</option>
                    </select>
                    {formik.touched.flyTime && formik.errors.flyTime ? (
                      <div className="text-red-500">
                        {formik.errors.flyTime}
                      </div>
                    ) : null}
                  </div> */}
                  {/* preorder */}
                  {/* <div>
                    <select
                      name="range"
                      value={formik.values.range}
                      onChange={formik.handleChange("range")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="range"
                    >
                      <option>Offers</option>
                      <option>Yes</option>
                      <option>No</option>
                    
                    </select>
                    {formik.touched.range && formik.errors.range ? (
                        <div className="text-red-500">
                          {formik.errors.range}
                        </div>
                      ) : null}
                  </div> */}
                </div>

                {/* <div className="flex gap-6 mb-5">
                  <div className="w-full">
                    <select
                      name="axis"
                      value={formik.values.axis}
                      onChange={formik.handleChange("axis")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="axis"
                      disabled={
                        isDroneSelected ||
                        IsSmartWatchSelected ||
                        IsOtherSelected
                      }
                    // disabled={IsSmartWatchSelected}
                    >
                      <option>Select axis option</option>
                      <option>3 axis</option>
                      <option>2 axis</option>
                      <option>1 axis</option>
                    </select>
                    {formik.touched.axis && formik.errors.axis ? (
                      <div className="text-red-500">{formik.errors.axis}</div>
                    ) : null}
                  </div>
                  <div className="w-full">
                    <select
                      name="devices"
                      value={formik.values.devices}
                      onChange={formik.handleChange("devices")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="range"
                      disabled={
                        isDroneSelected ||
                        IsSmartWatchSelected ||
                        IsOtherSelected
                      }
                    >
                      <option>Select device option</option>
                      <option>Mirrorless Camera</option>
                      <option>DSLR Camera</option>
                      <option>Mobile phone</option>
                      <option>Action Camera</option>
                      <option>Digitech Camera</option>
                    </select>
                    {formik.touched.devices && formik.errors.devices ? (
                      <div className="text-red-500">
                        {formik.errors.devices}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div>
                  <div>
                    <select
                      name="features"
                      value={formik.values.features}
                      onChange={formik.handleChange("features")}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="range"
                      disabled={
                        isDroneSelected ||
                        IsSmartWatchSelected ||
                        IsOtherSelected
                      }
                    >
                      <option>Select feature option</option>
                      <option>AI Tracking</option>
                      <option>Display</option>
                      <option>Fill Light</option>
                      <option>Auto Tracking</option>
                      <option>Built-in extension pole</option>
                    </select>
                    {formik.touched.features && formik.errors.features ? (
                      <div className="text-red-500">
                        {formik.errors.features}
                      </div>
                    ) : null}
                  </div>
                </div> */}
                <div>
                  <div className="mb-5 mt-5">
                    <div className="flex items-center justify-center w-full">
                      <label
                        for="dropzone-file4"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                      >
                        <p className="">
                          {images.length > 0 ? images.length : "item images"}
                        </p>
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            SVG, PNG, JPG or GIF (MAX. 800x400px)
                          </p>
                        </div>
                        <input
                          id="dropzone-file4"
                          name="itemImage"
                          type="file"
                          className="hidden"
                          accept="itemImage/*"
                          // value={formik.values.itemsWithAccessoriesImages1}
                          onChange={handleImageUpload}
                          multiple
                        // onBlur={formik.handleBlur}
                        />
                      </label>
                    </div>
                    {formik.touched.itemImage && formik.errors.itemImage ? (
                      <div className="text-red-500">
                        {formik.errors.itemImage}
                      </div>
                    ) : null}
                  </div>
                </div>

                {/* file uploads */}
                <div className="flex">
                  {/* item accessories left */}
                  <div className="flex gap-6 w-full mb-5">
                    <div className="mb-5 mt-5">
                      <div className="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file1"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <p className="">Item images left</p>
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file1"
                            name="itemsWithAccessoriesImages1"
                            type="file"
                            className="hidden"
                            accept="itemsWithAccessoriesImages1/*"
                            // value={formik.values.itemsWithAccessoriesImages1}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "itemsWithAccessoriesImages1",
                                e.currentTarget.files[0]
                              );
                            }}
                          // onBlur={formik.handleBlur}
                          />
                        </label>
                      </div>
                      {formik.touched.itemsWithAccessoriesImages1 &&
                        formik.errors.itemsWithAccessoriesImages1 ? (
                        <div className="text-red-500">
                          {formik.errors.itemsWithAccessoriesImages1}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-5 mt-5">
                      <div className="flex items-center justify-center w-full">
                        <label
                          for="dropzone-file2"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <p className="">Item images middle</p>
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file2"
                            name="itemsWithAccessoriesImages2"
                            type="file"
                            className="hidden"
                            accept="itemsWithAccessoriesImages2/*"
                            // value={formik.values.itemsWithAccessoriesImages1}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "itemsWithAccessoriesImages2",
                                e.currentTarget.files[0]
                              );
                            }}
                          // onBlur={formik.handleBlur}
                          />
                        </label>
                      </div>
                      {formik.touched.itemsWithAccessoriesImages2 &&
                        formik.errors.itemsWithAccessoriesImages2 ? (
                        <div className="text-red-500">
                          {formik.errors.itemsWithAccessoriesImages2}
                        </div>
                      ) : null}
                    </div>
                    <div className="mb-5 mt-5">
                      <div className="flex items-center  justify-center w-full">
                        <label
                          for="dropzone-file3"
                          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                          <p className="">Item images right</p>
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                              className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 20 16"
                            >
                              <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                              />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                              <span className="font-semibold">
                                Click to upload
                              </span>{" "}
                              or drag and drop
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                              SVG, PNG, JPG or GIF (MAX. 800x400px)
                            </p>
                          </div>
                          <input
                            id="dropzone-file3"
                            name="itemsWithAccessoriesImages3"
                            type="file"
                            className="hidden"
                            accept="itemsWithAccessoriesImages3/*"
                            // value={formik.values.itemsWithAccessoriesImages1}
                            onChange={(e) => {
                              formik.setFieldValue(
                                "itemsWithAccessoriesImages3",
                                e.currentTarget.files[0]
                              );
                            }}
                          // onBlur={formik.handleBlur}
                          />
                        </label>
                      </div>
                      {formik.touched.itemsWithAccessoriesImages3 &&
                        formik.errors.itemsWithAccessoriesImages3 ? (
                        <div className="text-red-500">
                          {formik.errors.itemsWithAccessoriesImages3}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>

              {/* right side */}
              <div className="flex flex-col p-3">
                <div className="mb-5">
                  <input
                    // id="itemName"
                    name="itemID"
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded placeholder-black"
                    value={formik.values.itemID}
                    onChange={formik.handleChange("itemID")}
                    // onBlur={formik.handleBlur}
                    placeholder="Item Id"
                  />
                  {formik.touched.itemID && formik.errors.itemID ? (
                    <div className="text-red-500">{formik.errors.itemID}</div>
                  ) : null}
                </div>
                <div className="relative border border-gray-400 p-5 m-3">
                  <p className="absolute top-0 left-0 -mt-3 ml-3  px-5 bg-gray-100 text-lg font-semibold">
                    Poduct Specification
                  </p>

                  <div className="mb-5 mt-4">
                    <input
                      // id="itemName"
                      name="topic1"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded placeholder-black"
                      value={formik.values.topic1}
                      onChange={formik.handleChange("topic1")}
                      // onBlur={formik.handleBlur}
                      placeholder="Topic 1"
                    />
                    {formik.touched.topic1 && formik.errors.topic1 ? (
                      <div className="text-red-500">{formik.errors.topic1}</div>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <input
                      // id="itemName"
                      name="description1"
                      type="text"
                      className="w-full p-2 h-40 border border-gray-300 rounded placeholder-black"
                      value={formik.values.description1}
                      onChange={formik.handleChange("description1")}
                      // onBlur={formik.handleBlur}
                      placeholder="Description 1"
                    />
                    {formik.touched.description1 &&
                      formik.errors.description1 ? (
                      <div className="text-red-500">
                        {formik.errors.description1}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <input
                      // id="itemName"
                      name="topic2"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded placeholder-black"
                      value={formik.values.topic2}
                      onChange={formik.handleChange("topic2")}
                      // onBlur={formik.handleBlur}
                      placeholder="Topic 2"
                    />
                    {formik.touched.topic2 && formik.errors.topic2 ? (
                      <div className="text-red-500">{formik.errors.topic2}</div>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <input
                      // id="itemName"
                      name="description2"
                      type="text"
                      className="w-full p-2 h-40 border border-gray-300 rounded placeholder-black"
                      value={formik.values.description2}
                      onChange={formik.handleChange("description2")}
                      // onBlur={formik.handleBlur}
                      placeholder="Description 2"
                    />
                    {formik.touched.description2 &&
                      formik.errors.description2 ? (
                      <div className="text-red-500">
                        {formik.errors.description2}
                      </div>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <input
                      // id="itemName"
                      name="topic3"
                      type="text"
                      className="w-full p-2 border border-gray-300 rounded placeholder-black"
                      value={formik.values.topic3}
                      onChange={formik.handleChange("topic3")}
                      // onBlur={formik.handleBlur}
                      placeholder="Topic 3"
                    />
                    {formik.touched.topic3 && formik.errors.topic3 ? (
                      <div className="text-red-500">{formik.errors.topic3}</div>
                    ) : null}
                  </div>
                  <div className="mb-5">
                    <input
                      // id="itemName"
                      name="description3"
                      type="text"
                      className="w-full p-2 h-40 border border-gray-300 rounded placeholder-black"
                      value={formik.values.description3}
                      onChange={formik.handleChange("description3")}
                      // onBlur={formik.handleBlur}
                      placeholder="Description 3"
                    />
                    {formik.touched.description3 &&
                      formik.errors.description3 ? (
                      <div className="text-red-500">
                        {formik.errors.description3}
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="mb-5 mt-5">
                  <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file"
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <p className="">Item Description images</p>
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          SVG, PNG, JPG or GIF (MAX. 800x400px)
                        </p>
                      </div>
                      <input
                        id="dropzone-file"
                        name="itemDescription"
                        type="file"
                        className="hidden"
                        accept="itemDescription/*"
                        // value={formik.values.itemDescription}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "itemDescription",
                            e.currentTarget.files
                          );
                        }}
                        multiple
                      // onBlur={formik.handleBlur}
                      />
                    </label>
                  </div>
                  {formik.touched.itemDescription &&
                    formik.errors.itemDescription ? (
                    <div className="text-red-500">
                      {formik.errors.itemDescription}
                    </div>
                  ) : null}
                </div>

                <div className="flex w-full border">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-400 hover:bg-gray-400 text-white rounded w-full"
                  >
                    Add Product
                  </button>
                </div>
                {showAlert && (
                  <div>
                    <div
                      class="p-4 mt-4 mb-4 text-sm text-green-800 rounded-lg bg-green-100 dark:bg-gray-800 dark:text-green-400"
                      role="alert"
                    >
                      <span class="font-medium">Success alert!</span> Product added successfully
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProduct;
