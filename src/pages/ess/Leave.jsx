import React, { useState } from 'react';
import { X } from 'lucide-react';

const Leave = () => {
  const [showModal, setShowModal] = useState(false);
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    fetch('/api/leave')
      .then(res => res.json())
      .then(data => {
        setLeaveRequests(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching leave requests:", err);
        setLoading(false);
      });
  }, []);

  const [formData, setFormData] = useState({
    type: 'Annual Leave',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = Math.abs(endDate - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
  };

  const formatLocalDateRange = (startStr, endStr) => {
    if (!startStr || !endStr) return '';
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const [sY, sM, sD] = startStr.split('-');
    const [eY, eM, eD] = endStr.split('-');
    
    const startMonth = months[parseInt(sM, 10) - 1];
    const startDay = parseInt(sD, 10);
    
    const endMonth = months[parseInt(eM, 10) - 1];
    const endDay = parseInt(eD, 10);
    const endYear = eY;

    if (startStr === endStr) {
      return `${startMonth} ${startDay}, ${endYear}`;
    }

    return `${startMonth} ${startDay} - ${endMonth} ${endDay}, ${endYear}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const days = calculateDays(formData.startDate, formData.endDate);
    const formattedDuration = formatLocalDateRange(formData.startDate, formData.endDate);

    const payload = {
      type: formData.type,
      duration: formattedDuration,
      days: days,
      reason: formData.reason,
      status: 'Pending'
    };

    try {
      const response = await fetch('/api/leave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        const newRequest = await response.json();
        setLeaveRequests([newRequest, ...leaveRequests]);
        setShowModal(false);
        setFormData({ type: 'Annual Leave', startDate: '', endDate: '', reason: '' });
      }
    } catch (err) {
      console.error("Error submitting leave request:", err);
    }
  };

  const renderBadge = (status) => {
    if (status === 'Approved') return <span className="badge badge-success">Approved</span>;
    if (status === 'Pending') return <span className="badge badge-warning">Pending</span>;
    if (status === 'Rejected') return <span className="badge badge-danger">Rejected</span>;
    return <span className="badge badge-info">{status}</span>;
  };

  if (loading) {
    return <div className="animate-fade-in" style={{ padding: '2rem' }}>Loading leave requests...</div>;
  }

  return (
    <div className="animate-fade-in" style={{ position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Leave Applications</h1>
          <p className="text-muted">Manage your time off requests and view balances.</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>New Request</button>
      </div>

      <div className="grid-cards" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <h3 className="text-muted" style={{ fontSize: '0.875rem' }}>Annual Leave Balance</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>12 Days</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Accrued until Dec 2026</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <h3 className="text-muted" style={{ fontSize: '0.875rem' }}>Sick Leave Balance</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>5 Days</p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Resets Jan 1</span>
        </div>
        <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <h3 className="text-muted" style={{ fontSize: '0.875rem' }}>Pending Requests</h3>
          <p style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0.5rem 0' }}>
            {leaveRequests.filter(r => r.status === 'Pending').length}
          </p>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Awaiting manager approval</span>
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Days</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveRequests.map(request => (
                <tr key={request.id}>
                  <td>{request.type}</td>
                  <td>{request.duration}</td>
                  <td>{request.days}</td>
                  <td>{request.reason}</td>
                  <td>{renderBadge(request.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Premium Modal Overlay */}
      {showModal && (
        <div className="animate-fade-in" style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
          backgroundColor: 'rgba(17, 24, 39, 0.4)', backdropFilter: 'blur(4px)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }}>
          <div className="card" style={{ 
            width: '100%', maxWidth: '550px', padding: '0', overflow: 'hidden', 
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', border: '1px solid rgba(255,255,255,0.1)'
          }}>
            
            {/* Modal Header */}
            <div style={{ padding: '1.5rem 2rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--background)' }}>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>New Leave Request</h2>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Fill in the details below to apply for time off.</p>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-muted)', transition: 'all 0.2s' }}
                onMouseOver={(e) => { e.currentTarget.style.color = 'var(--danger)'; e.currentTarget.style.borderColor = 'var(--danger)'; }}
                onMouseOut={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Modal Body */}
            <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Leave Type <span style={{ color: 'var(--danger)' }}>*</span></label>
                <select className="form-control" name="type" value={formData.type} onChange={handleInputChange} required style={{ backgroundColor: 'var(--background)', padding: '0.75rem' }}>
                  <option value="Annual Leave">Annual Leave (Balance: 12 Days)</option>
                  <option value="Sick Leave">Sick Leave (Balance: 5 Days)</option>
                  <option value="Unpaid Leave">Unpaid Leave</option>
                  <option value="Maternity/Paternity Leave">Maternity/Paternity Leave</option>
                </select>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600 }}>Start Date <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <input type="date" className="form-control" name="startDate" value={formData.startDate} onChange={handleInputChange} required style={{ backgroundColor: 'var(--background)', padding: '0.75rem' }} />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label" style={{ fontWeight: 600 }}>End Date <span style={{ color: 'var(--danger)' }}>*</span></label>
                  <input type="date" className="form-control" name="endDate" value={formData.endDate} onChange={handleInputChange} required style={{ backgroundColor: 'var(--background)', padding: '0.75rem' }} />
                </div>
              </div>

              {formData.startDate && formData.endDate && (
                <div style={{ marginBottom: '1.5rem', padding: '1rem', backgroundColor: 'rgba(79, 70, 229, 0.05)', border: '1px solid rgba(79, 70, 229, 0.2)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--primary)' }}>Duration Calculated:</span>
                  <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--primary)' }}>{calculateDays(formData.startDate, formData.endDate)} Day(s)</span>
                </div>
              )}

              <div className="form-group" style={{ margin: 0 }}>
                <label className="form-label" style={{ fontWeight: 600 }}>Reason for Leave <span style={{ color: 'var(--danger)' }}>*</span></label>
                <textarea 
                  className="form-control" 
                  name="reason" 
                  value={formData.reason} 
                  onChange={handleInputChange} 
                  rows="4" 
                  placeholder="Please provide a brief explanation for your manager..."
                  required
                  style={{ backgroundColor: 'var(--background)', padding: '0.75rem', resize: 'vertical' }}
                ></textarea>
              </div>

              {/* Modal Footer */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)} style={{ padding: '0.6rem 1.5rem' }}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Submit Request</button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  );
};

export default Leave;
