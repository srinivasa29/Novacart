import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { Heart, Star, Filter, SlidersHorizontal, Search, CheckCircle2, ShoppingBag } from 'lucide-react';
import axios from '../utils/axios';

const Shop = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [products, setProducts] = React.useState([]);
    const [sortBy, setSortBy] = React.useState('featured');
    const [recentlyViewed, setRecentlyViewed] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [addedId, setAddedId] = React.useState(null);

    React.useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await axios.get('/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        const history = JSON.parse(localStorage.getItem('novacart_recent')) || [];
        setRecentlyViewed(history);
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedId(product._id || product.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // featured
    });

    const handleProductClick = (product) => {
        const history = JSON.parse(localStorage.getItem('novacart_recent')) || [];
        const filtered = history.filter(p => p.id !== product.id);
        const updated = [product, ...filtered].slice(0, 4);
        localStorage.setItem('novacart_recent', JSON.stringify(updated));
    };

    return (
        <div className="shop-page" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                <div>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>The Catalog</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Explore {products.length} premium essentials for your lifestyle.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="glass"
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '12px', fontWeight: '600', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                    >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Top Rated</option>
                    </select>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '4rem' }}>
                {/* Sidebar Filters */}
                <aside style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                    <div>
                        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: '800' }}>DISCOVER</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {[
                                { name: 'All Products', count: products.length },
                                { name: '⭐ Top Rated', count: 12 },
                                { name: '🔥 Trending', count: 8 },
                                { name: '💰 Weekly Deals', count: 5 },
                                { name: '🚚 Fast Delivery', count: 18 }
                            ].map(item => (
                                <label key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer', padding: '0.2rem 0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <input type="checkbox" style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} /> {item.name}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: '#f1f5f9', padding: '0.1rem 0.5rem', borderRadius: '6px' }}>{item.count}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: '800' }}>CATEGORIES</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Electronics', 'Fashion', 'Home Decor', 'Lifestyle'].map(cat => (
                                <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
                                    <input type="checkbox" style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }} /> {cat}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: '800' }}>PRICE RANGE</h4>
                        <input type="range" min="0" max="5000" defaultValue="2500" style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                            <span>$0</span>
                            <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>Under $2500</span>
                            <span>$5000</span>
                        </div>
                    </div>

                    <div style={{ background: 'var(--text-primary)', color: 'white', padding: '2.5rem', borderRadius: '24px', position: 'relative', overflow: 'hidden' }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem' }}>Unlock 20% Off</h3>
                            <p style={{ fontSize: '0.85rem', opacity: 0.7, marginBottom: '1.5rem', lineHeight: '1.5' }}>Join 10,000+ happy shoppers and get exclusive drops.</p>
                            <input type="email" placeholder="email@example.com" style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', marginBottom: '1rem', fontSize: '0.9rem' }} />
                            <button style={{ width: '100%', padding: '0.8rem', borderRadius: '12px', background: 'var(--primary)', color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>Subscribe</button>
                            <p style={{ fontSize: '0.7rem', opacity: 0.5, marginTop: '1rem', textAlign: 'center' }}>No spam. Only exclusive drops.</p>
                        </div>
                    </div>
                </aside>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
                    {loading ? (
                        [1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="card" style={{ padding: '1rem' }}>
                                <div className="skeleton" style={{ width: '100%', height: '320px', borderRadius: '16px', marginBottom: '1.5rem' }}></div>
                                <div className="skeleton" style={{ width: '60%', height: '20px', borderRadius: '4px', marginBottom: '1rem' }}></div>
                                <div className="skeleton" style={{ width: '40%', height: '24px', borderRadius: '4px' }}></div>
                            </div>
                        ))
                    ) : (
                        sortedProducts.map((product, idx) => (
                            <div key={product._id} className="card hover-shine reveal-up" style={{ padding: '1rem', position: 'relative', animationDelay: `${idx * 0.05}s` }}>
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'rgba(255, 255, 255, 0.8)', padding: '0.6rem', borderRadius: '50%', color: isInWishlist(product._id) ? '#ef4444' : 'var(--text-secondary)', display: 'flex', backdropFilter: 'blur(8px)' }}
                                >
                                    <Heart size={18} fill={isInWishlist(product._id) ? '#ef4444' : 'none'} />
                                </button>

                                <Link to={`/product/${product._id}`} onClick={() => handleProductClick(product)}>
                                    <div className="image-hover-zoom" style={{ height: '320px', background: `url(${product.image}) center/cover`, borderRadius: '16px', marginBottom: '1.5rem' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
                                    </div>
                                </Link>

                                <div style={{ padding: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                                        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{product.name}</h3>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#fbbf24', fontSize: '0.9rem', fontWeight: '600' }}>
                                            <Star size={14} fill="#fbbf24" /> {product.rating}
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', gap: '0.8rem', margin: '0.8rem 0', color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: '600' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><CheckCircle2 size={12} color="#10b981" /> Free Delivery</span>
                                        {idx % 3 === 0 && <span style={{ color: '#ef4444' }}>⚡ Only 4 left</span>}
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.2rem' }}>
                                        <span style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--text-primary)' }}>${product.price}</span>
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="btn-primary"
                                            style={{
                                                padding: '0.6rem 1.2rem',
                                                fontSize: '0.85rem',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '0.5rem',
                                                background: addedId === product._id ? '#10b981' : 'var(--primary)',
                                                transform: addedId === product._id ? 'scale(1.05)' : 'scale(1)',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {addedId === product._id ? (
                                                <>Added ✓</>
                                            ) : (
                                                <><ShoppingBag size={16} /> Add to Cart</>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {recentlyViewed.length > 0 && (
                <div style={{ marginTop: '8rem' }}>
                    <div className="reveal-up" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem' }}>
                        <div>
                            <h2 style={{ fontSize: '2.2rem', marginBottom: '0.5rem' }}>Recently Viewed</h2>
                            <p style={{ color: 'var(--text-secondary)' }}>Based on your latest activity.</p>
                        </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '2rem' }}>
                        {recentlyViewed.map((product) => (
                            <Link
                                key={product._id}
                                to={`/product/${product._id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="card hover-shine" style={{ padding: '0.8rem' }}>
                                    <div style={{ height: '220px', background: `url(${product.image}) center/cover`, borderRadius: '12px', marginBottom: '1rem' }}></div>
                                    <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>{product.name}</h4>
                                    <span style={{ fontWeight: '800', color: 'var(--primary)' }}>${product.price}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Shop;
