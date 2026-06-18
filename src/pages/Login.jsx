import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { User, Lock, LogIn, Building2, Shield, Users, BarChart3 } from 'lucide-react';

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

      login(data);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-fade-in" style={styles.container}>
      {/* Left Panel - Branding & Illustration */}
      <div style={styles.leftPanel}>
        <div style={styles.leftContent}>
          {/* Logo Area */}
          <div style={styles.logoArea}>
            <div style={styles.logoIcon}>
              <Building2 size={36} color="#ffffff" />
            </div>
            <h1 style={styles.brandTitle}>Pi ERP</h1>
            <p style={styles.brandSubtitle}>Enterprise Resource Planning</p>
          </div>

          {/* Illustration - Abstract SVG */}
          <div style={styles.illustrationArea}>
            <svg viewBox="0 0 400 300" style={styles.illustration} aria-hidden="true">
              {/* Background circles */}
              <circle cx="200" cy="150" r="120" fill="rgba(255,255,255,0.05)" />
              <circle cx="200" cy="150" r="80" fill="rgba(255,255,255,0.08)" />

              {/* Dashboard mockup */}
              <rect x="100" y="80" width="200" height="140" rx="12" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

              {/* Top bar */}
              <rect x="100" y="80" width="200" height="30" rx="12" fill="rgba(255,255,255,0.15)" />
              <circle cx="120" cy="95" r="5" fill="rgba(255,255,255,0.4)" />
              <rect x="135" y="91" width="40" height="8" rx="4" fill="rgba(255,255,255,0.3)" />

              {/* Chart bars */}
              <rect x="120" y="180" width="20" height="25" rx="4" fill="rgba(255,255,255,0.3)" />
              <rect x="150" y="165" width="20" height="40" rx="4" fill="rgba(255,255,255,0.4)" />
              <rect x="180" y="150" width="20" height="55" rx="4" fill="rgba(255,255,255,0.5)" />
              <rect x="210" y="140" width="20" height="65" rx="4" fill="rgba(255,255,255,0.6)" />
              <rect x="240" y="130" width="20" height="75" rx="4" fill="rgba(255,255,255,0.4)" />
              <rect x="270" y="155" width="20" height="50" rx="4" fill="rgba(255,255,255,0.3)" />

              {/* Floating elements */}
              <circle cx="320" cy="100" r="20" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              <circle cx="80" cy="200" r="15" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

              {/* Connecting dots */}
              <circle cx="330" cy="180" r="4" fill="rgba(255,255,255,0.3)" />
              <circle cx="350" cy="200" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="60" cy="120" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="75" cy="100" r="4" fill="rgba(255,255,255,0.15)" />
            </svg>
          </div>

          {/* Feature highlights */}
          <div style={styles.features}>
            <div style={styles.featureItem}>
              <Users size={18} color="rgba(255,255,255,0.8)" />
              <span style={styles.featureText}>Employee Self-Service</span>
            </div>
            <div style={styles.featureItem}>
              <BarChart3 size={18} color="rgba(255,255,255,0.8)" />
              <span style={styles.featureText}>Team Analytics</span>
            </div>
            <div style={styles.featureItem}>
              <Shield size={18} color="rgba(255,255,255,0.8)" />
              <span style={styles.featureText}>Secure & Reliable</span>
            </div>
          </div>
        </div>

        {/* Decorative gradient overlay */}
        <div style={styles.gradientOverlay} />
      </div>

      {/* Right Panel - Login Form */}
      <div style={styles.rightPanel}>
        <div style={styles.formContainer}>
          <div style={styles.formHeader}>
            <h2 style={styles.welcomeText}>Welcome back</h2>
            <p style={styles.welcomeSubtext}>Sign in to your account to continue</p>
          </div>

          {error && (
            <div style={styles.errorBox}>
              <span style={styles.errorIcon}>⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Username</label>
              <div style={styles.inputWrapper}>
                <User size={18} style={styles.inputIcon} />
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  style={styles.input}
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                  aria-label="Username"
                />
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <div style={styles.inputWrapper}>
                <Lock size={18} style={styles.inputIcon} />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  style={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  aria-label="Password"
                />
              </div>
            </div>

            <div style={styles.rememberRow}>
              <label style={styles.checkboxLabel}>
                <input type="checkbox" style={styles.checkbox} />
                <span>Remember me</span>
              </label>
              <a href="#" style={styles.forgotLink}>Forgot password?</a>
            </div>

            <button
              type="submit" 
              style={{
                ...styles.submitBtn,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              disabled={isLoading}
            >
              {isLoading ? (
                <span style={styles.loadingText}>
                  <span style={styles.spinner} />
                  Signing In...
                </span>
              ) : (
                <span style={styles.btnContent}>
                  <LogIn size={18} />
                  Sign In
                </span>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div style={styles.demoBox}>
            <p style={styles.demoTitle}>Quick Demo Access</p>
            <div style={styles.demoButtons}>
              <button 
                style={styles.demoBtn}
                onClick={() => setFormData({ username: 'employee1', password: 'password123' })}
                type="button"
              >
                <User size={14} />
                Employee (ESS)
              </button>
              <button
                style={styles.demoBtnAlt}
                onClick={() => setFormData({ username: 'manager1', password: 'password123' })}
                type="button"
              >
                <Shield size={14} />
                Manager (MSS)
              </button>
            </div>
          </div>

          <p style={styles.registerText}>
            Don't have an account?{' '}
            <Link to="/register" style={styles.registerLink}>Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: '#f8fafc',
  },
  // Left Panel
  leftPanel: {
    position: 'relative',
    flex: '1 1 45%',
    background: 'linear-gradient(135deg, #1e3a5f 0%, #2563eb 50%, #3b82f6 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '3rem',
    overflow: 'hidden',
  },
  leftContent: {
    position: 'relative',
    zIndex: 2,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    maxWidth: '400px',
  },
  gradientOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 30% 70%, rgba(59,130,246,0.3) 0%, transparent 60%)',
    zIndex: 1,
  },
  logoArea: {
    textAlign: 'center',
  },
  logoIcon: {
    display: 'inline-flex',
    padding: '1rem',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: '16px',
    marginBottom: '1rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255,255,255,0.2)',
  },
  brandTitle: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#ffffff',
    margin: '0 0 0.25rem 0',
    letterSpacing: '-0.5px',
  },
  brandSubtitle: {
    fontSize: '1rem',
    color: 'rgba(255,255,255,0.7)',
    margin: 0,
    fontWeight: '400',
  },
  illustrationArea: {
    width: '100%',
    maxWidth: '350px',
  },
  illustration: {
    width: '100%',
    height: 'auto',
  },
  features: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  featureItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    padding: '0.5rem 1rem',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  featureText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: '0.875rem',
    fontWeight: '500',
  },
  // Right Panel
  rightPanel: {
    flex: '1 1 55%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem',
  },
  formContainer: {
    width: '100%',
    maxWidth: '420px',
  },
  formHeader: {
    marginBottom: '2rem',
  },
  welcomeText: {
    fontSize: '1.75rem',
    fontWeight: '700',
    color: '#1e293b',
    margin: '0 0 0.5rem 0',
  },
  welcomeSubtext: {
    fontSize: '0.95rem',
    color: '#64748b',
    margin: 0,
  },
  errorBox: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    marginBottom: '1.5rem',
    fontSize: '0.875rem',
    border: '1px solid #fecaca',
  },
  errorIcon: {
    fontSize: '1rem',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: '#374151',
    marginBottom: '0.5rem',
  },
  inputWrapper: {
    position: 'relative',
  },
  inputIcon: {
    position: 'absolute',
    left: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#94a3b8',
    pointerEvents: 'none',
  },
  input: {
    width: '100%',
    padding: '0.8rem 1rem 0.8rem 2.75rem',
    fontSize: '0.95rem',
    border: '2px solid #e2e8f0',
    borderRadius: '10px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: '#ffffff',
    color: '#1e293b',
    boxSizing: 'border-box',
  },
  rememberRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1.5rem',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '0.85rem',
    color: '#64748b',
    cursor: 'pointer',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    accentColor: '#2563eb',
    cursor: 'pointer',
  },
  forgotLink: {
    fontSize: '0.85rem',
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '500',
  },
  submitBtn: {
    width: '100%',
    padding: '0.85rem',
    fontSize: '1rem',
    fontWeight: '600',
    color: '#ffffff',
    backgroundColor: '#2563eb',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
  },
  btnContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  loadingText: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#ffffff',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
  },
  demoBox: {
    marginTop: '1.75rem',
    padding: '1rem',
    backgroundColor: '#f1f5f9',
    borderRadius: '10px',
    border: '1px solid #e2e8f0',
  },
  demoTitle: {
    margin: '0 0 0.75rem 0',
    fontSize: '0.8rem',
    fontWeight: '600',
    color: '#475569',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  demoButtons: {
    display: 'flex',
    gap: '0.5rem',
  },
  demoBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#2563eb',
    backgroundColor: '#ffffff',
    border: '1px solid #bfdbfe',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  demoBtnAlt: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.4rem',
    padding: '0.5rem 0.75rem',
    fontSize: '0.8rem',
    fontWeight: '500',
    color: '#7c3aed',
    backgroundColor: '#ffffff',
    border: '1px solid #ddd6fe',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  registerText: {
    textAlign: 'center',
    marginTop: '1.5rem',
    fontSize: '0.875rem',
    color: '#64748b',
  },
  registerLink: {
    color: '#2563eb',
    textDecoration: 'none',
    fontWeight: '600',
  },
};

// Add keyframe animation for spinner
const styleSheet = document.createElement('style');
styleSheet.textContent = `
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
  @media (max-width: 768px) {
    .animate-fade-in > div:first-child {
      display: none !important;
    }
    .animate-fade-in > div:last-child {
      flex: 1 1 100% !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Login;
