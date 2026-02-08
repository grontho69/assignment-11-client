import React, { useContext } from 'react';
import { Link } from 'react-router';

import { AuthContext } from '../Context/AuthContext';


const Home = () => {
  const { user,  } = useContext(AuthContext);
  

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">Save Lives Through Blood Donation</h1>
          <p className="hero-subtitle">
            Connect with blood donors across Bangladesh and help save lives in emergency situations
          </p>
          <div className="hero-buttons">
            {user ? (
              <>
                <Link to="/dashboard">
                  <button className="btn btn-primary btn-lg">Go to Dashboard</button>
                </Link>
                <Link to="/donation-requests">
                  <button className="btn btn-primary btn-lg">View Requests</button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/register">
                  <button className="btn btn-primary btn-lg">Register as Donor</button>
                </Link>
                <Link to="/search">
                  <button className="btn btn-outline btn-lg">Search Donors</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">{''}+</div>
            <div className="stat-label">Active Donors</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{''}+</div>
            <div className="stat-label">Lives Saved</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{''}+</div>
            <div className="stat-label">Volunteers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">{''}+</div>
            <div className="stat-label">Pending Requests</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose BloodConnect?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3 className="feature-title">Find Donors Quickly</h3>
              <p className="feature-description">
                Search for blood donors by blood group, district, and upazila to find the right match instantly.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Easy Request System</h3>
              <p className="feature-description">
                Create donation requests with all necessary details and get responses from willing donors.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Priority Management</h3>
              <p className="feature-description">
                Requests are prioritized based on urgency to ensure critical cases get immediate attention.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">✅</div>
              <h3 className="feature-title">Verified Users</h3>
              <p className="feature-description">
                All users are verified to ensure authenticity and build trust in the community.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">💰</div>
              <h3 className="feature-title">Support Campaigns</h3>
              <p className="feature-description">
                Contribute to funding campaigns that help improve blood donation infrastructure.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3 className="feature-title">Nationwide Coverage</h3>
              <p className="feature-description">
                Access donors and volunteers from all districts and upazilas across Bangladesh.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="hero" style={{ padding: '3rem 1rem' }}>
        <div className="container">
          <h2 className="hero-title" style={{ fontSize: '2rem' }}>Ready to Make a Difference?</h2>
          <p className="hero-subtitle" style={{ fontSize: '1rem' }}>
            Join our community of blood donors and volunteers today
          </p>
          <div className="hero-buttons">
            <Link to="/register">
              <button className="btn btn-primary btn-lg">Get Started Now</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
