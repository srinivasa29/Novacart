import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import StyleQuiz from '../components/StyleQuiz';

const Collections = () => {
    const [isQuizOpen, setIsQuizOpen] = React.useState(false);
    const collections = [
        {
            id: 'minimalist',
            name: 'Minimalist Living',
            description: 'Clean design. Zero distractions. Pieces that bring clarity to your everyday living.',
            image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800&q=80',
            products: 24,
            badge: 'CUSTOMER FAVORITE',
            badgeColor: '#6366f1',
            bullets: ['Sustainable materials', 'Handcrafted quality', 'Timeless aesthetics'],
            topPicks: 'Ceramic Decor, Linen Vases'
        },
        {
            id: 'tech',
            name: 'Tech Essentials',
            description: 'Fast. Functional. Future-ready. Performance-driven tech for work and play.',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80',
            products: 18,
            badge: 'NEW DROP',
            badgeColor: '#10b981',
            bullets: ['1-year warranty', 'Express shipping', 'Verified performance'],
            topPicks: 'Smartwatch, Wireless Earbuds'
        },
        {
            id: 'urban',
            name: 'Urban Fashion',
            description: 'Confident fits for people who move fast. Modern silhouettes built for city life.',
            image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80',
            products: 32,
            badge: 'TRENDING',
            badgeColor: '#ef4444',
            bullets: ['Premium fabrics', 'Athletic tailoring', 'Limited run items'],
            topPicks: 'Leather Jacket, Knit Tees'
        },
        {
            id: 'office',
            name: 'Home Office',
            description: 'Work smarter. Feel better. Smart tools for focused work and creative flow.',
            image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
            products: 15,
            badge: 'SMART CHOICE',
            badgeColor: '#f59e0b',
            bullets: ['Ergonomic focus', 'Cable management', 'Space optimization'],
            topPicks: 'Desk Mats, Task Lamps'
        },
    ];

    return (
        <div className="collections-page" style={{ padding: '4rem 0' }}>
            {/* Editorial Header */}
            <div className="reveal-up" style={{ textAlign: 'center', marginBottom: '8rem' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(99, 102, 241, 0.08)', color: 'var(--primary)', padding: '0.4rem 1.2rem', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '800', marginBottom: '1.5rem', letterSpacing: '0.1em' }}>
                    <Sparkles size={14} /> FIND YOUR STYLE
                </div>
                <h1 style={{ fontSize: '4rem', marginBottom: '1.5rem', fontWeight: '800' }}>Shop by Experience, <span className="text-gradient">Not Category</span></h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto 2.5rem', lineHeight: '1.7' }}>
                    Not sure where to start? Browse thoughtfully handpicked collections designed around how you live, work, and move.
                </p>
                <button 
                    onClick={() => setIsQuizOpen(true)}
                    className="btn-primary" 
                    style={{ padding: '1rem 2.5rem', borderRadius: '16px', fontSize: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}
                >
                    Take the Style Quiz <ArrowRight size={18} />
                </button>
            </div>

            <StyleQuiz isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', gap: '3rem' }}>
                {collections.map((col, idx) => (
                    <Link key={col.id} to={`/shop?category=${col.id}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div className="card reveal-up hover-shine" style={{ height: '600px', position: 'relative', overflow: 'hidden', padding: 0, animationDelay: `${idx * 0.1}s` }}>
                            {/* Collection Background Image */}
                            <div className="image-hover-zoom" style={{ width: '100%', height: '100%' }}>
                                <img src={col.image} alt={col.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>

                            {/* Static Content (Always Visible) */}
                            <div style={{ position: 'absolute', top: '2.5rem', left: '2.5rem', zIndex: 10, pointerEvents: 'none' }}>
                                <h2 style={{ fontSize: '2.5rem', color: 'white', textShadow: '0 4px 12px rgba(0,0,0,0.3)', marginBottom: '0.5rem' }}>{col.name}</h2>
                                <span style={{ color: 'rgba(255,255,255,0.8)', fontWeight: '600', fontSize: '0.9rem' }}>{col.products} Products</span>
                            </div>

                            {/* Interactive Overlay (On Hover) */}
                            <div className="collection-overlay">
                                <div className="collection-bullets" style={{ marginBottom: '2rem' }}>
                                    <p style={{ color: 'white', fontSize: '1.1rem', marginBottom: '1.5rem', lineHeight: '1.6', fontWeight: '500' }}>{col.description}</p>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '1.5rem' }}>
                                        {col.bullets.map((bullet, k) => (
                                            <div key={k} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', fontWeight: '600' }}>
                                                <CheckCircle2 size={16} color="#10b981" /> {bullet}
                                            </div>
                                        ))}
                                    </div>
                                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', paddingTop: '1.2rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
                                        <strong style={{ color: 'white' }}>Top Picks:</strong> {col.topPicks}
                                    </div>
                                </div>
                                <button className="btn-primary" style={{ width: '100%', padding: '1.2rem', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', background: 'white', color: 'var(--text-primary)' }}>
                                    Explore Collection <ArrowRight size={20} />
                                </button>
                            </div>

                            {/* Badge */}
                            <div className="collection-badge" style={{ backgroundColor: col.badgeColor }}>
                                {col.badge}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Collections;
