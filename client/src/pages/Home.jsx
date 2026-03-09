import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import {
    Heart, ShoppingBag, ArrowRight, Star, ShieldCheck, Zap, Globe,
    CheckCircle2, TrendingUp, Sparkles, Clock, Truck, Search
} from 'lucide-react';
import axios from '../utils/axios';

const Home = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/products');
                setProducts(data.slice(0, 4)); // Show only a few on home
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleAction = (product) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            addToCart(product);
        }
    };

    const handleProtectedNavigation = (path) => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate(path);
        }
    };

    return (
        <div className="home-container">
            {/* Hero Section */}
            <section style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
                gap: '4rem',
                alignItems: 'center',
                padding: '4rem 0 6rem 0'
            }}>
                <div className="hero-content reveal-up" style={{ animationDelay: '0.2s' }}>
                    <span style={{
                        color: 'var(--primary)',
                        fontWeight: '700',
                        letterSpacing: '0.1em',
                        fontSize: '0.9rem',
                        display: 'block',
                        marginBottom: '1rem'
                    }}>
                        PREMIUM E-COMMERCE
                    </span>
                    <h1 style={{
                        fontSize: '4.5rem',
                        lineHeight: '1.1',
                        marginBottom: '1.5rem',
                        color: 'var(--text-primary)',
                        fontWeight: '800'
                    }}>
                        Shop smarter. <span className="text-gradient">Live</span> better.
                    </h1>
                    <p style={{
                        fontSize: '1.25rem',
                        color: 'var(--text-secondary)',
                        marginBottom: '2.5rem',
                        maxWidth: '550px',
                        lineHeight: '1.6'
                    }}>
                        NovaCart brings handpicked products, transparent pricing, and lightning-fast delivery — all in one seamless experience.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => handleProtectedNavigation('/shop')}
                                className="btn-primary"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '1rem 2.5rem' }}
                            >
                                Shop Collection <ArrowRight size={20} />
                            </button>
                            <button
                                onClick={() => handleProtectedNavigation('/collections')}
                                style={{
                                    padding: '1rem 2.5rem',
                                    borderRadius: '14px',
                                    fontWeight: '600',
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    color: 'var(--text-primary)'
                                }}
                            >
                                View Lookbook
                            </button>
                        </div>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', fontWeight: '600' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> Free shipping over ₹999</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> 7-day easy returns</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircle2 size={16} color="#10b981" /> Secure payments</span>
                        </div>
                    </div>
                </div>

                <div className="hero-image-container reveal-up" style={{ position: 'relative', animationDelay: '0.4s' }}>
                    <div className="image-hover-zoom" style={{
                        width: '100%',
                        height: '600px',
                        background: 'linear-gradient(135deg, #e0e7ff 0%, #f1f5f9 100%)',
                        borderRadius: '32px',
                        overflow: 'hidden',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.05)'
                    }}>
                        <img className="ken-burns" src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800" alt="Hero" style={{ width: '100%', height: '100%', objectFit: 'cover', mixBlendMode: 'multiply', opacity: 0.8 }} />
                    </div>

                    {/* Floating Card */}
                    <div className="card float-animation" style={{
                        position: 'absolute',
                        bottom: '-30px',
                        right: '-30px',
                        padding: '1.5rem',
                        width: '240px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <div style={{ background: '#ecfdf5', color: '#10b981', padding: '0.5rem', borderRadius: '10px' }}>
                                <ShieldCheck size={20} />
                            </div>
                            <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>Verified Quality</span>
                        </div>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>All our products undergo rigorous testing before shipment.</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', marginLeft: '5px' }}>
                                {[1, 2, 3, 4].map(i => <div key={i} style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#cbd5e1', border: '2px solid white', marginLeft: '-8px' }}></div>)}
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>+2k Happy Users</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why NovaCart Section */}
            <section style={{ padding: '8rem 0', background: 'var(--bg-soft)', margin: '0 -2rem', padding: '8rem 2rem' }}>
                <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Why NovaCart?</h2>
                    <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Building depth into your shopping experience through smart engineering and product intuition.</p>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    {[
                        { icon: <Sparkles />, title: 'Smart Recommendations', desc: 'Personalized suggestions based on browsing behavior.' },
                        { icon: <TrendingUp />, title: 'Real-Time Comparison', desc: 'We ensure you always get competitive pricing across the web.' },
                        { icon: <ShieldCheck />, title: 'Secure Checkout', desc: 'End-to-end encrypted payment gateway for zero-risk transactions.' },
                        { icon: <Zap />, title: 'Fast Delivery Network', desc: 'Optimized logistics and warehouse nodes for faster shipping.' }
                    ].map((feature, i) => (
                        <div key={i} className="card reveal-up" style={{ padding: '3rem', textAlign: 'center', animationDelay: `${0.1 * (i + 1)}s` }}>
                            <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
                                {React.cloneElement(feature.icon, { size: 30 })}
                            </div>
                            <h3 style={{ marginBottom: '1rem', fontSize: '1.25rem' }}>{feature.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.6' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Product Grid Section */}
            <section style={{ padding: '8rem 0' }}>
                <div className="reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>New Arrivals</h2>
                        <p style={{ color: 'var(--text-secondary)' }}>Fresh picks added weekly. Don’t miss what’s trending.</p>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
                    {loading ? (
                        [1, 2, 3, 4].map(i => (
                            <div key={i} className="card skeleton-card" style={{ height: '450px', padding: '1rem' }}>
                                <div className="skeleton" style={{ height: '320px', borderRadius: '16px', marginBottom: '1rem' }}></div>
                                <div className="skeleton" style={{ height: '20px', width: '60%', marginBottom: '1rem' }}></div>
                                <div className="skeleton" style={{ height: '24px', width: '40%' }}></div>
                            </div>
                        ))
                    ) : products.length === 0 ? (
                        <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--text-secondary)' }}>No fresh picks at the moment. Check back soon!</p>
                    ) : (
                        products.map((product, idx) => (
                            <div key={product._id} className="card hover-shine reveal-up" style={{ padding: '1rem', position: 'relative', overflow: 'hidden', animationDelay: `${0.05 * idx}s` }}>
                                {/* Badges */}
                                {idx === 0 && (
                                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, background: '#ef4444', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em' }}>
                                        TRENDING
                                    </div>
                                )}
                                {idx === 1 && (
                                    <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', zIndex: 10, background: '#f59e0b', color: 'white', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.7rem', fontWeight: '800', letterSpacing: '0.05em' }}>
                                        LIMITED STOCK
                                    </div>
                                )}

                                <button
                                    onClick={() => {
                                        if (!isAuthenticated) navigate('/login');
                                        else toggleWishlist(product);
                                    }}
                                    style={{
                                        position: 'absolute',
                                        top: '1.5rem',
                                        right: '1.5rem',
                                        zIndex: 10,
                                        background: 'rgba(255, 255, 255, 0.8)',
                                        padding: '0.6rem',
                                        borderRadius: '50%',
                                        color: isInWishlist(product._id) ? '#ef4444' : 'var(--text-secondary)',
                                        display: 'flex',
                                        backdropFilter: 'blur(8px)',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                                    }}
                                >
                                    <Heart size={18} fill={isInWishlist(product._id) ? '#ef4444' : 'none'} />
                                </button>

                                <Link to={isAuthenticated ? `/product/${product._id}` : '/login'}>
                                    <div className="image-hover-zoom" style={{
                                        height: '320px',
                                        background: `url(${product.image}) center/cover`,
                                        borderRadius: '16px',
                                        marginBottom: '1.5rem'
                                    }}>
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                </Link>

                                <div style={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', color: 'var(--text-primary)', marginRight: '1rem' }}>{product.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24', fontSize: '0.9rem', whiteSpace: 'nowrap' }}>
                                            <Star size={14} fill="#fbbf24" /> {product.rating}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Clock size={12} /> Delivery by Tomorrow</span>
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                                        <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>${product.price}</span>

                                        <div className="hover-reveal">
                                            <button
                                                onClick={() => handleAction(product)}
                                                className="btn-primary"
                                                style={{
                                                    padding: '0.6rem 1.2rem',
                                                    borderRadius: '12px',
                                                    fontSize: '0.85rem',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    boxShadow: '0 10px 20px rgba(99, 102, 241, 0.2)'
                                                }}
                                            >
                                                <ShoppingBag size={16} /> Quick Add
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </section>

            {/* How It Works Section */}
            <section style={{ padding: '8rem 0', textAlign: 'center' }}>
                <div className="reveal-up">
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Simple. Fast. Reliable.</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '5rem' }}>Getting your luxury favorites is easier than ever.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', position: 'relative' }}>
                    {[
                        { icon: <Search />, step: '1', title: 'Browse Essentials', desc: 'Explore our handpicked products curated for quality.' },
                        { icon: <ShoppingBag />, step: '2', title: 'Add to Cart Securely', desc: 'Manage your selection with an effortless cart experience.' },
                        { icon: <Truck />, step: '3', title: 'Track Real-Time', desc: 'Watch your package as it moves through our optimization hubs.' }
                    ].map((item, i) => (
                        <div key={i} className="reveal-up" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', animationDelay: `${0.2 * i}s`, cursor: 'pointer' }} onClick={() => handleProtectedNavigation('/shop')}>
                            <div className="float-animation" style={{
                                width: '80px', height: '80px', borderRadius: '50%', background: 'white',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.05)', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', color: 'var(--primary)',
                                marginBottom: '2rem', zIndex: 1, animationDelay: `${0.5 * i}s`
                            }}>
                                {React.cloneElement(item.icon, { size: 32 })}
                                <div style={{ position: 'absolute', top: '0', right: 'calc(50% - 60px)', background: 'var(--primary)', color: 'white', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '800', border: '4px solid white shadow' }}>
                                    {item.step}
                                </div>
                            </div>
                            <h3 style={{ marginBottom: '1rem' }}>{item.title}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: '240px' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Home;
