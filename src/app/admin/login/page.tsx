"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="landing-page">
      <div className="glass-card animate-fade-in" style={{ maxWidth: '400px', width: '100%', padding: '2.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--primary-glow)', padding: '1rem', borderRadius: '50%' }}>
            <Lock size={32} className="text-gradient" />
          </div>
        </div>
        <h2 className="text-center mb-6">Admin Secure Login</h2>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--error-color)', borderRadius: '8px', padding: '0.75rem', border: '1px solid rgba(239,68,68,0.2)', fontSize: '0.875rem' }}>
              {error}
            </div>
          )}

          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', width: '100%' }} disabled={isSubmitting}>
            {isSubmitting ? <span className="spinner"></span> : 'Sign In'}
          </button>
        </form>

        <div className="text-center" style={{ marginTop: '1.5rem', fontSize: '0.875rem' }}>
          <a href="/admin/register" style={{ color: 'var(--primary-color)', textDecoration: 'none' }}>
            Need an account? Register Here
          </a>
        </div>
      </div>
    </div>
  );
}
