import axios from "axios";
import React, { useEffect, useState } from "react";

const Search = () => { 
 
  const [upazilas, setUpazilas] = useState([])
  const [districts, setDistricts] = useState([])
  const [district, setDistrict] = useState('')
   const [upazila, setUpazila] = useState([])
  
  useEffect(() => {
    axios.get('/upazila.json')
      .then(res => {
        setUpazilas(res.data.upazilas)
      })
     axios.get('/district.json')
      .then(res => {
        setDistricts(res.data.districts)
      })
    
  }, [])





  return (
    <div
      className="container"
      style={{ paddingTop: "2rem", paddingBottom: "2rem" }}
    >
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Search Blood Donors</h1>
        <p className="dashboard-subtitle">
          Find blood donors in your area by blood group, district, and upazila
        </p>
      </div>

      {/* Search Form (UI only) */}
      <div className="search-section">
        <div className="search-form">

          <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select className="form-select" defaultValue="Select Blood Group"
              name="blood">
                <option disabled={true} >Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div> 

         <div className="form-group">
              <label className="form-label">District</label>
              <select value={district} onChange={(e) => setDistrict(e.target.value)} className="form-select">
                <option disabled selected value='' >Select District</option>
                {
                  districts.map(d => <option value={d?.name} key={d.id}>{d?.name }</option>)
               }
              </select>
            </div>

          <div className="form-group">
              <label className="form-label">Upazila</label>
              <select value={upazila} onChange={(e) => setUpazila(e.target.value)} className="form-select">
                <option disabled selected value='' >Select Upazila</option>
                {
                  upazilas.map(u => <option value={u?.name} key={u.id}>{u?.name }</option>)
               }
              </select>
            </div>

          <button className="btn btn-secondary">
            Clear Filters
          </button>

        </div>
      </div>

      {/* Result Count placeholder */}
      <div style={{ marginBottom: "1rem", color: "var(--text-gray)" }}>
        Found 0 donors
      </div>

      {/* Donor Grid Container */}
      <div className="grid grid-cols-3">

        {/*
          BACKEND DATA WILL MAP HERE

          Example:

          {donors.map(donor => (
            <DonorCard key={donor._id} data={donor} />
          ))}
        */}

      </div>

      {/* Empty State UI */}
      <div className="empty-state">
        <div className="empty-state-icon">🔍</div>
        <h3 className="empty-state-title">No Donors Found</h3>
        <p className="empty-state-description">
          Donor results will appear here after search.
        </p>
      </div>

      {/* Pagination UI (visual only) */}
      <div className="pagination">
        <button className="pagination-btn">← Previous</button>
        <button className="pagination-btn active">1</button>
        <button className="pagination-btn">Next →</button>
      </div>
    </div>
  );
};

export default Search;
