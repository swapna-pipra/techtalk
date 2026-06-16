import React from 'react';
import { Bell, Search, Settings, Sun, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div className="navbar-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search across the ERP..." className="search-input" />
      </div>

      <div className="navbar-actions">
        <button className="action-btn">
          <Sun size={20} />
        </button>
        <button className="action-btn relative">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>
        <button className="action-btn">
          <Settings size={20} />
        </button>
        <button className="action-btn" onClick={logout} title="Logout" style={{ color: 'var(--danger)' }}>
          <LogOut size={20} />
        </button>
        <div className="user-profile">
          <img 
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
            alt="User profile" 
            className="avatar"
          />
          <div className="user-info">
            <span className="user-name">{user ? user.username : 'Guest'}</span>
            <span className="user-role">{user ? user.role : 'Unknown'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
