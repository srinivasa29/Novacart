import React from 'react';
import { Globe, Users, Award, ShieldCheck } from 'lucide-react';

const About = () => {
    return (
        <div className="about-page" style={{ padding: '6rem 0' }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center', marginBottom: '8rem' }}>
                <span style={{ color: 'var(--primary)', fontWeight: '800', letterSpacing: '0.2rem', display: 'block', marginBottom: '1rem' }}>OUR MISSION</span>
                <h1 style={{ fontSize: '4.5rem', lineHeight: '1', marginBottom: '2rem' }}>Built for <span className="text-gradient">Modern</span> Shoppers.</h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
                    We simplify online shopping by combining smart technology with trusted products. At NovaCart, we value quality and speed above all else, ensuring every interaction feels premium and effortless.
                </p>
            </div>

            <div className="card" style={{ padding: '4rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '8rem' }}>
                <div>
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>Why We Exist</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.8' }}>The e-commerce world is cluttered. NovaCart acts as a filter, bringing you only what matters. Our platform is engineered for those who appreciate high-quality craft and lightning-fast logistics.</p>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Globe size={24} color="var(--primary)" />
                            <span style={{ fontWeight: '700' }}>Global Scale</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Users size={24} color="var(--primary)" />
                            <span style={{ fontWeight: '700' }}>2M+ Happy Users</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <Award size={24} color="var(--primary)" />
                            <span style={{ fontWeight: '700' }}>Premium Service</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                            <ShieldCheck size={24} color="var(--primary)" />
                            <span style={{ fontWeight: '700' }}>100% Trust</span>
                        </div>
                    </div>
                </div>
                <div style={{ height: '400px', background: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800) center/cover', borderRadius: '24px' }}></div>
            </div>

            <div style={{ textAlign: 'center' }}>
                <h2 style={{ fontSize: '3rem', marginBottom: '4rem' }}>Our Philosophy</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                    <div className="card" style={{ padding: '3rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Inclusivity</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Quality products for every budget and lifestyle, because luxury is about a feeling, not just a price tag.</p>
                    </div>
                    <div className="card" style={{ padding: '3rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Innovation</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>We use modern web technologies like React and Vite to create a fast, responsive, and frictionless shopping experience.</p>
                    </div>
                    <div className="card" style={{ padding: '3rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Integrity</h3>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Transparent pricing. Honest reviews. No hidden surprises — just trust-based commerce.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
