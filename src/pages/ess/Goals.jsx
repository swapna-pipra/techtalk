import React from 'react';
import { Target, TrendingUp, Award, CheckCircle, MessageSquare, Star } from 'lucide-react';

const Goals = () => {
  // Mock Data
  const summary = {
    overallRating: 4.2,
    goalsCompleted: 8,
    totalGoals: 10,
    cycle: "FY 2026",
  };

  const performanceHistory = [
    { period: 'Q1', score: 3.8 },
    { period: 'Q2', score: 4.0 },
    { period: 'Q3', score: 4.5 },
    { period: 'Q4', score: 4.2 },
  ];

  const kraList = [
    { id: 1, title: 'Deliver Q3 Feature Release', weight: '30%', progress: 100, status: 'Completed' },
    { id: 2, title: 'Reduce System Latency by 15%', weight: '20%', progress: 85, status: 'On Track' },
    { id: 3, title: 'Complete Cloud Migration', weight: '25%', progress: 40, status: 'At Risk' },
    { id: 4, title: 'Mentorship & Team Training', weight: '15%', progress: 60, status: 'On Track' },
    { id: 5, title: 'Write Technical Documentation', weight: '10%', progress: 100, status: 'Completed' },
  ];

  const reviews = {
    self: { rating: 4.5, comments: "Successfully led the major feature release and met all critical deadlines." },
    manager: { rating: 4.2, comments: "Excellent technical leadership. Need to focus slightly more on cross-team communication during migrations." },
    final: { rating: 4.2, status: "Published" }
  };

  const getStatusBadge = (status) => {
    if (status === 'Completed') return <span className="badge badge-success">Completed</span>;
    if (status === 'On Track') return <span className="badge badge-info">On Track</span>;
    if (status === 'At Risk') return <span className="badge badge-warning">At Risk</span>;
    return <span className="badge badge-secondary">{status}</span>;
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Star 
          key={i} 
          size={16} 
          fill={i <= Math.round(rating) ? "var(--warning)" : "none"} 
          color={i <= Math.round(rating) ? "var(--warning)" : "var(--border)"} 
        />
      );
    }
    return <div style={{ display: 'flex', gap: '0.25rem' }}>{stars}</div>;
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
        <div>
          <h1>Goals & Performance</h1>
          <p className="text-muted">Track your KRAs, KPIs, and review your performance feedback.</p>
        </div>
        <div style={{ backgroundColor: 'var(--surface)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', fontWeight: 600 }}>
          Review Cycle: <span style={{ color: 'var(--primary)' }}>{summary.cycle}</span>
        </div>
      </div>

      {/* 4. Performance Summary Cards */}
      <div className="grid-cards" style={{ marginBottom: '2rem' }}>
        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Award size={32} color="var(--primary)" />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '2rem' }}>{summary.overallRating} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ 5.0</span></h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Overall Performance</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Target size={32} color="var(--success)" />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '2rem' }}>{summary.goalsCompleted} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>/ {summary.totalGoals}</span></h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>Goals Completed</p>
          </div>
        </div>

        <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <TrendingUp size={32} color="var(--info)" />
          </div>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '2rem' }}>+12%</h3>
            <p style={{ margin: 0, color: 'var(--text-muted)' }}>YoY Growth Score</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        
        {/* 1, 2, 3. Goal List (KRA/KPI Table) */}
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)' }}>
            <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Key Result Areas (KRAs)</h2>
          </div>
          <div className="table-container" style={{ border: 'none', borderRadius: 0 }}>
            <table className="table">
              <thead>
                <tr>
                  <th>Goal / Objective</th>
                  <th>Weight</th>
                  <th style={{ minWidth: '150px' }}>Progress</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {kraList.map((kra) => (
                  <tr key={kra.id}>
                    <td style={{ fontWeight: 500 }}>{kra.title}</td>
                    <td>{kra.weight}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{ flex: 1, height: '8px', backgroundColor: 'var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div 
                            style={{ 
                              height: '100%', 
                              width: `${kra.progress}%`, 
                              backgroundColor: kra.progress === 100 ? 'var(--success)' : kra.progress > 50 ? 'var(--info)' : 'var(--warning)',
                              transition: 'width 1s ease-in-out'
                            }} 
                          />
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 600, minWidth: '40px' }}>{kra.progress}%</span>
                      </div>
                    </td>
                    <td>{getStatusBadge(kra.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 5. ONE Bar Chart (Pure CSS) */}
        <div className="card">
          <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem' }}>Quarterly Performance</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', height: '200px', padding: '0 1rem', borderBottom: '1px solid var(--border)', position: 'relative' }}>
            {/* Y-Axis lines (Optional aesthetic) */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', zIndex: 0 }}>
              <div style={{ borderBottom: '1px dashed var(--border)', flex: 1 }}></div>
              <div style={{ borderBottom: '1px dashed var(--border)', flex: 1 }}></div>
              <div style={{ borderBottom: '1px dashed var(--border)', flex: 1 }}></div>
              <div style={{ flex: 1 }}></div>
            </div>

            {performanceHistory.map((data, index) => {
              const heightPercent = (data.score / 5) * 100;
              return (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, width: '40px' }}>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-main)' }}>{data.score}</div>
                  <div 
                    style={{ 
                      width: '100%', 
                      height: `${heightPercent}%`, 
                      minHeight: '20px', 
                      backgroundColor: 'var(--primary)', 
                      borderRadius: '4px 4px 0 0',
                      transition: 'height 1s ease-out'
                    }} 
                  ></div>
                </div>
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 1rem 0 1rem' }}>
            {performanceHistory.map((data, index) => (
              <div key={index} style={{ width: '40px', textAlign: 'center', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                {data.period}
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* 6 & 7. Review Ratings & Feedback View */}
      <div className="card">
        <h2 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MessageSquare size={20} color="var(--primary)" /> 
          Annual Review & Feedback
        </h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
          
          <div style={{ padding: '1.5rem', backgroundColor: 'var(--background)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0 }}>Self Assessment</h4>
              {renderStars(reviews.self.rating)}
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              "{reviews.self.comments}"
            </p>
          </div>

          <div style={{ padding: '1.5rem', backgroundColor: 'var(--surface-hover)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <h4 style={{ margin: 0 }}>Manager Evaluation</h4>
              {renderStars(reviews.manager.rating)}
            </div>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              "{reviews.manager.comments}"
            </p>
          </div>

        </div>

        <div style={{ marginTop: '2rem', padding: '1.5rem', backgroundColor: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 'var(--radius-md)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', color: 'var(--success)' }}>Final Calibrated Score</h3>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)' }}>Status: <strong>{reviews.final.status}</strong></p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {renderStars(reviews.final.rating)}
            <span style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--success)' }}>{reviews.final.rating}</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Goals;
