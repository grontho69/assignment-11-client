import axios from "axios";
import React, { useEffect, useState } from "react";
import Select from "react-select"; // react-select ইমপোর্ট করা হয়েছে
import useAxios from "../Hooks/useAxios";

const Search = () => {
  const axiosInstance = useAxios();

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [district, setDistrict] = useState(null); // জেলার অবজেক্ট {value, label}
  const [upazila, setUpazila] = useState(null);   // উপজেলার অবজেক্ট {value, label}

  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    // ডিস্ট্রিক্ট ডেটা লোড
    axios.get("/district.json").then(res => {
      const formattedDistricts = res.data.districts.map(d => ({
        value: d.id,
        label: d.name
      }));
      setDistricts(formattedDistricts);
    });

    // উপজেলা ডেটা লোড
    axios.get("/upazila.json").then(res => {
      setUpazilas(res.data.upazilas);
    });
  }, []);

  // ১. সিলেক্ট করা ডিস্ট্রিক্ট আইডি অনুযায়ী উপজেলা ফিল্টার এবং ফরম্যাট করা
  const filteredUpazilaOptions = district 
    ? upazilas
        .filter(u => u.district_id === district.value)
        .map(u => ({ value: u.id, label: u.name }))
    : [];

  const handleSearch = async (e) => {
    e.preventDefault();
    const blood = e.target.blood.value;

    try {
      // ২. label থেকে নামগুলো নিয়ে কোয়েরি পাঠানো হচ্ছে
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
            
            {/* Blood Group Select */}
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

            {/* ৩. Searchable District Select */}
            <div className="form-group">
              <label className="form-label">District</label>
              <Select
                options={districts}
                isSearchable={true}
                placeholder="Search District..."
                onChange={(selected) => {
                  setDistrict(selected);
                  setUpazila(null); // জেলা বদলালে উপজেলা ক্লিয়ার হবে
                }}
              />
            </div>

            {/* ৪. Searchable Upazila Select */}
            <div className="form-group">
              <label className="form-label">Upazila</label>
              <Select
                options={filteredUpazilaOptions}
                isSearchable={true}
                placeholder="Search Upazila..."
                value={upazila}
                isDisabled={!district} // জেলা সিলেক্ট না করলে এটি বন্ধ থাকবে
                onChange={(selected) => setUpazila(selected)}
              />
            </div>

            <button type="submit" className="btn btn-secondary" style={{ height: '40px' }}>Search</button>
          </div>
        </div>
      </form>

      {/* ৫. রেজাল্ট ডিসপ্লে */}
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