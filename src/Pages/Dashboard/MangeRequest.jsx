import React from 'react'

const MangeRequest = () => {
  return (
     <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">All Blood Donation Requests</h1>
        <p className="dashboard-subtitle">
          Manage and approve blood donation requests
        </p>
      </div>

      {/* Stats */}
      <div className="dashboard-stats">
        <div className="dashboard-stat-card">
          <div className="dashboard-stat-label">Total Requests</div>
          <div className="dashboard-stat-value">{''}</div>
        </div>

        <div className="dashboard-stat-card warning">
          <div className="dashboard-stat-label">Pending</div>
          <div className="dashboard-stat-value">0</div>
        </div>

        <div className="dashboard-stat-card info">
          <div className="dashboard-stat-label">Approved</div>
          <div className="dashboard-stat-value">0</div>
        </div>

        <div className="dashboard-stat-card success">
          <div className="dashboard-stat-label">Completed</div>
          <div className="dashboard-stat-value">0</div>
        </div>
      </div>

      {/* Filters UI only */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-body">
          <div style={{ marginBottom: "1rem" }}>
            <input
              type="text"
              className="form-input"
              placeholder="Search by requester name, phone, or hospital..."
            />
          </div>

          <div className="filters-grid">
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-select">
                <option>All Blood Groups</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">District</label>
              <select className="form-select">
                <option>All Districts</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select">
                <option>All Status</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Urgency</label>
              <select className="form-select">
                <option>All Urgencies</option>
              </select>
            </div>

            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <button className="btn btn-secondary w-full">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "1rem", color: "var(--text-gray)" }}>
        Showing {''} of {''} requests
      </div>

      {/* Table */}
      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Requester</th>
              <th>Blood</th>
              <th>Hospital</th>
              <th>Location</th>
              <th>Date</th>
              <th>Urgency</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {(() => (
              <tr key={''}>
                <td>
                  <div style={{ fontWeight: "600" }}>
                    {''}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--text-gray)" }}>
                    {''}
                  </div>
                </td>

                <td>
                  <span className="badge badge-primary">
                    {''}
                  </span>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--text-gray)",
                      marginTop: "0.25rem",
                    }}
                  >
                    {''} units
                  </div>
                </td>

                <td>{''}</td>
                <td>{''}, {''}</td>
                <td>{''}</td>

                <td>
                  <span className="badge">{''}</span>
                </td>

                <td>
                  <select
                    className="form-select"
                    style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                    defaultValue={''}
                  >
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>

                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <Link to="#">
                      <button className="btn btn-sm btn-outline">👁️</button>
                    </Link>
                    <button className="btn btn-sm btn-danger">🗑️</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination UI only */}
      <div className="pagination">
        <button className="pagination-btn">← Previous</button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">2</button>
        <button className="pagination-btn">Next →</button>
      </div>
    </div>
  )
}

export default MangeRequest
