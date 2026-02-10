import React from 'react'

const CreateRequest = () => {
  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-title">Create Donation Request</h1>
        <p className="dashboard-subtitle">
          Fill in the details to create a new blood donation request
        </p>
      </div>

      <div className="card">
        <form>
          <div className="card-body">
            <h3 style={{ fontSize: "1.125rem", fontWeight: "600", marginBottom: "1rem" }}>
              Requester Information
            </h3>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Requester Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Patient or guardian name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Contact Phone *</label>
                <input
                  type="tel"
                  className="form-input"
                  placeholder="01XXXXXXXXX"
                />
                <span className="form-hint">Format: 01XXXXXXXXX</span>
              </div>
            </div>

            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1rem",
                marginTop: "1.5rem",
              }}
            >
              Blood Requirements
            </h3>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Blood Group *</label>
                <select className="form-select">
                  <option>Select Blood Group</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Units Required *</label>
                <input
                  type="number"
                  className="form-input"
                  placeholder="Number of units"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Urgency Level *</label>
                <select className="form-select">
                  <option>Low - Can wait a few days</option>
                  <option>Medium - Needed within 2-3 days</option>
                  <option>High - Needed within 24 hours</option>
                  <option>Critical - Immediate need</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Donation Date *</label>
                <input type="date" className="form-input" />
              </div>
            </div>

            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                marginBottom: "1rem",
                marginTop: "1.5rem",
              }}
            >
              Location Details
            </h3>

            <div className="grid grid-cols-2">
              <div className="form-group">
                <label className="form-label">Hospital Name *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Hospital or medical center name"
                />
              </div>

              <div className="form-group">
                <label className="form-label">District *</label>
                <select className="form-select">
                  <option>Select District</option>
                  <option>Dhaka</option>
                  <option>Chattogram</option>
                  <option>Rajshahi</option>
                  <option>Khulna</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Upazila *</label>
                <select className="form-select">
                  <option>Select Upazila</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Full Address *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Complete hospital address"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Reason for Request *</label>
              <textarea
                className="form-textarea"
                rows="4"
                placeholder="Please provide details about why blood is needed"
              />
              <span className="form-hint">
                Providing clear information helps donors understand the urgency and need
              </span>
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

      <div className="alert alert-info" style={{ marginTop: "1rem" }}>
        <strong>Note:</strong> After creating the request, it will be visible to all users.
        Make sure all information is accurate and up to date.
      </div>
    </div>
  )
}

export default CreateRequest
