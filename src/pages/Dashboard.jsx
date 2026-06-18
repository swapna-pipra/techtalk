import React from 'react';
import { Calendar, Clock, Plane, FileText } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="animate-fade-in">
      <h1>Dashboard Overview</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Here's what's happening today.</p>

      <div className="grid-cards" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: 'var(--radius-md)' }}>
              <Clock size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Today's Check-in</h3>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>09:00 AM</p>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%' }}>Check Out</button>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
              <Plane size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Leave Balance</h3>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>12 Days Remaining</p>
            </div>
          </div>
          <button className="btn btn-secondary" style={{ width: '100%' }}>Apply Leave</button>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderRadius: 'var(--radius-md)' }}>
              <Calendar size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Next Holiday</h3>
              <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Independence Day</p>
            </div>
          </div>
          <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Jul 4, 2026</p>
        </div>
      </div>

      <h2>Recent Announcements</h2>
      <div className="card" style={{ padding: '0' }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Jun 12, 2026</td>
                <td>Q2 Townhall Meeting Scheduled</td>
                <td>Company Wide</td>
              </tr>
              <tr>
                <td>Jun 10, 2026</td>
                <td>New IT Security Policy</td>
                <td>IT Support</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
