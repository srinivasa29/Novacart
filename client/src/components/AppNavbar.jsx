import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const AppNavbar = () => {
    const { itemCount } = useCart();
    const { logout, user } = useAuth();
    const location = useLocation();

    const navLinks = [
        { name: 'SHOP', path: '/shop' },
        { name: 'COLLECTIONS', path: '/collections' },
    ];

    return (
        <nav className="glass" style={{ position: 'sticky', top: 0, zIndex: 1000, padding: '1.25rem 2rem', display: 'flex', justifyContent: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1400px', width: '100%' }}>
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '0.2em', color: 'var(--text-primary)', fontFamily: 'var(--font-headings)' }}>
                    NOVACART
                </Link>

                <div style={{ display: 'flex', gap: '2.5rem' }}>
                    {navLinks.map((link) => (
                        <Link key={link.name} to={link.path} style={{ fontSize: '0.85rem', fontWeight: '600', color: location.pathname === link.path ? 'var(--primary)' : 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                            {link.name}
                        </Link>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-primary)', alignItems: 'center' }}>
                        <Search size={20} style={{ cursor: 'pointer' }} />
                        <Link to="/wishlist" style={{ color: 'inherit', display: 'flex' }}><Heart size={20} /></Link>
                        <Link to="/cart" style={{ color: 'inherit', display: 'flex', position: 'relative' }}>
                            <ShoppingBag size={20} />
                            {itemCount > 0 && (
                                <span style={{
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-8px',
                                    background: 'var(--primary)',
                                    color: 'white',
                                    fontSize: '0.65rem',
                                    fontWeight: '800',
                                    padding: '2px 5px',
                                    borderRadius: '50%',
                                    minWidth: '18px',
                                    textAlign: 'center',
                                    border: '2px solid white'
                                }}>
                                    {itemCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div style={{ height: '20px', width: '1px', background: '#e2e8f0' }}></div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: 'var(--text-secondary)', letterSpacing: '0.05em' }}>
                            HI, {user?.name?.toUpperCase() || 'USER'}
                        </span>
                        <button onClick={logout} style={{ background: 'none', color: '#ef4444', display: 'flex', padding: '0.4rem', borderRadius: '8px', transition: 'background 0.2s' }}>
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AppNavbar;
