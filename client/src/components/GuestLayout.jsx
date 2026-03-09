import React from 'react';
import { Outlet } from 'react-router-dom';
import GuestNavbar from './GuestNavbar';
import Footer from './Footer';

const GuestLayout = () => {
    return (
        <>
            <GuestNavbar />
            <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem', minHeight: '80vh' }}>
                <Outlet />
            </main>
            <Footer />
        </>
    );
};

export default GuestLayout;
