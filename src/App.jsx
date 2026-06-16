import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/ess/Profile';
import Attendance from './pages/ess/Attendance';
import Leave from './pages/ess/Leave';
import Holidays from './pages/ess/Holidays';
import Documents from './pages/ess/Documents';
import Goals from './pages/ess/Goals';
import OrgChart from './pages/ess/OrgChart';

import TeamAnalytics from './pages/mss/TeamAnalytics';
import TeamAttendance from './pages/mss/TeamAttendance';
import LeaveApprovals from './pages/mss/LeaveApprovals';
import PerformanceReviews from './pages/mss/PerformanceReviews';
import TeamDirectory from './pages/mss/TeamDirectory';
import Probation from './pages/mss/Probation';

// Layout component to share sidebar/navbar
const DashboardLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Dashboard Routes */}
          <Route path="/*" element={
            <ProtectedRoute>
              <Routes>
                {/* Manager Routes */}
                <Route path="/mss/*" element={
                  <Routes>
                    <Route path="analytics" element={<TeamAnalytics />} />
                    <Route path="attendance" element={<TeamAttendance />} />
                    <Route path="leave" element={<LeaveApprovals />} />
                    <Route path="performance" element={<PerformanceReviews />} />
                    <Route path="directory" element={<TeamDirectory />} />
                    <Route path="probation" element={<Probation />} />
                    <Route path="*" element={<Navigate to="analytics" replace />} />
                  </Routes>
                } />

                {/* Employee Routes */}
                <Route path="/ess/*" element={
                  <Routes>
                    <Route path="profile" element={<Profile />} />
                    <Route path="attendance" element={<Attendance />} />
                    <Route path="leave" element={<Leave />} />
                    <Route path="holidays" element={<Holidays />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="goals" element={<Goals />} />
                    <Route path="org-chart" element={<OrgChart />} />
                    <Route path="*" element={<Navigate to="profile" replace />} />
                  </Routes>
                } />

                {/* Root Redirection Logic */}
                <Route path="/" element={<RoleBasedRootRedirect />} />
                <Route path="*" element={<RoleBasedRootRedirect />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

// Helper component to redirect to the correct dashboard based on role
const RoleBasedRootRedirect = () => {
  const { user } = useAuth();
  if (user?.role === 'MANAGER') return <Navigate to="/mss/analytics" replace />;
  return <Navigate to="/ess/profile" replace />;
};

export default App;
