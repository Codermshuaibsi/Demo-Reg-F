import React, { useState } from "react";
import { User, FileText, Clock, HelpCircle, LogOut, Bell, Search, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock ProtectedRoute component for demonstration
const ProtectedRoute = ({ children }) => {
  return children;
};

export default function HomePage() {
  const navigate = useNavigate();
  const [username] = useState("Citizen"); // Static for demo - replace with API call
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // In a real app, you'd clear authentication state and redirect
    localStorage.removeItem('token')
    alert("Logout clicked - would redirect to login page");
    navigate("/")
    // Navigate logic would go here
  };

  const navigationItems = [
    { id: "dashboard", label: "Dashboard", icon: User },
    { id: "apply", label: "Apply Services", icon: FileText },
    { id: "applications", label: "My Applications", icon: Clock },
    { id: "support", label: "Support", icon: HelpCircle }
  ];

  const services = [
    {
      title: "Apply for Certificates",
      description: "Birth, Caste, Income, and more",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-800",
      icon: "📄"
    },
    {
      title: "Check Application Status",
      description: "Track your submitted forms easily",
      color: "bg-green-50 border-green-200",
      textColor: "text-green-800",
      icon: "📋"
    },
    {
      title: "Government Schemes",
      description: "Explore latest welfare programs",
      color: "bg-purple-50 border-purple-200",
      textColor: "text-purple-800",
      icon: "🏛️"
    },
    {
      title: "Document Verification",
      description: "Verify your submitted documents",
      color: "bg-orange-50 border-orange-200",
      textColor: "text-orange-800",
      icon: "✅"
    },
    {
      title: "Payment History",
      description: "View your transaction records",
      color: "bg-indigo-50 border-indigo-200",
      textColor: "text-indigo-800",
      icon: "💳"
    },
    {
      title: "Download Forms",
      description: "Get printable application forms",
      color: "bg-teal-50 border-teal-200",
      textColor: "text-teal-800",
      icon: "📥"
    }
  ];

  const recentApplications = [
    { id: "APP001", type: "Income Certificate", status: "Approved", date: "2024-08-15" },
    { id: "APP002", type: "Caste Certificate", status: "In Progress", date: "2024-08-10" },
    { id: "APP003", type: "Birth Certificate", status: "Pending", date: "2024-08-08" }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Approved": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-yellow-100 text-yellow-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={closeSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <aside className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}>
          {/* Mobile Close Button */}
          <div className="lg:hidden absolute top-4 right-4">
            <button
              onClick={closeSidebar}
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
            >
              <X size={20} />
            </button>
          </div>

          <div className="p-4 lg:p-6 text-center border-b border-gray-200">
            <h2 className="text-lg lg:text-xl font-bold text-gray-800">Jan Seva Kendra</h2>
            <p className="text-xs lg:text-sm text-gray-500 mt-1">Digital India Initiative</p>
          </div>

          <nav className="flex-1 p-3 lg:p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    closeSidebar();
                  }}
                  className={`w-full text-left px-3 lg:px-4 py-2 lg:py-3 rounded-lg flex items-center space-x-3 transition-colors ${activeTab === item.id
                      ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                >
                  <Icon size={18} />
                  <span className="font-medium text-sm lg:text-base">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-3 lg:p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-2 lg:py-3 px-3 lg:px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 text-sm lg:text-base"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto w-full lg:w-auto">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 p-4 lg:p-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="lg:hidden p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
                >
                  <Menu size={20} />
                </button>

                <div>
                  <h1 className="text-xl lg:text-2xl font-bold text-gray-800">Welcome back, {username}! 👋</h1>
                  <p className="text-gray-500 mt-1 text-sm lg:text-base hidden sm:block">Manage your government services efficiently</p>
                </div>
              </div>

              <div className="flex items-center space-x-2 lg:space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search size={18} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 lg:h-5 lg:w-5 flex items-center justify-center">3</span>
                </button>
                <div className="hidden sm:flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-2 lg:px-3 py-1 rounded-full text-xs lg:text-sm font-medium">✓ Verified</span>
                </div>
              </div>
            </div>
          </header>

          <div className="p-4 lg:p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6 lg:mb-8">
              <div className="bg-white p-3 lg:p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-500">Total Applications</p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-800">12</p>
                  </div>
                  <div className="text-blue-500 text-lg lg:text-xl">📊</div>
                </div>
              </div>
              <div className="bg-white p-3 lg:p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-500">Approved</p>
                    <p className="text-lg lg:text-2xl font-bold text-green-600">8</p>
                  </div>
                  <div className="text-green-500 text-lg lg:text-xl">✅</div>
                </div>
              </div>
              <div className="bg-white p-3 lg:p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-500">In Progress</p>
                    <p className="text-lg lg:text-2xl font-bold text-yellow-600">3</p>
                  </div>
                  <div className="text-yellow-500 text-lg lg:text-xl">⏳</div>
                </div>
              </div>
              <div className="bg-white p-3 lg:p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs lg:text-sm text-gray-500">Pending</p>
                    <p className="text-lg lg:text-2xl font-bold text-gray-600">1</p>
                  </div>
                  <div className="text-gray-500 text-lg lg:text-xl">⏰</div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <section className="mb-6 lg:mb-8">
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 lg:mb-6">Available Services</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`${service.color} p-4 lg:p-6 rounded-xl border-2 hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-xl lg:text-2xl">{service.icon}</div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-gray-500">→</span>
                      </div>
                    </div>
                    <h3 className={`text-base lg:text-lg font-semibold ${service.textColor} mb-2`}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs lg:text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Applications */}
            <section>
              <h2 className="text-lg lg:text-xl font-semibold text-gray-800 mb-4 lg:mb-6">Recent Applications</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                {/* Mobile Card View */}
                <div className="block sm:hidden">
                  {recentApplications.map((app) => (
                    <div key={app.id} className="border-b border-gray-100 last:border-b-0 p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-gray-800">{app.id}</p>
                          <p className="text-sm text-gray-600">{app.type}</p>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-xs text-gray-500">{app.date}</p>
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Application ID</th>
                        <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Service Type</th>
                        <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Status</th>
                        <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Date</th>
                        <th className="text-left py-3 lg:py-4 px-4 lg:px-6 font-semibold text-gray-700 text-sm lg:text-base">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApplications.map((app) => (
                        <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-3 lg:py-4 px-4 lg:px-6 font-medium text-gray-800 text-sm lg:text-base">{app.id}</td>
                          <td className="py-3 lg:py-4 px-4 lg:px-6 text-gray-600 text-sm lg:text-base">{app.type}</td>
                          <td className="py-3 lg:py-4 px-4 lg:px-6">
                            <span className={`px-2 lg:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-3 lg:py-4 px-4 lg:px-6 text-gray-600 text-sm lg:text-base">{app.date}</td>
                          <td className="py-3 lg:py-4 px-4 lg:px-6">
                            <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                              View Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}