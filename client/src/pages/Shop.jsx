import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Star, Filter, SlidersHorizontal, Search, CheckCircle2, ShoppingBag } from 'lucide-react';
import axios from '../utils/axios';

const Shop = () => {
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const location = useLocation();
    const [products, setProducts] = React.useState([]);
    const [sortBy, setSortBy] = React.useState('featured');
    const [recentlyViewed, setRecentlyViewed] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [addedId, setAddedId] = React.useState(null);
    const [activeFilters, setActiveFilters] = React.useState({
        discover: [],
        categories: [],
        maxPrice: 5000,
        searchQuery: ''
    });

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

        // Handle category query param
        const params = new URLSearchParams(location.search);
        const catParam = params.get('category');
        if (catParam) {
            // Map the id from Collections.jsx to the actual category name
            const categoryMap = {
                'minimalist': 'Home Decor',
                'tech': 'Electronics',
                'urban': 'Fashion',
                'office': 'Home Decor' // Or appropriate category
            };
            const mappedCat = categoryMap[catParam];
            if (mappedCat) {
                setActiveFilters(prev => ({ ...prev, categories: [mappedCat] }));
            }
        }
        // Handle search query param
        const searchQueryParam = params.get('q');
        setActiveFilters(prev => ({ 
            ...prev, 
            searchQuery: searchQueryParam || ''
        }));
    }, [location.search]);

    const handleAddToCart = (product) => {
        addToCart(product);
        setAddedId(product._id || product.id);
        setTimeout(() => setAddedId(null), 2000);
    };

    const toggleFilter = (type, value) => {
        setActiveFilters(prev => {
            const current = prev[type];
            const updated = current.includes(value)
                ? current.filter(v => v !== value)
                : [...current, value];
            return { ...prev, [type]: updated };
        });
    };

    const filteredAndSortedProducts = React.useMemo(() => {
        let result = [...products];

        // 1. Dynamic Filters (Discover)
        if (activeFilters.discover.length > 0) {
            result = result.filter(p => {
                const matches = [];
                if (activeFilters.discover.includes('Top Rated')) matches.push(p.rating >= 4.8);
                if (activeFilters.discover.includes('Trending')) matches.push(p.numReviews >= 20);
                if (activeFilters.discover.includes('Weekly Deals')) matches.push(p.price <= 300);
                if (activeFilters.discover.includes('Fast Delivery')) matches.push(p.countInStock >= 20);
                return matches.some(m => m === true);
            });
        }

        // 2. Category Filter
        if (activeFilters.categories.length > 0) {
            result = result.filter(p => activeFilters.categories.includes(p.category));
        }

        // 3. Price Filter
        result = result.filter(p => p.price <= activeFilters.maxPrice);

        // 4. Search Filter
        if (activeFilters.searchQuery) {
            const query = activeFilters.searchQuery.toLowerCase();
            result = result.filter(p => 
                p.name.toLowerCase().includes(query) || 
                p.description.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query)
            );
        }

        // 5. Sorting
        return result.sort((a, b) => {
            if (sortBy === 'price-low') return a.price - b.price;
            if (sortBy === 'price-high') return b.price - a.price;
            if (sortBy === 'rating') return b.rating - a.rating;
            return 0;
        });
    }, [products, activeFilters, sortBy]);

    const getCount = (type, value) => {
        if (type === 'discover') {
            if (value === 'All Products') return products.length;
            if (value === 'Top Rated') return products.filter(p => p.rating >= 4.8).length;
            if (value === 'Trending') return products.filter(p => p.numReviews >= 20).length;
            if (value === 'Weekly Deals') return products.filter(p => p.price <= 300).length;
            if (value === 'Fast Delivery') return products.filter(p => p.countInStock >= 20).length;
        }
        if (type === 'categories') {
            return products.filter(p => p.category === value).length;
        }
        return 0;
    };

    const handleProductClick = (product) => {
        const history = JSON.parse(localStorage.getItem('novacart_recent')) || [];
        const filtered = history.filter(p => p.id !== product.id);
        const updated = [product, ...filtered].slice(0, 4);
        localStorage.setItem('novacart_recent', JSON.stringify(updated));
    };

    return (
        <div className="shop-page" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: '800', lineHeight: '1.2' }}>The Catalog</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Explore {products.length} premium essentials for your lifestyle.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '700', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sort By</span>
                    <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="glass"
                        style={{ padding: '0.8rem 1.5rem', borderRadius: '16px', fontWeight: '700', border: '1px solid #e2e8f0', cursor: 'pointer', minWidth: '200px', fontSize: '1rem' }}
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
                                { name: 'Top Rated', icon: '⭐' },
                                { name: 'Trending', icon: '🔥' },
                                { name: 'Weekly Deals', icon: '💰' },
                                { name: 'Fast Delivery', icon: '🚚' }
                            ].map(item => (
                                <label key={item.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer', padding: '0.2rem 0' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.discover.includes(item.name)}
                                            onChange={() => toggleFilter('discover', item.name)}
                                            style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                                        /> {item.icon} {item.name}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', background: '#f1f5f9', padding: '0.1rem 0.5rem', borderRadius: '6px' }}>{getCount('discover', item.name)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: '800' }}>CATEGORIES</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {['Electronics', 'Fashion', 'Home Decor', 'Beauty'].map(cat => (
                                <label key={cat} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <input
                                            type="checkbox"
                                            checked={activeFilters.categories.includes(cat)}
                                            onChange={() => toggleFilter('categories', cat)}
                                            style={{ accentColor: 'var(--primary)', width: '18px', height: '18px' }}
                                        /> {cat}
                                    </div>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.6 }}>{getCount('categories', cat)}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.1em', color: 'var(--text-secondary)', marginBottom: '1.5rem', fontWeight: '800' }}>PRICE RANGE</h4>
                        <input
                            type="range"
                            min="0"
                            max="5000"
                            value={activeFilters.maxPrice}
                            onChange={(e) => setActiveFilters(prev => ({ ...prev, maxPrice: parseInt(e.target.value) }))}
                            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
                        />
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                            <span>$0</span>
                            <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.2rem 0.5rem', borderRadius: '6px' }}>Under ${activeFilters.maxPrice}</span>
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
                        filteredAndSortedProducts.map((product, idx) => (
                            <div key={product._id} className="card hover-shine reveal-up" style={{ padding: '1rem', position: 'relative', animationDelay: `${idx * 0.05}s` }}>
                                <button
                                    onClick={() => toggleWishlist(product)}
                                    style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', zIndex: 10, background: 'rgba(255, 255, 255, 0.8)', padding: '0.6rem', borderRadius: '50%', color: isInWishlist(product._id) ? '#ef4444' : 'var(--text-secondary)', display: 'flex', backdropFilter: 'blur(8px)' }}
                                >
                                    <Heart size={18} fill={isInWishlist(product._id) ? '#ef4444' : 'none'} />
                                </button>

                                <Link to={`/product/${product._id}`} onClick={() => handleProductClick(product)}>
                                    <div className="image-hover-zoom" style={{ height: '320px', backgroundColor: '#f8fafc', borderRadius: '16px', marginBottom: '1.5rem', overflow: 'hidden' }}>
                                        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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
