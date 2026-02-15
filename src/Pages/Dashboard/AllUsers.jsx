import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  // Pagination mocks (You can implement actual logic later)
  const totalPages = 1;
  const currentPage = 1;

  // --- Helper Functions ---
  const getRoleBadge = (role) => {
    if (role === 'admin') return 'badge-danger';
    if (role === 'volunteer') return 'badge-info';
    return 'badge-success'; // donor
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString();
  };

  // --- API Functions ---
  const loadUsers = () => {
    axiosSecure.get('/user')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => console.error("Error loading users:", err));
  };

  useEffect(() => {
    loadUsers();
  }, [axiosSecure]);

  const handleStatusChng = (email, newStatus) => {
    // Matches Backend: app.patch('/update/user/status/:email', ...)
    // Email goes in the PATH, status goes in the QUERY
    axiosSecure.patch(`/update/user/status/${email}?status=${newStatus}`)
      .then(res => {
        if (res.data.modifiedCount > 0) {
          // Update local state immediately so UI feels snappy
          setUsers(prevUsers => 
            prevUsers.map(u => u.email === email ? { ...u, status: newStatus } : u)
          );
        }
      })
      .catch(err => {
        console.error("Failed to update status:", err);
        alert("Failed to update user status.");
      });
  };

  return (
    <div>
      {/* Header Section */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">All Users</h1>
        <p className="dashboard-subtitle">
          Manage users, block/unblock accounts, and view user details
        </p>
      </div>

      {/* Stats Section */}
      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-label">Total Users</div>
          <div className="dashboard-stat-value">{users.length}</div>
        </div>

        <div className="dashboard-stat-card success">
          <div className="dashboard-stat-label">Donors</div>
          <div className="dashboard-stat-value">
            {users.filter(u => u.role === 'donor').length}
          </div>
        </div>

        <div className="dashboard-stat-card info">
          <div className="dashboard-stat-label">Volunteers</div>
          <div className="dashboard-stat-value">
            {users.filter(u => u.role === 'volunteer').length}
          </div>
        </div>

        <div className="dashboard-stat-card warning">
          <div className="dashboard-stat-label">Blocked Users</div>
          <div className="dashboard-stat-value">
            {users.filter(u => u.status === 'blocked').length}
          </div>
        </div>
      </div>

      
      {/* Table Section */}
      {users.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">👥</div>
          <h3 className="empty-state-title">No Users Found</h3>
          <p className="empty-state-description">No users available.</p>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Blood Group</th>
                  <th>Role</th>
                  <th>Location</th>
                  <th>Joined</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>
                      <div style={{ fontWeight: "600" }}>{user.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-gray)" }}>{user.email}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-gray)" }}>{user.phone}</div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{user.blood}</span>
                    </td>
                    <td>
                      <span className={`badge ${getRoleBadge(user.role)}`}>{user.role}</span>
                    </td>
                    <td>
                      <div style={{ fontSize: "0.875rem" }}>
                        {user.upazila}, {user.district}
                      </div>
                    </td>
                    <td>{formatDate(user.date)}</td>
                    <td>
                      {user.status === 'blocked' ? (
                        <span className="badge badge-danger">Blocked</span>
                      ) : (
                        <span className="badge badge-success">Active</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        {user.status === 'blocked' ? (
                          <button
                            onClick={() => handleStatusChng(user.email, 'active')}
                            className="btn btn-sm btn-success"
                          >
                            Activate
                          </button>
                        ) : (
                          <button
                            onClick={() => handleStatusChng(user.email, 'blocked')}
                            className="btn btn-sm btn-danger"
                          >
                            Block
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button className="pagination-btn">← Previous</button>
              <button className="pagination-btn active">{currentPage}</button>
              <button className="pagination-btn">Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AllUsers;