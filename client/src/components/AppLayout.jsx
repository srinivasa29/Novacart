import React from 'react';
import { Outlet } from 'react-router-dom';
import AppNavbar from './AppNavbar';
import Footer from './Footer';

const AppLayout = () => {
    return (
        <>
            <AppNavbar />
            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', minHeight: '80vh' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default AppLayout;
