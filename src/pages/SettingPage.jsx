import React, { useState, useEffect } from 'react';

const SettingsPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');

  // Cloudinary configuration
  const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'daaseji3a';
  const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'krushna';

  // Fetch user data
  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://amaghara-server.onrender.com/user/home', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.user);
        setFormData({
          name: data.user.name || '',
          phone: data.user.phone || '',
          password: '',
          confirmPassword: ''
        });
        setImagePreview(data.user.picture || '');
      } else {
        setUser(null);
        setError(data.message || 'Failed to fetch user data');
      }
    } catch (err) {
      setError('Error connecting to server');
      setUser(null);
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to Cloudinary
  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', uploadPreset);
    formData.append('folder', 'property');

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed with status: ${response.status}`);
      }

      const data = await response.json();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate passwords if they're being changed
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      let pictureUrl = user.picture;
      
      // Upload new image if selected
      if (imageFile) {
        const uploadResult = await uploadImageToCloudinary(imageFile);
        if (!uploadResult.success) {
          setError('Failed to upload image');
          return;
        }
        pictureUrl = uploadResult.data.secure_url;
      }

      // Prepare update data
      const updateData = {
        name: formData.name,
        phone: formData.phone,
        ...(formData.password && { password: formData.password }),
        ...(pictureUrl && { picture: pictureUrl })
      };

      // Remove empty fields
      Object.keys(updateData).forEach(key => {
        if (updateData[key] === undefined || updateData[key] === '') {
          delete updateData[key];
        }
      });

      // Send update request
      const response = await fetch(`https://amaghara-server.onrender.com/user/update/${user._id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess('Profile updated successfully');
        setUser(data.user);
        setIsEditing(false);
        // Clear password fields
        setFormData({
          ...formData,
          password: '',
          confirmPassword: ''
        });
        setImageFile(null);
      } else {
        setError(data.message || 'Failed to update profile');
      }
    } catch (err) {
      setError('Error updating profile');
      console.error('Update error:', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-red-500">{error}</p>
          <button 
            onClick={fetchUserData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Settings</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Manage your account information</p>
          </div>

          <form onSubmit={handleSubmit} className="px-4 py-5 sm:p-6">
            {error && (
              <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
                {error}
              </div>
            )}
            
            {success && (
              <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
                {success}
              </div>
            )}

            <div className="flex flex-col items-center mb-6">
              <div className="relative">
                <img
                  className="h-24 w-24 rounded-full object-cover border-2 border-gray-300"
                  src={imagePreview || user.picture || 'https://via.placeholder.com/96'}
                  alt="Profile"
                />
                {isEditing && (
                  <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-1 rounded-full cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 mb-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={user.email}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md disabled:bg-gray-100"
                />
              </div>

              {isEditing && (
                <>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                      placeholder="Confirm your new password"
                    />
                  </div>
                </>
              )}
            </div>

            <div className="flex justify-end space-x-3">
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setFormData({
                        name: user.name || '',
                        phone: user.phone || '',
                        password: '',
                        confirmPassword: ''
                      });
                      setImagePreview(user.picture || '');
                      setImageFile(null);
                      setError('');
                    }}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Subscription Info */}
          {user.subscription && (
            <div className="px-4 py-4 bg-gray-50 border-t border-gray-200">
              <h4 className="text-sm font-medium text-gray-900 mb-2">Subscription Status</h4>
              <div className="flex items-center">
                <span className={`h-2 w-2 rounded-full ${user.subscription.isActive ? 'bg-green-500' : 'bg-gray-500'} mr-2`}></span>
                <span className="text-sm text-gray-600">
                  {user.subscription.isActive ? 'Active' : 'Inactive'} - {user.subscription.duration}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;