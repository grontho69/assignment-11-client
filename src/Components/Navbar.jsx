import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router';

import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { AuthContext } from '../Context/AuthContext';
import MyContainer from './MyContainer';

const Navbar = () => {
  const { user, signoutUserFunc } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    signoutUserFunc();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <MyContainer>
          <div className='navbar-container' >
        <Link to="/" className="navbar-logo">
          🩸 BloodConnect
        </Link>

        <button className="navbar-mobile-toggle" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-menu ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <li>
            <Link 
              to="/" 
              className={`navbar-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/donation-requests" 
              className={`navbar-link ${isActive('/donation-requests') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Donation Requests
            </Link>
          </li>
          <li>
            <Link 
              to="/search" 
              className={`navbar-link ${isActive('/search') ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Search Donors
            </Link>
          </li>
          {user && (
            <li>
              <Link 
                to="/funding" 
                className={`navbar-link ${isActive('/funding') ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                Funding
              </Link>
            </li>
          )}

          {user ? (
            <>
              <li>
                <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn btn-primary btn-sm">
                    <LayoutDashboard size={16} />
                    Dashboard
                  </button>
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="btn btn-outline btn-sm">
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn btn-outline btn-sm">Login</button>
                </Link>
              </li>
              <li>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <button className="btn btn-primary btn-sm">Register</button>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </MyContainer>
    </nav>
  );
};

export default Navbar;