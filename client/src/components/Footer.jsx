import React from 'react';
import { Linkedin, Github, Instagram, Twitter } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer style={{ padding: '6rem 2rem 4rem 2rem', borderTop: '1px solid var(--border)', marginTop: '8rem', background: 'var(--bg-card)' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr repeat(3, 1fr)', gap: '4rem' }}>
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
                    <div style={{ display: 'flex', gap: '1.25rem' }}>
                        <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}><Linkedin size={20} /></a>
                        <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}><Github size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}><Instagram size={20} /></a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', transition: 'color 0.3s' }}><Twitter size={20} /></a>
                    </div>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Company</h4>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '2.5', listStyle: 'none', padding: 0 }}>
                        <li><Link to="/about" style={{ color: 'inherit' }}>About Us</Link></li>
                        <li><Link to="/careers" style={{ color: 'inherit' }}>Careers</Link></li>
                        <li><Link to="/news" style={{ color: 'inherit' }}>Brand News</Link></li>
                        <li><Link to="/contact" style={{ color: 'inherit' }}>Contact</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Legal</h4>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '2.5', listStyle: 'none', padding: 0 }}>
                        <li><Link to="/terms" style={{ color: 'inherit' }}>Terms & Conditions</Link></li>
                        <li><Link to="/privacy" style={{ color: 'inherit' }}>Privacy Policy</Link></li>
                        <li><Link to="/cookies" style={{ color: 'inherit' }}>Cookie Settings</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Resources</h4>
                    <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '2.5', listStyle: 'none', padding: 0 }}>
                        <li><Link to="/faq" style={{ color: 'inherit' }}>FAQs</Link></li>
                        <li><Link to="/shipping" style={{ color: 'inherit' }}>Shipping Rates</Link></li>
                        <li><Link to="/returns" style={{ color: 'inherit' }}>Easy Returns</Link></li>
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
