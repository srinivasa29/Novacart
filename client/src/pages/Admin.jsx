import React from 'react';
const AdminDashboard = () => {
    return (
        <div className="admin-dashboard">
            <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--text-secondary)' }}>Total Sales</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>$12,450</p>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--text-secondary)' }}>Orders</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>84</p>
                </div>
                <div className="glass" style={{ padding: '2rem', borderRadius: '16px', textAlign: 'center' }}>
                    <h3 style={{ color: 'var(--text-secondary)' }}>Customers</h3>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '0.5rem' }}>1,205</p>
                </div>
            </div>

            <div className="glass" style={{ padding: '2rem', borderRadius: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
                    <h2>Product Management</h2>
                    <button style={{ padding: '0.5rem 1rem', background: 'var(--primary)', color: 'white', borderRadius: '8px' }}>+ Add Product</button>
                </div>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border)' }}>
                            <th style={{ padding: '1rem' }}>Product</th>
                            <th style={{ padding: '1rem' }}>Category</th>
                            <th style={{ padding: '1rem' }}>Price</th>
                            <th style={{ padding: '1rem' }}>Stock</th>
                            <th style={{ padding: '1rem' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[1, 2, 3].map(i => (
                            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                <td style={{ padding: '1rem' }}>Product Name {i}</td>
                                <td style={{ padding: '1rem' }}>Electronics</td>
                                <td style={{ padding: '1rem' }}>$99.99</td>
                                <td style={{ padding: '1rem' }}>45</td>
                                <td style={{ padding: '1rem' }}>
                                    <button style={{ color: 'var(--primary)', background: 'none', marginRight: '1rem' }}>Edit</button>
                                    <button style={{ color: '#ef4444', background: 'none' }}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
