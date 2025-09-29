import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  FileText,
  MessageSquare,
  LogOut,
  Menu,
  Bell,
  Trash2,
  Edit2,
  Eye,
  X,
  LocationEdit
} from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Dialog } from "@headlessui/react";
import axios from "axios";
import PropertyForm from "./PropertyForm";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [usersData, setUsersData] = useState([]);
  const [listingsData, setListingsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
const [selectedProperty, setSelectedProperty] = useState(null);
const [showPropertyModal, setShowPropertyModal] = useState(false);
  // Admin auth check
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://amaghara-server.onrender.com/admin/home', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (data.success) {
          setAdmin(data.user);
        } else {
          setError(data.message || 'Failed to fetch user data');
          navigate('/admin');
        }
      } catch (err) {
        setError('Error connecting to server');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("https://amaghara-server.onrender.com/admin/user-list");
        const messagesRes = await axios.get("https://amaghara-server.onrender.com/api/messages");
        const properties = await axios.get("https://amaghara-server.onrender.com/property/property");

        setUsersData(usersRes.data.users || []);
        setMessagesData(messagesRes.data.data || []);
        setListingsData(properties.data.properties || []);

        // Generate chart data based on properties
        generateChartData(properties.data.properties || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const generateChartData = (properties) => {
    const monthlyData = {};
    properties.forEach(property => {
      const date = new Date(property.createdAt);
      const monthYear = `${date.toLocaleString('default', { month: 'short' })} ${date.getFullYear()}`;
      monthlyData[monthYear] = (monthlyData[monthYear] || 0) + 1;
    });

    setChartData({
      labels: Object.keys(monthlyData),
      datasets: [{
        label: 'New Properties',
        data: Object.values(monthlyData),
        backgroundColor: 'rgba(99, 102, 241, 0.8)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
      }]
    });
  };

const handleLogout = async () => {
  try {
    // Call the logout endpoint
    const response = await fetch('https://amaghara-server.onrender.com/auth/admin/logout', {
      method: 'POST',
      credentials: 'include' // Include cookies for session-based authentication
    });

    // Check if logout was successful
    if (response.ok) {
      // Clear local storage
      localStorage.removeItem("isAdmin");
      
      // Navigate to admin page
      navigate("/admin");
    } else {
      // Handle server errors
      console.error('Logout failed:', response.statusText);
      // Still clear local storage and navigate as fallback
      localStorage.removeItem("isAdmin");
      navigate("/admin");
    }
  } catch (error) {
    // Handle network errors
    console.error('Logout error:', error);
    // Fallback: clear local storage and navigate
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  }
};

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "listings", label: "Properties", icon: <FileText size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
    { id: "add-property", label: "Add-Property", icon: <LocationEdit size={20} /> },
  ];

  const stats = [
    { title: "Users", value: usersData?.length || 0, color: "from-indigo-500 to-pink-500", icon: <Users size={24} /> },
    { title: "Properties", value: listingsData.length || 0, color: "from-green-500 to-teal-500", icon: <FileText size={24} /> },
    { title: "Messages", value: messagesData.length || 0, color: "from-yellow-400 to-orange-400", icon: <MessageSquare size={24} /> },
  ];

  const openEditModal = (item, isSubscriptionUpdate = false) => {
    setCurrentItem({...item, isSubscriptionUpdate});
    setEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setCurrentItem(item);
    setDeleteModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentItem.type === "User") {
        // Check if we're updating subscription or basic user info
        if (currentItem.isSubscriptionUpdate) {
          // Update subscription
          await axios.put(`https://amaghara-server.onrender.com/user/${currentItem._id}/subscription`, {
            isActive: currentItem.subscription.isActive,
            remark: currentItem.subscription.remarks
          });
        } else {
          // Update basic user info
          await axios.put(`https://amaghara-server.onrender.com/admin/user/${currentItem._id}`, {
            name: currentItem.name,
            email: currentItem.email,
            phone: currentItem.phone
          });
        }
        
        // Update local state
        setUsersData(usersData.map(u => u._id === currentItem._id ? {
          ...u,
          ...(currentItem.isSubscriptionUpdate ? {
            subscription: {
              ...u.subscription,
              isActive: currentItem.subscription.isActive,
              remarks: currentItem.subscription.remarks
            }
          } : {
            name: currentItem.name,
            email: currentItem.email,
            phone: currentItem.phone
          })
        } : u));
      } else if (currentItem.type === "Property") {
        await axios.put(`https://amaghara-server.onrender.com/property/property/${currentItem._id}`, currentItem);
        setListingsData(listingsData.map(l => l._id === currentItem._id ? currentItem : l));
      }
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (currentItem.type === "User") {
        await axios.delete(`https://amaghara-server.onrender.com/user/${currentItem._id}`);
        setUsersData(usersData.filter(u => u._id !== currentItem._id));
      } else if (currentItem.type === "Property") {
        await axios.delete(`https://amaghara-server.onrender.com/property/property/${currentItem._id}`,{withCredentials:true});
        setListingsData(listingsData.filter(l => l._id !== currentItem._id));
      } else if (currentItem.type === "Message") {
        await axios.delete(`https://amaghara-server.onrender.com/api/messages/${currentItem._id}`);
        setMessagesData(messagesData.filter(m => m._id !== currentItem._id));
      }
      setDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { position: "top" }, 
      title: { display: true, text: "New Properties per Month" } 
    },
  };

  const renderUsers = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Verified</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subscription</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Remarks</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {usersData.map((user) => (
            <tr key={user._id} className="hover:bg-indigo-50 transition">
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                {user.picture && <img src={user.picture} alt={user.name} className="w-8 h-8 rounded-full"/>}
                <span>{user.name}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.phone || 'N/A'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-white text-sm ${
                  user.isVerified ? "bg-green-500" : "bg-red-500"
                }`}>
                  {user.isVerified ? "Verified" : "Unverified"}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-col gap-1">
                  <span className={`px-2 py-1 rounded-full text-white text-xs ${
                    user.subscription?.isActive ? "bg-blue-500" : "bg-gray-500"
                  }`}>
                    {user.subscription?.isActive ? "Active" : "Inactive"}
                  </span>
                  {user.subscription?.duration && (
                    <span className="text-xs text-gray-500">{user.subscription.duration}</span>
                  )}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="max-w-32">
                  <span className="text-sm text-gray-600 block truncate">
                    {user.subscription?.remarks || 'No remarks'}
                  </span>
                </div>
              </td>

              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button 
                  onClick={() => openEditModal({ ...user, type: "User" }, false)} 
                  className="text-indigo-600 hover:text-indigo-800" 
                  title="Edit User Info"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => openEditModal({ ...user, type: "User" }, true)} 
                  className="text-blue-600 hover:text-blue-800" 
                  title="Edit Subscription"
                >
                  <Users size={18} />
                </button>
                <button onClick={() => openDeleteModal({ ...user, type: "User" })} className="text-red-500 hover:text-red-700" title="Delete User">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // property listing table
  const renderListings = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">BHK</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {listingsData.map((listing) => (
// Updated table row with click handler
<tr 
  key={listing._id} 
  className="hover:bg-green-50 transition cursor-pointer"
  onClick={() => {
    setSelectedProperty(listing);
    setShowPropertyModal(true);
  }}
>
  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
    {listing.pictures && listing.pictures[0] && 
      <img src={listing.pictures[0]} alt={listing.title} className="w-12 h-12 rounded-lg object-cover"/>
    }
    <span className="max-w-xs truncate">{listing.title}</span>
  </td>
  <td className="px-6 py-4 whitespace-nowrap">
    <div className="text-sm">
      <div>{listing.location?.city}, {listing.location?.state}</div>
      <div className="text-gray-500 text-xs">{listing.location?.zipCode}</div>
    </div>
  </td>
  <td className="px-6 py-4 whitespace-nowrap">₹{listing.price?.toLocaleString()}</td>
  <td className="px-6 py-4 whitespace-nowrap">{listing.bhk} BHK</td>
  <td className="px-6 py-4 whitespace-nowrap text-sm">{listing.propertyType}</td>
  <td className="px-6 py-4 whitespace-nowrap">
    <span className={`px-2 py-1 rounded-full text-white text-sm ${
      listing.isActive ? "bg-green-500" : "bg-red-500"
    }`}>
      {listing.isActive ? "Active" : "Inactive"}
    </span>
  </td>
  <td className="px-6 py-4 whitespace-nowrap flex gap-2">
    <button 
      onClick={(e) => {
        e.stopPropagation();
        openEditModal({ ...listing, type: "Property" });
      }} 
      className="text-indigo-600 hover:text-indigo-800"
    >
      <Edit2 size={18} />
    </button>
    <button 
      onClick={(e) => {
        e.stopPropagation();
        openDeleteModal({ ...listing, type: "Property" });
      }} 
      className="text-red-500 hover:text-red-700"
    >
      <Trash2 size={18} />
    </button>
  </td>
</tr>
          ))}
        </tbody>
      </table>
    </div>
  );

//property details 
// Property Details Modal Component
const PropertyDetailsModal = () => {
  if (!showPropertyModal || !selectedProperty) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 " onClick={() => setShowPropertyModal(false)}>
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{selectedProperty.title}</h2>
              <p className="text-lg font-semibold text-green-600 mt-1">₹{selectedProperty.price?.toLocaleString()}</p>
            </div>
            <button 
              onClick={() => setShowPropertyModal(false)}
              className="text-gray-400 hover:text-gray-600 transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Property Images */}
          {selectedProperty.pictures && selectedProperty.pictures.length > 0 && (
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedProperty.pictures.map((image, index) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${selectedProperty.title} ${index + 1}`}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Property Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Basic Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Basic Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">BHK:</span> {selectedProperty.bhk} BHK</div>
                <div><span className="text-gray-600">Bathrooms:</span> {selectedProperty.bathrooms}</div>
                <div><span className="text-gray-600">Property Type:</span> {selectedProperty.propertyType}</div>
                <div><span className="text-gray-600">Furnishing:</span> {selectedProperty.furnishing}</div>
                <div><span className="text-gray-600">Facing:</span> {selectedProperty.facing}</div>
              </div>
            </div>

            {/* Area Details */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Area Details</h3>
              <div className="space-y-2 text-sm">
                {selectedProperty.superBuiltupArea && (
                  <div><span className="text-gray-600">Super Built-up Area:</span> {selectedProperty.superBuiltupArea.value} {selectedProperty.superBuiltupArea.unit}</div>
                )}
                {selectedProperty.carpetArea && (
                  <div><span className="text-gray-600">Carpet Area:</span> {selectedProperty.carpetArea.value} {selectedProperty.carpetArea.unit}</div>
                )}
                <div><span className="text-gray-600">Floor:</span> {selectedProperty.floorNo} of {selectedProperty.totalFloors}</div>
              </div>
            </div>

            {/* Location */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Location</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Address:</span> {selectedProperty.location?.address}</div>
                <div><span className="text-gray-600">City:</span> {selectedProperty.location?.city}</div>
                <div><span className="text-gray-600">State:</span> {selectedProperty.location?.state}</div>
                <div><span className="text-gray-600">ZIP:</span> {selectedProperty.location?.zipCode}</div>
                <div><span className="text-gray-600">Country:</span> {selectedProperty.location?.country}</div>
              </div>
            </div>

            {/* Facilities */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Facilities</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Car Parking:</span> {selectedProperty.carParking}</div>
                <div><span className="text-gray-600">Bachelors Allowed:</span> {selectedProperty.bachelorsAllowed ? 'Yes' : 'No'}</div>
                <div><span className="text-gray-600">Monthly Maintenance:</span> ₹{selectedProperty.maintenanceMonthly}</div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
              <div className="space-y-2 text-sm">
                <div><span className="text-gray-600">Phone:</span> {selectedProperty.contactNumber}</div>
                <div><span className="text-gray-600">Email:</span> {selectedProperty.contactEmail}</div>
              </div>
            </div>

            {/* Status & Stats */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">Status & Stats</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600">Status:</span> 
                  <span className={`ml-2 px-2 py-1 rounded-full text-white text-xs ${
                    selectedProperty.isActive ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {selectedProperty.isActive ? "Active" : "Inactive"}
                  </span>
                </div>
                <div><span className="text-gray-600">Views:</span> {selectedProperty.views}</div>
                <div><span className="text-gray-600">Created:</span> {new Date(selectedProperty.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          </div>

          {/* Description */}
          {selectedProperty.description && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedProperty.description}</p>
            </div>
          )}

          {/* Amenities */}
          {selectedProperty.amenities && selectedProperty.amenities.length > 0 && (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Amenities</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProperty.amenities.map((amenity, index) => (
                  <span 
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

  const renderMessages = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {messagesData.map((msg) => (
            <tr key={msg._id} className="hover:bg-yellow-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">{msg.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{msg.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{msg.phone}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="capitalize">{msg.subject?.replace('-', ' ')}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap max-w-xs">
                <span className="truncate block">{msg.message}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(msg.timestamp).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button className="text-indigo-600 hover:text-indigo-800" title="View Message">
                  <Eye size={18} />
                </button>
                <button onClick={() => openDeleteModal({ ...msg, type: "Message" })} className="text-red-500 hover:text-red-700" title="Delete Message">
                  <Trash2 size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
              {stats.map((stat) => (
                <div
                  key={stat.title}
                  onClick={() => {setActivePage(stat.title.toLowerCase()); setSidebarOpen(false);}}
                  className={`bg-gradient-to-r ${stat.color} text-white rounded-xl p-5 flex items-center justify-between shadow-lg hover:shadow-xl transition`}
                >
                  <div>
                    <p className="text-xl font-semibold">{stat.value}</p>
                    <p className="text-sm">{stat.title}</p>
                  </div>
                  <div>{stat.icon}</div>
                </div>
              ))}
            </div>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition h-64 md:h-80">
              <Bar data={chartData} options={chartOptions} />
            </div>
          </>
        );
      case "users":
        return renderUsers();
      case "listings":
        return renderListings();
      case "properties":
        return renderListings();
      case "messages":
        return renderMessages();
        case "add-property":
        return <PropertyForm />;
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all duration-300
        ${sidebarOpen ? "w-64 fixed inset-y-0 left-0 z-50" : "w-16"} md:relative md:w-64 flex flex-col`}>
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 relative">
          {(sidebarOpen || window.innerWidth >= 768) && <h2 className="text-2xl font-bold text-indigo-600">Admin Panel</h2>}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600 hover:text-indigo-600 md:hidden">
            {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActivePage(item.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 w-full px-4 py-3 my-2 rounded-lg transition 
                ${activePage === item.id ? "bg-gradient-to-r from-indigo-500 to-pink-500 text-white shadow-lg" : "text-gray-700 hover:bg-indigo-100"}`}
            >
              {item.icon}
              {(sidebarOpen || window.innerWidth >= 768) && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 m-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          {(sidebarOpen || window.innerWidth >= 768) && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 transition-all duration-300">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden text-gray-600 hover:text-indigo-600"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-3xl font-bold capitalize text-gray-800">{activePage}</h1>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-indigo-600">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <span className="text-gray-700 font-medium">{admin?.name || 'Admin'}</span>
          </div>
        </div>

        {renderContent()}
      </main>

      {/* Edit Modal */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md sm:max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4 text-indigo-600">Edit {currentItem?.type}</Dialog.Title>
            <div className="flex flex-col gap-3">
            <Dialog.Title className="text-xl font-bold mb-4 text-indigo-600">
              {currentItem?.isSubscriptionUpdate ? "Edit Subscription" : `Edit ${currentItem?.type}`}
            </Dialog.Title>
            <div className="flex flex-col gap-3">
              {/* Basic User Info Fields */}
              {currentItem?.type === "User" && !currentItem?.isSubscriptionUpdate && (
                <>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.name || ""}
                    onChange={(e) => setCurrentItem({...currentItem, name: e.target.value})}
                    placeholder="Name"
                  />
                  <input
                    type="email"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.email || ""}
                    onChange={(e) => setCurrentItem({...currentItem, email: e.target.value})}
                    placeholder="Email"
                  />
                  <input
                    type="tel"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.phone || ""}
                    onChange={(e) => setCurrentItem({...currentItem, phone: e.target.value})}
                    placeholder="Phone"
                  />
                </>
              )}

              {/* Subscription Fields */}
              {currentItem?.type === "User" && currentItem?.isSubscriptionUpdate && (
                <>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subscription Status</label>
                    <select
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                      value={currentItem?.subscription?.isActive ? "active" : "inactive"}
                      onChange={(e) => setCurrentItem({
                        ...currentItem, 
                        subscription: {
                          ...currentItem.subscription,
                          isActive: e.target.value === "active"
                        }
                      })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Remarks</label>
                    <textarea
                      className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                      value={currentItem?.subscription?.remarks || ""}
                      onChange={(e) => setCurrentItem({
                        ...currentItem,
                        subscription: {
                          ...currentItem.subscription,
                          remarks: e.target.value
                        }
                      })}
                      placeholder="Add remarks about subscription..."
                      rows="3"
                    />
                  </div>

                  {/* Display current subscription info */}
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-700">Current Subscription:</p>
                    <p className="text-sm text-gray-600">Duration: {currentItem?.subscription?.duration || 'N/A'}</p>
                    <p className="text-sm text-gray-600">Plan ID: {currentItem?.subscription?.planId || 'N/A'}</p>
                  </div>
                </>
              )}

              {/* Property Fields */}
              {currentItem?.type === "Property" && (
                <>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.title || ""}
                    onChange={(e) => setCurrentItem({...currentItem, title: e.target.value})}
                    placeholder="Title"
                  />
                  <textarea
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.description || ""}
                    onChange={(e) => setCurrentItem({...currentItem, description: e.target.value})}
                    placeholder="Description"
                    rows="3"
                  />
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.price || ""}
                    onChange={(e) => setCurrentItem({...currentItem, price: Number(e.target.value)})}
                    placeholder="Price"
                  />
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.bhk || ""}
                    onChange={(e) => setCurrentItem({...currentItem, bhk: Number(e.target.value)})}
                    placeholder="BHK"
                  />
                  <select
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.isActive ? "active" : "inactive"}
                    onChange={(e) => setCurrentItem({...currentItem, isActive: e.target.value === "active"})}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Save</button>
              </div>
            </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4 text-red-500">Delete {currentItem?.type}?</Dialog.Title>
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this {currentItem?.type?.toLowerCase()}? This action cannot be undone.
            </p>
            {currentItem && (
              <div className="bg-gray-50 p-3 rounded-lg mb-4">
                <p className="font-medium text-gray-800">
                  {currentItem.type === "User" ? currentItem.name : 
                   currentItem.type === "Property" ? currentItem.title :
                   currentItem.type === "Message" ? `Message from ${currentItem.name}` : "Item"}
                </p>
                {currentItem.type === "User" && <p className="text-sm text-gray-600">{currentItem.email}</p>}
                {currentItem.type === "Property" && <p className="text-sm text-gray-600">₹{currentItem.price?.toLocaleString()}</p>}
                {currentItem.type === "Message" && <p className="text-sm text-gray-600">{currentItem.subject}</p>}
              </div>
            )}
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
      {showPropertyModal && <PropertyDetailsModal />}

    </div>
  );
};

export default AdminDashboard;