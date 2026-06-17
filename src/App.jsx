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

                {/* Root Redirect — always go to ESS */}
                <Route path="/" element={<Navigate to="/ess/profile" replace />} />
                <Route path="*" element={<Navigate to="/ess/profile" replace />} />
              </Routes>
            </ProtectedRoute>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
