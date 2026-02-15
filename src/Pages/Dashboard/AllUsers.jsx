import React, {  useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const AllUsers = () => {
 

  const totalPages = 1;
  const currentPage = 1;

  const getRoleBadge = () => "";
  const formatDate = () => "";

  const axiosSecure = useAxiosSecure()
  const [users, setUsers] = useState([])
 
  

  useEffect(() => {
   
    axiosSecure.get('/user')
      .then(res => {
      setUsers(res.data)
    })
  }, [axiosSecure ])
  console.log(users)
  

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">All Users</h1>
        <p className="dashboard-subtitle">
          Manage users, block/unblock accounts, and view user details
        </p>
      </div>

     
      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-label">Total Users</div>
          <div className="dashboard-stat-value">{users.length}</div>
        </div>

        <div className="dashboard-stat-card success">
          <div className="dashboard-stat-label">Donors</div>
          <div className="dashboard-stat-value">0</div>
        </div>

        <div className="dashboard-stat-card info">
          <div className="dashboard-stat-label">Volunteers</div>
          <div className="dashboard-stat-value">0</div>
        </div>

        <div className="dashboard-stat-card warning">
          <div className="dashboard-stat-label">Blocked Users</div>
          <div className="dashboard-stat-value">0</div>
        </div>
      </div>

      
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-body" style={{ padding: "1rem" }}>
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              alignItems: "center",
            }}
          >
            <div style={{ flex: "1", minWidth: "250px" }}>
              <input
                type="text"
                className="form-input"
                placeholder="Search by name, email, phone, or blood group..."
              />
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <button className="btn btn-sm btn-primary">All</button>
              <button className="btn btn-sm btn-secondary">Donors</button>
              <button className="btn btn-sm btn-secondary">Volunteers</button>
              
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "1rem", color: "var(--text-gray)" }}>
        Showing {users.length} of {''} users
      </div>

      
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
                  <tr key={user.id}>
                    <td>
                      <div style={{ fontWeight: "600" }}>{user.name}</div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-gray)" }}>
                        {users.email}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-gray)" }}>
                        {users.phone}
                      </div>
                    </td>

                    <td>
                      <span className="badge badge-primary">{users.blood}</span>
                    </td>

                    <td>
                      <span className={`badge ${getRoleBadge(users.role)}`}>
                        {users.role}
                      </span>
                    </td>

                    <td>
                      <div style={{ fontSize: "0.875rem" }}>
                        {users.upazila}, {users.district}
                      </div>
                    </td>

                    <td>{formatDate(users.createdAt)}</td>

                    <td>
                      {users.status ? (
                        <span className="badge badge-danger">Blocked</span>
                      ) : (
                        <span className="badge badge-success">Active</span>
                      )}
                    </td>

                    <td>
                      <div style={{ display: "flex", gap: "0.5rem" }}>
                        <button className="btn btn-sm btn-danger">🚫</button>
                        <button className="btn btn-sm btn-danger">🗑️</button>
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
