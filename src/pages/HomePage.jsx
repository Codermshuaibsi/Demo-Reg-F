import React, { useState } from "react";
import { User, FileText, Clock, HelpCircle, LogOut, Bell, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Mock ProtectedRoute component for demonstration
const ProtectedRoute = ({ children }) => {
  return children;
};

export default function HomePage() {
  const navigate = useNavigate();
  const [username] = useState("Citizen"); // Static for demo - replace with API call
  const [activeTab, setActiveTab] = useState("dashboard");

  const handleLogout = () => {
    // In a real app, you'd clear authentication state and redirect
    alert("Logout clicked - would redirect to login page");
    const token = localStorage.removeItem("token")
  
      navigate("/");

    // window.location.href = "/"; // This would work in a real environment
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

  return (
    <ProtectedRoute>
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-lg border-r border-gray-200 flex flex-col">
          <div className="p-6 text-center border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Jan Seva Kendra</h2>
            <p className="text-sm text-gray-500 mt-1">Digital India Initiative</p>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3 transition-colors ${activeTab === item.id
                    ? "bg-blue-100 text-blue-800 border-l-4 border-blue-500"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
                    }`}
                >
                  <Icon size={18} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleLogout}
              className="w-full bg-red-500 text-white py-3 px-4 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center space-x-2"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          {/* Top Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Welcome back, {username}! 👋</h1>
                <p className="text-gray-500 mt-1">Manage your government services efficiently</p>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Search size={20} />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors relative">
                  <Bell size={20} />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </button>
                <div className="flex items-center space-x-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">✓ Verified User</span>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Total Applications</p>
                    <p className="text-2xl font-bold text-gray-800">12</p>
                  </div>
                  <div className="text-blue-500">📊</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Approved</p>
                    <p className="text-2xl font-bold text-green-600">8</p>
                  </div>
                  <div className="text-green-500">✅</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">In Progress</p>
                    <p className="text-2xl font-bold text-yellow-600">3</p>
                  </div>
                  <div className="text-yellow-500">⏳</div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Pending</p>
                    <p className="text-2xl font-bold text-gray-600">1</p>
                  </div>
                  <div className="text-gray-500">⏰</div>
                </div>
              </div>
            </div>

            {/* Services Grid */}
            <section className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Available Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    className={`${service.color} p-6 rounded-xl border-2 hover:shadow-md transition-all cursor-pointer group`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-2xl">{service.icon}</div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-gray-500">→</span>
                      </div>
                    </div>
                    <h3 className={`text-lg font-semibold ${service.textColor} mb-2`}>
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-sm">{service.description}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Applications */}
            <section>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Recent Applications</h2>
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Application ID</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Service Type</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Status</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Date</th>
                        <th className="text-left py-4 px-6 font-semibold text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentApplications.map((app) => (
                        <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 px-6 font-medium text-gray-800">{app.id}</td>
                          <td className="py-4 px-6 text-gray-600">{app.type}</td>
                          <td className="py-4 px-6">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-4 px-6 text-gray-600">{app.date}</td>
                          <td className="py-4 px-6">
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