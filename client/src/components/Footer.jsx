import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ padding: '6rem 2rem 4rem 2rem', borderTop: '1px solid var(--border)', marginTop: '8rem', background: 'var(--bg-card)' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '4rem' }}>
                <div>
                    <h3 style={{
                        color: 'var(--text-primary)',
                        marginBottom: '1.5rem',
                        fontFamily: 'var(--font-headings)',
                        fontWeight: '800',
                        letterSpacing: '0.2em'
                    }}>
                        NOVACART
                    </h3>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.8', maxWidth: '280px', marginBottom: '2rem' }}>
                        The premier destination for modern lifestyle essentials. Managed with precision, delivered with care.
                    </p>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Company</h4>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '2.5', listStyle: 'none', padding: 0 }}>
                        <li><Link to="/about" style={{ color: 'inherit' }}>About Us</Link></li>
                        <li><Link to="/contact" style={{ color: 'inherit' }}>Contact</Link></li>
                    </ul>
                </div>
            </div>
            <div style={{
                textAlign: 'center',
                marginTop: '6rem',
                paddingTop: '2rem',
                borderTop: '1px solid #e2e8f0',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: '500'
            }}>
                &copy; {new Date().getFullYear()} NovaCart. Built for Excellence.
            </div>
        </footer>
    );
};

export default Footer;
