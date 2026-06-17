import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, LogIn } from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Login failed');

      login(data); // { id, username, role }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--background)', padding: '1rem' }}>
      <div className="card" style={{ width: '100%', maxWidth: '400px', padding: '2.5rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-lg)' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'var(--surface)', borderRadius: '50%', marginBottom: '1rem' }}>
            <LogIn size={32} color="var(--primary)" />
          </div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Pi ERP - Project Work</h1>
          <p style={{ color: 'var(--text-muted)' }}>Sign in to manage your projects</p>
        </div>

        {error && (
          <div style={{ backgroundColor: 'var(--danger)', color: 'white', padding: '0.75rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', fontSize: '0.875rem' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div className="form-group">
            <label className="form-label">Username</label>
            <div style={{ position: 'relative' }}>
              <User size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                name="username"
                className="form-control" 
                placeholder="Enter your username"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--text-muted)' }} />
              <input 
                type="password" 
                name="password"
                className="form-control" 
                placeholder="Enter your password"
                style={{ paddingLeft: '2.5rem' }}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%', padding: '0.75rem', fontSize: '1rem', display: 'flex', justifyContent: 'center' }}
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'var(--surface-hover)', borderRadius: 'var(--radius-md)', textAlign: 'left' }}>
          <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.875rem' }}>Demo Credentials:</h4>
          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <button 
              className="btn btn-secondary" 
              style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', flex: 1 }}
              onClick={() => setFormData({ username: 'employee1', password: 'password123' })}
            >
              Fill Employee (ESS)
            </button>
          </div>
          <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>Use this to quickly test the Employee Self-Service view.</p>
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Don't have an account? <Link to="/register" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
