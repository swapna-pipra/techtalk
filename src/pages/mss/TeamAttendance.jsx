import React from 'react';

const TeamAttendance = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Team Attendance</h1>
          <p className="text-muted">Monitor daily attendance and working hours for your direct reports.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="date" className="form-control" defaultValue="2026-06-13" />
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Employee Name</th>
                <th>Status</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Hours Logged</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="avatar" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Alex Johnson</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Frontend Dev</span>
                  </div>
                </td>
                <td><span className="badge badge-success">Present</span></td>
                <td>08:50 AM</td>
                <td>--:--</td>
                <td>--:--</td>
                <td><button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>View Log</button></td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="avatar" style={{ width: '32px', height: '32px' }} />
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>Maria Garcia</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>UI/UX Designer</span>
                  </div>
                </td>
                <td><span className="badge badge-warning">Late</span></td>
                <td>09:45 AM</td>
                <td>--:--</td>
                <td>--:--</td>
                <td><button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>View Log</button></td>
              </tr>
              <tr>
                <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div className="avatar" style={{ width: '32px', height: '32px', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', fontWeight: 600 }}>
                    DT
                  </div>
                  <div>
                    <span style={{ display: 'block', fontWeight: 500 }}>David Taylor</span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Backend Dev</span>
                  </div>
                </td>
                <td><span className="badge badge-danger">On Leave</span></td>
                <td>--:--</td>
                <td>--:--</td>
                <td>--:--</td>
                <td><button className="btn btn-secondary" style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}>View Log</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TeamAttendance;
