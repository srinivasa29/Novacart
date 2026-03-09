import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, ShieldCheck } from 'lucide-react';

import { useAuth } from '../context/AuthContext';

const Register = () => {
    const navigate = useNavigate();
    const { register } = useAuth();
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const result = await register(formData.name, formData.email, formData.password);
        setLoading(false);
        if (result.success) {
            alert('Account created successfully!');
            navigate('/shop');
        } else {
            alert(result.message);
        }
    };

    return (
        <div style={{ padding: '6rem 0', display: 'flex', justifyContent: 'center' }}>
            <div className="card" style={{ maxWidth: '500px', width: '100%', padding: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>Join NovaCart</h1>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>Experience luxury shopping with global privileges</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>FULL NAME</label>
                        <div style={{ position: 'relative' }}>
                            <User size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                required
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '1.1rem 1.1rem 1.1rem 3.5rem', borderRadius: '14px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '600' }}
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>EMAIL ADDRESS</label>
                        <div style={{ position: 'relative' }}>
                            <Mail size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '1.1rem 1.1rem 1.1rem 3.5rem', borderRadius: '14px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '600' }}
                                placeholder="john@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '700', color: 'var(--text-secondary)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>PASSWORD</label>
                        <div style={{ position: 'relative' }}>
                            <Lock size={20} style={{ position: 'absolute', left: '1.25rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                            <input
                                required
                                type="password"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                style={{ width: '100%', padding: '1.1rem 1.1rem 1.1rem 3.5rem', borderRadius: '14px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '600' }}
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                        <input type="checkbox" required style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} id="terms" />
                        <label htmlFor="terms" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                            I agree to the <a href="#" style={{ color: 'var(--primary)', fontWeight: '700' }}>Terms & Conditions</a>
                        </label>
                    </div>

                    <button
                        disabled={loading}
                        className="btn-primary"
                        style={{
                            padding: '1.2rem',
                            fontSize: '1.1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '1rem',
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? 'Creating Account...' : (
                            <>Register Now <ShieldCheck size={22} /></>
                        )}
                    </button>
                </form>

                <div style={{ marginTop: '3.5rem', textAlign: 'center', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', fontWeight: '500' }}>
                        Already have an account? <Link to="/login" style={{ color: 'var(--primary)', fontWeight: '700' }}>Sign In</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
