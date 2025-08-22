import React, { useState } from "react";

const SubmitProperty = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    type: "rent",
    description: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    furnishing: "unfurnished",
    amenities: [],
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "",
    images: [],
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (files) {
      setFormData({
        ...formData,
        images: [...formData.images, ...Array.from(files)],
      });
    } else if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        amenities: checked
          ? [...prev.amenities, value]
          : prev.amenities.filter((a) => a !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.price || formData.price <= 0) newErrors.price = "Enter valid price";
    if (!formData.ownerName.trim()) newErrors.ownerName = "Owner name is required";
    if (!formData.ownerPhone.match(/^\d{10}$/))
      newErrors.ownerPhone = "Enter valid 10-digit phone number";
    if (!formData.ownerEmail.includes("@"))
      newErrors.ownerEmail = "Enter a valid email address";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Property Submitted:", formData);
    setErrors({});
    setSuccess(true);
    resetForm();
  };

  const removeImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      location: "",
      price: "",
      type: "rent",
      description: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      furnishing: "unfurnished",
      amenities: [],
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "",
      images: [],
    });
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-2xl p-10 my-12 border border-slate-200 animate-fadeIn">
      <h2 className="text-3xl font-extrabold text-center bg-gradient-to-r from-indigo-600 to-fuchsia-600 bg-clip-text text-transparent">
        🏠 List Your Property
      </h2>
      <p className="text-center text-slate-500 mt-2 mb-8">
        Fill out the details below to list your property and attract buyers or renters.
      </p>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-slate-700">📋 Basic Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Property Title"
                className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 ${
                  errors.title ? "border-red-500" : ""
                }`}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
            </div>

            <div>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 ${
                  errors.location ? "border-red-500" : ""
                }`}
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price (₹)"
                className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 ${
                  errors.price ? "border-red-500" : ""
                }`}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
            </div>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 bg-white"
            >
              <option value="rent">🏠 Rent</option>
              <option value="sell">💰 Sell</option>
              <option value="land">🌱 Land</option>
            </select>
          </div>
        </section>

        {/* Property Details */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-slate-700">🏢 Property Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleChange}
              placeholder="Bedrooms"
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleChange}
              placeholder="Bathrooms"
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="number"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area (sq.ft)"
              className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <select
            name="furnishing"
            value={formData.furnishing}
            onChange={handleChange}
            className="w-full mt-4 p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 bg-white"
          >
            <option value="unfurnished">🛋️ Unfurnished</option>
            <option value="semi-furnished">🪑 Semi-Furnished</option>
            <option value="furnished">🏡 Furnished</option>
          </select>
        </section>

        {/* Amenities */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-slate-700">✨ Amenities</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {["Parking", "Water Supply", "Electricity", "Lift", "Security", "WiFi", "CCTV"].map(
              (amenity) => (
                <label
                  key={amenity}
                  className="flex items-center gap-2 p-2 border rounded-lg cursor-pointer hover:bg-indigo-50 transition"
                >
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onChange={handleChange}
                  />
                  {amenity}
                </label>
              )
            )}
          </div>
        </section>

        {/* Description */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-slate-700">📝 Description</h3>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write a short description of the property..."
            className="w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400"
          />
        </section>

        {/* Photos */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-slate-700">📷 Upload Photos</h3>
          <div className="border-2 border-dashed rounded-xl p-6 text-center hover:border-indigo-400 transition">
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="w-full cursor-pointer text-slate-600"
            />
            <p className="text-sm text-slate-500 mt-2">
              Drag & drop or select multiple images
            </p>
          </div>

          {formData.images.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((img, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-full h-28 object-cover rounded-lg shadow-md"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Owner Details */}
        <section>
          <h3 className="text-xl font-bold mb-4 text-slate-700">👤 Owner Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                placeholder="Owner Name"
                className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 ${
                  errors.ownerName ? "border-red-500" : ""
                }`}
              />
              {errors.ownerName && <p className="text-red-500 text-sm">{errors.ownerName}</p>}
            </div>
            <div>
              <input
                type="tel"
                name="ownerPhone"
                value={formData.ownerPhone}
                onChange={handleChange}
                placeholder="Phone Number"
                className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 ${
                  errors.ownerPhone ? "border-red-500" : ""
                }`}
              />
              {errors.ownerPhone && <p className="text-red-500 text-sm">{errors.ownerPhone}</p>}
            </div>
            <div>
              <input
                type="email"
                name="ownerEmail"
                value={formData.ownerEmail}
                onChange={handleChange}
                placeholder="Email Address"
                className={`w-full p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-indigo-400 ${
                  errors.ownerEmail ? "border-red-500" : ""
                }`}
              />
              {errors.ownerEmail && <p className="text-red-500 text-sm">{errors.ownerEmail}</p>}
            </div>
          </div>
        </section>

        {/* Buttons */}
        <div className="flex justify-center gap-6 pt-6">
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl hover:scale-[1.05] transition-all duration-300"
          >
            🚀 Submit Property
          </button>

          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-200 text-gray-700 px-8 py-4 rounded-xl font-semibold shadow-md hover:bg-gray-300 hover:scale-[1.02] transition-all duration-300"
          >
            ❌ Reset
          </button>
        </div>
      </form>

      {/* Success Modal */}
      {success && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-sm">
            <h2 className="text-2xl font-bold text-green-600 mb-3">✅ Submitted!</h2>
            <p className="text-slate-600 mb-6">Your property has been successfully listed.</p>
            <button
              onClick={() => setSuccess(false)}
              className="bg-gradient-to-r from-indigo-600 to-fuchsia-600 text-white px-6 py-2 rounded-lg shadow-md hover:scale-105 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitProperty;
