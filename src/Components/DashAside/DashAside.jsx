import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Home,
  User,
  FileText,
  PlusCircle,
  Users,
  List,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { AuthContext } from "../../Context/AuthContext";


const NavItem = ({ to, icon: Icon, label, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      end={false}
      className={({ isActive }) =>
        `dashboard-nav-item ${isActive ? "active" : ""}`
      }
    >
      <Icon size={20} />
      <span>{label}</span>
    </NavLink>
  );
};


const DashAside = ({ children }) => {
  const { user, signoutUserFunc } = useContext(AuthContext);
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    signoutUserFunc();
    navigate("/");
  };

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside className={`dashboard-sidebar ${sidebarOpen ? "mobile-open" : ""}`}>
        <div className="dashboard-sidebar-header">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h2 className="dashboard-sidebar-title">🩸 BloodConnect</h2>
              <p className="text-sm text-gray-600 mt-1">Dashboard</p>
            </div>
            <button
              className="lg:hidden p-1 hover:bg-gray-100 rounded"
              onClick={closeSidebar}
            >
              <X size={20} />
            </button>
          </div>

          
          <div className="profile-badge">
            <div className="profile-avatar-small">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div>
              <p className="font-semibold text-sm text-gray-900">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 uppercase">
                {user?.role}
              </p>
            </div>
          </div>
        </div>

        
        <nav className="dashboard-sidebar-nav">
          <NavItem
            to="/dashboard/main"
            icon={Home}
            label="Dashboard"
            onClick={closeSidebar}
          />
          <NavItem
            to="/dashboard/profile"
            icon={User}
            label="My Profile"
            onClick={closeSidebar}
          />

          {(user?.role === "donor" || user?.role === "volunteer") && (
            <>
              <div className="nav-divider">Requests</div>
              <NavItem
                to="/dashboard/my-donation-requests"
                icon={FileText}
                label="My Requests"
                onClick={closeSidebar}
              />
              <NavItem
                to="/dashboard/create-donation-request"
                icon={PlusCircle}
                label="Create Request"
                onClick={closeSidebar}
              />
            </>
          )}

          {(user?.role === "admin" || user?.role === "volunteer") && (
            <>
              <div className="nav-divider">Management</div>
              <NavItem
                to="/dashboard/all-blood-donation-request"
                icon={List}
                label="All Requests"
                onClick={closeSidebar}
              />
            </>
          )}

          {user?.role === "admin" && (
            <NavItem
              to="/dashboard/all-users"
              icon={Users}
              label="All Users"
              onClick={closeSidebar}
            />
          )}

          <div className="nav-separator" />

          <NavLink
            to="/"
            className="dashboard-nav-item"
            onClick={closeSidebar}
          >
            <Home size={20} />
            <span>Back to Home</span>
          </NavLink>

          <button
            className="dashboard-nav-item"
            onClick={handleLogout}
            style={{
              border: "none",
              background: "none",
              width: "100%",
              textAlign: "left",
            }}
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </aside>

      
      <main className="dashboard-main">
        <div className="dashboard-topbar">
          <button
            className="btn btn-secondary btn-sm lg:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={20} />
            <span>Menu</span>
          </button>
        </div>

        <div className="dashboard-content">{children}</div>
      </main>
    </div>
  );
};

export default DashAside;
