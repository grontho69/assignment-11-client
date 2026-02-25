import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";

import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";

const MainDashboard = () => {

  const axiosSecure = useAxiosSecure();
  const [dbUser, setDbUser] = useState(null)
  const { user} = useContext(AuthContext);

  const [stats, setStats] = useState({});
  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {

   
    axiosSecure.get("/dashboard-stats")
      .then(res => setStats(res.data))
      .catch(err => console.log(err));

    axiosSecure.get("/recent-requests?limit=5")
      .then(res => setRecentRequests(res.data))
      .catch(err => console.log(err));

  }, [axiosSecure]);
   useEffect(() => {
  if (user?.email) {
   
       axios.get(`https://blood-connect-server-peach.vercel.app/user/role/${user.email}`)
      .then(res => {
        setDbUser(res.data);
      })
      .catch(err => console.log(err));
  }
}, [user]);


  return (
    <div>

    
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
      </div>


     
      <div className="dashboard-stats">

        <div className="dashboard-stat-card">
          <div className="dashboard-stat-label">Total Donors</div>
          <div className="dashboard-stat-value">{stats.totalDonors || 0}</div>
        </div>

        <div className="dashboard-stat-card success">
          <div className="dashboard-stat-label">Total Volunteers</div>
          <div className="dashboard-stat-value">{stats.totalVolunteers || 0}</div>
        </div>

        <div className="dashboard-stat-card warning">
          <div className="dashboard-stat-label">Pending Requests</div>
          <div className="dashboard-stat-value">{stats.pendingRequests || 0}</div>
        </div>

        <div className="dashboard-stat-card info">
          <div className="dashboard-stat-label">Completed Requests</div>
          <div className="dashboard-stat-value">{stats.completedRequests || 0}</div>
        </div>

      </div>


      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>

        <div className="card-body">
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            {(dbUser?.role === "admin" || dbUser?.role === "volunteer") && (
            <>
              <Link to="/dashboard/all-users">
              <button className="btn btn-primary">👥 Manage Users</button>
            </Link>

            <Link to="/dashboard/manage-request">
              <button className="btn btn-primary">📄 Manage Requests</button>
            </Link>
            </>
          )}

           

            <Link to="/search">
              <button className="btn btn-outline">🔍 Search Donors</button>
            </Link>

          </div>
        </div>
      </div>


     
      <div className="card">

        <div className="card-header">
          <h2 className="card-title">Recent Requests</h2>
        </div>

        <div className="card-body">

          {recentRequests.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon">📋</div>
              <h3>No Requests</h3>
            </div>
          ) : (
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Requester</th>
                    <th>Blood</th>
                    <th>Hospital</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {recentRequests.map(req => (
                    <tr key={req._id}>
                      <td>{req.name}</td>
                      <td>{req.blood}</td>
                      <td>{req.hospname}</td>
                      <td>{req.donation_status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

export default MainDashboard;
