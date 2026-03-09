import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { Star, ChevronLeft, ShoppingCart, Heart, ShieldCheck, Truck } from 'lucide-react';
import axios from '../utils/axios';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();
    const [product, setProduct] = React.useState(null);
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await axios.get(`/products/${id}`);
                setProduct(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}>Loading product details...</div>;
    }

    if (!product) {
        return <div style={{ textAlign: 'center', padding: '4rem' }}>Product not found</div>;
    }

    return (
        <div className="product-details-container" style={{ padding: '2rem 0' }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '2rem',
                    background: 'none',
                    color: 'var(--text-secondary)',
                    fontWeight: '600'
                }}
            >
                <ChevronLeft size={20} /> Back to Shop
            </button>

            <div className="card" style={{ padding: '3rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '5rem', alignItems: 'start' }}>
                <div style={{
                    height: '600px',
                    background: `url(${product.image}) center/cover`,
                    borderRadius: '24px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                }}></div>

                <div style={{ paddingTop: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <span style={{
                            padding: '0.5rem 1rem',
                            background: 'rgba(99, 102, 241, 0.08)',
                            color: 'var(--primary)',
                            borderRadius: '12px',
                            fontSize: '0.8rem',
                            fontWeight: '700',
                            letterSpacing: '0.05em'
                        }}>
                            {product.category.toUpperCase()}
                        </span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#fbbf24' }}>
                            <Star size={18} fill="#fbbf24" />
                            <span style={{ color: 'var(--text-primary)', fontWeight: '700' }}>{product.rating}</span>
                        </div>
                    </div>

                    <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem', lineHeight: '1.1', color: 'var(--text-primary)' }}>{product.name}</h1>
                    <p style={{ fontSize: '2.5rem', fontWeight: '800', color: 'var(--primary)', marginBottom: '2rem' }}>${product.price}</p>

                    <div style={{ height: '1px', background: '#e2e8f0', marginBottom: '2.5rem' }}></div>

                    <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.75rem', fontWeight: '800' }}>Description</h4>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', lineHeight: '1.8', fontSize: '1.1rem' }}>
                        {product.description}
                    </p>

                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <button
                            onClick={() => addToCart(product)}
                            className="btn-primary"
                            style={{
                                flex: 1,
                                padding: '1.2rem',
                                fontSize: '1.1rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.8rem'
                            }}
                        >
                            <ShoppingCart size={22} /> Add to Cart
                        </button>
                        <button
                            onClick={() => toggleWishlist(product)}
                            style={{
                                padding: '1.2rem',
                                background: 'white',
                                border: '1px solid #e2e8f0',
                                borderRadius: '16px',
                                color: isInWishlist(product._id) ? '#ef4444' : 'var(--text-secondary)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <Heart size={24} fill={isInWishlist(product._id) ? '#ef4444' : 'none'} />
                        </button>
                    </div>

                    <div style={{ marginTop: '3.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                                <ShieldCheck size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>Secure Checkout</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>100% Guaranteed</p>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                                <Truck size={24} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.9rem', fontWeight: '700' }}>Express Shipping</p>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Delivery in 24h</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
