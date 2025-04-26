import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import ImageUpload from "../Components/ImageUpload";

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
    warranty: "",
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
    setIsDroneSelected(selectedItemType === "Drone");
    setIsGimbalSelected(selectedItemType === "Gimbal");
    setIsSmartWatchSelected(selectedItemType === "SmartWatch");
    setIsOtherSelected(selectedItemType === "Other");

    let brands = [];
    switch (selectedItemType) {
      case "Drone":
        brands = ["DJI", "Potensic", "FIMI"];
        break;
      case "Gimbal":
        brands = ["Hohem", "Zhiyun", "AOCHUAN", "DJI", "AXNEN"];
        break;
      case "SmartWatch":
        brands = ["ZeBlaze", "CMF", "Redmi", "Hayolu"];
        break;
      case "Other":
        brands = [
          "Drone accessories",
          "Mobile phone accessories",
          "Smart Devices",
          "Storage devices",
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
      <aside style={{ width: "15rem" }} className="h-screen">
        <div className="p-6">
          {/* company image */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src="/images/spklogo.png"
              alt="SPK Store"
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
              <span className="font-semibold">Dashboard</span>
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
              <span className="font-semibold">Add Product</span>
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
              <span className="font-semibold">My Order</span>
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

        <div className="2xl:p-4 rounded-md shadow-md bg-gray-200">
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
                      placeholder="Product Name"
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
                      <option>Select product type</option>
                      <option>Lemon</option>
                      <option>Butter</option>
                      <option>Cream</option>
                      <option>Chocolate</option>
                    </select>
                    {formik.touched.itemType && formik.errors.itemType ? (
                      <div className="text-red-500">
                        {formik.errors.itemType}
                      </div>
                    ) : null}
                  </div>
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

                <div className="flex w-full h-10 border">
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

              {/* right side */}
              
              <div className="pr-2">
                {/* Upload Item image */}
                <div className="mt-3">
                  <ImageUpload
                    label={images.length > 0 ? `${images.length} images selected` : "Item Images"}
                    id="dropzone-file4"
                    name="itemImage"
                    onChange={(e) => setImages([...e.target.files])}
                    multiple={true}
                    error={formik.touched.itemImage && formik.errors.itemImage}
                  />
                </div>

                {/* sub images */}
                <div className="flex-column">
                  {/* item accessories left */}
                  <div className="flex gap-2 w-full mb-5">
                    <ImageUpload
                      label="Product Left"
                      id="dropzone-file1"
                      name="itemsWithAccessoriesImages1"
                      onChange={(e) => formik.setFieldValue("itemsWithAccessoriesImages1", e.currentTarget.files[0])}
                      error={formik.touched.itemsWithAccessoriesImages1 && formik.errors.itemsWithAccessoriesImages1}
                    />

                    <ImageUpload
                      label="Product Middle"
                      id="dropzone-file2"
                      name="itemsWithAccessoriesImages2"
                      onChange={(e) => formik.setFieldValue("itemsWithAccessoriesImages2", e.currentTarget.files[0])}
                      error={formik.touched.itemsWithAccessoriesImages2 && formik.errors.itemsWithAccessoriesImages2}
                    />

                    <ImageUpload
                      label="Product Right"
                      id="dropzone-file3"
                      name="itemsWithAccessoriesImages3"
                      onChange={(e) => formik.setFieldValue("itemsWithAccessoriesImages3", e.currentTarget.files[0])}
                      error={formik.touched.itemsWithAccessoriesImages3 && formik.errors.itemsWithAccessoriesImages3}
                    />
                  </div>
                </div>
              </div>

            </div>

          </form>
        </div>
      </main>
    </div>
  );
}

export default AddProduct;
