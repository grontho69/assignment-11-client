import React from 'react'
import DashboardLayout from './../../DashboardLayout/DashboardLayout';
import { Link } from 'react-router';

const MainDashboard = () => {
  return (
    <div>

      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome, USER_NAME!</h1>
        <p className="dashboard-subtitle">
          Role: USER_ROLE | Blood Group: BLOOD_GROUP
        </p>
      </div>


      {/* Statistics Cards */}
      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-label">Total Donors</div>
          <div className="dashboard-stat-value">0</div>
        </div>

        <div className="dashboard-stat-card success">
          <div className="dashboard-stat-label">Total Volunteers</div>
          <div className="dashboard-stat-value">0</div>
        </div>

        <div className="dashboard-stat-card warning">
          <div className="dashboard-stat-label">Pending Requests</div>
          <div className="dashboard-stat-value">0</div>
        </div>

        <div className="dashboard-stat-card info">
          <div className="dashboard-stat-label">Completed Requests</div>
          <div className="dashboard-stat-value">0</div>
        </div>

      </div>


      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>

        <div className="card-body">
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>

            <Link to="/dashboard/all-users">
              <button className="btn btn-primary">👥 Manage Users</button>
            </Link>

            <Link to="/dashboard/all-blood-donation-request">
              <button className="btn btn-primary">📄 Manage Requests</button>
            </Link>

            <Link to="/donation-requests">
              <button className="btn btn-outline">🔍 View Public Requests</button>
            </Link>

            <Link to="/dashboard/create-donation-request">
              <button className="btn btn-primary">➕ Create Request</button>
            </Link>

            <Link to="/dashboard/my-donation-requests">
              <button className="btn btn-primary">📋 My Requests</button>
            </Link>

            <Link to="/search">
              <button className="btn btn-outline">🔍 Search Donors</button>
            </Link>

            <Link to="/funding">
              <button className="btn btn-outline">💰 View Funding</button>
            </Link>

          </div>
        </div>
      </div>


      {/* Recent Requests */}
      <div className="card">

        <div className="card-header">
          <h2 className="card-title">Recent Requests</h2>
        </div>

        <div className="card-body">

          {/* Empty State */}
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3 className="empty-state-title">No Requests Yet</h3>
            <p className="empty-state-description">
              Requests will appear here.
            </p>
          </div>

          {/* Table Container */}
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Requester</th>
                  <th>Blood Group</th>
                  <th>Hospital</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>

                {/*
                  BACKEND DATA WILL MAP HERE

                  Example:

                  {recentRequests.map(req => (
                    <tr key={req._id}>
                      <td>{req.requesterName}</td>
                      <td><span className="badge badge-primary">{req.bloodGroup}</span></td>
                      <td>{req.hospital}</td>
                      <td>{req.date}</td>
                      <td><span className="badge badge-success">{req.status}</span></td>
                    </tr>
                  ))}
                */}

              </tbody>
            </table>
          </div>

        </div>


        {/* Footer */}
        <div className="card-footer">
          <div></div>
          <Link to="/dashboard/all-requests">
            <button className="btn btn-outline btn-sm">View All →</button>
          </Link>
        </div>

      </div>

    </div>
  )
}

export default MainDashboard
