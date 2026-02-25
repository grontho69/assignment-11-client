import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select";
import useAxios from "../Hooks/useAxios";

const Search = () => {
  const axiosInstance = useAxios();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [district, setDistrict] = useState(null); 
  const [upazila, setUpazila] = useState(null);   

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
 
    axios.get("/district.json").then(res => {
      const formattedDistricts = res.data.districts.map(d => ({
        value: d.id,
        label: d.name
      }));
      setDistricts(formattedDistricts);
    });

 
    axios.get("/upazila.json").then(res => {
      setUpazilas(res.data.upazilas);
    });
  }, []);


  const filteredUpazilaOptions = district 
    ? upazilas
        .filter(u => u.district_id === district.value)
        .map(u => ({ value: u.id, label: u.name }))
    : [];

  const handleSearch = async (e) => {
    e.preventDefault();
    const blood = e.target.blood.value;

    try {
      
      const res = await axiosInstance.get(
        `/search-request?blood=${encodeURIComponent(blood)}&district=${encodeURIComponent(district?.label || "")}&upazila=${encodeURIComponent(upazila?.label || "")}`
      );
      setResults(res.data);
      setSearched(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ paddingTop: "2rem", paddingBottom: "2rem" }}>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Search Blood Donors</h1>
      </div>

      <form onSubmit={handleSearch}>
        <div className="search-section">
          <div className="search-form" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px', alignItems: 'end' }}>
            
           
            <div className="form-group">
              <label className="form-label">Blood Group</label>
              <select name="blood" className="form-select" defaultValue="" required>
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

           
            <div className="form-group">
              <label className="form-label">District</label>
              <Select
                options={districts}
                isSearchable={true}
                placeholder="Search District..."
                onChange={(selected) => {
                  setDistrict(selected);
                  setUpazila(null); 
                }}
              />
            </div>

           
            <div className="form-group">
              <label className="form-label">Upazila</label>
              <Select
                options={filteredUpazilaOptions}
                isSearchable={true}
                placeholder="Search Upazila..."
                value={upazila}
                isDisabled={!district} 
                onChange={(selected) => setUpazila(selected)}
              />
            </div>

            <button type="submit" className="btn btn-secondary" style={{ height: '40px' }}>Search</button>
          </div>
        </div>
      </form>

      
      <div style={{ marginTop: '30px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {searched && results.length === 0 && <p>No donors found.</p>}
        {results.map(item => (
          <div key={item._id} className="card" style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '8px' }}>
            <h3>{item.name}</h3>
            <p>🩸 Blood: {item.bloodGroup}</p>
            <p>📍 {item.upazila}, {item.district}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;