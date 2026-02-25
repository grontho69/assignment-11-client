import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import { AuthContext } from "../Context/AuthContext";
import useAxios from "../Hooks/useAxios";


const DonationRequest = () => {
  const axiosPublic = useAxios();
 

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await axiosPublic.get("/all-requests");

      // backend sends { requests: [...] }
      setRequests(res.data.requests || []);

    } catch (err) {
      console.error(err);
      setError("Failed to load requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
   fetchRequests();

   
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Loading requests...</div>;
  }

  if (error) {
    return <div style={{ padding: 40, color: "red" }}>{error}</div>;
  }

  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
   
      <div className="dashboard-header">
        <h1 className="dashboard-title">Blood Donation Requests</h1>
        <p className="dashboard-subtitle">
          Find and respond to blood donation requests in your area
        </p>
      </div>

      <div style={{ marginBottom: "1rem", color: "var(--text-gray)" }}>
        Total Requests: {requests.length}
      </div>

      
      <div className="grid grid-cols-1">
        {requests.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">📋</div>
            <h3 className="empty-state-title">No Requests Found</h3>
            <p className="empty-state-description">
              Requests will appear here when available.
            </p>
          </div>
        ) : (
          requests.map((req) => (
            <div key={req._id} className="donation-card">
              <div className="donation-card-header">
                <div>
                  <h3 className="donation-card-title">
                    {req.name}
                  </h3>
                  <p style={{ fontSize: 14 }}>📞 {req.phone}</p>
                </div>

                <div style={{ textAlign: "right" }}>
                  <div>{req.urgency}</div>
                  <div>{req.donation_status}</div>
                </div>
              </div>

              <div className="donation-card-meta">
                <div>🩸 {req.bloodGroup}</div>
                <div>🏥 {req.hospital}</div>
                <div>📍 {req.district}</div>
                <div>📅 {req.date}</div>
              </div>

              <p>{req.reason}</p>

              
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DonationRequest;
