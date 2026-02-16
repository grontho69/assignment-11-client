import React, { useEffect, useState } from "react";


import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-toastify";

const Profile = () => {
  const axiosSecure = useAxiosSecure();

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  
  const loadProfile = () => {
    axiosSecure
      .get("/my-profile")
      .then(res => {
        setProfile(res.data);
        setFormData(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadProfile();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const handleSave = () => {
    axiosSecure
      .patch("/update-profile", formData)
      .then(() => {
        setEditing(false);
        loadProfile(); 
        toast.success("Profile updated successfully");
      })
      .catch(err => {
        console.error(err);
        toast.error("Failed to update profile");
      });
  };

  if (loading) return <p>Loading profile...</p>;
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

          {!editing ? (
            <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>
              ✏️ Edit Profile
            </button>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>
              Cancel
            </button>
          )}
        </div>

        <div className="card-body">
          <div className="profile-section">

            
            <div className="profile-avatar-section">
              <div >
                <img className="profile-avatar" src={profile.mainPhotoUrl} alt="" />
              </div>
              <h3 style={{ fontWeight: "700", fontSize: "1.25rem", marginBottom: "0.25rem" }}>
                {profile.name}
              </h3>
              <p style={{ color: "var(--text-gray)", fontSize: "0.875rem" }}>
                {profile.role}
              </p>
            </div>

           
            {!editing ? (
              <div className="profile-info-grid">
                <Info label="Email" value={profile.email} />
                <Info label="Phone" value={profile.phone} />
                <Info label="Blood Group" value={profile.blood} style={{ color: "var(--primary-red)", fontWeight: 700 }} />
                <Info label="Role" value={profile.role} />
                <Info label="District" value={profile.district} />
                <Info label="Upazila" value={profile.upazila} />
                <Info label="Last Donation" value={profile.lastDonationDate || "N/A"} />
                <Info label="Member Since" value={new Date(profile.createdAt).toLocaleDateString()} />
              </div>
            ) : (
              <div className="profile-info-grid">
                <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} />
                <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} />
                <FormInput label="Blood Group" name="blood" value={formData.blood} onChange={handleChange} />
                <FormInput label="District" name="district" value={formData.district} onChange={handleChange} />
                <FormInput label="Upazila" name="upazila" value={formData.upazila} onChange={handleChange} />

                <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save Changes
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      <div className="alert alert-info" style={{ marginTop: "1rem" }}>
        <strong>Note:</strong> Email cannot be changed.
      </div>

    </div>
  );
};


const Info = ({ label, value, style }) => (
  <div className="profile-info-item">
    <div className="profile-info-label">{label}</div>
    <div className="profile-info-value" style={style}>{value}</div>
  </div>
);

const FormInput = ({ label, name, value, onChange }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <input className="form-input" name={name} value={value || ""} onChange={onChange} />
  </div>
);

export default Profile;
