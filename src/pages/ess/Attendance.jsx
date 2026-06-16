import React, { useState, useMemo } from 'react';
import { CalendarCheck, CalendarX, CalendarOff, Clock, Briefcase } from 'lucide-react';

const Attendance = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    month: 'All',
    year: '2026',
    status: 'All'
  });

  React.useEffect(() => {
    fetch('http://localhost:3001/api/attendance')
      .then(res => res.json())
      .then(data => {
        setAttendanceData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching attendance:", err);
        setLoading(false);
      });
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFilters({ month: 'All', year: '2026', status: 'All' });
  };

  // Filter data dynamically
  const filteredData = useMemo(() => {
    return attendanceData.filter(row => {
      const rowMonthStr = row.date.substring(0, 3); // "Jun"
      const filterMonthStr = filters.month !== 'All' ? filters.month.substring(0, 3) : 'All';
      
      const matchMonth = filters.month === 'All' || rowMonthStr === filterMonthStr;
      const matchYear = filters.year === 'All' || row.date.includes(filters.year);
      const matchStatus = filters.status === 'All' || row.status === filters.status;

      return matchMonth && matchYear && matchStatus;
    });
  }, [attendanceData, filters]);

  const renderBadge = (status) => {
    switch (status) {
      case 'Present': return <span className="badge badge-success">Present</span>;
      case 'Late': return <span className="badge badge-warning">Late</span>;
      case 'Half Day': return <span className="badge badge-warning">Half Day</span>;
      case 'Absent': return <span className="badge badge-danger">Absent</span>;
      case 'Leave': return <span className="badge badge-info">Leave</span>;
      case 'Holiday': return <span className="badge badge-info" style={{ backgroundColor: '#E5E7EB', color: '#374151' }}>Holiday</span>;
      default: return <span className="badge badge-info">{status}</span>;
    }
  };

  if (loading) {
    return <div className="animate-fade-in" style={{ padding: '2rem' }}>Loading attendance data...</div>;
  }

  return (
    <div className="animate-fade-in">
      <div style={{ marginBottom: '2rem' }}>
        <h1>Attendance Record</h1>
        <p className="text-muted">View your daily attendance logs and monthly summary.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid-cards" style={{ marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <div className="card" style={{ borderLeft: '4px solid var(--success)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CalendarCheck size={20} color="var(--success)" />
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Present Days</h3>
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>21</p>
        </div>
        
        <div className="card" style={{ borderLeft: '4px solid var(--danger)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CalendarX size={20} color="var(--danger)" />
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Absent Days</h3>
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>1</p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--info)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <CalendarOff size={20} color="var(--info)" />
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Leave Days</h3>
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>2</p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--warning)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Clock size={20} color="var(--warning)" />
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Late Arrivals</h3>
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>3</p>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <Briefcase size={20} color="var(--primary)" />
            <h3 style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Total Hours (Month)</h3>
          </div>
          <p style={{ margin: 0, fontSize: '1.5rem', fontWeight: 700 }}>168.5</p>
        </div>
      </div>

      {/* Filters Area */}
      <div className="card" style={{ marginBottom: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'flex-end', backgroundColor: 'var(--surface)' }}>
        <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '150px' }}>
          <label className="form-label">Month</label>
          <select className="form-control" name="month" value={filters.month} onChange={handleFilterChange}>
            <option value="All">All Months</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
          </select>
        </div>

        <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '120px' }}>
          <label className="form-label">Year</label>
          <select className="form-control" name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="All">All Years</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="2024">2024</option>
          </select>
        </div>

        <div className="form-group" style={{ margin: 0, flex: 1, minWidth: '150px' }}>
          <label className="form-label">Attendance Status</label>
          <select className="form-control" name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="Late">Late</option>
            <option value="Half Day">Half Day</option>
            <option value="Leave">Leave</option>
            <option value="Holiday">Holiday</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', paddingBottom: '2px' }}>
          <button className="btn btn-secondary" onClick={handleReset} style={{ padding: '0.5rem 1rem' }}>Reset Filters</button>
        </div>
      </div>

      {/* Data Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table className="table" style={{ minWidth: '1200px' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Day</th>
                <th>Check-In Time</th>
                <th>Check-Out Time</th>
                <th>Total Hours</th>
                <th>Shift</th>
                <th>Attendance Status</th>
                <th>Late By</th>
                <th>Early Exit</th>
                <th>Work Mode</th>
                <th>Overtime Hours</th>
                <th>Remarks</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, index) => (
                  <tr key={index}>
                    <td style={{ fontWeight: 500 }}>{row.date}</td>
                    <td>{row.day}</td>
                    <td>{row.checkIn}</td>
                    <td>{row.checkOut}</td>
                    <td style={{ fontWeight: 500 }}>{row.totalHours}</td>
                    <td>{row.shift}</td>
                    <td>{renderBadge(row.status)}</td>
                    <td style={{ color: row.lateBy !== '-' ? 'var(--warning)' : 'inherit' }}>{row.lateBy}</td>
                    <td style={{ color: row.earlyExit !== '-' ? 'var(--warning)' : 'inherit' }}>{row.earlyExit}</td>
                    <td>{row.workMode}</td>
                    <td style={{ color: row.overtime !== '-' ? 'var(--success)' : 'inherit' }}>{row.overtime}</td>
                    <td style={{ color: 'var(--text-muted)' }}>{row.remarks}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="12" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
                    No attendance records found matching your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
