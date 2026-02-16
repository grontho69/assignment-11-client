import React, { useEffect, useState } from "react";

import useAxiosSecure from "../../Hooks/useAxiosSecure";

const Profile = () => {
  const axiosSecure =  useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
   
      axiosSecure .get("/my-profile")
      .then(res => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Failed to load profile");
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (error) return <p>{error}</p>;
  if (!profile) return <p>No profile data</p>;

  return (
    <div>

      <div className="dashboard-header">
        <h1 className="dashboard-title">My Profile</h1>
        <p className="dashboard-subtitle">
          View and manage your account information
        </p>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Personal Information</h2>
          <button className="btn btn-primary btn-sm">
            ✏️ Edit Profile
          </button>
        </div>

        <div className="card-body">
          <div className="profile-section">

            <div className="profile-avatar-section">
              
                <img src={profile.
mainPhotoUrl} alt="" className="profile-avatar" />              

              <h3 style={{ fontWeight: 700, fontSize: "1.25rem" }}>
                {profile.name}
              </h3>

              <p style={{ color: "var(--text-gray)", fontSize: "0.875rem" }}>
                {profile.role}
              </p>
            </div>

            <div className="profile-info-grid">

              <div className="profile-info-item">
                <div className="profile-info-label">Email</div>
                <div className="profile-info-value">{profile.email}</div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">Phone</div>
                <div className="profile-info-value">{profile.phone}</div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">Blood Group</div>
                <div className="profile-info-value" style={{ color: "red", fontWeight: 700 }}>
                  {profile.blood}
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">Role</div>
                <div className="profile-info-value">{profile.role}</div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">District</div>
                <div className="profile-info-value">{profile.district}</div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">Upazila</div>
                <div className="profile-info-value">{profile.upazila}</div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">Last Donation</div>
                <div className="profile-info-value">
                  {profile.lastDonationDate || "N/A"}
                </div>
              </div>

              <div className="profile-info-item">
                <div className="profile-info-label">Member Since</div>
                <div className="profile-info-value">
                  {new Date(profile.createdAt).toLocaleDateString()}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginTop: "1rem" }}>
        <strong>Note:</strong> Email cannot be changed.
      </div>

    </div>
  );
};

export default Profile;
