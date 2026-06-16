import React from 'react';
import { Mail, Phone } from 'lucide-react';

const TeamDirectory = () => {
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h1>Team Directory</h1>
          <p className="text-muted">Contact details and roles of all team members.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input type="text" className="form-control" placeholder="Search team member..." />
        </div>
      </div>

      <div className="grid-cards">
        {[
          { name: 'Alex Johnson', role: 'Frontend Developer', email: 'alex.j@company.com', phone: '+1 (555) 111-2222', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
          { name: 'Maria Garcia', role: 'UI/UX Designer', email: 'maria.g@company.com', phone: '+1 (555) 333-4444', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80' },
          { name: 'David Taylor', role: 'Backend Developer', email: 'david.t@company.com', phone: '+1 (555) 555-6666', avatar: null, initials: 'DT' },
        ].map((member, i) => (
          <div key={i} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            {member.avatar ? (
              <img src={member.avatar} alt="Avatar" style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1rem', border: '3px solid var(--border)' }} />
            ) : (
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '1rem', backgroundColor: 'var(--primary)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: 600 }}>
                {member.initials}
              </div>
            )}
            <h3 style={{ margin: '0 0 0.25rem 0' }}>{member.name}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{member.role}</p>
            
            <div style={{ display: 'flex', gap: '0.5rem', width: '100%', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                <Mail size={16} />
              </button>
              <button className="btn btn-secondary" style={{ flex: 1, padding: '0.5rem', display: 'flex', justifyContent: 'center' }}>
                <Phone size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamDirectory;
