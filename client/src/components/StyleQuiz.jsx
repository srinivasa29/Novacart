import React, { useState } from 'react';
import { X, ArrowRight, Check, Sparkles, Home, Cpu, Shirt, Briefcase } from 'lucide-react';

const StyleQuiz = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);

    const questions = [
        {
            id: 1,
            title: "What's your ideal morning vibe?",
            options: [
                { id: 'minimalist', text: 'Quiet coffee & clean desk', icon: <Home size={24} />, image: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&q=80' },
                { id: 'urban', text: 'City walk & fast energy', icon: <Shirt size={24} />, image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&q=80' }
            ]
        },
        {
            id: 2,
            title: "What's your primary goal today?",
            options: [
                { id: 'tech', text: 'Optimizing & creating', icon: <Cpu size={24} />, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&q=80' },
                { id: 'office', text: 'Focus & creative flow', icon: <Briefcase size={24} />, image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=400&q=80' }
            ]
        },
        {
            id: 3,
            title: "Which material speaks to you?",
            options: [
                { id: 'minimalist', text: 'Natural Linen & Oak', icon: <Home size={24} />, image: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=400&q=80' },
                { id: 'tech', text: 'Carbon & Aluminum', icon: <Cpu size={24} />, image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80' }
            ]
        }
    ];

    const results = {
        minimalist: { name: 'Minimalist Living', path: '/collections#minimalist' },
        tech: { name: 'Tech Essentials', path: '/collections#tech' },
        urban: { name: 'Urban Fashion', path: '/collections#urban' },
        office: { name: 'Home Office', path: '/collections#office' }
    };

    const handleAnswer = (optionId) => {
        const updatedAnswers = [...answers, optionId];
        setAnswers(updatedAnswers);
        if (step < questions.length - 1) {
            setStep(step + 1);
        } else {
            setStep('result');
        }
    };

    const getRecommendation = () => {
        const counts = {};
        answers.forEach(a => counts[a] = (counts[a] || 0) + 1);
        const winner = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        return results[winner] || results.minimalist;
    };

    if (!isOpen) return null;

    const recommendation = step === 'result' ? getRecommendation() : null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(20px)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem'
        }}>
            <div className="card reveal-up" style={{
                width: '100%',
                maxWidth: '800px',
                background: 'white',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                padding: '4rem'
            }}>
                <button 
                    onClick={onClose}
                    style={{ position: 'absolute', top: '2rem', right: '2rem', background: '#f1f5f9', border: 'none', padding: '0.5rem', borderRadius: '50%', cursor: 'pointer' }}
                >
                    <X size={20} />
                </button>

                {step !== 'result' ? (
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ color: 'var(--primary)', fontWeight: '800', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
                            STEP {step + 1} OF {questions.length}
                        </span>
                        <h2 style={{ fontSize: '2.5rem', marginTop: '1rem', marginBottom: '3rem' }}>{questions[step].title}</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            {questions[step].options.map(option => (
                                <button 
                                    key={option.id}
                                    onClick={() => handleAnswer(option.id)}
                                    className="hover-shine"
                                    style={{
                                        border: '1px solid #e2e8f0',
                                        borderRadius: '24px',
                                        padding: '1rem',
                                        background: 'none',
                                        textAlign: 'left',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: '1.5rem',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    <div style={{ height: '180px', width: '100%', borderRadius: '16px', overflow: 'hidden' }}>
                                        <img src={option.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0 0.5rem 0.5rem' }}>
                                        <div style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary)', padding: '0.5rem', borderRadius: '10px' }}>
                                            {option.icon}
                                        </div>
                                        <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{option.text}</span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', background: '#ecfdf5', color: '#10b981', padding: '1rem', borderRadius: '50%', marginBottom: '2.5rem' }}>
                            <Sparkles size={40} />
                        </div>
                        <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>Your style is <span className="text-gradient">{recommendation.name}</span></h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '4rem', maxWidth: '500px', margin: '0 auto 4rem' }}>
                            Based on your choices, you appreciate products that prioritize focus, quality, and modern aesthetics.
                        </p>
                        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                            <button 
                                onClick={() => {
                                    window.location.href = recommendation.path;
                                    onClose();
                                }}
                                className="btn-primary" 
                                style={{ padding: '1.2rem 3rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}
                            >
                                Shop Your Matches <ArrowRight size={20} />
                            </button>
                            <button 
                                onClick={() => { setStep(0); setAnswers([]); }}
                                style={{ padding: '1.2rem 2rem', borderRadius: '14px', fontWeight: '600', background: '#f1f5f9', color: 'var(--text-primary)', border: 'none' }}
                            >
                                Retake Quiz
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StyleQuiz;
