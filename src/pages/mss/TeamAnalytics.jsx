import React from 'react';
import { Users, Clock, AlertTriangle, TrendingUp } from 'lucide-react';

const TeamAnalytics = () => {
  return (
    <div className="animate-fade-in">
      <h1>Team Analytics</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Overview of your team's performance and attendance metrics.</p>

      <div className="grid-cards" style={{ marginBottom: '2rem' }}>
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', borderRadius: 'var(--radius-md)' }}>
              <Users size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Total Team Members</h3>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>12</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderRadius: 'var(--radius-md)' }}>
              <Clock size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Avg. Attendance</h3>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>95%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--accent)', borderRadius: 'var(--radius-md)' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--text-muted)' }}>Pending Approvals</h3>
              <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 style={{ marginBottom: '1.5rem' }}>Department OKR Progress</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Q2 Deliverables Completed</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--primary)', fontWeight: 600 }}>75%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '75%', height: '100%', background: 'var(--primary)', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontWeight: 500, fontSize: '0.875rem' }}>Team Training Budget Utilized</span>
              <span style={{ fontSize: '0.875rem', color: 'var(--success)', fontWeight: 600 }}>60%</span>
            </div>
            <div style={{ height: '8px', background: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: '60%', height: '100%', background: 'var(--success)', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamAnalytics;
