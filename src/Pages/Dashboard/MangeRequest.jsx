import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const ManageRequest = () => {
    const axiosSecure = useAxiosSecure();
    const [requests, setRequests] = useState([]);
    const [total, setTotal] = useState(0);
    const [stats, setStats] = useState({ pending: 0, approved: 0, completed: 0 });
    const [statusFilter, setStatusFilter] = useState('All Status');
    const [urgencyFilter, setUrgencyFilter] = useState('All Urgencies');
    const [currentPage, setCurrentPage] = useState(1);
    const size = 10;

    const fetchRequests = async () => {
        try {
            const res = await axiosSecure.get(`/all-requests?page=${currentPage - 1}&size=${size}&status=${statusFilter}&urgency=${urgencyFilter}`);
            setRequests(res.data.requests || []);
            setTotal(res.data.total || 0);
            setStats(res.data.stats || { pending: 0, approved: 0, completed: 0 });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleStatusUpdate = async (id, newStatus) => {
        try {
            const res = await axiosSecure.patch(`/request-status/${id}`, { status: newStatus });
            if (res.data.modifiedCount > 0) {
                fetchRequests();
            }
        } catch (err) {
            console.error(err);
        }
    };

    const numberOfPages = Math.ceil(total / size);
    const pages = [...Array(numberOfPages || 0).keys()].map(e => e + 1);

    return (
        <div>
            <div className="dashboard-header">
                <h1 className="dashboard-title">All Blood Donation Requests</h1>
                <p className="dashboard-subtitle">Manage and approve blood donation requests</p>
            </div>

            <div className="dashboard-stats">
                <div className="dashboard-stat-card">
                    <div className="dashboard-stat-label">Total Requests</div>
                    <div className="dashboard-stat-value">{total}</div>
                </div>
                <div className="dashboard-stat-card warning">
                    <div className="dashboard-stat-label">Pending</div>
                    <div className="dashboard-stat-value">{stats.pending}</div>
                </div>
                <div className="dashboard-stat-card info">
                    <div className="dashboard-stat-label">Approved</div>
                    <div className="dashboard-stat-value">{stats.approved}</div>
                </div>
                <div className="dashboard-stat-card success">
                    <div className="dashboard-stat-label">Completed</div>
                    <div className="dashboard-stat-value">{stats.completed}</div>
                </div>
            </div>

            <div className="card" style={{ marginBottom: "1.5rem" }}>
                <div className="card-body">
                    <div className="filters-grid">
                        <div className="form-group">
                            <label className="form-label">Status</label>
                            <select className="form-select" value={statusFilter} onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}>
                                <option>All Status</option>
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                       
                        <div style={{ display: "flex", alignItems: "flex-end" }}>
                            <button className="btn btn-secondary w-full" onClick={() => { setStatusFilter('All Status'); setUrgencyFilter('All Urgencies'); setCurrentPage(1); }}>
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Requester</th>
                            <th>Blood</th>
                            <th>Hospital</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request._id}>
                                <td>
                                    <div style={{ fontWeight: "600" }}>{request.name}</div>
                                    <div style={{ fontSize: "0.75rem", color: "gray" }}>{request.phone}</div>
                                </td>
                                <td>
                                    <span className="badge badge-primary">{request.blood}</span>
                                    <div style={{ fontSize: "0.7rem", color: "gray" }}>{request.units} Units</div>
                                </td>
                                <td>{request.hospname}</td>
                                <td>{request.date}</td>
                                <td>
                                    <select 
                                        className="form-select" 
                                        style={{ fontSize: "0.75rem" }}
                                        value={request.donation_status}
                                        onChange={(e) => handleStatusUpdate(request._id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="completed">Completed</option>
                                        <option value="cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <Link to={`/donation-requests/${request._id}`}>
                                        <button className="btn btn-sm btn-outline">👁️</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {numberOfPages > 1 && (
                <div className="pagination" style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                    <button className="pagination-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>← Previous</button>
                    {pages.map(p => (
                        <button key={p} className={`pagination-btn ${currentPage === p ? 'active' : ''}`} onClick={() => setCurrentPage(p)}>{p}</button>
                    ))}
                    <button className="pagination-btn" disabled={currentPage === numberOfPages} onClick={() => setCurrentPage(currentPage + 1)}>Next →</button>
                </div>
            )}
        </div>
    );
};

export default ManageRequest;