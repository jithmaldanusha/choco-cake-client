import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImageUpload from '../Components/ImageUpload';

const AddProducts = () => {
  const [formData, setFormData] = useState({
    itemID: "",
    itemName: '',
    itemCategory: '',
    shortDescription: '',
    topic1: '',
    description1: '',
    topic2: '',
    description2: '',
    topic3: '',
    description3: '',
    quantity: '',
    originalPrice: '',
    priceAfterDiscount: '',
    itemDescription: '',
    itemImageMain: '',
    itemImage1: '',
    itemImage2: '',
    itemImage3: '',
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData({ ...formData, [name]: Array.from(files) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  useEffect(() => {
    const newErrors = {};

    if (!formData.itemName.trim()) {
      newErrors.itemName = "Item Name is required.";
    }

    if (!formData.itemCategory.trim()) {
      newErrors.itemCategory = "Item Category is required.";
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = "Short Description is required.";
    }

    if (!formData.originalPrice.trim()) {
      newErrors.originalPrice = "Original Price is required.";
    }

    if (formData.offers === "Yes" && !formData.priceAfterDiscount.trim()) {
      newErrors.priceAfterDiscount = "Price After Discount is required if Offer is Yes.";
    }

    setErrors(newErrors);
    setIsValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValid) {
      console.log("Form is invalid, fix errors before submitting.");
      return;
    }

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (Array.isArray(formData[key])) {
        formData[key].forEach((file) => {
          formDataToSend.append(key, file);
        });
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    try {
      const response = await axios.post("https://backend.spkstore.lk/cake/addProduct", formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log("Product added successfully:", response.data);
      // Optionally clear form or give success feedback
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Add New Product</h2>
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-8">
        {/* Left Side */}
        <div className="w-full lg:w-2/3 space-y-4">
          <div>
            <label className="block font-medium mb-1">Item Name</label>
            <input
              type="text"
              name="itemName"
              value={formData.itemName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.itemName && <p className="text-red-500 text-sm mt-1">{errors.itemName}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Item Category</label>
            <select
              name="itemCategory"
              value={formData.itemCategory}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select Category</option>
              <option value="Lemon">Lemon</option>
              <option value="Butter">Butter</option>
              <option value="Cream">Cream</option>
              <option value="Chocolate">Chocolate</option>
            </select>
            {errors.itemCategory && <p className="text-red-500 text-sm mt-1">{errors.itemCategory}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.shortDescription && <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>}
          </div>

          {/* Topics and Descriptions */}
          {[1, 2, 3].map((num) => (
            <div key={num}>
              <label className="block font-medium mb-1">Topic {num}</label>
              <input
                type="text"
                name={`topic${num}`}
                value={formData[`topic${num}`]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />

              <label className="block font-medium mt-2 mb-1">Description {num}</label>
              <textarea
                name={`description${num}`}
                value={formData[`description${num}`]}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2"
              />
            </div>
          ))}

          <div>
            <label className="block font-medium mb-1">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Original Price</label>
            <input
              type="text"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
            {errors.originalPrice && <p className="text-red-500 text-sm mt-1">{errors.originalPrice}</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">Price After Discount</label>
            <input
              type="text"
              name="priceAfterDiscount"
              value={formData.priceAfterDiscount}
              onChange={handleChange}
              disabled={formData.offers === 'No'}
              className={`w-full border rounded px-3 py-2 ${formData.offers === 'No' ? 'bg-gray-200' : ''}`}
            />
            {errors.priceAfterDiscount && <p className="text-red-500 text-sm mt-1">{errors.priceAfterDiscount}</p>}
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/3 space-y-4">
          <ImageUpload
            label="Main Product Image"
            id="itemImageMain"
            name="itemImageMain"
            onChange={handleChange}
          />
          <ImageUpload
            label="Product Left Image"
            id="itemImage1"
            name="itemImage1"
            onChange={handleChange}
          />
          <ImageUpload
            label="Product Right Image"
            id="itemImage2"
            name="itemImage2"
            onChange={handleChange}
          />
          <ImageUpload
            label="Additional Product Image"
            id="itemImage3"
            name="itemImage3"
            onChange={handleChange}
          />

          {/* Submit Button */}
          <div>
            <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">
              Add Product
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
