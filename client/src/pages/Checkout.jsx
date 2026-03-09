import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { CreditCard, Truck, ShieldCheck, Ticket, ChevronRight } from 'lucide-react';

const Checkout = () => {
    const { totalAmount, items, clearCart } = useCart();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        zip: '',
        coupon: ''
    });
    const [discount, setDiscount] = useState(0);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const applyCoupon = () => {
        if (formData.coupon === 'NOVA20') {
            setDiscount(totalAmount * 0.2);
        } else {
            alert('Invalid coupon code.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Order placed successfully! This will be connected to the backend in Phase 2.');
        clearCart();
    };

    return (
        <div className="checkout-page" style={{ padding: '4rem 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '0.9rem' }}>
                <span>Shop</span> <ChevronRight size={14} /> <span>Cart</span> <ChevronRight size={14} /> <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>Checkout</span>
            </div>

            <h1 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Secure Checkout</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 450px', gap: '4rem' }}>
                <div className="checkout-form">
                    <form id="checkout-form" onSubmit={handleSubmit}>
                        <div className="card" style={{ padding: '3rem', marginBottom: '2.5rem' }}>
                            <h2 style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem' }}>
                                <Truck size={24} color="var(--primary)" /> Shipping Information
                            </h2>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>FULL NAME</label>
                                    <input required name="fullName" value={formData.fullName} onChange={handleChange} type="text" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '500' }} placeholder="John Doe" />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>EMAIL ADDRESS</label>
                                    <input required name="email" value={formData.email} onChange={handleChange} type="email" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '500' }} placeholder="john@example.com" />
                                </div>
                                <div style={{ gridColumn: 'span 2' }}>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>STREET ADDRESS</label>
                                    <input required name="address" value={formData.address} onChange={handleChange} type="text" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '500' }} placeholder="123 Luxury Ave, Suite 400" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>CITY</label>
                                    <input required name="city" value={formData.city} onChange={handleChange} type="text" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '500' }} placeholder="New York" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>ZIP CODE</label>
                                    <input required name="zip" value={formData.zip} onChange={handleChange} type="text" style={{ width: '100%', padding: '1rem', borderRadius: '12px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', color: 'var(--text-primary)', fontWeight: '500' }} placeholder="10001" />
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ padding: '3rem' }}>
                            <h2 style={{ marginBottom: '2.5rem', display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '1.5rem' }}>
                                <CreditCard size={24} color="var(--primary)" /> Payment Method
                            </h2>
                            <div style={{
                                padding: '1.5rem',
                                borderRadius: '16px',
                                border: '2px solid var(--primary)',
                                background: 'rgba(99, 102, 241, 0.05)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <p style={{ fontWeight: '700', fontSize: '1.1rem' }}>Cash on Delivery</p>
                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Pay securely when your luxury package arrives.</p>
                                </div>
                                <div style={{
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    border: '8px solid var(--primary)',
                                    background: 'white'
                                }}></div>
                            </div>
                        </div>
                    </form>
                </div>

                <div className="order-summary-sidebar">
                    <div className="card" style={{ padding: '3rem', position: 'sticky', top: '120px' }}>
                        <h2 style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>In Your Bag ({items.length})</h2>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem', maxHeight: '250px', overflowY: 'auto' }}>
                            {items.map(item => (
                                <div key={item.id} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                                    <div style={{ width: '70px', height: '70px', background: `url(${item.image}) center/cover`, borderRadius: '12px' }}></div>
                                    <div style={{ flex: 1 }}>
                                        <p style={{ fontSize: '0.95rem', fontWeight: '700' }}>{item.name}</p>
                                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Quality: {item.quantity}</p>
                                    </div>
                                    <p style={{ fontWeight: '800', fontSize: '1.05rem' }}>${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{ marginBottom: '2.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>PROMO CODE</label>
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                <input
                                    name="coupon"
                                    value={formData.coupon}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder="NOVA20"
                                    style={{ flex: 1, padding: '0.9rem', borderRadius: '12px', background: 'var(--bg-soft)', border: '1px solid #e2e8f0', fontWeight: '600' }}
                                />
                                <button
                                    onClick={applyCoupon}
                                    type="button"
                                    style={{ padding: '0.9rem 1.5rem', background: 'var(--text-primary)', color: 'white', border: 'none', borderRadius: '12px', fontWeight: '700' }}
                                >
                                    APPLY
                                </button>
                            </div>
                            {discount > 0 && <p style={{ color: '#10b981', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: '700' }}>✓ 20% Discount Applied</p>}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2.5rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                                <span>Subtotal</span>
                                <span style={{ fontWeight: '600', color: 'var(--text-primary)' }}>${totalAmount.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                                <span>Shipping</span>
                                <span style={{ color: '#10b981', fontWeight: '700' }}>FREE</span>
                            </div>
                            {discount > 0 && (
                                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                                    <span>Discount</span>
                                    <span style={{ fontWeight: '700' }}>-${discount.toFixed(2)}</span>
                                </div>
                            )}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.75rem', fontWeight: '800', marginBottom: '3rem', borderTop: '1px solid #e2e8f0', paddingTop: '2rem' }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--primary)' }}>${(totalAmount - discount).toFixed(2)}</span>
                        </div>

                        <button
                            form="checkout-form"
                            type="submit"
                            className="btn-primary"
                            style={{ width: '100%', padding: '1.25rem', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}
                        >
                            <ShieldCheck size={22} /> Complete Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
