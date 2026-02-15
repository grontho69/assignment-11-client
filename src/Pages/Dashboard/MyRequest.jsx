import React, { useEffect, useState } from 'react'
import { Link } from 'react-router'
import useAxiosSecure from '../../Hooks/useAxiosSecure'

const MyRequest = () => {  

  const getStatusBadge = (status) => {
    const classes = {
      pending: 'badge-warning',
      approved: 'badge-info',
      completed: 'badge-success',
      cancelled: 'badge-danger',
    };
    return classes[status] || 'badge-primary';
  };

  const getUrgencyBadge = (urgency) => {
    const classes = {
      critical: 'badge-danger',
      high: 'badge-warning',
      medium: 'badge-info',
      low: 'badge-success',
    };
    return classes[urgency] || 'badge-primary';
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };


  const [totalRequest, setTotalRequest] = useState(0)
  const [myRequest, setMyRequest] = useState([]) 
  const [itemsPerPage, setitemsPerPage] = useState(10)
  const [currentPage, setcurrentPage] = useState(1)
  const axiosSecure = useAxiosSecure()
  
  useEffect(() => {
    axiosSecure.get(`/my-request?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then(res => {
       
        setMyRequest(res.data.request || [])
        setTotalRequest(res.data.totalRequest || 0)
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setMyRequest([]); 
      })
  }, [axiosSecure, currentPage, itemsPerPage])
  
  const numberOfPages = Math.ceil(totalRequest / itemsPerPage)
  const pages = [...Array(numberOfPages).keys()].map(e => e + 1)

  return (
    <div>
      <div className="dashboard-header">
        <div>
          <h1 className="dashboard-title">My Donation Requests</h1>
          <p className="dashboard-subtitle">
            Manage all your blood donation requests
          </p>
        </div>

        <Link to="/dashboard/create-request">
          <button className="btn btn-primary">➕ Create New Request</button>
        </Link>
      </div>

      {/* Filters */}
      <div className="card" style={{ marginBottom: "1.5rem" }}>
        <div className="card-body" style={{ padding: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            <button className="btn btn-sm btn-secondary">All</button>
            <button className="btn btn-sm btn-secondary">Pending</button>
            <button className="btn btn-sm btn-secondary">Approved</button>
            <button className="btn btn-sm btn-secondary">Completed</button>
          </div>
        </div>
      </div>

      {/* FIXED: Conditional Rendering - Show Empty State only if no requests found */}
      {myRequest.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3 className="empty-state-title">No Requests Yet</h3>
          <p className="empty-state-description">
            You haven't created any donation requests yet.
          </p>
          <Link to="/dashboard/create-request">
            <button className="btn btn-primary">
              Create Your First Request
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Requester</th>
                  <th>Blood Group</th>
                  <th>Hospital</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Urgency</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {myRequest.map((request) => (
                  <tr key={request._id}>
                    <td>
                      <div style={{ fontWeight: '600' }}>{request.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-gray)' }}>
                        {request.phone}
                      </div>
                    </td>
                    <td>
                      <span className="badge badge-primary">{request.blood}</span>
                    </td>
                    <td>{request.hospname}</td>
                    <td>{request.upazila}, {request.district}</td>
                    <td>{formatDate(request.date)}</td>
                    <td>
                      <span className={`badge ${getUrgencyBadge(request.urgency)}`}>
                        {request.urgency}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${getStatusBadge(request.donation_status)}`}>
                        {request.donation_status}
                      </span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <Link to={`/donation-requests/${request._id}`}>
                          <button className="btn btn-sm btn-outline" title="View">👁️</button>
                        </Link>
                        {request.status === 'pending' && (
                          <Link to={`/dashboard/edit-request/${request._id}`}>
                            <button className="btn btn-sm btn-outline" title="Edit">✏️</button>
                          </Link>
                        )}
                        <button className="btn btn-sm btn-danger" title="Delete">🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {pages.length > 1 && (
            <div className="pagination">
              <button 
                onClick={() => setcurrentPage(Math.max(1, currentPage - 1))}
                className="pagination-btn"
              >← Previous</button>
              
              {pages.map(page => (
                <button 
                  key={page}
                  onClick={() => setcurrentPage(page)}
                  className={`pagination-btn ${currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}

              <button 
                onClick={() => setcurrentPage(Math.min(numberOfPages, currentPage + 1))}
                className="pagination-btn"
              >Next →</button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default MyRequest