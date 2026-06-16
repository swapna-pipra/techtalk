import React from 'react';
import { Check, X } from 'lucide-react';

const LeaveApprovals = () => {
  return (
    <div className="animate-fade-in">
      <h1>Leave Approvals</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Review and approve time off requests from your team.</p>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Leave Type</th>
                <th>Duration</th>
                <th>Reason</th>
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
                <td>Annual Leave</td>
                <td>Jul 10 - Jul 14, 2026 (5 days)</td>
                <td>Summer Vacation</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--success)' }}>
                      <Check size={16} /> Approve
                    </button>
                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--danger)' }}>
                      <X size={16} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="avatar" style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600 }}>
                    DT
                  </div>
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>David Taylor</span>
                  </div>
                </td>
                <td>Sick Leave</td>
                <td>Jun 14, 2026 (1 day)</td>
                <td>Dentist Appointment</td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--success)' }}>
                      <Check size={16} /> Approve
                    </button>
                    <button className="btn btn-primary" style={{ padding: '0.25rem 0.5rem', backgroundColor: 'var(--danger)' }}>
                      <X size={16} /> Reject
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaveApprovals;
