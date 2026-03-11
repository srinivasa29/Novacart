import React from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Clock } from 'lucide-react';

const Cart = () => {
    const { items, removeFromCart, updateQuantity, totalAmount, subtotal, discount, discountAmount, applyCoupon } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    const handleMoveToWishlist = (item) => {
        if (!isInWishlist(item._id)) {
            toggleWishlist(item);
        }
        removeFromCart(item._id);
    };

    if (items.length === 0) {
        return (
            <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>
                <div className="reveal-up" style={{
                    background: 'var(--bg-soft)',
                    width: '120px',
                    height: '120px',
                    borderRadius: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2.5rem',
                    color: 'var(--primary)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}>
                    <ShoppingBag size={56} />
                </div>
                <h1 className="reveal-up" style={{ fontSize: '3rem', marginBottom: '1rem', fontWeight: '800' }}>🛍 Your cart feels lonely.</h1>
                <p className="reveal-up" style={{ color: 'var(--text-secondary)', marginBottom: '3.5rem', fontSize: '1.2rem', maxWidth: '500px', margin: '0 auto 3.5rem' }}>
                    Start exploring our latest curated collections and elevate your everyday lifestyle.
                </p>
                <Link to="/shop" className="btn-primary reveal-up" style={{ padding: '1.2rem 3rem', borderRadius: '16px', fontSize: '1.1rem', display: 'inline-flex', alignItems: 'center', gap: '0.8rem' }}>
                    Explore Catalog <ArrowRight size={22} />
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '3rem' }}>
                <h1 style={{ fontSize: '3rem' }}>Shopping Bag</h1>
                <span style={{ background: 'var(--primary)', color: 'white', padding: '0.2rem 0.8rem', borderRadius: '8px', fontSize: '0.9rem', fontWeight: '700' }}>
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: '3rem', alignItems: 'start' }}>

                {/* Cart Items List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    {items.map(item => (
                        <div key={item._id} className="card hover-shine reveal-up" style={{ padding: '1.5rem', display: 'flex', gap: '2rem', alignItems: 'center' }}>
                            <div style={{
                                width: '120px',
                                height: '120px',
                                background: `url(${item.image}) center/cover`,
                                borderRadius: '16px'
                            }}></div>

                            <div style={{ flex: 1 }}>
                                <Link to={`/product/${item._id}`}>
                                    <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: 'var(--text-primary)' }}>{item.name}</h3>
                                </Link>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.2rem' }}>${item.price.toFixed(2)} per unit</p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '12px', padding: '0.3rem' }}>
                                        <button
                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                            style={{ background: 'white', padding: '0.4rem', borderRadius: '8px', color: 'var(--text-primary)', display: 'flex' }}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span style={{ padding: '0 1rem', fontWeight: '700', minWidth: '35px', textAlign: 'center' }}>{item.quantity}</span>
                                        <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{ background: 'white', padding: '0.4rem', borderRadius: '8px', color: 'var(--text-primary)', display: 'flex' }}>
                                            <Plus size={14} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <button 
                                            onClick={() => handleMoveToWishlist(item)}
                                            style={{ background: 'none', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: '700' }}
                                        >
                                            Move to Wishlist
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item._id)}
                                            style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: '600', fontSize: '0.8rem', background: 'none' }}
                                        >
                                            <Trash2 size={16} /> Remove
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div style={{ textAlign: 'right' }}>
                                <p style={{ fontSize: '1.3rem', fontWeight: '800', color: 'var(--text-primary)' }}>${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card" style={{ padding: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Order Summary</h2>

                        {/* Coupon Code */}
                        <div style={{ marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    id="coupon-input"
                                    placeholder="Enter Coupon Code"
                                    style={{ flex: 1, padding: '0.8rem', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.9rem' }}
                                />
                                <button
                                    onClick={() => {
                                        const code = document.getElementById('coupon-input').value;
                                        const res = applyCoupon(code);
                                        alert(res.message);
                                    }}
                                    style={{ background: 'var(--text-primary)', color: 'white', padding: '0 1.5rem', borderRadius: '12px', fontWeight: '600', fontSize: '0.85rem' }}
                                >
                                    Apply
                                </button>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Try <strong>NOVA20</strong> for 20% off your order.</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem', marginBottom: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <span>Subtotal</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>${subtotal.toFixed(2)}</span>
                            </div>
                            {discount > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981', fontSize: '0.95rem' }}>
                                    <span>Discount ({(discount * 100).toFixed(0)}%)</span>
                                    <span style={{ fontWeight: '700' }}>-${discountAmount.toFixed(2)}</span>
                                </div>
                            )}
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <span>Shipping (Express)</span>
                                <span style={{ color: '#10b981', fontWeight: '700' }}>FREE</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                                <span>Estimated Tax (18%)</span>
                                <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>$0.00</span>
                            </div>
                        </div>

                        <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2rem' }}></div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2.5rem' }}>
                            <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Grand Total</span>
                            <span style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--primary)' }}>${totalAmount.toFixed(2)}</span>
                        </div>

                        <Link to="/checkout" style={{ width: '100%' }}>
                            <button className="btn-primary" style={{ width: '100%', padding: '1.1rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem', marginBottom: '1rem' }}>
                                Checkout Securly <ArrowRight size={20} />
                            </button>
                        </Link>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
                            <ShieldCheck size={16} color="#64748b" />
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', fontWeight: '600' }}>SSL Encrypted Checkout</span>
                        </div>
                    </div>

                    <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                            Estimated Delivery: <strong style={{ color: 'var(--text-primary)' }}>3–5 Business Days</strong>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
