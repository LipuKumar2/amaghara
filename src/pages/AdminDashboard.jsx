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
  X
} from "lucide-react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Dialog } from "@headlessui/react";
import axios from "axios";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false); // start closed on mobile

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null);

  const [usersData, setUsersData] = useState([]);
  const [listingsData, setListingsData] = useState([]);
  const [messagesData, setMessagesData] = useState([]);
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });

  // Admin auth check
  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin");
  }, [navigate]);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersRes = await axios.get("/api/admin/users");
        const listingsRes = await axios.get("/api/admin/listings");
        const messagesRes = await axios.get("/api/admin/messages");
        const chartRes = await axios.get("/api/admin/statistics/monthly-listings");

        setUsersData(usersRes.data);
        setListingsData(listingsRes.data);
        setMessagesData(messagesRes.data);
        setChartData({
          labels: chartRes.data.labels,
          datasets: [
            { label: "New Listings", data: chartRes.data.data, backgroundColor: "rgba(99, 102, 241, 0.7)" }
          ]
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin");
  };

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "users", label: "Users", icon: <Users size={20} /> },
    { id: "listings", label: "Properties", icon: <FileText size={20} /> },
    { id: "messages", label: "Messages", icon: <MessageSquare size={20} /> },
  ];

  const stats = [
    { title: "Users", value: usersData.length, color: "from-indigo-500 to-pink-500", icon: <Users size={24} /> },
    { title: "Properties", value: listingsData.length, color: "from-green-500 to-teal-500", icon: <FileText size={24} /> },
    { title: "Messages", value: messagesData.length, color: "from-yellow-400 to-orange-400", icon: <MessageSquare size={24} /> },
  ];

  const openEditModal = (item) => {
    setCurrentItem(item);
    setEditModalOpen(true);
  };

  const openDeleteModal = (item) => {
    setCurrentItem(item);
    setDeleteModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (currentItem.type === "User") {
        await axios.put(`/api/admin/users/${currentItem.id}`, currentItem);
        setUsersData(usersData.map(u => u.id === currentItem.id ? currentItem : u));
      } else if (currentItem.type === "Listing") {
        await axios.put(`/api/admin/listings/${currentItem.id}`, currentItem);
        setListingsData(listingsData.map(l => l.id === currentItem.id ? currentItem : l));
      }
      setEditModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      if (currentItem.type === "User") {
        await axios.delete(`/api/admin/users/${currentItem.id}`);
        setUsersData(usersData.filter(u => u.id !== currentItem.id));
      } else if (currentItem.type === "Listing") {
        await axios.delete(`/api/admin/listings/${currentItem.id}`);
        setListingsData(listingsData.filter(l => l.id !== currentItem.id));
      }
      setDeleteModalOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { position: "top" }, title: { display: true, text: "New Properties per Month" } },
  };

  const renderUsers = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {usersData.map((user) => (
            <tr key={user.id} className="hover:bg-indigo-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button onClick={() => openEditModal({ ...user, type: "User" })} className="text-indigo-600 hover:text-indigo-800"><Edit2 size={18} /></button>
                <button onClick={() => openDeleteModal({ ...user, type: "User" })} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderListings = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {listingsData.map((listing) => (
            <tr key={listing.id} className="hover:bg-green-50 transition">
              <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                {listing.image && <img src={listing.image} alt={listing.title} className="w-12 h-12 rounded-lg object-cover"/>}
                <span>{listing.title}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{listing.location}</td>
              <td className="px-6 py-4 whitespace-nowrap">₹{listing.price.toLocaleString()}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-white text-sm ${
                  listing.status === "Active" ? "bg-green-500" :
                  listing.status === "Pending" ? "bg-yellow-500" :
                  "bg-red-500"
                }`}>{listing.status}</span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                <button onClick={() => openEditModal({ ...listing, type: "Listing" })} className="text-indigo-600 hover:text-indigo-800"><Edit2 size={18} /></button>
                <button onClick={() => openDeleteModal({ ...listing, type: "Listing" })} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderMessages = () => (
    <div className="overflow-x-auto bg-white rounded-xl shadow p-4">
      <table className="min-w-full divide-y divide-gray-200 table-auto">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Sender</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {messagesData.map((msg) => (
            <tr key={msg.id} className="hover:bg-yellow-50 transition">
              <td className="px-6 py-4 whitespace-nowrap">{msg.sender}</td>
              <td className="px-6 py-4 whitespace-nowrap">{msg.email}</td>
              <td className="px-6 py-4 whitespace-nowrap">{msg.message}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-indigo-600 hover:text-indigo-800"><Eye size={18} /></button>
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
      case "messages":
        return renderMessages();
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`bg-white shadow-lg transition-all duration-300
        ${sidebarOpen ? "w-64 fixed inset-y-0 left-0 z-50" : "w-16"} md:relative md:w-64 flex flex-col`}>
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 relative">
          {sidebarOpen && <h2 className="text-2xl font-bold text-indigo-600">Admin Panel</h2>}
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
              {sidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-3 m-4 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
        >
          <LogOut size={18} />
          {sidebarOpen && <span>Logout</span>}
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8 transition-all duration-300">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
          <h1 className="text-3xl font-bold capitalize text-gray-800">{activePage}</h1>
          <div className="flex items-center gap-4">
            <button className="relative text-gray-600 hover:text-indigo-600">
              <Bell size={24} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <span className="text-gray-700 font-medium">Admin</span>
          </div>
        </div>

        {renderContent()}
      </main>

      {/* Edit & Delete Modals */}
      <Dialog open={editModalOpen} onClose={() => setEditModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-md sm:max-w-lg rounded-2xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4 text-indigo-600">Edit {currentItem?.type}</Dialog.Title>
            <div className="flex flex-col gap-3">
              <input
                type="text"
                className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                value={currentItem?.name || currentItem?.title || ""}
                onChange={(e) => setCurrentItem({...currentItem, name: e.target.value, title: e.target.value})}
                placeholder={currentItem?.type === "User" ? "Name" : "Title"}
              />
              {currentItem?.type === "User" && (
                <input
                  type="email"
                  className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                  value={currentItem?.email || ""}
                  onChange={(e) => setCurrentItem({...currentItem, email: e.target.value})}
                  placeholder="Email"
                />
              )}
              {currentItem?.type === "Listing" && (
                <>
                  <input
                    type="text"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.location || ""}
                    onChange={(e) => setCurrentItem({...currentItem, location: e.target.value})}
                    placeholder="Location"
                  />
                  <input
                    type="number"
                    className="w-full border px-3 py-2 rounded focus:ring-2 focus:ring-indigo-300"
                    value={currentItem?.price || ""}
                    onChange={(e) => setCurrentItem({...currentItem, price: Number(e.target.value)})}
                    placeholder="Price"
                  />
                </>
              )}
              <div className="flex justify-end gap-3 mt-4">
                <button onClick={() => setEditModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition">Save</button>
              </div>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>

      <Dialog open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="mx-auto w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
            <Dialog.Title className="text-xl font-bold mb-4 text-red-500">Delete {currentItem?.type}?</Dialog.Title>
            <p>Are you sure you want to delete this {currentItem?.type.toLowerCase()}? This action cannot be undone.</p>
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setDeleteModalOpen(false)} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
              <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition">Delete</button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
