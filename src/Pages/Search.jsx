import axios from "axios";
import React, { useEffect, useState } from "react";
import useAxios from "../Hooks/useAxios";

const Search = () => {
  const axiosInstance = useAxios();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  // load location data
  useEffect(() => {
    axios.get("/district.json").then(res => {
      setDistricts(res.data.districts);
    });

    axios.get("/upazila.json").then(res => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  // search submit
  const handleSearch = async (e) => {
    e.preventDefault();

    const blood = e.target.blood.value;

    try {
      const res = await axiosInstance.get(
        `/search-request?blood=${encodeURIComponent(blood)}&district=${encodeURIComponent(district)}&upazila=${encodeURIComponent(upazila)}`
      );

      setResults(res.data);
      setSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      
      {/* Header */}
      <div className="dashboard-header">
        <h1 className="dashboard-title">Search Blood Donors</h1>
        <p className="dashboard-subtitle">
          Find blood donors in your area by blood group, district, and upazila
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div className="search-section">
          <div className="search-form">

            {/* Blood */}
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select name="blood" className="form-select" defaultValue="">
                <option value="" disabled>Select Blood Group</option>
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

            {/* District */}
            <div className="form-group">
              <label className="form-label">District</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="form-select"
              >
                <option value="">Select District</option>
                {districts.map(d => (
                  <option key={d.id} value={d.name}>{d.name}</option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="form-group">
              <label className="form-label">Upazila</label>
              <select
                value={upazila}
                onChange={(e) => setUpazila(e.target.value)}
                className="form-select"
              >
                <option value="">Select Upazila</option>
                {upazilas.map(u => (
                  <option key={u.id} value={u.name}>{u.name}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-secondary">
              Search
            </button>

          </div>
        </div>
      </form>

      {/* Result count */}
      {searched && (
        <div style={{ marginBottom: "1rem", color: "var(--text-gray)" }}>
          Found {results.length} result{results.length !== 1 && "s"}
        </div>
      )}

      {/* Results grid */}
      <div className="grid grid-cols-3">
        {results.map(item => (
          <div key={item._id} className="card">
            <h3 className="card-title">{item.name}</h3>

            <div style={{ marginBottom: "0.5rem" }}>
              <span className="badge badge-primary">{item.blood}</span>
            </div>

            <p>📞 {item.phone}</p>
            <p>📍 {item.upazila}, {item.district}</p>
            <p>🏥 {item.hospname}</p>
          </div>
        ))}
      </div>

      {/* Empty state */}
      {searched && results.length === 0 && (
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3 className="empty-state-title">No Donors Found</h3>
          <p className="empty-state-description">
            No data matched your search.
          </p>
        </div>
      )}

    </div>
  );
};

export default Search;
