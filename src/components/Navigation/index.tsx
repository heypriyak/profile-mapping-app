import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Profile Gallery
        </Link>
        <ul className="nav-links">
          <li>
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              Profiles
            </Link>
          </li>
          <li>
            <Link 
              to="/map" 
              className={location.pathname === '/map' ? 'active' : ''}
            >
              Map
            </Link>
          </li>
          <li>
            <Link 
              to="/admin" 
              className={location.pathname === '/admin' ? 'active' : ''}
            >
              Admin
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;