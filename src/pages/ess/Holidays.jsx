import React, { useState, useEffect } from 'react';

const Holidays = () => {
  const [holidays, setHolidays] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3001/api/holidays')
      .then(res => res.json())
      .then(data => {
        setHolidays(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching holidays:", err);
        setLoading(false);
      });
  }, []);

  const renderBadge = (type) => {
    if (type.includes('National')) {
      return <span className="badge badge-success">{type}</span>;
    }
    if (type.includes('Festival')) {
      return <span className="badge badge-primary">{type}</span>;
    }
    return <span className="badge badge-info">{type}</span>;
  };

  if (loading) {
    return <div className="animate-fade-in" style={{ padding: '2rem' }}>Loading holiday calendar...</div>;
  }

  return (
    <div className="animate-fade-in">
      <h1>Holiday Calendar</h1>
      <p className="text-muted" style={{ marginBottom: '2rem' }}>Company-wide observed holidays for 2026.</p>

      <div className="card" style={{ padding: 0 }}>
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Holiday Name</th>
                <th>Date</th>
                <th>Day</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday) => (
                <tr key={holiday.id}>
                  <td style={{ fontWeight: 600 }}>{holiday.name}</td>
                  <td>{holiday.date}</td>
                  <td>{holiday.day}</td>
                  <td>{renderBadge(holiday.type)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Holidays;
