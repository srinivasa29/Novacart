import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

const GuestNavbar = () => {
    const location = useLocation();

    const links = [
        { name: 'HOME', path: '/' },
        { name: 'ABOUT', path: '/about' },
    ];

    return (
        <nav className="glass" style={{
            position: 'sticky', top: 0, zIndex: 1000,
            padding: '1.25rem 2rem', display: 'flex', justifyContent: 'center'
        }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', width: '100%' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '0.2em', color: 'var(--text-primary)', fontFamily: 'var(--font-headings)' }}>
                    NOVACART
                </Link>
                <div style={{ display: 'flex', gap: '2.5rem' }}>
                    {links.map(link => (
                        <Link key={link.name} to={link.path} style={{ fontSize: '0.85rem', fontWeight: '600', color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                            {link.name}
                        </Link>
                    ))}
                </div>
                <Link to="/login" style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    background: 'var(--primary)', color: 'white',
                    padding: '0.6rem 1.5rem', borderRadius: 'var(--radius-pill)',
                    fontWeight: '600', fontSize: '0.9rem', boxShadow: '0 8px 16px var(--primary-glow)'
                }}>
                    <User size={18} />
                    <span>SIGN IN</span>
                </Link>
            </div>
        </nav>
    );
};

export default GuestNavbar;
