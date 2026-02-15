import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../Context/AuthContext";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const CreateRequest = () => {
  const [upazilas, setUpazilas] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");

  const {user}=useContext(AuthContext)

const axiosSecure = useAxiosSecure()



  useEffect(() => {
    axios.get("/upazila.json").then((res) => {
      setUpazilas(res.data?.upazilas || []);
    });

    axios.get("/district.json").then((res) => {
      setDistricts(res.data?.districts || []);
    });
  }, []);

  const handelRequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const phone = form.phone.value;
    const blood = form.blood.value;
    const units = form.units.value;
    const urgency = form.urgency.value;
    const hospname = form.hospname.value;
    const date = form.date.value;
    const address = form.address.value;
    const reason = form.reason.value;

    
    const formData = {
      name,
      phone,
       blood,
       units:parseInt(units),
      urgency,
      date,
      hospname,
      district,
      upazila,
      address,
      reason,
      donation_status:'pending',
    };

    console.log(formData);

    
      axiosSecure.post("/request", formData)
        .then((res) => {
          console.log(res.data)
      toast.success("Request create successfully")
        }  
      )
        
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Create Donation Request</h1>
        <p className="dashboard-subtitle">
          Fill in the details to create a new blood donation request
        </p>
      </div>

      <div className="card">
        <form onSubmit={handelRequest}>
          <div className="card-body">
            <h3 style={{ fontSize: "1.125rem", fontWeight: 600 }}>
              Requester Information
            </h3>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Requester Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Patient or guardian name"
                  value={user?.displayName}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  className="form-input"
                  
                  placeholder={user?.phone}
                />
              </div>
            </div>

            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem" }}>
              Blood Requirements
            </h3>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Blood Group</label>
                <select name="blood" className="form-select">
                  <option value="">Select Blood Group</option>
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
                <label className="form-label">Units Required *</label>
                <input
                  type="number"
                  name="units"
                  className="form-input"
                  placeholder="Number of units"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Urgency Level *</label>
                <select name="urgency" className="form-select">
                  <option value="low">Low - Can wait a few days</option>
                  <option value="medium">Medium - Needed within 2-3 days</option>
                  <option value="high">High - Needed within 24 hours</option>
                  <option value="critical">Critical - Immediate need</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Donation Date *</label>
                <input name="date" type="date" className="form-input" />
              </div>
            </div>

            <h3 style={{ fontSize: "1.125rem", fontWeight: 600, marginTop: "1.5rem" }}>
              Location Details
            </h3>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Hospital Name *</label>
                <input
                  type="text"
                  name="hospname"
                  className="form-input"
                  placeholder="Hospital or medical center name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select District</option>
                  {districts.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Upazila</label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Upazila</option>
                  {upazilas.map((u) => (
                    <option key={u.id} value={u.name}>
                      {u.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Full Address *</label>
                <input
                  type="text"
                  name="address"
                  className="form-input"
                  placeholder="Complete hospital address"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Request *</label>
              <textarea
                name="reason"
                className="form-textarea"
                rows="4"
                placeholder="Please provide details about why blood is needed"
              />
            </div>
          </div>

          <div className="card-footer">
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Create Request
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRequest;
