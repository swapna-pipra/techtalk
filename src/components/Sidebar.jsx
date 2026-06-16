import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  User, 
  Calendar, 
  Clock, 
  FileText, 
  Target, 
  Network, 
  Users, 
  CheckSquare, 
  BarChart2, 
  Briefcase, 
  UserCheck 
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">Pi</div>
          <span className="logo-text">Pi ERP</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        {user?.role === 'EMPLOYEE' && (
          <div className="nav-group">
            <span className="nav-label">Employee Self-Service</span>
            <NavLink to="/ess/profile" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <User size={18} /> My Profile
            </NavLink>
            <NavLink to="/ess/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Clock size={18} /> Attendance
            </NavLink>
            <NavLink to="/ess/leave" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Calendar size={18} /> Leave Applications
            </NavLink>
            <NavLink to="/ess/holidays" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Briefcase size={18} /> Holidays
            </NavLink>
            <NavLink to="/ess/documents" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <FileText size={18} /> Documents
            </NavLink>
            <NavLink to="/ess/goals" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Target size={18} /> Goals & Perf
            </NavLink>
            <NavLink to="/ess/org-chart" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Network size={18} /> Org Chart
            </NavLink>
          </div>
        )}

        {user?.role === 'MANAGER' && (
          <div className="nav-group">
            <span className="nav-label">Manager Self-Service</span>
            <NavLink to="/mss/analytics" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <BarChart2 size={18} /> Team Analytics
            </NavLink>
            <NavLink to="/mss/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Users size={18} /> Team Attendance
            </NavLink>
            <NavLink to="/mss/leave" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <CheckSquare size={18} /> Leave Approvals
            </NavLink>
            <NavLink to="/mss/performance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Target size={18} /> Perf Reviews
            </NavLink>
            <NavLink to="/mss/directory" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <Network size={18} /> Team Directory
            </NavLink>
            <NavLink to="/mss/probation" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
              <UserCheck size={18} /> Probation
            </NavLink>
          </div>
        )}
      </nav>
    </aside>
  );
};

export default Sidebar;
