import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { itemCount } = useCart();
    const location = useLocation();

    const navLinks = [
        { name: 'HOME', path: '/' },
        { name: 'SHOP', path: '/shop' },
        { name: 'COLLECTIONS', path: '/collections' },
        { name: 'ABOUT', path: '/about' },
    ];

    return (
        <nav className="glass" style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '1.25rem 2rem',
            display: 'flex',
            justifyContent: 'center'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                maxWidth: '1400px',
                width: '100%'
            }}>
                {/* Brand Logo */}
                <Link to="/" style={{
                    fontSize: '1.5rem',
                    fontWeight: '800',
                    letterSpacing: '0.2em',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-headings)'
                }}>
                    NOVACART
                </Link>

                {/* Center Navigation */}
                <div style={{
                    display: 'flex',
                    gap: '2.5rem',
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)'
                }}>
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: '600',
                                color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)',
                                letterSpacing: '0.05em'
                            }}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', color: 'var(--text-primary)' }}>
                        <Search size={20} style={{ cursor: 'pointer' }} />
                        <Link to="/wishlist"><Heart size={20} /></Link>
                        <Link to="/login"><User size={20} /></Link>
                    </div>

                    {/* Cart Pill */}
                    <Link to="/cart" style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.6rem 1.25rem',
                        borderRadius: 'var(--radius-pill)',
                        boxShadow: '0 8px 16px var(--primary-glow)',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                    }}>
                        <ShoppingBag size={18} />
                        <span>{itemCount}</span>
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
