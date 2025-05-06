import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import Modal from "react-modal";

function ViewProductsAdmin() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // images upload
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [editFormData, setEditFormData] = useState({
    itemName: "",
    itemType: "",
    itemDescription: "",
    selectedBrand: "",
    shortDescription: "",
    quantity: "",
    warranty: "",
    // availability: "",
    originalPrice: "",
    priceAfterDiscount: "",
    // itemsWithAccessoriesImages1: "",
  });

  const openEditModal = (product) => {
    setProductToEdit(product);

    setEditFormData({
      itemName: product.itemName,
      itemType: product.itemType,
      itemDescription: product.itemDescription,
      selectedBrand: product.selectedBrand,
      shortDescription: product.shortDescription,
      quantity: product.quantity,
      warranty: product.warranty,

      // availability: product.availability,
      originalPrice: product.originalPrice,
      priceAfterDiscount: product.priceAfterDiscount,
      // itemsWithAccessoriesImages1: product.itemsWithAccessoriesImages1
    });
    setEditModalIsOpen(true);
  };

  const closeEditModal = () => {
    setEditModalIsOpen(false);
    setProductToEdit(null);
  };

  const handleEditFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      // Handle file input
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Assuming only one file is selected
      }));
    } else {
      // Handle text input
      setEditFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEditSubmit = () => {
    if (!productToEdit) return;

    // const formData = new FormData();

    // Append text fields
    // for (const key in editFormData) {
    //   if (editFormData.hasOwnProperty(key)) {
    //     formData.append(key, editFormData[key]);
    //   }
    // }

    //   for (const image of editFormData.itemsWithAccessoriesImages1) {
    // formData.append('itemsWithAccessoriesImages1')
    //  }

    //   for (const [key, value] of formData.entries()) {
    //     console.log(`${key}: ${value}`);
    // }
    console.log(editFormData);

    try {
      axios
        .patch(
          `https://backend.spkstore.lk/product/updateProduct/${productToEdit._id}`,
          editFormData,
          // {
          //   headers: {
          //     'Content-Type': 'multipart/form-data',
          //   },
          // }
        )
        .then((response) => {
          console.log(response);
        });

      // Update the product in the UI
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productToEdit._id
            ? { ...product, ...editFormData }
            : product
        )
      );
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      closeEditModal();
    }
  };

  const openDeleteModal = (product) => {
    setProductToDelete(product);
    setModalIsOpen(true);
  };

  // Close delete confirmation modal
  const closeDeleteModal = () => {
    setProductToDelete(null);
    setModalIsOpen(false);
  };

  // Handle deleteconst

  useEffect(() => {

  })
  const handleDelete = async () => {
    if (!productToDelete) return;

    try {
      // Optimistically remove the product from UI
      setProducts(
        products.filter((product) => product.id !== productToDelete._id)
      );

      // Perform the delete request
      await axios.delete(
        `https://backend.spkstore.lk/product/deleteProduct/${productToDelete._id}`
      );
    } catch (error) {
      console.error("Error deleting product:", error);

      // Rollback UI update if the deletion failed
      setProducts((prevProducts) => [...prevProducts, productToDelete]);
    } finally {
      closeDeleteModal();

      // Refresh the page
      window.location.reload();

    }
  };


  useEffect(() => {
    // Fetch all products once when component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://backend.spkstore.lk/product/getProducts"
        );
        setProducts(response.data.data);
        setFilteredProducts(response.data.data); // Set initial filtered products to all products
      } catch (error) {
        console.error("There was an error fetching the products!", error);
      }
    };

    fetchProducts();
  }, []);

  console.log(products);

  useEffect(() => {
    // Filter products whenever searchTerm changes
    const filterProducts = () => {
      if (!searchTerm) {
        setFilteredProducts(products);
      } else {
        const lowercasedSearchTerm = searchTerm.toLowerCase();
        const filtered = products.filter(
          (product) =>
            product.itemID.toLowerCase().includes(lowercasedSearchTerm) ||
            product.itemName.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [searchTerm, products]);

  console.log(filteredProducts);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="flex max-8xl bg-red-300">
      <aside style={{ width: "15rem" }} className="h-screen bg-[#6C070E]">
        <div className="p-6">
          {/* company image */}
          <div className="flex flex-col items-center space-y-2">
            <img
              src="/images/companyLogo.png"
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

      <main className="2xl:flex flex-col w-full p-7  bg-gray-100">
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Products</h1>
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

        <div className="2xl:p-5 rounded-lg  shadow-md bg-gray-50 ">
          {/* search bar */}
          <div>
            <form class="max-w-8xl mx-auto">
              <label
                for="default-search"
                class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
              >
                Search
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  name="search"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  id="default-search"
                  class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Mockups, Logos..."
                />
                <button
                  type="submit"
                  class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
          {/* stacked list */}

          <div
            className="w-full"
            style={{ maxHeight: "calc(100vh - 8rem)", overflowY: "auto" }}
          >
            <ul role="list" className="divide-y divide-gray-500 ">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <li
                    key={product.id}
                    className="flex justify-between gap-x-4 py-5"
                  >
                    <div className="flex  gap-x-4  items-center ">
                      <img
                        alt={product.itemDescription}
                        src={
                          product.itemDescription[0] || "placeholder-image-url"
                        }
                        className="h-20 w-20 flex-none rounded-full bg-gray-50"
                      />
                      <div className="min-w-0 flex-auto">
                        <p className="text-lg font-semibold leading-6 text-gray-900">
                          {product.itemName}
                        </p>
                        <p className="mt-1 truncate text-sm leading-5 text-gray-500">
                          Brand: {product.selectedBrand}
                        </p>
                        <p className="mt-1 truncate text-xs leading-5 max-w-4xl text-gray-500">
                          Description: ${product.shortDescription}
                        </p>

                        <button
                          className="text-red-400 cursor-pointer hover:underline"
                          onClick={() => navigate("/prodDetails", { state: product })}
                        >
                          more info...
                        </button>

                      </div>
                    </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end mr-3">
                      <p className="text-sm leading-6 text-gray-900">
                        {/* Additional product details can go here */}
                        <p className="mt-1 truncate text-lg leading-5 text-gray-500">
                          price: Rs.{product.priceAfterDiscount}
                        </p>
                        <p className="mt-2 truncate text-md leading-5 text-gray-500">
                          Before Discount: Rs.{product.originalPrice}
                        </p>
                        <div className="mt-3">
                          <button
                            type="button"
                            onClick={() => openEditModal(product)}
                            className="outline outline-offset-1 outline-1 outline-green-400  focus:outline-none text-black  hover:bg-green-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => openDeleteModal(product)}
                            className="outline outline-offset-1 outline-1 outline-red-400  focus:outline-none text-black hover:bg-red-200 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </p>
                    </div>
                  </li>
                ))
              ) : (
                <li className="py-5 text-center text-gray-500">
                  No products found
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Confirmation Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeDeleteModal}
          contentLabel="Delete Confirmation"
          ariaHideApp={false}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-200 p-5 rounded-md shadow-md"
        >
          <h2 className="m-5 text-2xl ">Confirm Deletion !</h2>
          <p className="m-5">Are you sure you want to delete this item?</p>
          <div className="m-5 flex align-middle items-center justify-end gap-5 ">
            <button
              className="bg-red-400 p-2 rounded-xl px-3"
              onClick={handleDelete}
            >
              Yes, Delete
            </button>
            <button
              className="outline outline-1 p-2 px-3 rounded-xl bg-white"
              onClick={closeDeleteModal}
            >
              Cancel
            </button>
          </div>
        </Modal>

        {/* edit modal */}
        <Modal
          isOpen={editModalIsOpen}
          onRequestClose={closeEditModal}
          contentLabel="Edit Product"
          ariaHideApp={false}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-5 rounded-md shadow-md w-2/6"
        >
          <h2 className="text-2xl mb-4">Edit Product</h2>
          <form>
            <div className="flex w-full ">
              <div>
                <div className="flex gap-3">
                  <div className="mb-4">
                    <label className="block mb-1">Name:</label>
                    <input
                      type="text"
                      name="itemName"
                      value={editFormData.itemName}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">itemType:</label>
                    <select
                      name="itemType"
                      value={editFormData.itemType}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                      placeholder="Iten TYpe"
                    >
                      <option>Select item type</option>
                      <option>Drone</option>
                      <option>Gimbal</option>
                      <option>SmartWatch</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mb-4">
                    <label className="block mb-1">Description:</label>
                    <textarea
                      name="itemDescription"
                      value={editFormData.itemDescription}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Brand:</label>
                    <input
                      type="text"
                      name="selectedBrand"
                      value={editFormData.selectedBrand}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mb-4">
                    <label className="block mb-1">Short Description:</label>
                    <input
                      type="text"
                      name="shortDescription"
                      value={editFormData.shortDescription}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Quantity:</label>
                    <input
                      type="text"
                      name="quantity"
                      value={editFormData.quantity}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mb-4">
                    <label className="block mb-1">warranty:</label>
                    <input
                      type="text"
                      name="warranty"
                      value={editFormData.warranty}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  {/* <div className="mb-4">
                    <label className="block mb-1">availability:</label>
                    <input
                      type="text"
                      name="availability"
                      value={editFormData.availability}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div> */}
                </div>
                <div className="flex gap-3">
                  <div className="mb-4">
                    <label className="block mb-1">Original Price:</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={editFormData.originalPrice}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block mb-1">Discounted Price:</label>
                    <input
                      type="number"
                      name="priceAfterDiscount"
                      value={editFormData.priceAfterDiscount}
                      onChange={handleEditFormChange}
                      className="w-full p-2 border rounded"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col m-5 pl-5 align-middle items-start ">







                {/* <div className="flex gap-3">
                   */}
                {/* <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file4"
                      className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <p className="">item images</p>
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
                        id="dropzone-file4"
                        name="itemsWithAccessoriesImages1"
                        type="file"
                        className="hidden"
                        accept="itemsWithAccessoriesImages1/*"
                        // value={formik.values.itemsWithAccessoriesImages1}
                        onChange={handleEditFormChange}
                        // multiple
                        // onBlur={formik.handleBlur}
                      />
                    </label>
                  </div> */}


                {/* <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file4"
                      className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <p className="">item images</p>
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
                        id="dropzone-file4"
                        name="itemImage"
                        type="file"
                        className="hidden"
                        accept="itemImage/*"
                        // value={formik.values.itemsWithAccessoriesImages1}
                        // onChange={(e) => {
                        //   formik.setFieldValue(
                        //     "itemImage",
                        //     e.currentTarget.files
                        //   );
                        // }}
                        multiple
                        // onBlur={formik.handleBlur}
                      />
                    </label>
                  </div> */}




                {/* <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file4"
                      className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    > */}
                {/* <p className="">item images</p>
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
                        id="dropzone-file4"
                        name="itemImage"
                        type="file"
                        className="hidden"
                        accept="itemImage/*"
                        // value={formik.values.itemsWithAccessoriesImages1}
                        // onChange={(e) => {
                        //   formik.setFieldValue(
                        //     "itemImage",
                        //     e.currentTarget.files
                        //   );
                        // }}
                        multiple
                        // onBlur={formik.handleBlur}
                      />
                    </label>
                  </div> */}

                {/* 
                </div> */}


                {/* <div className="flex gap-3 mt-5"> */}
                {/* <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file4"
                      className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <p className="">item images</p>
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
                        id="dropzone-file4"
                        name="itemImage"
                        type="file"
                        className="hidden"
                        accept="itemImage/*"
                        // value={formik.values.itemsWithAccessoriesImages1}
                        // onChange={(e) => {
                        //   formik.setFieldValue(
                        //     "itemImage",
                        //     e.currentTarget.files
                        //   );
                        // }}
                        multiple
                        // onBlur={formik.handleBlur}
                      />
                    </label>
                  </div> */}


                {/* <div className="flex items-center justify-center w-full">
                    <label
                      for="dropzone-file4"
                      className="flex flex-col items-center justify-center w-full h-52 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <p className="">item images</p>
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
                        id="dropzone-file4"
                        name="itemImage"
                        type="file"
                        className="hidden"
                        accept="itemImage/*"
                        // value={formik.values.itemsWithAccessoriesImages1}
                        // onChange={(e) => {
                        //   formik.setFieldValue(
                        //     "itemImage",
                        //     e.currentTarget.files
                        //   );
                        // }}
                        multiple
                        // onBlur={formik.handleBlur}
                      />
                    </label>
                  </div> */}
                {/* </div> */}




              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={handleEditSubmit}
                className="bg-blue-500 text-white p-2 rounded"
              >
                Save
              </button>
              <button
                type="button"
                onClick={closeEditModal}
                className="bg-gray-300 p-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </main>
    </div>
  );
}

export default ViewProductsAdmin;
