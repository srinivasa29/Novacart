import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, Heart, ArrowRight } from 'lucide-react';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlist.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
                <div style={{ background: '#fef2f2', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#ef4444' }}>
                    <Heart size={48} />
                </div>
                <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Wishlist is empty</h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.1rem' }}>Save your favorite items here for later.</p>
                <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    Discover Products <ArrowRight size={20} />
                </Link>
            </div>
        );
    }

    return (
        <div className="wishlist-page" style={{ padding: '4rem 0' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '3rem' }}>My Favorites</h1>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2.5rem' }}>
                {wishlist.map((product) => (
                    <div key={product._id} className="card" style={{ padding: '1rem', position: 'relative' }}>
                        <button
                            onClick={() => removeFromWishlist(product._id)}
                            style={{
                                position: 'absolute',
                                top: '1.5rem',
                                right: '1.5rem',
                                zIndex: 10,
                                background: 'white',
                                padding: '0.6rem',
                                borderRadius: '50%',
                                color: '#ef4444',
                                display: 'flex',
                                boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                            }}
                        >
                            <Trash2 size={18} />
                        </button>

                        <Link to={`/product/${product._id}`}>
                            <div style={{
                                height: '320px',
                                background: `url(${product.image}) center/cover`,
                                borderRadius: '16px',
                                marginBottom: '1.5rem'
                            }}></div>
                        </Link>

                        <div style={{ padding: '0 0.5rem 0.5rem 0.5rem' }}>
                            <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{product.name}</h3>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', height: '40px', overflow: 'hidden' }}>{product.description}</p>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ fontWeight: '800', fontSize: '1.4rem', color: 'var(--text-primary)' }}>${product.price}</span>
                                <button
                                    onClick={() => {
                                        addToCart(product);
                                        removeFromWishlist(product._id);
                                    }}
                                    className="btn-primary"
                                    style={{ padding: '0.7rem 1.25rem', borderRadius: '12px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                >
                                    <ShoppingCart size={18} /> Move to Bag
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Wishlist;
