import React from 'react';

const Probation = () => {
  return (
    <div className="animate-fade-in">
      <h1>Probation Reviews</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Track 30/60/90 day check-ins for new hires.</p>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Role</th>
                <th>Start Date</th>
                <th>Milestone</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="avatar" style={{ width: '32px', height: '32px', backgroundColor: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600 }}>
                    EK
                  </div>
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Emma Klein</span>
                  </div>
                </td>
                <td>Marketing Specialist</td>
                <td>May 1, 2026</td>
                <td>60-Day Review</td>
                <td>Jun 30, 2026</td>
                <td><span className="badge badge-warning">Upcoming</span></td>
                <td><button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>Schedule</button></td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="avatar" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Alex Johnson</span>
                  </div>
                </td>
                <td>Frontend Dev</td>
                <td>Mar 1, 2026</td>
                <td>90-Day Review</td>
                <td>May 30, 2026</td>
                <td><span className="badge badge-success">Completed</span></td>
                <td><button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Probation;
