import React from 'react';
import { Star } from 'lucide-react';

const PerformanceReviews = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Performance Reviews</h1>
          <p className="text-muted">Conduct and review performance evaluations for your team.</p>
        </div>
        <button className="btn btn-primary">Start New Review</button>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Review Period</th>
                <th>Status</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="avatar" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Alex Johnson</span>
                  </div>
                </td>
                <td>Q2 2026</td>
                <td><span className="badge badge-warning">Draft</span></td>
                <td>--</td>
                <td><button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Continue</button></td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="avatar" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Maria Garcia</span>
                  </div>
                </td>
                <td>Q1 2026</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td>
                  <div style={{ display: 'flex', color: 'var(--warning)' }}>
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} />
                  </div>
                </td>
                <td><button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReviews;
