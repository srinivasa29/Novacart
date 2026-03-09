import React, { useState, useEffect } from 'react';
import { ShoppingCart, Package } from 'lucide-react';

const Preloader = ({ onFinish }) => {
    const [progress, setProgress] = useState(0);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onFinish, 800);
                    return 100;
                }
                return prev + 1.5;
            });
        }, 30);

        const itemTimer = setInterval(() => {
            if (items.length < 5) {
                setItems(prev => [...prev, Date.now()]);
            }
        }, 600);

        return () => {
            clearInterval(timer);
            clearInterval(itemTimer);
        };
    }, [onFinish, items.length]);

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, hsl(210, 90%, 85%), hsl(260, 85%, 84%), hsl(190, 80%, 80%))',
            backgroundSize: '400% 400%',
            animation: 'meshGradient 15s ease infinite',
        }}>
            <style>
                {`
          @keyframes meshGradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes itemDrop {
            0% { transform: translateY(-100px) scale(0); opacity: 0; }
            50% { transform: translateY(0) scale(1.2); opacity: 1; }
            100% { transform: translateY(40px) scale(0.8); opacity: 0; }
          }
          
          .preloader-item {
            position: absolute;
            animation: itemDrop 1s ease-in forwards;
          }
        `}
            </style>

            <div style={{ position: 'relative', height: '200px', width: '200px', display: 'flex', justifyContent: 'center' }}>
                {items.map((id) => (
                    <div key={id} className="preloader-item" style={{ top: '0' }}>
                        <Package size={32} color="var(--primary)" />
                    </div>
                ))}

                <div className="bob-animation" style={{ marginTop: 'auto', color: 'var(--primary)' }}>
                    <ShoppingCart size={80} strokeWidth={1.5} />
                </div>
            </div>

            <div style={{ width: '300px', marginTop: '3rem' }}>
                <p style={{
                    textAlign: 'center',
                    marginBottom: '1rem',
                    fontFamily: 'var(--font-headings)',
                    fontWeight: '800',
                    letterSpacing: '0.2em',
                    color: 'var(--text-primary)',
                    fontSize: '0.8rem'
                }}>
                    LOADING NOVACART...
                </p>
                <div style={{
                    height: '4px',
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '10px',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        height: '100%',
                        width: `${progress}%`,
                        background: 'linear-gradient(90deg, var(--primary), var(--accent))',
                        transition: 'width 0.1s linear'
                    }}></div>
                </div>
            </div>
        </div>
    );
};

export default Preloader;
